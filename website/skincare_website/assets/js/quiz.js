// Skin Type Quiz Logic

const quizData = {
    questions: [
        {
            id: 1,
            question: "How does your skin feel 2-3 hours after cleansing (without applying any products)?",
            options: [
                { text: "Tight and uncomfortable", value: "dry", weight: 2 },
                { text: "Comfortable and balanced", value: "normal", weight: 2 },
                { text: "Shiny in the T-zone (forehead, nose, chin)", value: "combination", weight: 2 },
                { text: "Shiny all over", value: "oily", weight: 2 },
                { text: "Tight with some oily areas", value: "combination", weight: 1 }
            ]
        },
        {
            id: 2,
            question: "How does your skin typically react to sun exposure?",
            options: [
                { text: "Burns easily, rarely tans", value: "sensitive", weight: 2 },
                { text: "Burns sometimes, tans gradually", value: "normal", weight: 1 },
                { text: "Rarely burns, tans easily", value: "normal", weight: 1 },
                { text: "Gets red and irritated quickly", value: "sensitive", weight: 2 }
            ]
        },
        {
            id: 3,
            question: "How visible are your pores?",
            options: [
                { text: "Barely visible or invisible", value: "dry", weight: 2 },
                { text: "Visible only in T-zone", value: "combination", weight: 2 },
                { text: "Large and visible all over", value: "oily", weight: 2 },
                { text: "Small and barely noticeable", value: "normal", weight: 1 }
            ]
        },
        {
            id: 4,
            question: "Does your skin get shiny during the day?",
            options: [
                { text: "Never or rarely", value: "dry", weight: 2 },
                { text: "Only in T-zone (forehead, nose, chin)", value: "combination", weight: 2 },
                { text: "All over my face", value: "oily", weight: 2 },
                { text: "Slightly, but not bothersome", value: "normal", weight: 1 }
            ]
        },
        {
            id: 5,
            question: "Do you experience redness, itching, or irritation?",
            options: [
                { text: "Frequently, especially with new products", value: "sensitive", weight: 2 },
                { text: "Occasionally, with certain ingredients", value: "sensitive", weight: 1 },
                { text: "Rarely or never", value: "normal", weight: 1 },
                { text: "Only when I over-exfoliate", value: "normal", weight: 0 }
            ]
        },
        {
            id: 6,
            question: "Do you have dark spots, uneven skin tone, or hyperpigmentation?",
            options: [
                { text: "Yes, significant uneven tone", value: "combination", weight: 1 },
                { text: "Some minor dark spots", value: "normal", weight: 0 },
                { text: "No, my skin tone is even", value: "normal", weight: 0 },
                { text: "Yes, and it gets worse with sun exposure", value: "sensitive", weight: 1 }
            ]
        },
        {
            id: 7,
            question: "Do you have fine lines, wrinkles, or notice signs of aging?",
            options: [
                { text: "Yes, noticeable lines and wrinkles", value: "dry", weight: 1 },
                { text: "Some fine lines starting to appear", value: "normal", weight: 0 },
                { text: "No visible signs yet", value: "oily", weight: 0 },
                { text: "Yes, especially around dry areas", value: "combination", weight: 1 }
            ]
        }
    ],

    skinTypes: {
        oily: {
            icon: "💧",
            title: "Oily Skin",
            description: "Your skin produces excess sebum, leading to a shiny appearance and enlarged pores. You may be prone to acne and blackheads, but the good news is that oily skin tends to age more slowly!",
            characteristics: [
                "Shiny T-zone and face",
                "Large, visible pores",
                "Prone to acne and blackheads",
                "Makeup tends to slide off"
            ],
            careFocus: "Focus on oil control with lightweight, non-comedogenic products. Don't skip moisturizer—dehydrated skin can produce more oil!"
        },
        dry: {
            icon: "🌵",
            title: "Dry Skin",
            description: "Your skin lacks moisture and natural oils, feeling tight and sometimes flaky. You may notice fine lines more easily, but with proper hydration, your skin can look radiant and healthy.",
            characteristics: [
                "Tight, uncomfortable feeling",
                "Flaking or rough texture",
                "Small, barely visible pores",
                "Fine lines more noticeable"
            ],
            careFocus: "Prioritize hydration with rich moisturizers containing ceramides, hyaluronic acid, and gentle, non-foaming cleansers."
        },
        combination: {
            icon: "🎭",
            title: "Combination Skin",
            description: "You have the best (and sometimes the worst) of both worlds! Your T-zone is oily while your cheeks are normal to dry. This is actually the most common skin type.",
            characteristics: [
                "Oily T-zone (forehead, nose, chin)",
                "Normal to dry cheeks",
                "Pores visible in T-zone",
                "Different areas need different care"
            ],
            careFocus: "Balance is key! Use lightweight products and consider multi-masking (different masks for different zones)."
        },
        sensitive: {
            icon: "🌸",
            title: "Sensitive Skin",
            description: "Your skin reacts easily to products, weather, or stress, showing redness, itching, or irritation. With gentle care and the right products, you can minimize reactions and maintain healthy skin.",
            characteristics: [
                "Frequent redness or flushing",
                "Reactions to new products",
                "Itching or burning sensations",
                "Visible blood vessels"
            ],
            careFocus: "Choose fragrance-free, hypoallergenic products. Patch test everything and introduce new products slowly."
        },
        normal: {
            icon: "✨",
            title: "Normal Skin",
            description: "Lucky you! Your skin is well-balanced—not too oily, not too dry. You rarely experience breakouts or sensitivity. Maintain this balance with a consistent, simple routine.",
            characteristics: [
                "Balanced moisture levels",
                "Few imperfections",
                "Small pores",
                "Radiant complexion"
            ],
            careFocus: "Maintain your skin's balance with a simple routine. Focus on prevention with sunscreen and antioxidants."
        }
    }
};

