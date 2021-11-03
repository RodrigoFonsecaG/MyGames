const cards = document.querySelectorAll('.card');
const modalOverlay = document.querySelector('.modal-overlay');
const closeButton = document.querySelector('.close-modal');



for (let card of cards) {
  card.addEventListener('click', () => {
    const id = card.id;
    window.location.href = `/video?id=${id}`
  });
}
