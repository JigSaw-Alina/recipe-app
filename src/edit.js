import { initializeEditPage } from './views';
import { createIngredient, renderIngredient } from './ingredient';
import { updateRecipe, removeRecipe, saveRecipes } from './recipe';


const recipeDescriptionEl = document.querySelector('#recipe-description')
const recipeStepsEl = document.querySelector('#recipe-steps')
const formIngredients = document.querySelector('#form-ingredients')
const removeElement = document.querySelector('#remove-recipe')
const recipesId = location.hash.substring(1)

initializeEditPage(recipesId)
renderIngredient(recipesId)

recipeDescriptionEl.addEventListener('input', ((e) => {
    updateRecipe(recipesId, {
        description: e.target.value
    })
}))

recipeStepsEl.addEventListener('input', ((e) => {
    updateRecipe(recipesId, {
        steps: e.target.value
    })
}))

removeElement.addEventListener('click', ((e) => {
    removeRecipe(recipesId)
    location.assign(`./index.html`)
}))

formIngredients.addEventListener('submit', ((e) => {
    const text = e.target.elements.enterIngredient.value.trim()
    e.preventDefault()
    
    if (text.length > 0) {
        createIngredient(recipesId, text)
        e.target.elements.enterIngredient.value = ''
    }
    renderIngredient(recipesId)
}))




window.addEventListener('storage', ((e) => {
    if (e.key === 'recipes') {
        initializeEditPage(recipesId)
    }
}))
