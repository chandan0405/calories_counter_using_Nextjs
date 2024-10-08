"use client";
import React from 'react';
import { Box, Typography } from '@mui/material';
import "../../css/foodCard.css";
import flameIcon from "@/assets/flame-icon.svg";
import Image from 'next/image';
import { useMealStore } from '@/store/useMealstore';

interface FoodCardProps {
  image?: string;
  name: string;
  calories: number;
  weight: number;
  protein: number;
  carbs: number;
  fat: number;
  id: string;
  quantity: number;
  onEdit: (id: string) => void;
}

interface ProgressWithLabelProps {
  value: number;
  color: string;
}

const FoodCard: React.FC<FoodCardProps> = ({
  image,
  name,
  calories,
  weight,
  protein,
  carbs,
  fat,
  id,
  quantity,
  onEdit,
}) => {
  const removeFoodItem= useMealStore((state)=>state.removeFoodItem);

  const ProgressWithLabel: React.FC<ProgressWithLabelProps> = ({ value, color }) => (
    <Box display="flex" width="100%" flexDirection="row" gap="10px" alignItems="flex-start">
      <Box
        width={10}
        height={60}
        display="flex"
        bgcolor="#e0e0e0"
        borderRadius={5}
        sx={{ position: 'relative' }}
      >
        <Box
          width={10}
          height={`${value}%`}
          bgcolor={color}
          borderRadius={5}
          sx={{ position: 'absolute', bottom: 0 }}
          maxHeight={"100%"}
        />
      </Box>
      <Box mt={1}>
        <Typography variant="body2" color="textSecondary" fontSize={"18px"} fontWeight={"800"}>
          {`${value} g`}
        </Typography>
      </Box>
    </Box>
  );

  const deleteFoodItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    removeFoodItem(id)
  };

  return (
    <div className="food-card" onClick={() => onEdit(id)}>
      <div className="food-card-header">
        <img src={image} alt={name} className="food-image" />
        <div className="food-info">
          <h4>{name}</h4>
          <p>
            <span>
              <Image src={flameIcon} alt="flame-image" className="flame-icon" />
            </span>
            {calories} kcal · {weight} G
          </p>
        </div>
        <button className="delete-button" onClick={deleteFoodItem}>×</button>
      </div>
      <div className="food-card-nutrition">
        <div className="nutrition-item">
          <ProgressWithLabel value={protein} color="#4caf50" />
          <p className="nutrition-name">Protein</p>
        </div>
        <div className="nutrition-item">
          <ProgressWithLabel value={carbs} color="#ffa726" />
          <p className="nutrition-name">Carbs</p>
        </div>
        <div className="nutrition-item">
          <ProgressWithLabel value={fat} color="#42a5f5" />
          <p className="nutrition-name">Fat</p>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
