import React, { useState, useContext } from "react";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import { RecipeContext } from "../context/RecipeContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { recipes, setRecipes, setSearchTerm } = useContext(RecipeContext);

  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async (value) => {
    if (!value.trim()) {
      alert("Please enter ingredients");
      return;
    }
    setLoading(true);

    const ingredients = value
      .toLowerCase()
      .split(/[,\s]+/)
      .filter((item) => item.trim() !== "");

    const firstIngredient = ingredients[0];
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${firstIngredient}`,
    );

    const data = await response.json();

    // console.log(data);
    const meals = data.meals || [];

    if (ingredients.length === 1) {
      setRecipes(meals);
      setSearchTerm(value);
      setLoading(false);
      navigate("/search-results");
      return;
    }

    const matchedRecipes = [];
    for (const meal of meals) {
      const detailResponse = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`,
      );

      const detailData = await detailResponse.json();

      const recipe = detailData.meals[0];

      console.log(recipe.strMeal);
      const recipeIngredients = [];

      for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];

        if (ingredient && ingredient.trim() !== "") {
          recipeIngredients.push(ingredient.toLowerCase());
        }
      }

      console.log(recipeIngredients);

      const matchesAllIngredients = ingredients.every((ingredient) =>
        recipeIngredients.includes(ingredient),
      );

      if (matchesAllIngredients) {
        matchedRecipes.push(meal);
      }

      console.log(matchesAllIngredients);
    }

    setRecipes(matchedRecipes);
    setSearchTerm(value);
    setHasSearched(true);
    setLoading(false);

    navigate("/search-results");
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
            id={recipe.idMeal}
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
