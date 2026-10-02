import React, { useState, useContext, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import { RecipeContext } from "../context/RecipeContext";
import { useNavigate } from "react-router-dom";
import CategorySection from "../components/CategorySection";

const Home = () => {
  const { recipes, setRecipes, setSearchTerm } = useContext(RecipeContext);

  // const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const [chickenRecipes, setChickenRecipes] = useState([]);
  const [dessertRecipes, setDessertRecipes] = useState([]);
  const [seafoodRecipes, setSeafoodRecipes] = useState([]);
  const [vegetarianRecipes, setVegetarianRecipes] = useState([]);

  const navigate = useNavigate();

  const handleViewAll = (recipes, category) => {
    setRecipes(recipes);
    setSearchTerm(category);
    navigate("/search-results");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const [
          chickenResponse,
          dessertResponse,
          seafoodResponse,
          vegetarianResponse,
        ] = await Promise.all([
          fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken"),
          fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert"),
          fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood"),
          fetch(
            "https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian",
          ),
        ]);

        const chickenData = await chickenResponse.json();
        const dessertData = await dessertResponse.json();
        const seafoodData = await seafoodResponse.json();
        const vegetarianData = await vegetarianResponse.json();

        setChickenRecipes(chickenData.meals || []);
        setDessertRecipes(dessertData.meals || []);
        setSeafoodRecipes(seafoodData.meals || []);
        setVegetarianRecipes(vegetarianData.meals || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  console.log(chickenRecipes);
  console.log(dessertRecipes);
  console.log(seafoodRecipes);
  console.log(vegetarianRecipes);

  const handleSearch = async (value) => {
    if (!value.trim()) {
      alert("Please enter ingredients");
      return;
    }
    setLoading(true);

    try {
      const ingredients = value
        .toLowerCase()
        .split(/[,\s]+/)
        .filter((item) => item.trim() !== "");

      const ingredientResults = await Promise.all(
        ingredients.map(async (ingredient) => {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
          );

          const data = await response.json();

          return {
            ingredient,
            meals: data.meals || [],
            count: data.meals?.length || 0,
          };
        }),
      );

      ingredientResults.sort((a, b) => a.count - b.count);

      const bestMatch = ingredientResults[0];

      const meals = bestMatch.meals;

      console.log("Best Ingredient:", bestMatch.ingredient);
      console.log("Recipe Count:", bestMatch.count);

      if (ingredients.length === 1) {
        setRecipes(meals);
        setSearchTerm(value);
        navigate("/search-results");
        return;
      }
      const limitedMeals = meals.slice(0, 20);
      const detailedRecipes = await Promise.all(
        limitedMeals.map(async (meal) => {
          const detailResponse = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`,
          );

          const detailData = await detailResponse.json();

          return detailData.meals[0];
        }),
      );

      const matchedRecipes = [];

      for (const recipe of detailedRecipes) {
        const recipeIngredients = [];

        for (let i = 1; i <= 20; i++) {
          const ingredient = recipe[`strIngredient${i}`];

          if (ingredient && ingredient.trim() !== "") {
            recipeIngredients.push(ingredient.toLowerCase());
          }
        }

        const matchesAllIngredients = ingredients.every((ingredient) =>
          recipeIngredients.includes(ingredient),
        );

        if (matchesAllIngredients) {
          matchedRecipes.push({
            idMeal: recipe.idMeal,
            strMeal: recipe.strMeal,
            strMealThumb: recipe.strMealThumb,
          });
        }
      }

      setRecipes(matchedRecipes);
      setSearchTerm(value);
      // setHasSearched(true);
      // setLoading(false);

      navigate("/search-results");
    } catch (error) {
      console.log(error);

      alert(`Failed to fetch recipes...`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {loading && <h2>Loading...</h2>}

      {/* {hasSearched && recipes.length === 0 && <h2>No recipes found</h2>} */}

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            id={recipe.idMeal}
            name={recipe.strMeal}
            // category={recipe.strCategory}
            image={recipe.strMealThumb}
          />
        ))}
      </div> */}

      <CategorySection
        title="🍗 Chicken"
        category="Chicken"
        recipes={chickenRecipes}
        handleViewAll={handleViewAll}
      />
      <CategorySection
        title="🍰 Dessert"
        category="Dessert"
        recipes={dessertRecipes}
        handleViewAll={handleViewAll}
      />

      <CategorySection
        title="🐟 Seafood"
        category="Seafood"
        recipes={seafoodRecipes}
        handleViewAll={handleViewAll}
      />

      <CategorySection
        title="🥗 Vegetarian"
        category="Vegetarian"
        recipes={vegetarianRecipes}
        handleViewAll={handleViewAll}
      />
    </div>
  );
};

export default Home;
