import React from "react";
import RecipeCard from "./RecipeCard";

const CategorySection = ({
  title,
  recipes,
  category,
  handleViewAll,
}) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {title}
        </h2>

        <button
          onClick={() =>
            handleViewAll(recipes, category)
          }
          className="text-red-500 font-semibold"
        >
          View All →
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {recipes.slice(0, 8).map((recipe) => (
          <div
            key={recipe.idMeal}
            className="min-w-[250px] max-w-[250px]"
          >
            <RecipeCard
              id={recipe.idMeal}
              name={recipe.strMeal}
              image={recipe.strMealThumb}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;