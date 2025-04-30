// get Elements 
let sliderCurrent = document.querySelector(".image-slider .current-slide");
let sliderIndicators = Array.from(document.querySelectorAll(".image-slider .inner-indicators .indicator-item"));
let sliderImages = Array.from(document.querySelectorAll(".image-slider .inner-images .image-item"));
let prevBtn = document.querySelector(".image-slider .prev");
let nextBtn = document.querySelector(".image-slider .next");

// image index
let imgIndex = 0;

// Id which Stops the Auto Sliding
let autoSlideId;


/**** Functions ****/

// Find if active class found in html elements
function ifActiveFound(sliderImages) {
  return sliderImages.some(img => img.classList.contains("active"));
}

// Removes active Class 
function removeActive(items) {
  items.forEach((item) => {
    item.classList.remove("active");
  })
}


// Set the Active Image
function setImage(index) {
  removeActive(sliderImages);
  removeActive(sliderIndicators);

  // For Comment Above the Image
  sliderCurrent.textContent = `Slide ${+index + 1} Of ${sliderImages.length}`;

  sliderImages[+index].classList.add("active");
  sliderIndicators[+index].classList.add("active");
}

// Moves Index to the Next Page
function nextPage() {
  if(+imgIndex === sliderImages.length-1){
    imgIndex = 0;
  }
  else {
    imgIndex++;
  }

  setImage(imgIndex);
}


// Moves index to the Previous Page
function prevPage() {
  if(!(+imgIndex)){
    imgIndex = sliderImages.length-1;
  }
  else {
    imgIndex--;
  }

  setImage(imgIndex);
}


// Auto Sliding Function
function autosliding() {
  stopsliding();
  autoSlideId = setInterval(() => {
    imgIndex = (+imgIndex + 1) % sliderImages.length;
    setImage(imgIndex);
  }, 3000);
}


// Stop Auto Sliding Function
function stopsliding() {
  clearInterval(autoSlideId);
}


// Procceding the Auto Sliding After delay
function resumeAfterDelay() {
  setTimeout(() => {
    autosliding();
  }, 3000);
}

// if No active class found => it Initiates.
if(!ifActiveFound(sliderImages)){
  setImage(imgIndex);
}
else {
  sliderIndicators.forEach((indicator) => {
    if(indicator.classList.contains("active")){
      imgIndex = +indicator.getAttribute("data-index");
    }
  })
}

// Handling Slides Indicators
sliderIndicators.forEach((indicator) => {
  indicator.addEventListener("click",() => {
    imgIndex = indicator.getAttribute("data-index");
    setImage(imgIndex);
  })
});


// Events For Next,Prev Buttons
prevBtn.addEventListener("click", prevPage);
nextBtn.addEventListener("click", nextPage);


// Events For Next,Prev Using Keyboard
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
});


// Events For mouse entering || leaving
document.querySelector(".image-slider").addEventListener("mouseenter", stopsliding);
document.querySelector(".image-slider").addEventListener("mouseleave", autosliding);


// Initial call for Auto Sliding Function
autosliding();