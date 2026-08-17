// Super Car Data
const cars = [
    {
        name: 'Ferrari SF90 Stradale',
        icon: '🏎️',
        specs: '986 HP | 0-60: 2.5s | V8 Hybrid',
        description: 'The pinnacle of Italian engineering'
    },
    {
        name: 'Lamborghini Revuelto',
        icon: '🚀',
        specs: '1001 HP | 0-60: 2.4s | V12 Hybrid',
        description: 'The future of super sports cars'
    },
    {
        name: 'Porsche 911 Turbo S',
        icon: '⚡',
        specs: '640 HP | 0-60: 2.6s | Flat-6',
        description: 'Everyday supercar perfection'
    },
    {
        name: 'McLaren 765LT',
        icon: '🔥',
        specs: '755 HP | 0-60: 2.7s | V8',
        description: 'Pure driving exhilaration'
    },
    {
        name: 'Bugatti Chiron',
        icon: '💎',
        specs: '1479 HP | 0-60: 2.4s | W16',
        description: 'The ultimate hypercar experience'
    },
    {
        name: 'Aston Martin Valkyrie',
        icon: '🏁',
        specs: '1160 HP | 0-60: 2.5s | V12',
        description: 'F1-inspired road legal monster'
    }
];

// Load cars dynamically
document.addEventListener('DOMContentLoaded', () => {
    const carGrid = document.getElementById('carGrid');
    
    cars.forEach((car, index) => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        carCard.style.animationDelay = `${index * 0.1}s`;
        
        carCard.innerHTML = `
            <span class="car-icon">${car.icon}</span>
            <h3>${car.name}</h3>
            <p class="specs">${car.specs}</p>
            <p style="color: #888; font-size: 0.9rem; margin-top: 0.5rem;">${car.description}</p>
        `;
        
        carGrid.appendChild(carCard);
    });

    // Add smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // CTA button animation
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            const modelsSection = document.getElementById('models');
            if (modelsSection) {
                modelsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    console.log('🏎️ Super Car Showcase loaded successfully!');
    console.log(`🚗 Displaying ${cars.length} amazing super cars`);
});