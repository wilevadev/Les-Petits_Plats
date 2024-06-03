console.log(recipes);

class Recipe {
    constructor(recipe) {
        this._id = recipe.id;
        console.log(this._id);

        this._image = `../assets/images/LesPetitsPlats/${recipe.image}`;
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

    updateRecipeCard(card) {
        card.querySelector('#recipe-image').src = this._image;
        card.querySelector('#recipe-image').alt = this._name;
        card.querySelector('#recipe-time').textContent = `${this._time}min`;
        card.querySelector('#recipe-name').textContent = this._name;
        card.querySelector('#recipe-description').textContent = this._description;

        const ingredientsList = card.querySelector('#recipe-ingredients');
        ingredientsList.innerHTML = ''; 
        this._ingredients.forEach(ingredient => {
            const listItem = document.createElement('li');
            const ingredientName = document.createElement('span');
            const quantityAndUnit = document.createElement('span');

            ingredientName.textContent = ingredient.ingredient;
            ingredientName.classList.add('ingredient-name'); // Ajout de classe pour styliser

            quantityAndUnit.textContent = `${ingredient.quantity ? ingredient.quantity : ''} ${ingredient.unit ? ingredient.unit : ''}`;
            quantityAndUnit.classList.add('quantity-unit'); // Ajout de classe pour styliser

            listItem.appendChild(ingredientName);
            listItem.appendChild(quantityAndUnit);
            
            ingredientsList.appendChild(listItem);
        });
    }
}

function displayAllRecipes(recipes) {
    const container = document.getElementById('recipes-container');
    const baseCard = document.querySelector('.card'); 

    recipes.forEach(recipeData => {
        const recipe = new Recipe(recipeData);
        const cardClone = baseCard.cloneNode(true); 
        recipe.updateRecipeCard(cardClone);
        container.appendChild(cardClone);
    });

    baseCard.remove();
}

displayAllRecipes(recipes);

