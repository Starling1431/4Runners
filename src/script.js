// Variables globales
let loadingComplete = false;
let currentOptionIndex = 0;
let animationStarted = false;
// Opciones del menú
const gameOptions = [
    {
        title: 'Un Jugador',
        gif: 'https://i.imgur.com/7kOYBxg.gif', // Cambia por tu GIF
        action: 'singlePlayer'
    },
    {
        title: 'Dos Jugadores',
        gif: 'https://i.imgur.com/6gLH24I.gif', // Cambia por tu GIF
        action: 'twoPlayers'
    },
    {
        title: 'Tienda',
        gif: 'https://via.placeholder.com/120/ffc107/white?text=SHOP', // Cambia por tu GIF
        action: 'shop'
    },
    {
        title: 'Opciones',
        gif: 'https://img.freepik.com/premium-vector/pixel-art-illustration-gear-icon-pixelated-gear-gear-settings-icon-pixelated-game_1038602-705.jpg', // Cambia por tu GIF
        action: 'options'
    }
];

// Función para inicializar la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Inicializando 4Runners Menu...');
    
    // Configurar efectos de líneas de estrella
    setupStarLines();
    
    // Iniciar secuencia de carga
    startLoadingSequence();
    
    // Configurar event listeners
    setupEventListeners();

    // Inicializar selector de opciones
    updateOptionDisplay();
});

// Configurar las líneas de estrella con rotación individual
function setupStarLines() {
    const starLines = document.querySelectorAll('.star-line');
    
    starLines.forEach((line, index) => {
        const rotation = index * 45;
        line.style.setProperty('--rotation', `${rotation}deg`);
        line.style.animationDelay = `${index * 0.2}s`;
        line.style.animationDuration = `${3 + (index * 0.1)}s`;
    });
}

// Secuencia de carga mejorada
function startLoadingSequence() {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    
    // Simular tiempo de carga (3 segundos)
    setTimeout(() => {
        // Desvanecer pantalla de carga
        loadingScreen.classList.add('fade-out');
        
        // Después de que termine la transición de fade, mostrar contenido principal
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.classList.add('show');
            loadingComplete = true;
            
            showNotification('¡Bienvenido a 4Runners! Selecciona una opción.', 'success');
        }, 1500);
        
    }, 3000);
}

