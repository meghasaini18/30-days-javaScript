let scrollContainer = document.querySelector(".gallery");
let backbtn = document.getElementById("backbtn");
let nextBtn = document.getElementById("nextbtn");

scrollContainer.addEventListener("wheel", (evt)=> {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY;
      scrollContainer.style.scrollBehavior = "auto";
});
nextBtn.addEventListener("click", ()=> {
      scrollContainer.style.scrollBehavior = "smooth";
      scrollContainer.scrollLeft += 900;
});
backbtn.addEventListener("click", ()=> {
    scrollContainer.style.scrollBehavior = "smooth";
    scrollContainer.scrollLeft -= 900;
});