import React from 'react'

const RecipeCard = ({name , image,category}) => {
  return (
    <div>
      <img src={image} alt={name} width={200}/>
      <h2>{name}</h2>
      <p>{category}</p>
    </div>
  )
}

export default RecipeCard