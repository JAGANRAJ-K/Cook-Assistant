import React,{useState} from 'react'

const SearchBar = ({onSearch}) => {

  const[searchTerm,setSearchTerm]=useState("");

  const handleSearch=()=>{
    onSearch(searchTerm);
  }

  const handleKeyDown = (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
};

  return (
    <div className="flex flex-col md:flex-row gap-3 p-6">
      <input type="text" placeholder="Enter Ingredients..."
      value={searchTerm}
      onChange={(e)=>setSearchTerm(e.target.value)}
      onKeyDown={handleKeyDown}
      className="flex-1 border border-gray-300 rounded-lg px-6 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      <button onClick={handleSearch}
      className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition">Search</button>
      {/* <p>{searchTerm}</p> */}
    </div>
  )
}

export default SearchBar