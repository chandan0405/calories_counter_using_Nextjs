"use client";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import "../css/addPopup.css";
import { useFoodStore } from '@/store/useFoodStore';
import { useMealStore } from '@/store/useMealstore';

interface AddMealPopupProps{
    show:boolean,
    closePopup:()=>void,
    referFood:()=>void
}

const AddMealPopup: React.FC<AddMealPopupProps> = ({ closePopup, show, referFood }) => {
    const [mealType, setMealType] = useState<string>('');
    const  selectedDate  = useFoodStore((state)=>state.selectedDate);
    const tempMealItems = useMealStore((state)=>state.mealData);

    const handleAddMeal = () => {
        if (mealType.trim().toLowerCase()) {
            const currentDate = selectedDate.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
            let currentMeals : {[key: string]:any[]}= JSON.parse(localStorage.getItem(currentDate) || '{}');

            if (!currentMeals[mealType.trim().toLowerCase()]) {
                currentMeals[mealType.trim().toLowerCase()] = [];
            }

            // Append items to the meal type array
            tempMealItems.forEach((item) => {
                currentMeals[mealType.trim().toLowerCase()].push(item);
            });

            // Save the updated meals to localStorage
            localStorage.setItem(currentDate, JSON.stringify(currentMeals));

            referFood();
            closePopup();
        }
    };

    return (
        <div className='modal-body-container'>
            <Modal show={show} onHide={closePopup}  className='modal_container'>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Meal Type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="mealType">
                            <Form.Label>Meal Type</Form.Label>
                            <Form.Control
                                type="text"
                                value={mealType}
                                onChange={(e) => setMealType(e.target.value)}
                                placeholder="Enter meal type Like (Snacks,mid morning.etc)"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closePopup}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddMeal}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddMealPopup;
