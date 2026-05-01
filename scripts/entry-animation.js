document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.entry-loader');
  const rect = document.querySelector('.entry-loader__rect');
  const firstName = document.querySelector('.entry-loader__first');
  const lastName = document.querySelector('.entry-loader__last');
  const namesContainer = document.querySelector('.entry-loader__names');

  if (!loader || !rect || !firstName || !lastName || !namesContainer) return;

  // ШАГ 1: Прямоугольник плавно появляется и увеличивается
  rect.style.opacity = '1';
  rect.style.transform = 'scale(1)';

  // ШАГ 2: Имя и фамилия выезжают слева и справа
  setTimeout(() => {
    firstName.style.opacity = '1';
    firstName.style.transform = 'translateX(0)';

    lastName.style.opacity = '1';
    lastName.style.transform = 'translateX(0)';
  }, 1000);

  // ШАГ 3: Всё исчезает (прямоугольник, текст, фон)
  setTimeout(() => {
    // Прямоугольник сжимается и исчезает
    rect.style.transition = 'all 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
    rect.style.opacity = '0';
    rect.style.transform = 'scale(0.15)';

    // Имя и фамилия сжимаются вместе с контейнером
    namesContainer.style.transition = 'all 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
    namesContainer.style.opacity = '0';
    namesContainer.style.transform = 'scale(0.15)';

    // Фон светлеет
    loader.style.transition = 'background 0.8s ease';
    loader.style.background = 'rgba(0, 0, 0, 0)';
  }, 2200);

  // Удаление прелоадера после завершения
  setTimeout(() => {
    loader.remove();
  }, 3100);
});

setTimeout(() => {
  document.body.classList.add('site-visible');
}, 2350); // маленькая задержка, чтобы успело удалиться