import React, { useState, useId } from 'react';
import './IngredientForm.css';

const IngredientForm = ({ onAddIngredient }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [cost, setCost] = useState('');
  const [unit, setUnit] = useState('grams');
  const [errors, setErrors] = useState({});

  const nameId = useId();
  const quantityId = useId();
  const costId = useId();
  const unitId = useId();

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Ingredient name is required';
    }

    if (!quantity || isNaN(parseFloat(quantity)) || parseFloat(quantity) <= 0) {
      newErrors.quantity = 'Invalid quantity';
    }

    if (!cost || isNaN(parseFloat(cost)) || parseFloat(cost) < 0) {
      newErrors.cost = 'Invalid cost';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = () => {
    if (validateForm()) {
      const newIngredient = {
        name: name.trim(),
        quantity: parseFloat(quantity),
        unit,
        cost: parseFloat(cost),
        id: Date.now() // Unique identifier
      };

      onAddIngredient(newIngredient);
      
      // Reset form
      setName('');
      setQuantity('');
      setCost('');
      setUnit('grams');
      setErrors({});
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="ingredient-form">
      <div className={`form-group ${errors.name ? 'error' : ''}`}>
        <label htmlFor={nameId}>Ingredient</label>
        <input
          id={nameId}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Tomatoes"
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className={`form-group ${errors.quantity ? 'error' : ''}`}>
        <label htmlFor={quantityId}>Quantity</label>
        <input
          id={quantityId}
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="e.g., 2"
          min="0"
          step="0.1"
        />
        {errors.quantity && <span className="error-message">{errors.quantity}</span>}
      </div>

      <div className="form-group">
        <label htmlFor={unitId}>Unit</label>
        <select
          id={unitId}
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          <option value="grams">grams</option>
          <option value="kilograms">kilograms</option>
          <option value="liters">liters</option>
          <option value="milliliters">milliliters</option>
          <option value="cups">cups</option>
          <option value="tablespoons">tablespoons</option>
          <option value="teaspoons">teaspoons</option>
        </select>
      </div>

      <div className={`form-group ${errors.cost ? 'error' : ''}`}>
        <label htmlFor={costId}>Cost</label>
        <input
          id={costId}
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          placeholder="e.g., 5.99"
          min="0"
          step="0.01"
        />
        {errors.cost && <span className="error-message">{errors.cost}</span>}
      </div>

      <button 
        type="button" 
        onClick={handleAdd} 
        className="add-ingredient-btn"
      >
        + Add Ingredient
      </button>
    </form>
  );
};

export default IngredientForm;