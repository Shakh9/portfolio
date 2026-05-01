// router.js - SPA роутер без перезагрузки страницы

// Получить текущую секцию из URL (без #)
function getCurrentPage() {
  const hash = window.location.hash.substring(1);
  return hash || 'home';
}

// Показать нужную секцию, скрыть остальные
function showPage(pageId, updateHistory = true) {
  // Скрываем все секции
  document.querySelectorAll('.page').forEach(section => {
    section.classList.remove('page--active');
  });

  // Показываем нужную
  const activePage = document.getElementById(pageId);
  if (activePage) {
    activePage.classList.add('page--active');
  }

  // Обновляем активный пункт меню
  updateActiveLink(pageId);

  // Обновляем URL БЕЗ скролла
  if (updateHistory) {
    history.pushState(null, '', `#${pageId}`);
  }

  // 🔥 КРИТИЧЕСКИЙ ФИКС — сброс скролла
  window.scrollTo({
    top: 0,
    behavior: 'instant' // можно 'smooth' если хочешь анимацию
  });
}

// Обновить активный пункт в сайдбаре
function updateActiveLink(pageId) {
  document.querySelectorAll('.sidebar__link').forEach(link => {
    const href = link.getAttribute('href');
    const linkPage = href ? href.replace('#', '') : '';

    if (linkPage === pageId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Обработчик клика по ссылкам
function handleLinkClick(event) {
  const link = event.target.closest('[data-link]');
  if (!link) return;

  event.preventDefault();

  const href = link.getAttribute('href');
  if (!href || !href.startsWith('#')) return;

  const pageId = href.replace('#', '');

  showPage(pageId);
}

// Инициализация роутера
function initRouter() {
  // При загрузке
  const currentPage = getCurrentPage();
  showPage(currentPage, false);

  // Клики по ссылкам
  document.body.addEventListener('click', handleLinkClick);

  // 🔥 Обработка кнопок "назад/вперед"
  window.addEventListener('popstate', () => {
    const pageId = getCurrentPage();
    showPage(pageId, false);
  });
}

// Запуск
document.addEventListener('DOMContentLoaded', initRouter);