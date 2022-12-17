//Authorization
const authorizeUser = async (authorizationHeader, firebaseAuth) => {
  if (!authorizationHeader) {
    throw "No authorization provided";
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const decodedToken = await firebaseAuth.verifyIdToken(token);

    return decodedToken;
  } catch (error) {
    throw error;
  }
};

//Validation.
const validateRecipePostPut = (newRecipe) => {
  let missingFields = "";
  if (!newRecipe) {
    missingFields += "recipe"; //missing whole thing
    return missingFields;
  }

  if (!newRecipe.name) {
    missingFields += "name";
  }
  if (!newRecipe.category) {
    missingFields += "category";
  }
  if (!newRecipe.directions) {
    missingFields += "directions";
  }
  if (!newRecipe.isPublished !== true && newRecipe.isPublished !== false) {
    missingFields += "isPublished"; //value is neither true nor false
  }
  if (!newRecipe.publishDate) {
    missingFields += "publishDate";
  }
  if (!newRecipe.ingredients || newRecipe.ingredients.length === 0) {
    missingFields += "ingredients";
  }
  if (!newRecipe.imageUrl) {
    missingFields += "imageUrl";
  }

  return missingFields;
};

//Sanitization
const sanitizeRecipePostPut = (newRecipe) => {
  const recipe = {};

  recipe.name = newRecipe.name;
  recipe.category = newRecipe.category;
  recipe.directions = newRecipe.directions;
  recipe.publishDate = new Date(newRecipe.publishDate * 1000);
  recipe.isPublished = newRecipe.isPublished;
  recipe.ingredients = newRecipe.ingredients;
  recipe.imageUrl = newRecipe.imageUrl;

  return recipe;
};

module.exports = {
  authorizeUser,
  validateRecipePostPut,
  sanitizeRecipePostPut,
};
