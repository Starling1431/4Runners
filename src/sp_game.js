const ground = document.querySelector('.ground');
let gameStarted = false;
let groundPosition = 0;
const groundSpeed = 5;

let logoPosition = window.innerWidth / 2;
const logoSpeed = 2;

const logo = window.logo;
const startText = window.startText;
const character = window.character;

logo.style.left = `${logoPosition}px`;
startText.style.left = `${logoPosition}px`;

character.style.top = '-150px';
character.style.transform = 'translateX(-50%) rotate(180deg) scale(0.5)';

window.addEventListener('cutsceneFinished', () => {
  setupSpacebarListener();
});

function setupSpacebarListener() {
  window.addEventListener('keydown', onSpacebarStart);
}

function onSpacebarStart(e) {
  if (e.code === 'Space' && !gameStarted) {
    e.preventDefault();
    gameStarted = true;
    window.removeEventListener('keydown', onSpacebarStart);
    // stop pulsing the logo and blinking the start text when game begins
    if (window.logo) window.logo.classList.remove('pulse');
    if (window.startText) window.startText.classList.remove('blink');
    startLogoLoop();
    startGroundLoop();
  }
}

function startGroundLoop() {
  function animateGround() {
    groundPosition -= groundSpeed;
    if (groundPosition <= -ground.offsetWidth / 2) groundPosition = 0;
    ground.style.backgroundPosition = `${groundPosition}px bottom`;
    requestAnimationFrame(animateGround);
  }
  animateGround();
}

function startLogoLoop() {
  // accelerate over time: start slow, finish fast
  const accelDuration = 1200; // ms it takes to reach max multiplier
  const maxMultiplier = 15; // final speed will be logoSpeed * maxMultiplier
  let startTs = null;

  function animateLogo(ts) {
    if (!gameStarted) return;
    if (!startTs) startTs = ts;
    const elapsed = ts - startTs;
    const t = Math.min(elapsed / accelDuration, 1);
    // ease-in quadratic for a smooth acceleration curve
    const speedMultiplier = 1 + (maxMultiplier - 1) * t * t;

    logoPosition -= logoSpeed * speedMultiplier;

    if (logoPosition <= -logo.offsetWidth) {
      gameStarted = false;
      logo.style.opacity = 0;
      startText.style.opacity = 0;
      return;
    }

    logo.style.left = `${logoPosition}px`;
    startText.style.left = `${logoPosition}px`;
    requestAnimationFrame(animateLogo);
  }

  requestAnimationFrame(animateLogo);
}
