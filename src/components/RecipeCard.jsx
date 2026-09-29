import React from 'react'

const RecipeCard = ({name , image }) => {
  return (
     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer">
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