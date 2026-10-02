import { createContext, useState, useEffect } from "react";

export const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState(() => {
    const savedRecipes = localStorage.getItem("recipes");

    return savedRecipes ? JSON.parse(savedRecipes) : [];
  });

  const [searchTerm, setSearchTerm] = useState(() => {
  return localStorage.getItem("searchTerm") || "";
});

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
  localStorage.setItem(
    "recipes",
    JSON.stringify(recipes)
  );
}, [recipes]);

useEffect(() => {
  localStorage.setItem(
    "searchTerm",
    searchTerm
  );
}, [searchTerm]);

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        setRecipes,
        searchTerm,
        setSearchTerm,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
