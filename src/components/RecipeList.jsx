import React, { useState } from 'react';

const RecipeList = ({ ingredients }) => {
  const [sortBy, setSortBy] = useState('name'); // Default sorting
  const [sortDirection, setSortDirection] = useState('asc');

  const sortedIngredients = [...ingredients].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'cost':
        comparison = a.cost - b.cost;
        break;
      case 'quantity':
        comparison = a.quantity - b.quantity;
        break;
      default:
        break;
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const totalCost = sortedIngredients
    .reduce((acc, ingredient) => acc + ingredient.cost, 0)
    .toFixed(2);

  const handleSort = (criteria) => {
    if (sortBy === criteria) {
      // Toggle sort direction if same criteria is clicked
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortDirection('asc');
    }
  };

  return (
    <div className="ingredient-list">
      <div className="list-header">
        <h3>Ingredients List</h3>
        {ingredients.length > 0 && (
          <div className="sort-controls">
            Sort by:
            <button onClick={() => handleSort('name')}>
              Name {sortBy === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
            </button>
            <button onClick={() => handleSort('quantity')}>
              Quantity {sortBy === 'quantity' && (sortDirection === 'asc' ? '↑' : '↓')}
            </button>
            <button onClick={() => handleSort('cost')}>
              Cost {sortBy === 'cost' && (sortDirection === 'asc' ? '↑' : '↓')}
            </button>
          </div>
        )}
      </div>

      {ingredients.length === 0 ? (
        <p>No ingredients added yet. Start by adding some ingredients above.</p>
      ) : (
        <ul>
          {sortedIngredients.map((ingredient) => (
            <li key={ingredient.id} className="ingredient-item">
              <div className="ingredient-details">
                <span className="ingredient-name">{ingredient.name}</span>
                <span className="ingredient-quantity">
                  {ingredient.quantity} {ingredient.unit}
                </span>
                <span className="ingredient-cost">${ingredient.cost.toFixed(2)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="total-cost">
        <strong>Total Cost: ${totalCost}</strong>
      </div>
    </div>
  );
};

export default RecipeList;