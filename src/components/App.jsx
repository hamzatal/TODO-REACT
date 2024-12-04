import React, { useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import IngredientForm from './IngredientForm';
import RecipeList from './RecipeList';
import Timer from './Timer';
import './App.css';  // Ensure to have the styles in a separate CSS file

const App = () => {
  const [theme, setTheme] = useState('light');
  const [ingredients, setIngredients] = useState([]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const handleAddIngredient = (ingredient) => {
    setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app ${theme}`}>
        <header>
          <h1>TODO List</h1>
          <button className="theme-toggle" onClick={toggleTheme}>
            <span>{theme === 'light' ? '🌙' : '☀️'}</span> Switch Theme
          </button>
        </header>

        {/* Timer Section */}
        <div className="timer-container">
          <Timer />
        </div>

        {/* Ingredient Form */}
        <section className="ingredient-form-section">
          <h2>Add Ingredients</h2>
          <IngredientForm onAddIngredient={handleAddIngredient} />
        </section>

        {/* Ingredients List */}
        <section className="ingredients-list-section">
          <h2>Ingredients List</h2>
          <RecipeList ingredients={ingredients} />
        </section>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
