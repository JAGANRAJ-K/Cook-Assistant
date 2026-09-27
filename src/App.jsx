import React from 'react'
import {Routes , Route, BrowserRouter} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Favorites from './pages/Favorites'
import RecipeDetails from './pages/RecipeDetails'

const App = () => {
  return (
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/favorites" element={<Favorites/>} />
      <Route path="/recipe/:id" element={<RecipeDetails/>} />
     </Routes>
  )
}

export default App