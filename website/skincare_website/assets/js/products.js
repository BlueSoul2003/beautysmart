// Product Recommendations

const productsData = [
    // Cleansers
    {
        category: "cleanser",
        name: "Gentle Foaming Cleanser",
        skinTypes: ["oily", "combination"],
        why: "Removes excess oil without stripping skin. Foaming texture deep cleans pores.",
        when: "Morning & Evening",
        ingredients: ["Salicylic Acid", "Niacinamide", "Glycerin"],
        priceRange: "budget",
        examples: ["CeraVe Foaming Facial Cleanser", "La Roche-Posay Effaclar"]
    },
    {
        category: "cleanser",
        name: "Hydrating Cream Cleanser",
        skinTypes: ["dry", "sensitive"],
        why: "Cleanses gently without disrupting moisture barrier. Non-foaming formula is less irritating.",
        when: "Morning & Evening",
        ingredients: ["Ceramides", "Hyaluronic Acid", "Glycerin"],
        priceRange: "budget",
        examples: ["CeraVe Hydrating Facial Cleanser", "Cetaphil Gentle Skin Cleanser"]
    },
    {
        category: "cleanser",
        name: "Balancing Gel Cleanser",
        skinTypes: ["normal", "combination"],
        why: "Maintains skin's natural balance. Gentle enough for daily use.",
        when: "Morning & Evening",
        ingredients: ["Green Tea", "Aloe Vera", "Amino Acids"],
        priceRange: "mid",
        examples: ["Youth to the People Superfood Cleanser", "Fresh Soy Face Cleanser"]
    },

    // Moisturizers
    {
        category: "moisturizer",
        name: "Lightweight Gel Moisturizer",
        skinTypes: ["oily", "combination"],
        why: "Hydrates without adding shine. Oil-free formula won't clog pores.",
        when: "Morning & Evening",
        ingredients: ["Hyaluronic Acid", "Niacinamide", "Aloe"],
        priceRange: "budget",
        examples: ["Neutrogena Hydro Boost Water Gel", "The Ordinary Natural Moisturizing Factors"]
    },
    {
        category: "moisturizer",
        name: "Rich Cream Moisturizer",
        skinTypes: ["dry", "sensitive"],
        why: "Deeply nourishes and repairs skin barrier. Locks in moisture for hours.",
        when: "Morning & Evening",
        ingredients: ["Ceramides", "Shea Butter", "Peptides"],
        priceRange: "budget",
        examples: ["CeraVe Moisturizing Cream", "Vanicream Daily Facial Moisturizer"]
    },
    {
        category: "moisturizer",
        name: "Balancing Lotion",
        skinTypes: ["normal", "combination"],
        why: "Perfect balance of hydration without heaviness. Absorbs quickly.",
        when: "Morning & Evening",
        ingredients: ["Hyaluronic Acid", "Vitamin E", "Squalane"],
        priceRange: "mid",
        examples: ["Clinique Dramatically Different Moisturizing Lotion", "Paula's Choice Skin Balancing Moisturizer"]
    },

    // Sunscreens
    {
        category: "sunscreen",
        name: "Mineral Sunscreen SPF 50",
        skinTypes: ["sensitive", "dry", "normal"],
        why: "Physical blockers (zinc oxide) sit on skin surface. Less likely to irritate. Anti-inflammatory properties.",
        when: "Every Morning",
        ingredients: ["Zinc Oxide", "Titanium Dioxide", "Niacinamide"],
        priceRange: "mid",
        examples: ["EltaMD UV Clear", "La Roche-Posay Anthelios Mineral"]
    },
    {
        category: "sunscreen",
        name: "Lightweight Chemical Sunscreen SPF 50",
        skinTypes: ["oily", "combination"],
        why: "Absorbs quickly without white cast. Matte finish controls shine.",
        when: "Every Morning",
        ingredients: ["Avobenzone", "Octinoxate", "Niacinamide"],
        priceRange: "budget",
        examples: ["Neutrogena Ultra Sheer Dry-Touch", "Supergoop! Unseen Sunscreen"]
    },
    {
        category: "sunscreen",
        name: "Tinted Mineral Sunscreen SPF 40",
        skinTypes: ["all"],
        why: "Provides sun protection + light coverage. Evens skin tone while protecting.",
        when: "Every Morning",
        ingredients: ["Zinc Oxide", "Iron Oxides", "Vitamin E"],
        priceRange: "premium",
        examples: ["EltaMD UV Elements", "Colorescience Sunforgettable"]
    }
];

class ProductManager {
    constructor() {
        this.currentFilter = 'all';
        this.userSkinType = localStorage.getItem('skinType') || null;
        this.init();
    }

    init() {
        this.renderProducts();
        this.setupFilters();
        this.setupSkinTypeListener();
    }

    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update filter and re-render
                this.currentFilter = btn.dataset.filter;
                this.renderProducts();
            });
        });
    }

    setupSkinTypeListener() {
        window.addEventListener('skinTypeDetected', (e) => {
            this.userSkinType = e.detail.skinType;
            this.renderProducts();
        });
    }

    filterProducts() {
        let filtered = productsData;

        // Filter by category
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(p => p.category === this.currentFilter);
        }

        // Sort by skin type match if user has completed quiz
        if (this.userSkinType) {
            filtered.sort((a, b) => {
                const aMatch = a.skinTypes.includes(this.userSkinType) || a.skinTypes.includes('all');
                const bMatch = b.skinTypes.includes(this.userSkinType) || b.skinTypes.includes('all');

                if (aMatch && !bMatch) return -1;
                if (!aMatch && bMatch) return 1;
                return 0;
            });
        }

        return filtered;
    }

    renderProducts() {
        const container = document.getElementById('productGrid');
        const products = this.filterProducts();

        if (products.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--neutral-600); grid-column: 1 / -1;">No products found for this category.</p>';
            return;
        }

        container.innerHTML = products.map(product => this.createProductCard(product)).join('');

        // Add fade-in animation
        const cards = container.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }

    createProductCard(product) {
        const isRecommended = this.userSkinType &&
            (product.skinTypes.includes(this.userSkinType) || product.skinTypes.includes('all'));

        const priceIcon = {
            'budget': '💰',
            'mid': '💰💰',
            'premium': '💰💰💰'
        }[product.priceRange];

        return `
            <div class="product-card" data-category="${product.category}">
                ${isRecommended ? '<div style="position: absolute; top: 1rem; right: 1rem; background: var(--gradient-accent); color: white; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600;">✨ Recommended for You</div>' : ''}
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-why"><strong>Why it works:</strong> ${product.why}</p>
                <div class="product-when">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/>
                        <path d="M8 4V8L11 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                    <span>${product.when}</span>
                </div>
                <div class="product-ingredients">
                    ${product.ingredients.map(ing => `<span class="tag">${ing}</span>`).join('')}
                </div>
                <div class="product-price">
                    <span>${priceIcon}</span>
                    <span>${product.priceRange.charAt(0).toUpperCase() + product.priceRange.slice(1)} Range</span>
                </div>
                <details style="margin-top: 1rem;">
                    <summary style="cursor: pointer; color: var(--primary); font-weight: 600; font-size: 0.875rem;">
                        View Examples
                    </summary>
                    <ul style="margin-top: 0.5rem; padding-left: 1.25rem; color: var(--neutral-700); font-size: 0.875rem;">
                        ${product.examples.map(ex => `<li style="margin-bottom: 0.25rem;">${ex}</li>`).join('')}
                    </ul>
                </details>
            </div>
        `;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProductManager();
});
