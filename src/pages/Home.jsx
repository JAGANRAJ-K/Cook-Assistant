import React, { useState } from "react";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (value) => {
    if (!value.trim()) {
      alert("Please enter ingredients");
      return;
    }
    setLoading(true);
    const ingredients = value.split(",");
    const firstIngredient = ingredients[0].trim();
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${firstIngredient}`,
    );

    const data = await response.json();

    console.log(data);

    setRecipes(data.meals || []);
    setHasSearched(true);
    setLoading(false);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {loading && <h2>Loading...</h2>}

      {hasSearched && recipes.length === 0 && <h2>No recipes found</h2>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {recipes.map((recipe) => (
        <RecipeCard
        key={recipe.idMeal}
        name={recipe.strMeal}
        // category={recipe.strCategory}
        image={recipe.strMealThumb}
        />
      ))}
      </div>
    </div>
  );
};

export default Home;
