import { createContext, useState } from "react";

export const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);

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