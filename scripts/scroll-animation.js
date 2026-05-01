// Scroll animation for About section
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll(
    '.about-section, .skill-tag, .soft-card, .timeline-item'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Stop observing after animation
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  animatedElements.forEach((el) => observer.observe(el));
});


document.addEventListener('DOMContentLoaded', () => {
  const skillCards = document.querySelectorAll('.skill-card');

  skillCards.forEach(card => {
    const color = card.getAttribute('data-color');
    if (color) {
      card.style.setProperty('--skill-color', color);

      card.addEventListener('mouseenter', () => {
        card.style.borderColor = color;
        card.style.boxShadow = `0 8px 20px ${color}40`; // 40 = 25% прозрачности
      });

      card.addEventListener('mouseleave', () => {
        card.style.borderColor = 'rgba(0, 0, 0, 0.1)';
        card.style.boxShadow = '';
      });
    }
  });
});