import React, { Component } from 'react';
import './RecipeList.css';

export default class RecipeList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            isLoading: true,
        };
    }

    fetchRecipes = async () => {
        try {
            let recipesData = await fetch("https://api.npoint.io/65508205158218eced15");

            if(!recipesData.ok) throw new Error("HTTP error! Status: " +recipesData.status);

            let recipes = (await recipesData.json())["food_items"];

            this.setState({
                recipes: recipes,
                isLoading: false
            });

        } catch (error) {
            console.log(`Error fetching recipes: ${error}`);
            this.setState({ isLoading: false });
        }
    }

    componentDidMount() {
        this.fetchRecipes();
    }

    showRecipe(recipe) {
        console.log(recipe["food_item_name"]);
    }

    render() {
        const {recipes, isLoading} = this.state;

        if(isLoading) {
            return <div>Loading recipes...</div>;
        }

        return (
        <>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe["food_item_name"]} onClick={() => this.showRecipe(recipe)}>
                        {recipe["food_item_name"]}
                    </li>
                ))}
            </ul>
        </>
        );
    }
}