class SkinQuiz {
    constructor() {
        this.currentQuestion = 0;
        this.answers = {};
        this.scores = {
            oily: 0,
            dry: 0,
            combination: 0,
            sensitive: 0,
            normal: 0
        };

        this.init();
    }

    init() {
        this.renderQuestion();
        this.updateProgress();
    }

    renderQuestion() {
        const container = document.getElementById('quizQuestions');
        const question = quizData.questions[this.currentQuestion];

        container.innerHTML = `
            <div class="quiz-question">
                <h3 class="question-title">${question.question}</h3>
                <div class="question-options">
                    ${question.options.map((option, index) => `
                        <button class="option-btn" data-value="${option.value}" data-weight="${option.weight}" onclick="quiz.selectOption(this, ${index})">
                            ${option.text}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    selectOption(button, optionIndex) {
        const question = quizData.questions[this.currentQuestion];
        const option = question.options[optionIndex];

        // Store answer
        this.answers[question.id] = {
            value: option.value,
            weight: option.weight
        };

        // Update scores
        this.scores[option.value] += option.weight;

        // Visual feedback
        const allButtons = button.parentElement.querySelectorAll('.option-btn');
        allButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');

        // Move to next question after a short delay
        setTimeout(() => {
            this.nextQuestion();
        }, 300);
    }

    nextQuestion() {
        this.currentQuestion++;

        if (this.currentQuestion < quizData.questions.length) {
            this.renderQuestion();
            this.updateProgress();
        } else {
            this.showResult();
        }
    }

    updateProgress() {
        const progress = ((this.currentQuestion + 1) / quizData.questions.length) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
        document.getElementById('currentQuestion').textContent = this.currentQuestion + 1;
    }

    calculateSkinType() {
        // Find the skin type with the highest score
        let maxScore = 0;
        let skinType = 'normal';

        for (const [type, score] of Object.entries(this.scores)) {
            if (score > maxScore) {
                maxScore = score;
                skinType = type;
            }
        }

        // If normal has low score and combination has some score, it's likely combination
        if (skinType === 'normal' && this.scores.combination > 2) {
            skinType = 'combination';
        }

        return skinType;
    }

    showResult() {
        const skinType = this.calculateSkinType();
        const result = quizData.skinTypes[skinType];

        // Hide questions
        document.getElementById('quizQuestions').style.display = 'none';

        // Show result
        const resultContainer = document.getElementById('quizResult');
        resultContainer.classList.remove('hidden');

        document.getElementById('resultIcon').textContent = result.icon;
        document.getElementById('resultTitle').textContent = 'Your Skin Type';
        document.getElementById('resultType').textContent = result.title;
        document.getElementById('resultDescription').textContent = result.description;

        // Render characteristics
        const characteristicsHTML = result.characteristics.map(char =>
            `<span class="tag tag-primary">${char}</span>`
        ).join('');
        document.getElementById('resultCharacteristics').innerHTML = characteristicsHTML;

        // Add care focus as additional info
        const careInfo = document.createElement('div');
        careInfo.style.cssText = 'margin-top: 1.5rem; padding: 1rem; background: rgba(99, 102, 241, 0.05); border-radius: 0.75rem; border-left: 3px solid var(--primary);';
        careInfo.innerHTML = `<strong style="color: var(--primary); display: block; margin-bottom: 0.5rem;">💡 Care Focus:</strong><p style="color: var(--neutral-700); margin: 0;">${result.careFocus}</p>`;
        document.getElementById('resultCharacteristics').after(careInfo);

        // Store result in localStorage
        localStorage.setItem('skinType', skinType);

        // Trigger custom event for other components
        window.dispatchEvent(new CustomEvent('skinTypeDetected', { detail: { skinType } }));
    }
}

// Global functions
function scrollToRoutine() {
    document.getElementById('routine').scrollIntoView({ behavior: 'smooth' });
}

function restartQuiz() {
    location.reload();
}

// Initialize quiz when DOM is loaded
let quiz;
document.addEventListener('DOMContentLoaded', () => {
    quiz = new SkinQuiz();
});
