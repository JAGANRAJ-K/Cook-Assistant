import React,{useState} from 'react'

const SearchBar = ({onSearch}) => {

  const[searchTerm,setSearchTerm]=useState("");

  const handleSearch=()=>{
    onSearch(searchTerm);
  }

  return (
    <div>
      <input type="text" placeholder="Enter Ingredients..."
      value={searchTerm}
      onChange={(e)=>setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <p>{searchTerm}</p>
    </div>
  )
}

export default SearchBar