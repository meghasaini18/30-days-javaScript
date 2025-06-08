document.addEventListener("DOMContentLoaded", () => {
    const searchBox = document.querySelector(".searchBox input")
    // const input = document.querySelector("input");
    const searchBtn = document.querySelector("#searchBtn");
    const recipeImg = document.querySelector(".recipeImg");
    const recipeNameH2 = document.querySelector(".recipeName h2");
    const recipeNameP = document.querySelector(".recipeName p");
    // const ingredientList = document.querySelector(".ingredient ul");
    const leftList = document.querySelector(".leftList");
    const rightList = document.querySelector(".rightList");
    const instructionText = document.querySelector("#instructionText");
    const instructionsDiv = document.querySelector("#instructions");
    const viewBtn = document.querySelector(".viewBtn");


    // if (!searchBox || !searchBtn) {
    //     console.error("Error: Search elements not found!");
    //     return;
    // }

    searchBtn.addEventListener("click", () => {
        const query = searchBox.value.trim();
        if (!query) {
            alert("Please enter a recipe name");
            return;
        }
        findRecipe(query);
    });

    searchBox.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            const query = searchBox.value.trim();
            if (!query) {
                alert("Please enter a recipe name");
                return;
            }
            findRecipe(query);
        }
    });

    async function findRecipe(query) {
        const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            const meal = data.meals ? data.meals[0] : null;
            if (!meal) {
                alert("No recipe found!");
                return;
            }

            recipeImg.querySelector("img").src = meal.strMealThumb;
            recipeNameH2.textContent = meal.strMeal;
            recipeNameP.textContent = meal.strArea;
            
            const ingredients = [];
            for(let i = 1; i <= 20; i++){ 
                const ingredient = meal[`strIngredient${i}`];
                const measure = meal[`strMeasure${i}`];
                if(ingredient && ingredient.trim()){
                    ingredients.push(`${measure}${ingredient}`);
                }
            }

            const midpoint = Math.ceil(ingredients.length / 2);
            const leftItems = ingredients.slice(0, midpoint);
            const rightItems = ingredients.slice(midpoint);

            leftList.innerHTML = leftItems.map(item => `<li>• ${item}</li>`).join("");
            rightList.innerHTML = rightItems.map(item => `<li>• ${item}</li>`).join("");;

            viewBtn.onclick = ()=> {
                instructionText.textContent = meal.strInstructions || "No instructions available.";
                instructionsDiv.style.display = "block";
                // window.open(meal.strSource || meal.strYoutube || meal.strInstructions, "_blank");
                 if(meal.strSource){
                    window.open(meal.strSource, "_blank");
                 } 
                 else if(meal.strYoutube){
                    window.open(meal.strYoutube, "_blank");
                 }
                 else if(meal.strInstructions){
                    alert("Instructions:\n\n" + meal.strInstructions);
                 }
            }
        } catch (err) {
            alert("Error fetching recipe!");
            console.error(err);
        }
    }
});

// findRecipe(query);

