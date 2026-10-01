import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeContext } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";

const SearchResults = () => {
  const navigate = useNavigate();

  const { recipes, searchTerm } = useContext(RecipeContext);

  return (
    <div className="p-6">
      <button
        onClick={() => navigate("/")}
        className="mb-4 px-4 py-2 bg-gray-200 rounded"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold">
        Search Results
      </h1>

      <h2 className="text-2xl font-semibold mt-2">
        for <span className="capitalize">{searchTerm}</span>
      </h2>

      <p className="mt-2">
        {recipes.length} recipes found
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            id={recipe.idMeal}
            name={recipe.strMeal}
            image={recipe.strMealThumb}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;