const navClick = document.querySelectorAll(".nav p");

navClick.forEach((navP) => {
  navP.addEventListener("click", () => {
    const targetId = navP.getAttribute(`data-target`);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: `smooth`,
        block: `start`,
      });
    }
  });
});

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

        <div class="recipe-card__content">
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
