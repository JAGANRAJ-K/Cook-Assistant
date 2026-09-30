import React from 'react'
import { useNavigate } from 'react-router-dom'

const RecipeCard = ({id,name , image }) => {

  const navigate =useNavigate();
  const handleClick=()=>{
    navigate(`/recipe/${id}`);
  };
  return (
     <div 
     onClick={handleClick}
     className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer">
    <img
      src={image}
      alt={name}
      className="w-full h-52 object-cover"
    />

    <div className="p-4">
      <h3 className="font-semibold text-lg">
        {name}
      </h3>
    </div>
    
  </div>
  )
}

export default RecipeCard