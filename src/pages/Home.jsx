import React, { useState } from "react";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (value) => {
    if (!value.trim()) {
    alert("Please enter ingredients");
    return;
  }
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`,
    );

    const data = await response.json();

    console.log(data);

    setRecipes(data.meals || []);
    setHasSearched(true);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {hasSearched && recipes.length === 0 && <h2>No recipes found</h2>}
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal}
          name={recipe.strMeal}
          category={recipe.strCategory}
          image={recipe.strMealThumb}
        />
      ))}
    </div>
  );
};

export default Home;
