window.addEventListener("DOMContentLoaded", () => {
  const favContainer = document.getElementById("favorites");
  const favs = JSON.parse(localStorage.getItem("favorites") || "[]");

  if (!favContainer) return;

  favContainer.innerHTML = "";
  cardSection = document.createElement("div");
  cardSection.classList.add("card-section");
  favContainer.appendChild(cardSection);

  const createCard = (meal) => {
    const link = document.createElement("a");
    link.href = meal.link;
    link.classList.add("recipe-card-link");

    const card = document.createElement("div");
    card.classList.add("recipe-card");

    card.innerHTML = `
        <div 
        class="recipe-card__image-container" 
        style="background-image: url('${meal.image}')">
        <i class="fa-solid fa-xmark delete-toggle"></i>
        </div>

        <div class="recipe-card__content-fav">
          <h3 class="recipe-card__title">${meal.title}</h3>
        </div>
      `;

    const deleteIcon = card.querySelector(".delete-toggle");
    deleteIcon.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const updatedFavs = favs.filter((m) => m.recipeId !== meal.recipeId);
      localStorage.setItem("favorites", JSON.stringify(updatedFavs));
      card.remove();

      if (updatedFavs.length === 0) {
        favContainer.innerHTML = `<p class="empty">No favourites yet.</p>`;
      }
    });

    link.appendChild(card);
    return link;
  };

  if (favs.length === 0) {
    favContainer.innerHTML = `<p class="empty">No favorites yet.</p>`;
  } else {
    favs.forEach((meal) => {
      const cardEl = createCard(meal);
      cardSection.appendChild(cardEl);
    });

    const isFav = true;
  }
});


/*Search bar*/
window.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("chat-box-favorites");
  const favs = JSON.parse(localStorage.getItem("myRecipes") || "[]");

  if (!container) return;

  container.innerHTML = "";

  if(favs.length === 0) {
    container.innerHTML = `<p class ="empty">No favorites Youtube link yet.</p>`
  } else {
    favs.forEach(recipe => {
      const div = document.createElement("div");
      div.className = "fav";

      const youtubeLink = recipe.strYoutube
      ? `<p><a href ="${recipe.strYoutube}"target_blank" style = "color : #e7a800"> YouTube</a></p>`
      :`<p>No video Link</p>`

      div.innerHTML = `
      <h2>Menu: ${recipe.strMeal}</h2>
      <p>Category: ${recipe.strCategory}</p>
      <p>Area: ${recipe.strArea}</p>
      <p>Instructions: ${recipe.strInstructions.substring(0, 250)}...</p>
      ${youtubeLink}
      <i class="fa-solid fa-xmark deleteToggle"></i>
      `;

      const deleteToggle =  div.querySelector(".fa-solid");

      deleteToggle.addEventListener("click",() => {
        const favList =  JSON.parse(localStorage.getItem("myRecipes") || "[]");

        const updatedFavs = favList.filter(m => m.idMeal !== recipe.idMeal)

        localStorage.setItem("myRecipes", JSON.stringify(updatedFavs));
        div.remove()

        if (container.querySelectorAll(".fav").length === 0) {
          container.innerHTML = `<p class = "empty">No Youtube link yet.</p>
          `
        }
      })
      
    container.appendChild(div)
    });
  }
});

/*DOBIN*/