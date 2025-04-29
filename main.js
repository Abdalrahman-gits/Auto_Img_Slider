let sliderIndicators = Array.from(document.querySelectorAll(".image-slider .inner-indicators .indicator-item"));
let sliderImages = Array.from(document.querySelectorAll(".image-slider .inner-images .image-item"));
let prevBtn = document.querySelector(".image-slider .prev");
let nextBtn = document.querySelector(".image-slider .next");
let imgIndex = 0;
let autoSlideId;

function ifActiveFound(sliderImages) {
  return sliderImages.some(img => img.classList.contains("active"));
}

function removeActive(items) {
  items.forEach((item) => {
    item.classList.remove("active");
  })
}

function setImage(index) {
  removeActive(sliderImages);
  removeActive(sliderIndicators);

  sliderImages[index].classList.add("active");
  sliderIndicators[index].classList.add("active");
}

function nextPage() {
  if(+imgIndex === sliderImages.length-1){
    imgIndex = 0;
  }
  else {
    imgIndex++;
  }

  setImage(imgIndex);
}

function prevPage() {
  if(!(+imgIndex)){
    imgIndex = sliderImages.length-1;
  }
  else {
    imgIndex--;
  }

  setImage(imgIndex);
}

function autosliding() {
  stopsliding();
  autoSlideId = setInterval(() => {
    imgIndex = (+imgIndex + 1) % sliderImages.length;
    setImage(imgIndex);
  }, 3000);
}

function stopsliding() {
  clearInterval(autoSlideId);
}

function resumeAfterDelay() {
  setTimeout(() => {
    autosliding();
  }, 3000);
}


if(!ifActiveFound(sliderImages)){
  sliderImages[0].classList.add("active");
  sliderIndicators[0].classList.add("active");
}
else {
  sliderIndicators.forEach((indicator) => {
    if(indicator.classList.contains("active")){
      imgIndex = +indicator.getAttribute("data-index");
    }
  })
}

sliderIndicators.forEach((indicator) => {
  indicator.addEventListener("click",() => {
    imgIndex = indicator.getAttribute("data-index");
    setImage(imgIndex);
  })
});

prevBtn.addEventListener("click", prevPage);
nextBtn.addEventListener("click", nextPage);

document.addEventListener("keydown",(event) => {
  if(event.key === "ArrowLeft" || event.key === "ArrowDown"){
    prevPage();
    stopsliding();
    resumeAfterDelay();
  }
  else if(event.key === "ArrowRight" || event.key === "ArrowUp"){
    nextPage();
    stopsliding();
    resumeAfterDelay();
  }

})

document.querySelector(".image-slider").addEventListener("mouseenter", stopsliding);
document.querySelector(".image-slider").addEventListener("mouseleave", autosliding);

autosliding();