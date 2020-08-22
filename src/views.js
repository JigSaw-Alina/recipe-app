import { getfilters } from './filters';
import { getRecipe } from  './recipe'


// Generate the DOM stucture for a recipe 
const generateRecipeDOM = (recipeData) => {
    const recipeEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl =  document.createElement('p')

    // Setup the recipe title text
    if (recipeData.description.length > 0) {
        textEl.textContent = recipeData.description
    } else {
        textEl.textContent = 'Unnamed recipe'
    }
    textEl.classList.add('list-item__title')
    recipeEl.appendChild(textEl)

    // Setup the link
    recipeEl.setAttribute(`href`,`./edit.html#${recipeData.id}`)
    recipeEl.classList.add('list-item')

    // Setup the status message
    statusEl.textContent = generateSummary(recipeData)
    statusEl.classList.add('list-item__subtitle')
    recipeEl.appendChild(statusEl)

    return recipeEl
}



// Render Application recipe
const renderRecipes = () => {
    const recipesEl = document.querySelector('#recipe')
    const filters = getfilters()
    const recipes = getRecipe()
    // Search function
    let filteredRecipes = recipes.filter((recipe) => {
        return recipe.description.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    // clear search 
    recipesEl.innerHTML = ''
    


    if (filteredRecipes.length > 0 ) {
        filteredRecipes.forEach((recipeData) => {
            const recipeEl = generateRecipeDOM(recipeData)
            recipesEl.appendChild(recipeEl)
      })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.classList.add('empty-message')
        emptyMessage.textContent = 'No recipe to show'
        recipesEl.appendChild(emptyMessage)
    }
}


// Generate edit page
const initializeEditPage = (recipesId) => {
    const recipeDescriptionEl = document.querySelector('#recipe-description')
    const recipeStepsEl = document.querySelector('#recipe-steps')
    const recipes = getRecipe()
    const recipe = recipes.find((recipe) => recipe.id === recipesId);

    if (!recipe) {
        location.assign(`./index.html`)
    }


    recipeDescriptionEl.value = recipe.description
    recipeStepsEl.value = recipe.steps
}
// Generate Summary 

const generateSummary = (recipe) => {
    let count = 0
    let numberOfIngredients =  recipe.ingredients.length
    recipe.ingredients.forEach((ingredient) => {
       if (ingredient.hasStatus === true) {
            count++
       }
    }) 

    if (count === 0) {
        return 'You have none of the ingredients'
    } else if (count === numberOfIngredients) {
        return 'You have all of the ingredients'
    } else {
        return 'You have some of the ingredients'
    }
}


export { generateRecipeDOM, renderRecipes, generateSummary, initializeEditPage }