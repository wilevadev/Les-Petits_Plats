console.log(recipes);

class Recipe {
    constructor(recipe) { 
        this._id = recipe.id; 
        console.log(this._id); 

        this._image = `assets/LesPetitsPlats/${recipe.image}`;
        console.log(this._image);

        this._name = recipe.name; 
        console.log(this._name);

        this._appliance = recipe.appliance;
        console.log(this._appliance);

        this._description = recipe.description;
        console.log(this._description);

        this._ingredients = recipe.ingredients;
        console.log(this._ingredients);

        this._servings = recipe.servings;
        console.log(this._servings);

        this._time = recipe.time;
        console.log(this._time);

        this._ustensils = recipe.ustensils;
        console.log(this._ustensils);
    }

    create

    displayRecipe() {
        // Cette méthode peut être vide pour l'instant
    }
}

// Fonction pour afficher toutes les recettes
function displayAllRecipes(recipes) {
    recipes.forEach(recipeData => {
        const recipe = new Recipe(recipeData);
        recipe.displayRecipe(); // Appeler la méthode vide pour éviter les erreurs
    });
}

// Utilise toutes les recettes du tableau
displayAllRecipes(recipes);