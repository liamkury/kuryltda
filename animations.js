// Animations and effects for KURY LTDA website

document.addEventListener('DOMContentLoaded', function() {
    // EVA-inspired pulse effects
    const createPulseEffect = function() {
        const pulseElements = document.querySelectorAll('.pulse-element');
        
        pulseElements.forEach(element => {
            element.style.position = 'relative';
            element.style.overflow = 'hidden';
            
            const createRipple = function(e) {
                const ripple = document.createElement('span');
                const rect = element.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(44, 140, 31, 0.6);
                    transform: scale(0);
                    animation: ripple-animation 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    pointer-events: none;
                `;
                
                element.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            };
            
            element.addEventListener('click', createRipple);
        });
    };

    // Adiciona estilos para ripple animation
    const rippleStyles = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = rippleStyles;
    document.head.appendChild(styleSheet);

    createPulseEffect();

    // EVA circuit board effect
    const initCircuitEffect = function() {
        const circuitElements = document.querySelectorAll('.circuit-effect');
        
        circuitElements.forEach(element => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '-1';
            canvas.style.opacity = '0.1';
            
            element.style.position = 'relative';
            element.appendChild(canvas);
            
            // Ajusta tamanho do canvas
            function resizeCanvas() {
                canvas.width = element.offsetWidth;
                canvas.height = element.offsetHeight;
            }
            
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            
            // Circuit nodes and connections
            const nodes = [];
            const connections = [];
            const nodeCount = 15;
            
            // Create nodes
            for (let i = 0; i < nodeCount; i++) {
                nodes.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5
                });
            }
            
            // Animation loop
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Update and draw nodes
                ctx.fillStyle = '#2C8C1F';
                nodes.forEach(node => {
                    node.x += node.vx;
                    node.y += node.vy;
                    
                    // Bounce off edges
                    if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                    if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
                    
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
                    ctx.fill();
                });
                
                // Draw connections
                ctx.strokeStyle = '#2C8C1F';
                ctx.lineWidth = 0.5;
                
                for (let i = 0; i < nodes.length; i++) {
                    for (let j = i + 1; j < nodes.length; j++) {
                        const dx = nodes[i].x - nodes[j].x;
                        const dy = nodes[i].y - nodes[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < 100) {
                            ctx.globalAlpha = 1 - distance / 100;
                            ctx.beginPath();
                            ctx.moveTo(nodes[i].x, nodes[i].y);
                            ctx.lineTo(nodes[j].x, nodes[j].y);
                            ctx.stroke();
                            ctx.globalAlpha = 1;
                        }
                    }
                }
                
                requestAnimationFrame(animate);
            }
            
            animate();
        });
    };

    // Inicializa efeito de circuito em elementos específicos
    const circuitContainers = document.querySelectorAll('.hero, .cta');
    circuitContainers.forEach(container => {
        container.classList.add('circuit-effect');
    });
    
    initCircuitEffect();

    // EVA energy glow effect
    const initGlowEffect = function() {
        const glowElements = document.querySelectorAll('.glow-on-hover');
        
        glowElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.boxShadow = '0 0 20px rgba(44, 140, 31, 0.7)';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.boxShadow = '';
            });
        });
    };

    initGlowEffect();

    // Parallax scrolling effect
    const initParallax = function() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-speed') || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    };

    initParallax();

    // Particle system for background
    const initParticles = function() {
        const particleContainers = document.querySelectorAll('.particle-background');
        
        particleContainers.forEach(container => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '-1';
            
            container.style.position = 'relative';
            container.appendChild(canvas);
            
            function resizeCanvas() {
                canvas.width = container.offsetWidth;
                canvas.height = container.offsetHeight;
            }
            
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            
            // Particle system
            const particles = [];
            const particleCount = 50;
            
            // Create particles
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 1,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    color: `rgba(44, 140, 31, ${Math.random() * 0.5 + 0.1})`
                });
            }
            
            function animateParticles() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                particles.forEach(particle => {
                    particle.x += particle.speedX;
                    particle.y += particle.speedY;
                    
                    // Bounce off edges
                    if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
                    if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
                    
                    ctx.fillStyle = particle.color;
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fill();
                });
                
                requestAnimationFrame(animateParticles);
            }
            
            animateParticles();
        });
    };

    // Inicializa partículas em elementos específicos
    const particleContainers = document.querySelectorAll('.hero');
    particleContainers.forEach(container => {
        container.classList.add('particle-background');
    });
    
    initParticles();

    // EVA-style loading animation
    const initLoadingAnimation = function() {
        const loadingElements = document.querySelectorAll('.eva-loading');
        
        loadingElements.forEach(element => {
            element.innerHTML = '';
            
            for (let i = 0; i < 3; i++) {
                const dot = document.createElement('span');
                dot.style.cssText = `
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: var(--primary);
                    margin: 0 5px;
                    animation: eva-pulse 1.5s infinite ${i * 0.2}s;
                `;
                element.appendChild(dot);
            }
        });
    };

    // Adiciona estilos para animação de loading
    const loadingStyles = `
        @keyframes eva-pulse {
            0%, 100% {
                transform: scale(1);
                opacity: 1;
            }
            50% {
                transform: scale(1.5);
                opacity: 0.5;
            }
        }
    `;

    const loadingStyleSheet = document.createElement('style');
    loadingStyleSheet.textContent = loadingStyles;
    document.head.appendChild(loadingStyleSheet);

    initLoadingAnimation();

    // Hover effects for EVA-inspired elements
    const initEvaHoverEffects = function() {
        const evaElements = document.querySelectorAll('.eva-hover');
        
        evaElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.filter = 'brightness(1.2)';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.filter = 'brightness(1)';
            });
        });
    };

    initEvaHoverEffects();

    // Digital rain effect (Matrix style)
    const initDigitalRain = function() {
        const rainContainers = document.querySelectorAll('.digital-rain');
        
        rainContainers.forEach(container => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '-1';
            canvas.style.opacity = '0.3';
            
            container.style.position = 'relative';
            container.appendChild(canvas);
            
            function resizeCanvas() {
                canvas.width = container.offsetWidth;
                canvas.height = container.offsetHeight;
            }
            
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            
            const chars = '01';
            const charSize = 14;
            const columns = Math.floor(canvas.width / charSize);
            const drops = [];
            
            // Initialize drops
            for (let i = 0; i < columns; i++) {
                drops[i] = Math.floor(Math.random() * canvas.height / charSize);
            }
            
            function draw() {
                // Semi-transparent black background for trail effect
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                ctx.fillStyle = '#2C8C1F';
                ctx.font = `${charSize}px monospace`;
                
                for (let i = 0; i < drops.length; i++) {
                    const text = chars.charAt(Math.floor(Math.random() * chars.length));
                    const x = i * charSize;
                    const y = drops[i] * charSize;
                    
                    ctx.fillText(text, x, y);
                    
                    // Reset drop when it reaches bottom
                    if (y > canvas.height && Math.random() > 0.975) {
                        drops[i] = 0;
                    }
                    
                    drops[i]++;
                }
            }
            
            setInterval(draw, 33);
        });
    };

    // Inicializa digital rain em elementos específicos
    const rainContainers = document.querySelectorAll('.hero');
    rainContainers.forEach(container => {
        container.classList.add('digital-rain');
    });
    
    initDigitalRain();

    console.log('KURY LTDA - Animações carregadas com sucesso!');
});

// Exporta funções de animação para uso global
window.KURYAnimations = {
    createPulseEffect: function() {
        const pulseElements = document.querySelectorAll('.pulse-element');
        pulseElements.forEach(element => {
            element.click();
        });
    },
    
    triggerGlow: function(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.classList.add('glow-on-hover');
            setTimeout(() => {
                element.classList.remove('glow-on-hover');
            }, 2000);
        });
    }
};