// Configurar todos los event listeners
function setupEventListeners() {
    // Botones del header
    const infoBtn = document.getElementById('infoBtn');
    const infoModal = document.getElementById('infoModal');
    const closeInfo = document.getElementById('closeInfo');
    
    if (infoBtn && infoModal && closeInfo) {
        infoBtn.addEventListener('click', () => {
            infoModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
        
        closeInfo.addEventListener('click', () => {
            infoModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Botón de controles
    const controlsBtn = document.getElementById('controlsBtn');
    const controlsModal = document.getElementById('controlsModal');
    const closeControls = document.getElementById('closeControls');
    
    if (controlsBtn && controlsModal && closeControls) {
        controlsBtn.addEventListener('click', () => {
            controlsModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
        
        closeControls.addEventListener('click', () => {
            controlsModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Navegación de opciones
    const prevBtn = document.getElementById('prevOption');
    const nextBtn = document.getElementById('nextOption');
    const currentOption = document.getElementById('currentOption');

    if (prevBtn) prevBtn.addEventListener('click', () => navigateOptions(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigateOptions(1));
    if (currentOption) currentOption.addEventListener('click', () => selectCurrentOption());

    // Indicadores
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentOptionIndex = index;
            updateOptionDisplay();
        });
    });
    
    // Cerrar modales al hacer clic fuera de ellos
    window.addEventListener('click', (event) => {
        const infoModal = document.getElementById('infoModal');
        const controlsModal = document.getElementById('controlsModal');
        
        if (event.target === infoModal) {
            infoModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (event.target === controlsModal) {
            controlsModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Atajos de teclado globales
    document.addEventListener('keydown', handleGlobalKeyPress);
}

// Navegar entre opciones
function navigateOptions(direction) {
    if (!loadingComplete) return;

    currentOptionIndex += direction;
    
    // Hacer que sea circular
    if (currentOptionIndex < 0) {
        currentOptionIndex = gameOptions.length - 1;
    } else if (currentOptionIndex >= gameOptions.length) {
        currentOptionIndex = 0;
    }
    
    updateOptionDisplay();
}

// Actualizar la visualización de la opción actual
function updateOptionDisplay() {
    const optionGif = document.getElementById('optionGif');
    const optionTitle = document.getElementById('optionTitle');
    const indicators = document.querySelectorAll('.indicator');
    const currentOption = document.getElementById('currentOption');

    if (!optionGif || !optionTitle || !currentOption) return;

    // Actualizar contenido
    const option = gameOptions[currentOptionIndex];
    optionGif.src = option.gif;
    optionTitle.textContent = option.title;

    // Actualizar indicadores
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentOptionIndex);
    });

    // Animación del círculo
    currentOption.classList.remove('active');
    setTimeout(() => {
        currentOption.classList.add('active');
    }, 100);
}

// Crear elementos para la animación de caída épica
function createEpicFallingAnimation() {
    const originalImage = document.getElementById('optionGif');
    const rect = originalImage.getBoundingClientRect();

    const overlay = document.createElement('div');
    overlay.id = 'epicOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        z-index: 9998;
        opacity: 0;
        pointer-events: none;
    `;

    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'particlesContainer';
   particlesContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    pointer-events: none;
    overflow: hidden;
    opacity: 0; /* <--- AÑADE ESTO para ocultarlas al inicio */
    transition: opacity 0.5s ease;
`;


    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'fall-particle';
        const randomX = Math.random() * 100;
        const randomDelay = Math.random() * 3;
        const randomDuration = 1 + Math.random() * 2;
        const randomSize = 1 + Math.random() * 3;

        particle.style.cssText = `
            position: absolute;
            left: ${randomX}%;
            top: -20px;
            width: ${randomSize}px;
            height: ${20 + Math.random() * 40}px;
            background: linear-gradient(to bottom, transparent, #fff, transparent);
            opacity: 0;
            animation: particleFall ${randomDuration}s linear infinite;
            animation-delay: ${randomDelay}s;
            border-radius: 50px;
        `;

        particlesContainer.appendChild(particle);
    }

    const epicCharacter = document.createElement('img');
    
    epicCharacter.id = 'epicCharacter';
    epicCharacter.src = gameOptions[currentOptionIndex].gif;

    // ✅ Posición inicial basada en el botón original
epicCharacter.style.cssText = `
    position: fixed;
    left: ${rect.left + rect.width / 2}px;
    top: ${rect.top + rect.height / 2}px;
    width: ${rect.width}px;
    height: ${rect.height}px;
    object-fit: contain;
    z-index: 10000;
    pointer-events: none;
    opacity: 1;
    transform: translate(-50%, -50%);
    transform-origin: center center;
    image-rendering: pixelated;
`;



    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes particleFall {
            0% { transform: translateY(-30px); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(120vh); opacity: 0; }
        }

        @keyframes pageSlideUp {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(-120vh); opacity: 0; }
        }
            
        @keyframes characterEscape {
            0% {
                transform: translate(-50%, -50%) scale(1) rotate(0deg);
            }
            25% {
                transform: translate(-50%, -50%) scale(1.3) rotate(90deg);
            }
            50% {
                transform: translate(-50%, -50%) scale(1.6) rotate(180deg);
            }
            75% {
                transform: translate(-50%, -50%) scale(1.8) rotate(270deg);
            }
            100% {
                transform: translate(-50%, -50%) scale(2) rotate(360deg);
            }
        }



      @keyframes characterFallSoft {
    0% {
        transform: translate(-50%, -50%) scale(2) rotate(0deg);
        opacity: 1;
    }
    25% {
        transform: translate(-50%, 10vh) scale(1.8) rotate(90deg);
        opacity: 1;
    }
    50% {
        transform: translate(-50%, 25vh) scale(1.5) rotate(180deg);
        opacity: 0.8;
    }
    75% {
        transform: translate(-50%, 50vh) scale(1.2) rotate(270deg);
        opacity: 0.5;
    }
    100% {
        transform: translate(-50%, 70vh) scale(1.0) rotate(360deg);
        opacity: 0;
    }
}


        @keyframes overlayAppear {
            0%   { opacity: 0; }
            100% { opacity: 1; }
        }

        .page-slide-up {
            animation: pageSlideUp 1.5s ease-in forwards;
        }

        .original-hidden {
            opacity: 0 !important;
            visibility: hidden !important;
        }
    `;

    document.head.appendChild(styleSheet);
    document.body.appendChild(overlay);
    document.body.appendChild(particlesContainer);
    document.body.appendChild(epicCharacter);

    return { overlay, particlesContainer, epicCharacter, styleSheet, originalImage, rect };
}


// Animación épica de caída al abismo
function playEpicFallingAnimation() {
    if (animationStarted) return; // ✅ Prevenir múltiples ejecuciones
    animationStarted = true;

    const { overlay, particlesContainer, epicCharacter, styleSheet, originalImage, rect } = createEpicFallingAnimation();

    originalImage.style.display = 'none';

    const header = document.querySelector('header');
    const mainContent = document.getElementById('mainContent');
    const modals = document.querySelectorAll('.modal');

    setTimeout(() => {
        epicCharacter.style.animation = 'characterEscape 2s ease-out forwards';

        setTimeout(() => {
            if (header) header.classList.add('page-slide-up');
            if (mainContent) mainContent.classList.add('page-slide-up');
            modals.forEach(modal => modal.classList.add('page-slide-up'));

            overlay.style.animation = 'overlayAppear 1.5s ease-in forwards';

            setTimeout(() => {
                particlesContainer.style.opacity = '1';
                epicCharacter.style.animation = 'characterFallSoft 6s ease-in-out forwards';
                particlesContainer.style.opacity = '1';

                setTimeout(() => {
                    // 🌟 Paso 1: crear el glow que sube desde abajo
                    const whiteGlow = document.createElement('div');
                    whiteGlow.id = 'whiteGlow';
                    whiteGlow.style.cssText = `
                        position: fixed;
                        bottom: 0;
                        left: 0;
                        width: 100vw;
                        height: 0vh;
                        background: linear-gradient(to top, #ffffff 0%, transparent 100%);
                        opacity: 0.8;
                        z-index: 10005;
                        animation: glowRise 3s ease-in forwards;
                        pointer-events: none;
                    `;
                    document.body.appendChild(whiteGlow);

                    // 🌟 Paso 2: definir animaciones
                    const glowAndFlashStyles = document.createElement('style');
                    glowAndFlashStyles.textContent = `
                        @keyframes glowRise {
                            0% {
                                height: 0vh;
                                opacity: 0.2;
                            }
                            50% {
                                height: 50vh;
                                opacity: 0.6;
                            }
                            100% {
                                height: 100vh;
                                opacity: 1;
                            }
                        }

                        @keyframes whiteFlashFade {
                            0% {
                                opacity: 0;
                                filter: drop-shadow(0 0 20px white);
                            }
                            50% {
                                opacity: 0.7;
                                filter: drop-shadow(0 0 50px white);
                            }
                            100% {
                                opacity: 1;
                                filter: drop-shadow(0 0 100px white);
                            }
                        }
                            
                    `;
                    document.head.appendChild(glowAndFlashStyles);

                    // 🌟 Paso 3: al terminar el glow, iniciar el flash
                    setTimeout(() => {
                        const whiteFlash = document.createElement('div');
                        whiteFlash.style.cssText = `
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100vw;
                            height: 100vh;
                            background: white;
                            opacity: 0;
                            z-index: 10010;
                            pointer-events: none;
                            animation: whiteFlashFade 1.5s forwards;
                        `;
                        document.body.appendChild(whiteFlash);

                        // 🌟 Paso 4: recargar o redirigir tras el flash
                        setTimeout(() => {
                            window.location.href = 'singleplayer.html' // O redireccionar
                            // window.location.href = 'game.html';
                        }, 1500);

                    }, 3000); // Esperar a que suba completamente el glow

                }, 4000); // Esperar que termine caída del personaje

            }, 1000); // Esperar un poco tras mover al centro

        }, 2000); // Esperar a que termine el escape

    }, 100); // Iniciar todo tras un pequeño delay
}

// Seleccionar opción actual
function selectCurrentOption() {
    if (!loadingComplete) return;

    const option = gameOptions[currentOptionIndex];
    
    switch(option.action) {
        case 'singlePlayer':
            // Reproducir animación épica de caída
            playEpicFallingAnimation();
            break;
        case 'twoPlayers':
            showNotification('Modo dos jugadores próximamente!', 'info');
            break;
        case 'shop':
            showNotification('Tienda próximamente!', 'info');
            break;
        case 'options':
            showNotification('Opciones próximamente!', 'info');
            break;
    }
}

// Manejar teclas globales
function handleGlobalKeyPress(event) {
    if (!loadingComplete) return;
    
    switch(event.code) {
        case 'Escape':
            // Cerrar modales
            const infoModal = document.getElementById('infoModal');
            const controlsModal = document.getElementById('controlsModal');
            
            if (infoModal && infoModal.style.display === 'block') {
                infoModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            } else if (controlsModal && controlsModal.style.display === 'block') {
                controlsModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
            break;
            
        case 'ArrowLeft':
            event.preventDefault();
            navigateOptions(-1);
            break;
            
        case 'ArrowRight':
            event.preventDefault();
            navigateOptions(1);
            break;
            
        case 'Enter':
        case 'Space':
            event.preventDefault();
            selectCurrentOption();
            break;
            
        case 'KeyI':
            // Abrir modal de información con Ctrl+I
            if (event.ctrlKey) {
                event.preventDefault();
                const infoModal = document.getElementById('infoModal');
                if (infoModal) {
                    infoModal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            }
            break;
            
        case 'KeyC':
            // Abrir modal de controles con Ctrl+C
            if (event.ctrlKey) {
                event.preventDefault();
                const controlsModal = document.getElementById('controlsModal');
                if (controlsModal) {
                    controlsModal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            }
            break;
    }
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    // Remover notificación anterior si existe
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    const colors = {
        info: '#3498db',
        success: '#27ae60',
        warning: '#f39c12',
        error: '#e74c3c'
    };
    
    const icons = {
        info: 'ℹ️',
        success: '✅',
        warning: '⚠️',
        error: '❌'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-family: 'Press Start 2P', monospace;
        font-size: 8px;
        z-index: 10001;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        max-width: 300px;
        backdrop-filter: blur(10px);
    `;
    
    // Añadir icono
    notification.innerHTML = `${icons[type]} ${message}`;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Log para debugging
console.log('✅ Menu UI inicializada correctamente');