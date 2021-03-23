import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeDetails from './RecipeDetails'


export default function Recipe() {

    const [responseText, setResponse] = useState([]);

    function showList(entry, index){

        console.log(responseText);

        return (
            <RecipeDetails key={index} entry={entry}/>
        )
    }

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get('http://localhost:3001/recipes')
            .then(response => setResponse(response.data));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

	return (
        <div>
            {responseText.map(showList)}
        </div>
    );
}