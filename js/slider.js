/**
 * Horizontal Drag Slider & DRAG Cursor Tooltip
 * Leo Parpeix interactive project showcase feel
 */
document.addEventListener('DOMContentLoaded', () => {
  initDragSlider();
});

function initDragSlider() {
  const cards = document.querySelectorAll('.project-mockup-card');
  const dragBadge = document.getElementById('cursor-drag-badge');

  cards.forEach(card => {
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    let currentX = 0;

    card.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-drag');
    });

    card.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-drag');
      isDragging = false;
      card.style.transform = 'none';
    });

    card.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        card.style.transform = 'none';
      }
    });

    card.addEventListener('mousemove', (e) => {
      // Update badge position
      if (dragBadge) {
        dragBadge.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%) scale(1)`;
      }

      if (!isDragging) return;

      const deltaX = e.clientX - startX;
      card.style.transform = `translateX(${deltaX * 0.15}px) rotate(${deltaX * 0.01}deg)`;
    });
  });
}
