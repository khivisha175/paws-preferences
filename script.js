const cards = document.querySelectorAll('.card');
let current = 0;
let likedCats = [];

// Initialize first card
function showNextCard() {
  if (current >= cards.length) {
    document.querySelector('.swipe-container').style.display = 'none';
    document.getElementById('summary').style.display = 'block';
    document.getElementById('like-count').textContent = likedCats.length;

    likedCats.forEach(url => {
      const img = document.createElement('img');
      img.src = url;
      document.getElementById('liked-cats').appendChild(img);
    });

    return;
  }

  cards.forEach((card, index) => {
    card.style.zIndex = cards.length - index;
    if (index === current) card.style.transform = 'translateX(0px)';
  });
}

// Handle swipe action
function handleSwipe(direction) {
  const card = cards[current];
  if (!card) return;

  if (direction === 'right') likedCats.push(card.querySelector('img').src);

  card.style.transform = `translateX(${direction === 'right' ? 500 : -500}px) rotate(${direction === 'right' ? 20 : -20}deg)`;
  card.style.opacity = 0;

  current++;
  setTimeout(showNextCard, 300);
}

// -------- Mobile Touch Events --------
let startX;
const container = document.querySelector('.swipe-container');

container.addEventListener('touchstart', e => startX = e.touches[0].clientX);

container.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  if (endX - startX > 50) handleSwipe('right');
  else if (endX - startX < -50) handleSwipe('left');
});

// -------- Desktop Mouse Drag Events --------
let mouseDownX;
container.addEventListener('mousedown', e => mouseDownX = e.clientX);

container.addEventListener('mouseup', e => {
  const mouseUpX = e.clientX;
  if (mouseUpX - mouseDownX > 50) handleSwipe('right');
  else if (mouseUpX - mouseDownX < -50) handleSwipe('left');
});

// -------- Buttons for Desktop --------
document.getElementById('like-btn').addEventListener('click', () => handleSwipe('right'));
document.getElementById('dislike-btn').addEventListener('click', () => handleSwipe('left'));

// -------- Keyboard Arrows --------
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') handleSwipe('right');
  else if (e.key === 'ArrowLeft') handleSwipe('left');
});

// Initialize first card
showNextCard();
