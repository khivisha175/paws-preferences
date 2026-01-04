const TOTAL_CATS = 12;
const container = document.getElementById("card-container");
const result = document.getElementById("result");
const likeCount = document.getElementById("likeCount");
const likedCatsDiv = document.getElementById("likedCats");

let images = [];
let likedCats = [];
let currentIndex = 0;

// Generate cat images
for (let i = 0; i < TOTAL_CATS; i++) {
  images.push(`https://cataas.com/cat?random=${i}`);
}

// Create card
function createCard(image) {
  const card = document.createElement("div");
  card.className = "card";
  card.style.backgroundImage = `url(${image})`;
  container.appendChild(card);

  let startX = 0;
  let currentX = 0;

  card.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  card.addEventListener("touchmove", e => {
    currentX = e.touches[0].clientX - startX;
    card.style.transform = `translateX(${currentX}px) rotate(${currentX / 10}deg)`;
  });

  card.addEventListener("touchend", () => {
    if (currentX > 80) {
      likedCats.push(image);
      swipeOut(card, 1);
    } else if (currentX < -80) {
      swipeOut(card, -1);
    } else {
      card.style.transform = "translateX(0)";
    }
  });
}

function swipeOut(card, direction) {
  card.style.transform = `translateX(${direction * 500}px)`;
  card.style.opacity = 0;
  setTimeout(() => {
    card.remove();
    nextCard();
  }, 300);
}

function nextCard() {
  currentIndex++;
  if (currentIndex === images.length) {
    showResult();
  }
}

function showResult() {
  result.classList.remove("hidden");
  likeCount.textContent = likedCats.length;
  likedCats.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    likedCatsDiv.appendChild(img);
  });
}

// Load cards
images.reverse().forEach(createCard);
