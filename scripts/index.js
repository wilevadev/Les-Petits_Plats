document.addEventListener('DOMContentLoaded', () => {
    const mainSearchInput = document.getElementById("main-search");
    const startBtn = document.getElementById("main-btn");

    if (mainSearchInput && startBtn) {
        startBtn.addEventListener("click", (event) => {
            event.preventDefault();
            if (mainSearch()) {
                mainSearchInput.value = ''; // Effacer le champ de saisie après la recherche
                displayAllRecipes(recipes); // Réinitialiser les recettes après la recherche
            }
        });

        mainSearchInput.addEventListener('input', () => {
            mainSearch();
        });
    } else {
        console.error("Element not found: main-search or main-btn");
    }

    displayAllRecipes(recipes);
});

class Recipe {
    constructor(recipe) {
     
        this._id = recipe.id;
        this._image = `../assets/images/LesPetitsPlats/${recipe.image}`;
        this._name = recipe.name;
        this._appliance = recipe.appliance || 'N/A';
        this._description = recipe.description;
        this._ingredients = recipe.ingredients;
        this._servings = recipe.servings || 'N/A';
        this._time = recipe.time || 'N/A';
        this._ustensils = recipe.ustensils || [];
    }

    createRecipeCard() {
        const card = document.createElement('div');
        card.classList.add('card', 'bg-white', 'shadow-md', 'overflow-hidden');

        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header', 'relative');

        const recipeImage = document.createElement('img');
        recipeImage.id = 'recipe-image';
        recipeImage.src = this._image;
        recipeImage.alt = this._name;
        recipeImage.classList.add('w-full', 'h-64', 'object-cover', 'recipe-image');

        const recipeTime = document.createElement('span');
        recipeTime.id = 'recipe-time';
        recipeTime.textContent = `${this._time}min`;
        recipeTime.classList.add('time-badge', 'absolute', 'top-2', 'right-2', 'bg-customYellow', 'text-black', 'text-xs', 'font-bold', 'py-1', 'px-2', 'recipe-time');

        cardHeader.appendChild(recipeImage);
        cardHeader.appendChild(recipeTime);

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'p-4');

        const recipeName = document.createElement('h2');
        recipeName.id = 'recipe-name';
        recipeName.textContent = this._name;
        recipeName.classList.add('font-anton', 'text-base', 'font-normal', 'leading-6', 'text-left', 'pt-4', 'recipe-name');

        const recipeDescription = document.createElement('p');
        recipeDescription.id = 'recipe-description';
        recipeDescription.textContent = this._description;
        recipeDescription.classList.add('font-manrope', 'text-sm', 'font-normal', 'leading-5', 'text-left', 'recipe-description');

        const ingredientsTitle = document.createElement('h3');
        ingredientsTitle.textContent = 'INGRÉDIENTS';
        ingredientsTitle.classList.add('font-manrope', 'text-12', 'font-bold', 'leading-16.39', 'tracking-0.09', 'text-left', 'pt-10');

        const ingredientsList = document.createElement('ul');
        ingredientsList.id = 'recipe-ingredients';
        ingredientsList.classList.add('recipe-ingredients');

        this._ingredients.forEach(ingredient => {
            const listItem = document.createElement('li');
            const ingredientName = document.createElement('span');
            const quantityAndUnit = document.createElement('span');

            ingredientName.textContent = ingredient.ingredient || 'Ingrédient';
            ingredientName.classList.add('ingredient-name');

            quantityAndUnit.textContent = `${ingredient.quantity ? ingredient.quantity : ''} ${ingredient.unit ? ingredient.unit : ''}`;
            quantityAndUnit.classList.add('quantity-unit');

            listItem.appendChild(ingredientName);
            listItem.appendChild(quantityAndUnit);
            ingredientsList.appendChild(listItem);
        });

        cardBody.appendChild(recipeName);
        cardBody.appendChild(recipeDescription);
        cardBody.appendChild(ingredientsTitle);
        cardBody.appendChild(ingredientsList);

        card.appendChild(cardHeader);
        card.appendChild(cardBody);

        return card;
    }
}

function displayAllRecipes(recipes) {
    const container = document.getElementById('recipes-container');
    const baseCard = document.getElementById('base-card');

    if (container && baseCard) {
        recipes.forEach(recipeData => {
            try {
                const recipe = new Recipe(recipeData);
                const recipeCard = recipe.createRecipeCard();
                container.appendChild(recipeCard);
            } catch (error) {
                console.warn(`Skipping invalid recipe: ${error.message}`);
            }
        });
        // Remove the base card from the DOM after cloning
        baseCard.remove();
    } else {
        console.error("Element not found: recipes-container or base-card");
    }
}

function mainSearch() {
    const mainSearchInput = document.getElementById("main-search");
    const errorMessage = document.getElementById("error-message");
    const regexMainSearch = /^(?!\s*$).{3,}/;
    const message = "Veuillez inscrire au moins 3 caractères";

    let validateMainSearch = mainSearchInput.value.trim().toLowerCase();
    if (!regexMainSearch.test(validateMainSearch)) {
        setError(errorMessage, message);
        return false;
    } else {
        clearError(errorMessage);
        performSearch(validateMainSearch);
        return true;
    }
}

function performSearch(query) {
    let filteredRecipes = [];
    query = query.trim().toLowerCase();

    recipes.forEach(recipe => {
        if (recipe.name.toLowerCase().includes(query) || recipe.description.toLowerCase().includes(query)) {
            filteredRecipes.push(recipe);
        } else {
            recipe.ingredients.forEach(ingredient => {
                if (ingredient.ingredient.toLowerCase().includes(query)) {
                    filteredRecipes.push(recipe);
                }
            });
        }
    });

    updateSearchResults(filteredRecipes);
}

function updateSearchResults(filteredRecipes) {
    const container = document.getElementById('recipes-container');
    const baseCard = document.getElementById('base-card');

    if (container) {
        container.innerHTML = '';

        if (filteredRecipes.length === 0) {
            let noResultsMessage = document.createElement('p');
            noResultsMessage.textContent = `Aucune recette ne contient "${document.getElementById('main-search').value}". Essayez des termes comme "tarte aux pommes", "poisson", etc.`;
            container.appendChild(noResultsMessage);

            // Réinitialiser les recettes après avoir affiché le message d'erreur
            displayAllRecipes(recipes);
        } else {
            filteredRecipes.forEach(recipeData => {
                try {
                    const recipe = new Recipe(recipeData);
                    const recipeCard = recipe.createRecipeCard();
                    container.appendChild(recipeCard);
                } catch (error) {
                    console.warn(`Skipping invalid recipe: ${error.message}`);
                }
            });
        }
        // Ensure base card is removed after search
        if (baseCard) {
            baseCard.remove();
        }
    } else {
        console.error("Element not found: recipes-container");
    }
}

function setError(element, errorMessage) {
    element.textContent = errorMessage;
}

function clearError(element) {
    element.textContent = '';
}


















