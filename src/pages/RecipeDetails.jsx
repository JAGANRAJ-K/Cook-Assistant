import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );

      const data = await response.json();

      console.log(data.meals[0].strInstructions);
      setRecipe(data.meals[0]);
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <h2>Loading...</h2>;
  }
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(measure ? `${measure} ${ingredient}` : ingredient);
    }
  }
  return (
    <div className="p-6">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full max-w-md rounded-lg"
      />

      <h1 className="text-3xl font-bold mt-4">{recipe.strMeal}</h1>

      <p className="mt-2">Category: {recipe.strCategory}</p>

      <p>Area: {recipe.strArea}</p>

      <h2 className="text-2xl font-semibold mt-6">Ingredients</h2>

      <ul className="list-disc pl-6 mt-2">
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-6">Instructions</h2>
      <ol className="list-decimal pl-6 mt-2">
        {recipe.strInstructions
          .split("\n")
          .filter((step) => step.trim() !== "")
          .map((step, index) => (
            <li key={index} className="mb-2">
              {step}
            </li>
          ))}
      </ol>
    </div>
  );
};

export default RecipeDetails;
