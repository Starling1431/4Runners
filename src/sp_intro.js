window.character = document.querySelector('.character');
window.logo = document.querySelector('.logo');
window.startText = document.querySelector('.start-text');

window.logo.style.opacity = 0;
window.startText.style.opacity = 0;

window.character.style.top = '-150px';
window.character.style.transform = 'translateX(-50%) rotate(180deg) scale(0.5)';

setTimeout(() => {
  window.character.style.transition = 'top 2.6s ease-in';
  window.character.style.top = 'calc(100vh - 0px)';
}, 4000);

setTimeout(() => {
  window.character.style.top = 'calc(100vh - 160px)';
}, 7500);

setTimeout(() => {
  window.character.classList.add('crash');
}, 9500);

setTimeout(() => {
  window.character.classList.remove('crash');
  window.character.style.transition = 'top 1.5s ease-out, transform 1.2s ease-in-out';
  window.character.style.top = 'calc(100vh - 200px)';
  window.character.style.transform = 'translateX(-50%) rotate(0deg) scale(0.5)';
  window.logo.style.top = '30%';
  window.logo.style.opacity = 1;
  window.startText.style.opacity = 1;
  window.startText.classList.add('blink');
  window.logo.classList.add('pulse');
  window.dispatchEvent(new Event('cutsceneFinished'));
}, 10100);
