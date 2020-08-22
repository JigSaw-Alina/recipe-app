import uuidv4 from 'uuid';

let recipes = []

// // Read existing notes from localStorage
const loadRecipe = () => {
    const recipeJSON = localStorage.getItem('recipes')
    try {
        return recipeJSON ? JSON.parse(recipeJSON) : []
    } catch (e) {
        return []
    }
}

// Save recipes data from localStorage
const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

// Expose recipe from module
const getRecipe = () => recipes

// Create recipe
const createRecipe = () => {
    const id = uuidv4() 
       recipes.push({
        id: id,
        description: '',
        steps: '',
        ingredients: []
    })
    saveRecipes()
    return id
}

// Remove recipe 
const removeRecipe = (id) => {
    const recipesIndex = recipes.findIndex((recipe) => recipe.id === id)
    if (recipesIndex > -1 ) {
       recipes.splice(recipesIndex, 1)
    }
    saveRecipes()
}

// Update recipe
const updateRecipe = (id, updates) => {
    const recipe = recipes.find((recipe) => recipe.id === id)

    if (!recipe) {
        return
    }

    if (typeof updates.description === 'string') {
        recipe.description = updates.description
    }

    if (typeof updates.steps === 'string') {
        recipe.steps = updates.steps
    }
    saveRecipes()

    return recipe
} 





recipes = loadRecipe()



export { getRecipe, createRecipe, removeRecipe, updateRecipe, saveRecipes }