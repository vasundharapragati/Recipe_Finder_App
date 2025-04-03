const API_ID = "YOUR_EDAMAM_APP_ID"; // Get from Edamam
const API_KEY = "YOUR_EDAMAM_API_KEY"; 

document.getElementById("search-btn").addEventListener("click", fetchRecipes);

async function fetchRecipes() {
  const ingredient = document.getElementById("search-input").value;
  const dietFilters = Array.from(document.querySelectorAll(".diet-filter:checked")).map(f => f.value);
  
  try {
    const response = await fetch(
      `https://api.edamam.com/search?q=${ingredient}&app_id=${API_ID}&app_key=${API_KEY}${
        dietFilters.length ? `&health=${dietFilters.join("&health=")}` : ""
      }`
    );
    const data = await response.json();
    displayRecipes(data.hits);
  } catch (error) {
    alert("Failed to fetch recipes!");
  }
}

function displayRecipes(recipes) {
  const container = document.getElementById("recipes-container");
  container.innerHTML = "";

  recipes.forEach(recipe => {
    const { label, image, calories, healthLabels, url } = recipe.recipe;
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <img src="${image}" alt="${label}" class="recipe-img">
      <div class="recipe-info">
        <h3>${label}</h3>
        <p>${Math.round(calories)} calories</p>
        <p>${healthLabels.slice(0, 3).join(", ")}</p>
        <button class="save-btn" onclick="saveRecipe('${label}')">Save</button>
        <a href="${url}" target="_blank">View Recipe</a>
      </div>
    `;
    container.appendChild(card);
  });
}

function saveRecipe(recipeName) {
  let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
  savedRecipes.push(recipeName);
  localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
  alert(`${recipeName} saved!`);
}
