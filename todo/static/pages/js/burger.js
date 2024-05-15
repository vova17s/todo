const toggleBurger = () => {
  const burger = document.getElementById("burger-container");
  const navbar = document.getElementById("navbar");
  const body = document.getElementsByTagName("body")[0];

  burger.classList.toggle("open");
  navbar.classList.toggle("open");
  body.classList.toggle("open");
};
