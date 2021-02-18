import React, {useEffect, useState} from 'react';
import Recipe from './recipe';
import './App.css';

const App = () => {
  const APP_ID = '5fcb809c' ;
  const APP_KEY = 'fe11c02dc3d8dd9f4daf74d0903df910';


  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

useEffect(() => {
    getRecipes();
}, [query]);

const getRecipes = async () => {
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
  const data = await response.json();
  setRecipes(data.hits);
  console.log(data.hits);
};
const updateSearch = e => {
  setSearch(e.target.value);
}

const getSearch = e => {
  e.preventDefault();
  setQuery(search);
  setSearch('');
}
  
  return(
    <div className='App'>
     <form className='search-form' onSubmit={getSearch} >
       <input className='search-bar'
       value={search}
       onChange={updateSearch}
        type='text' />
       <button className='search-button'
        type='submit'
         >Search</button>
     </form>
     <div className='recipes'>
     {recipes.map(recipe => (
       <Recipe
       key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}  
        image={recipe.recipe.image} 
        ingredients={recipe.recipe.ingredients}
          />
     ))}
     </div>
    </div>
  );
}

export default App;
