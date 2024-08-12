"use client";
import React, { useState, useEffect } from 'react';
import { Button, Modal, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/foodQty.css";
import { useMealStore } from '@/store/useMealstore';

interface FoodQtyCardProps {
  show: boolean;
  onClose: () => void;
  initialNutritionalValues: {
    calories: number;
    protein: number;
    carbs: number;
    weight: number;
    quantity?: number;
  };
  clearSearch: () => void;
  id?: string; // Optional in case it's not provided
}

const FoodQtyCard: React.FC<FoodQtyCardProps> = ({ show, onClose, initialNutritionalValues, clearSearch, id }) => {
  const updateFoodItem= useMealStore((state)=>state.updateFoodItem);
  const addFoodItem=useMealStore((state)=>state.addFoodItem);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (initialNutritionalValues.quantity) {
      setQuantity(initialNutritionalValues.quantity);
    }
  }, [initialNutritionalValues]);

  const handleIncrease = () => setQuantity((quantity) => quantity + 1);
  const handleDecrease = () => {
    setQuantity((quantity) => Math.max(quantity - 1, 1));
  };

  const saveNutrition = () => {
    const foodData = {
      ...initialNutritionalValues,
      quantity: quantity,
      calories: initialNutritionalValues.calories * quantity,
      protein: initialNutritionalValues.protein * quantity,
      carbs: initialNutritionalValues.carbs * quantity,
      weight: initialNutritionalValues.weight * quantity,
      id: id // Preserve the unique ID
    };
    if (id) {
      updateFoodItem(foodData)
    } else {
      addFoodItem(foodData)
    }
    clearSearch();
    onClose();
  }; 

  return (
    <Modal show={show} onHide={onClose} className="modal_container">
      <Modal.Body className="modal-body">
        <Container>
          <Row className="mb-3">
            <Col>
              <div className="border p-2 text-center">
                <strong>Calories:</strong> {initialNutritionalValues.calories * quantity}
              </div>
            </Col>
            <Col>
              <div className="border p-2 text-center">
                <strong>Protein:</strong> {initialNutritionalValues.protein * quantity}g
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <div className="border p-2 text-center">
                <strong>Carbs:</strong> {initialNutritionalValues.carbs * quantity}g
              </div>
            </Col>
            <Col>
              <div className="border p-2 text-center">
                <strong>Weight:</strong> {initialNutritionalValues.weight * quantity}g
              </div>
            </Col>
          </Row>
          <Modal.Header>
            <Modal.Title>Select Quantity</Modal.Title>
          </Modal.Header>
          <div className="d-flex justify-content-between align-items-center">
            <Button variant="secondary" onClick={handleDecrease}>
              -
            </Button>
            <span>{quantity}</span> {/* Show local quantity */}
            <Button variant="secondary" onClick={handleIncrease}>
              +
            </Button>
          </div>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={saveNutrition}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FoodQtyCard;
