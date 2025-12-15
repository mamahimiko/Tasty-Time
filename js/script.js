$(() => {
  const menuButton = document.querySelector(".fa-solid");
  const menu = document.querySelector(".nav");

  menuButton.addEventListener("click", () => {
    menu.classList.toggle("on");
  });

/*scroll*/
const navClick = document.querySelectorAll(".nav p");

  navClick.forEach(navP => {
    navP.addEventListener("click",() => {

    const targetId = navP.getAttribute(`data-target`);
    const targetSection = document.getElementById(targetId);

    if(targetSection) {
      targetSection.scrollIntoView({
        behavior :`smooth`,
        block: `start`
      });
    }
    
  });
});


  const callApi = async (param, type) => {
    try {
      const url = `https://www.themealdb.com/api/json/v1/1/${param}`;
      console.log(url);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Fail to fetch data");
      }
      const json = await response.json();
      displayResults(json, type);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchDataInParallel = async () => {
    const parameters = [
      {
        url: "random.php",
        type: "today",
      },
      { url: "search.php?s=christmas", type: "Christmas" },
      { url: "search.php?s=noodles", type: "Asian style Noodle" },
      { url: "search.php?s=salad", type: "Global Greens" },
      { url: "search.php?s=sea", type: "Mediterranean style Seafood" },
    ];
    try {
      const promises = parameters.map((param) =>
        callApi(param.url, param.type)
      );
      await Promise.all(promises);
    } catch (error) {
      console.error("Error during fetching:", error);
    }
  };

  const createCard = (meals) => {
    const link = document.createElement("a");
    link.href = meals.strSource || meals.strYoutube;
    link.classList.add("recipe-card-link");

    const card = document.createElement("div");
    card.classList.add("recipe-card");

    card.innerHTML = `
      <img class="recipe-card__image" src="${meals.strMealThumb}">
      <div class="recipe-card__content">
        <h3 class="recipe-card__title">${meals.strMeal}</h3>
        <p class="recipe-card__text">${meals.strInstructions.substring(
          0,
          150
        )}...</p>
      </div>
    `;
    link.appendChild(card);
    return link;
  };

  const displayResults = (results, type) => {
    const recipiContainer = document.querySelector(".main");
    const meals = results.meals[0];
    if (!meals) return;

    const titleName = (recipetype) => {
      if (recipetype === "today") {
        return "Today's Recipes";
      } else {
        return `${
          recipetype.charAt(0).toUpperCase() + recipetype.slice(1)
        } Recipes`;
      }
    };

    let section = document.querySelector(`section[data-type="${type}"]`);

    if (!section) {
      section = document.createElement("section");
      section.dataset.type = type;

    /*scroll*/
      const scrollId = `section-${type.toLowerCase().replace(/\s/g, `-`)}`;
      section.id = scrollId;

      section.innerHTML = `<h2 class="section__title">${titleName(type)}</h2>`;
      cardSection = document.createElement("div");
      cardSection.classList.add("card-section");
      section.appendChild(cardSection);
    } else {
      cardSection = section.querySelector(".card-section");
    }

    if (type === "today") {
      const meal = results.meals[0];
      const cardEl = createCard(meal);
      cardSection.appendChild(cardEl);
      recipiContainer.prepend(section);
      return;
    }

    results.meals.slice(0, 4).forEach((meal) => {
      const cardEl = createCard(meal);
      cardSection.appendChild(cardEl);
    });

    recipiContainer.appendChild(section);

    const cardEl = createCard(meals);
  };

  fetchDataInParallel();
});


/*sub-main*/
const container = document.getElementById("chat-box")

const user_input =document.getElementById("user-input")

const searchBtn = document.getElementById("searchBtn")

const BASE_URL = `https://www.themealdb.com/api/json/v1/1/search.php`


const fetchData = async() => {

  const userQuery = user_input.value;

  if(!userQuery) {
    container.innerHTML = `<p>Search for something.</p>`
    return
  }

  const encodedQuery = encodeURIComponent(userQuery);
  const API_URL = `${BASE_URL}?s=${encodedQuery}`

  try {
    const responseFetch = await fetch(API_URL)

    if (!responseFetch.ok) {
      throw new Error("Network response was not ok")
    }

    const data = await responseFetch.json()

    if (data.meals && data.meals.length > 0) {
      const firstMeal = data.meals[0];
      const YoutubeLink = firstMeal.strYoutube;

      const YoutubeHtml = YoutubeLink
      ? `<p>
          <a href ="${YoutubeLink}" target ="_blank" style= "color:#e7a800; text-decoration: underline;">
            YouTube
          </a>
        </p>`
      : `<p>Youtube:(No link found)</p>`;


      container.innerHTML = `
      <h2>Menu: ${firstMeal.strMeal}</h2>
      <p>Category: ${firstMeal.strCategory}</p>
      <p>Area: ${firstMeal.strArea}</p>
      <p>Instructions: ${firstMeal.strInstructions.substring(0, 250)}...</p>

      ${YoutubeHtml}
      `;
    } else {
      container.innerHTML = `<p>No results found.</p>`
    }

  } catch(error) {
    console.error("error.message")
    container.innerHTML = `<p>Failed to load data.${error.message}</p>`
  }
}
searchBtn.addEventListener('click', fetchData);
