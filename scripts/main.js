document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const sidebar = document.querySelector('.sidebar');
  const links = document.querySelectorAll('.sidebar__link');

  if (!burger || !sidebar) return;

  // Открытие меню
  burger.addEventListener('click', () => {
    burger.classList.toggle('is-active');
    sidebar.classList.toggle('is-active');
  });

  // Закрытие после клика
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        burger.classList.remove('is-active');
        sidebar.classList.remove('is-active');
      }
    });
  });

  // При увеличении экрана вернуть обычный sidebar
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      burger.classList.remove('is-active');
      sidebar.classList.remove('is-active');
    }
  });
});