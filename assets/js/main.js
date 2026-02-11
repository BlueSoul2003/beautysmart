// Main Application Logic

// Mobile Navigation Toggle
function setupMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

// Step Details Toggle
function toggleStepDetails(button) {
    const stepContent = button.closest('.step-content');
    const details = stepContent.querySelector('.step-details');

    button.classList.toggle('expanded');
    details.classList.toggle('expanded');
}

// FAQ Toggle
function toggleFAQ(button) {
    const faqItem = button.closest('.faq-item');
    const answer = faqItem.querySelector('.faq-answer');
    const isActive = button.classList.contains('active');

    // Close all other FAQs
    document.querySelectorAll('.faq-question').forEach(q => {
        if (q !== button) {
            q.classList.remove('active');
            q.closest('.faq-item').querySelector('.faq-answer').classList.remove('active');
        }
    });

    // Toggle current FAQ
    if (!isActive) {
        button.classList.add('active');
        answer.classList.add('active');
    } else {
        button.classList.remove('active');
        answer.classList.remove('active');
    }
}

// Complexity Level Toggle
function setupComplexityToggle() {
    const complexityButtons = document.querySelectorAll('.complexity-btn');
    const routineLevels = document.querySelectorAll('.routine-level');

    complexityButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const level = btn.dataset.level;

            // Update active button
            complexityButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show corresponding routine
            routineLevels.forEach(routine => {
                if (routine.dataset.level === level) {
                    routine.classList.add('active');
                } else {
                    routine.classList.remove('active');
                }
            });
        });
    });
}

// Scroll Progress Indicator
function setupScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #6366F1 0%, #EC4899 100%);
        z-index: 9999;
        transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Local Storage Management
function saveUserPreferences() {
    const preferences = {
        complexityLevel: document.querySelector('.complexity-btn.active')?.dataset.level || 'beginner',
        skinType: localStorage.getItem('skinType'),
        lastVisit: new Date().toISOString()
    };

    localStorage.setItem('userPreferences', JSON.stringify(preferences));
}

function loadUserPreferences() {
    const preferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');

    // Restore complexity level
    if (preferences.complexityLevel) {
        const btn = document.querySelector(`[data-level="${preferences.complexityLevel}"]`);
        if (btn) btn.click();
    }

    // Show welcome back message if returning user
    if (preferences.lastVisit && preferences.skinType) {
        const lastVisit = new Date(preferences.lastVisit);
        const daysSince = Math.floor((new Date() - lastVisit) / (1000 * 60 * 60 * 24));

        if (daysSince > 0 && daysSince < 30) {
            showWelcomeBackMessage(preferences.skinType, daysSince);
        }
    }
}

function showWelcomeBackMessage(skinType, daysSince) {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: white;
        padding: 1.5rem;
        border-radius: 1rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        max-width: 300px;
        z-index: 1000;
        animation: slideInRight 0.5s ease-out;
    `;

    message.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
            <strong style="color: var(--primary);">Welcome Back! 👋</strong>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--neutral-400);">&times;</button>
        </div>
        <p style="margin: 0; color: var(--neutral-700); font-size: 0.875rem;">
            We remember your skin type is <strong>${skinType}</strong>. 
            ${daysSince === 1 ? 'You were here yesterday!' : `It's been ${daysSince} days since your last visit.`}
        </p>
    `;

    document.body.appendChild(message);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        message.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => message.remove(), 500);
    }, 5000);
}

// Add slide animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @media (max-width: 768px) {
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            padding: 1rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            gap: 1rem;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupMobileNav();
    setupComplexityToggle();
    setupScrollProgress();
    loadUserPreferences();

    // Save preferences before leaving
    window.addEventListener('beforeunload', saveUserPreferences);
});

// Expose global functions
window.toggleStepDetails = toggleStepDetails;
window.toggleFAQ = toggleFAQ;
