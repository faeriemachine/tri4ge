      document.addEventListener("DOMContentLoaded", () => {
  const log = console.log,
  array = ["/img/home/banner1.png", "/img/home/banner2.png", "/img/home/banner3.png", "/img/home/banner4.png", "/img/home/banner5.png", "/img/home/banner6.png", "/img/home/banner7.png", "/img/home/banner8.png"],
    random = Math.floor(Math.random() * array.length),
    target = document.getElementById("target");
  target.src = `${array[random]}`;
  log(target);
});