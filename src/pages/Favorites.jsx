  import React , {useContext}  from 'react'
  import { RecipeContext } from '../context/RecipeContext';
  import RecipeCard from '../components/RecipeCard';

const Favorites = () => {

  const { favorites } = useContext(RecipeContext);
  return (
  <div className="p-6">
    
    <h1 className="text-3xl font-bold mb-6">
      My Favorites
    </h1>

    {favorites.length === 0 ? (
      <h2>No favorite recipes yet</h2>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {favorites.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            id={recipe.idMeal}
            name={recipe.strMeal}
            image={recipe.strMealThumb}
          />
        ))}
      </div>
    )}
  </div>
);
}

export default Favorites