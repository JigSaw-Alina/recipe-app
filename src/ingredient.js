import uuidv4 from 'uuid/v4';
import { getRecipe, saveRecipes } from './recipe';

// Create ingredient 
const createIngredient = (recipesId, text) => {
    const recipes = getRecipe()
    const recipe = recipes.find((recipe) => recipe.id === recipesId)
    
    const id = uuidv4() 
    recipe.ingredients.push({
        id: id,
        text: text,
        hasStatus: false
    })
    saveRecipes()
    
}

// remove Ingredient
const removeIngredient = (id, recipesId) => {
    const recipes = getRecipe()
    const recipe =  recipes.find((recipe) => recipe.id === recipesId)
    const ingredients = recipe.ingredients
    
    const ingredientsIndex = ingredients.findIndex((data) => data.id === id)
    
    if (ingredientsIndex > -1) {
        ingredients.splice(ingredientsIndex, 1)
    }
    saveRecipes()
}

// check Ingredient
const checkIngredient = (id, recipesId) => {
     const recipes = getRecipe()
    const recipe =  recipes.find((recipe) => recipe.id === recipesId)
    const ingredients = recipe.ingredients
    const checkedIngredient = ingredients.find((ingredient) => ingredient.id === id)
    
    if (checkedIngredient) {
        checkedIngredient.hasStatus = !checkedIngredient.hasStatus
    }
    saveRecipes()
}


const renderIngredient = (recipesId) => {
    const ingredientEl = document.querySelector('#ingredients')
    const recipes = getRecipe()
    const recipe =  recipes.find((recipe) => recipe.id === recipesId)
    const ingredients = recipe.ingredients

    ingredientEl.innerHTML = ''
    if (ingredients.length > 0) {
        ingredients.forEach((ingredient) => {
            ingredientEl.appendChild(generateIngredientDOM(ingredient))
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.classList.add('empty-message')
        emptyMessage.textContent = 'No recipe to show'
        ingredientEl.appendChild(emptyMessage)
    }
    saveRecipes()
}

// generate DOM Ingredeint 
const generateIngredientDOM = (ingredient) => {
    const ingredientEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkBox = document.createElement('input')
    const ingredientText = document.createElement('span')
    const removeButton = document.createElement('button')
    const recipes = getRecipe()
    const recipe = recipes.find((recipe) => recipe.id)

    // Setup ingredient checkbox
    checkBox.setAttribute('type', 'checkbox')
    checkBox.checked = ingredient.hasStatus
    containerEl.appendChild(checkBox)
    checkBox.addEventListener('change', (() => {
        checkIngredient(ingredient.id, recipe.id)
        renderIngredient(recipe.id)
    }))

    // Setup ingredient text
    ingredientText.textContent = ingredient.text
    containerEl.appendChild(ingredientText)

    // Setup container
    ingredientEl.classList.add('list-item-ing')
    containerEl.classList.add('list-item__container-ing')
    ingredientEl.appendChild(containerEl)

    // Setup ingredient remove
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    ingredientEl.appendChild(removeButton)
    removeButton.addEventListener('click', (() => {
        removeIngredient(ingredient.id, recipe.id)
        renderIngredient(recipe.id)
    }))

    return ingredientEl
}

export { createIngredient, renderIngredient }