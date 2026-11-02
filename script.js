// ================= DYNAMIC CATEGORY FILTERING =================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button state
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const selectedFilter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      if (selectedFilter === 'all' || cardCategory === selectedFilter) {
        card.classList.remove('hide');
      } else {
        card.classList.add('hide');
      }
    });
  });
});

// ================= MODAL LIGHTBOX CONTROLS =================
const modalBackdrop = document.getElementById('modal-backdrop');

function openModal(modalId) {
  closeAllModals(); // Guard against open modals
  const targetModal = document.getElementById(modalId);
  if (targetModal && modalBackdrop) {
    targetModal.classList.add('active');
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal-card').forEach(m => m.classList.remove('active'));
  if (modalBackdrop) modalBackdrop.classList.remove('active');
  document.body.style.overflow = 'auto'; // Restore scroll
}

// Close modal on Escape key press
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAllModals();
  }
});