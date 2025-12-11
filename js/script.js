$(() => {});
const menuButton = document.querySelector(".fa-solid");
const menu = document.querySelector(".nav");

menuButton.addEventListener("click", () => {
    menu.classList.toggle("on")

});
