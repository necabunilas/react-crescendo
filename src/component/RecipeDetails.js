import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = 'http://localhost:3001';
export default function RecipeDetails(props) {

    const [clicked, setClicked] = useState(false);
    const [specials, setSpecials] = useState([]);

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get('http://localhost:3001/specials')
            .then(response => setSpecials(response.data));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    function updateState(event){
        
      event.preventDefault();
      setClicked(true);
  
    }

    function exitPage(event){
        console.log("close");
        event.preventDefault();
		setClicked(false);
    }

    function showSpecial(item){
        return(
            <p><b>Special: {item.title}, {item.type}, {item.text}</b></p>
        )
    }

    function showIngredients(ing, index){

        const special = specials.filter(s => s.ingredientId === ing.uuid)

        return(
            <div>
                <p key={index}>{ing.amount} {ing.measurement} of {ing.name} </p>
                {special.length > 0 ? showSpecial(special[0]):null}
            </div>
        );
    }

    function showDirections(dir, index){
        return(
        <p key={index}>{dir.instructions}</p>
        )
    }

    return(
        <div>
            <div className="recipeTitle" onClick={updateState}>
                <span className="recipeTitleSpan">{props.entry.title}</span>
            </div>
            {clicked === false ? null : (
		    	<div onClick={exitPage} className="details">
		    		<h3>{props.entry.title}</h3>
                    <h4>{props.entry.description}</h4>
                    <img src={apiUrl + props.entry.images.small} alt="food"></img>
                    <p><b>Servings:</b> {props.entry.servings}</p>
                    <p><b>Prep Time:</b> {props.entry.prepTime} minutes</p>
                    <p><b>Cook Time:</b> {props.entry.cookTime} minutes</p>
                    <p><b>Ingredients:</b></p>
                    {props.entry.ingredients.map(showIngredients)}
                    <p><b>Directions:</b></p>
                    {props.entry.directions.map(showDirections)}
		    	</div>
		    )}
        </div>
    )

}