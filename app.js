/**
 * Game Voult - Main Application JavaScript
 * Handles dynamic content loading, navigation, and interactions
 */

// ============================================
// Configuration
// ============================================

const CONFIG = {
    gamesJsonPath: 'games.json',
    defaultImagePath: 'assets/images/',
    defaultIconPath: 'assets/icons/'
};

// ============================================
// Game Data & Loading
// ============================================

// Default games data (used as fallback if games.json fails to load)
const defaultGames = [
    {
        id: "tic-tac-toe",
        title: "Tic Tac Toe",
        description: "Classic two-player game of X and O. Get three in a row to win!",
        category: "two-player",
        players: 2,
        status: "coming-soon",
        path: "games/tic-tac-toe/index.html"
    },
    {
        id: "snake",
        title: "Snake",
        description: "Guide your snake to eat food and grow longer. Don't hit the walls or yourself!",
        category: "single-player",
        players: 1,
        status: "coming-soon",
        path: "games/snake/index.html"
    },
    {
        id: "connect-four",
        title: "Connect Four",
        description: "Drop colored discs and connect four in a row to win!",
        category: "two-player",
        players: 2,
        status: "coming-soon",
        path: "games/connect-four/index.html"
    },
    {
        id: "chess-bot",
        title: "Chess vs Bot",
        description: "Challenge our AI bot in a classic game of chess",
        category: "bot-opponent",
        players: 1,
        status: "coming-soon",
        path: "games/chess-bot/index.html"
    },
    {
        id: "pong",
        title: "Pong",
        description: "The classic arcade game. Play against a friend or the computer!",
        category: "two-player",
        players: 2,
        status: "coming-soon",
        path: "games/pong/index.html"
    },
    {
        id: "memory-game",
        title: "Memory Match",
        description: "Find all matching pairs of cards in this memory game",
        category: "single-player",
        players: 1,
        status: "coming-soon",
        path: "games/memory-game/index.html"
    }
];

// Store loaded games
let gamesData = [...defaultGames];

// ============================================
// DOM Elements
// ============================================

const gamesContainer = document.getElementById('games-container');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

// ============================================
// Utility Functions
// ============================================

/**
 * Get category badge class based on category name
 */
function getCategoryBadgeClass(category) {
    switch (category.toLowerCase()) {
        case 'single-player':
            return 'badge-single';
        case 'two-player':
            return 'badge-two';
        case 'bot-opponent':
            return 'badge-bot';
        default:
            return 'badge-single';
    }
}

/**
 * Get category display name
 */
function getCategoryDisplayName(category) {
    switch (category.toLowerCase()) {
        case 'single-player':
            return 'Single Player';
        case 'two-player':
            return 'Two Player';
        case 'bot-opponent':
            return 'Bot Opponent';
        default:
            return category;
    }
}

/**
 * Get player count text
 */
function getPlayerText(players, category) {
    if (category.toLowerCase() === 'bot-opponent') {
        return 'vs Bot';
    }
    return players > 1 ? `${players} Players` : '1 Player';
}

/**
 * Get game icon SVG based on category
 */
function getGameIconSVG(category) {
    return `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
            <polyline points="17,2 12,7 7,2"></polyline>
        </svg>
    `;
}

// ============================================
// Game Card Rendering
// ============================================

/**
 * Create a game card HTML element
 */
function createGameCard(game) {
    const card = document.createElement('div');
    const isComingSoon = game.status === 'coming-soon';
    
    card.className = `game-card ${isComingSoon ? 'coming-soon-card' : ''}`;
    card.onclick = () => {
        if (isComingSoon) {
            showComingSoonAlert(game.title);
        } else if (game.path) {
            window.location.href = game.path;
        }
    };

    const badgeClass = getCategoryBadgeClass(game.category);
    const playerText = getPlayerText(game.players, game.category);

    card.innerHTML = `
        <div class="game-card-image">
            ${getGameIconSVG(game.category)}
            <span class="game-card-badge ${badgeClass}">${getCategoryDisplayName(game.category)}</span>
        </div>
        <div class="game-card-content">
            <h3>${game.title}</h3>
            <p>${game.description}</p>
            <div class="game-card-meta">
                <span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    ${playerText}
                </span>
                <span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12,6 12,12 16,14"></polyline>
                    </svg>
                    ${isComingSoon ? 'Coming Soon' : 'Play Now'}
                </span>
            </div>
        </div>
    `;

    return card;
}

/**
 * Show coming soon alert
 */
function showComingSoonAlert(gameTitle) {
    // Create a simple modal or alert
    const alertDiv = document.createElement('div');
    alertDiv.className = 'coming-soon-modal';
    alertDiv.innerHTML = `
        <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
        <div class="modal-content">
            <h3>🎮 ${gameTitle}</h3>
            <p>Coming Soon!</p>
            <p class="modal-subtitle">This game is currently under development. Check back soon!</p>
            <button onclick="this.closest('.coming-soon-modal').remove()" class="btn btn-primary">Got it!</button>
        </div>
    `;
    
    // Add modal styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .coming-soon-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
        }
        .modal-content {
            position: relative;
            background: var(--bg-card, #1a1a24);
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            max-width: 400px;
            margin: 20px;
            border: 1px solid var(--border-color, #2a2a3a);
            animation: fadeIn 0.3s ease;
        }
        .modal-content h3 {
            font-size: 1.5rem;
            margin-bottom: 10px;
        }
        .modal-content p {
            color: var(--accent-primary, #00d4ff);
            font-size: 1.2rem;
            margin-bottom: 10px;
        }
        .modal-subtitle {
            color: var(--text-secondary, #a0a0b0) !important;
            font-size: 0.9rem !important;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(alertDiv);
}

/**
 * Render all game cards
 */
function renderGames(games) {
    if (!gamesContainer) return;
    
    gamesContainer.innerHTML = '';
    
    if (games.length === 0) {
        gamesContainer.innerHTML = '<p class="no-games">No games found in this category.</p>';
        return;
    }

    games.forEach(game => {
        const card = createGameCard(game);
        gamesContainer.appendChild(card);
    });
}

// ============================================
// Data Loading
// ============================================

/**
 * Load games from JSON file
 */
async function loadGamesFromJSON() {
    try {
        const response = await fetch(CONFIG.gamesJsonPath);
        if (!response.ok) {
            throw new Error('Failed to fetch games.json');
        }
        const data = await response.json();
        
        if (data.games && Array.isArray(data.games)) {
            gamesData = data.games;
        }
    } catch (error) {
        console.warn('Could not load games.json, using default data:', error);
        // Use default games data
        gamesData = [...defaultGames];
    }
}

// ============================================
// Category Page Logic
// ============================================

/**
 * Get URL parameter
 */
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

/**
 * Initialize category page
 */
function initCategoryPage() {
    const category = getURLParameter('category');
    
    if (category && gamesContainer) {
        // Filter games by category
        const filteredGames = gamesData.filter(game => 
            game.category.toLowerCase() === category.toLowerCase()
        );
        renderGames(filteredGames);
        
        // Update page header
        updatePageHeader(category);
        
        // Update active tab
        updateCategoryTabs(category);
    }
}

/**
 * Update page header for category
 */
function updatePageHeader(category) {
    const header = document.querySelector('.page-header h1');
    if (header) {
        header.textContent = getCategoryDisplayName(category);
    }
}

/**
 * Update category tabs active state
 */
function updateCategoryTabs(activeCategory) {
    const tabs = document.querySelectorAll('.category-tab');
    tabs.forEach(tab => {
        const tabCategory = tab.getAttribute('data-category');
        if (tabCategory && tabCategory.toLowerCase() === activeCategory.toLowerCase()) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
}

// ============================================
// Navigation
// ============================================

/**
 * Initialize mobile menu
 */
function initMobileMenu() {
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// ============================================
// Contact Form
// ============================================

/**
 * Initialize contact form
 */
function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Show success message (since there's no backend)
            alert(`Thank you, ${name}! Your message has been received. We'll get back to you at ${email} soon.`);
            
            // Reset form
            form.reset();
        });
    }
}

// ============================================
// Page Detection & Initialization
// ============================================

/**
 * Detect current page and initialize appropriate features
 */
function initPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    
    // Initialize mobile menu on all pages
    initMobileMenu();
    
    // Initialize games on homepage and category pages
    if (page === 'index.html' || page === 'categories.html') {
        // Render all games on homepage
        if (page === 'index.html' && gamesContainer) {
            renderGames(gamesData.slice(0, 16)); // Show all 16 games
        }
        
        // Initialize category page
        if (page === 'categories.html') {
            initCategoryPage();
        }
    }
    
    // Initialize contact form
    if (page === 'contact.html') {
        initContactForm();
    }
}

// ============================================
// Main Initialization
// ============================================

/**
 * Main initialization function
 */
async function init() {
    // Load games data first
    await loadGamesFromJSON();
    
    // Then initialize page-specific features
    initPage();
    
    console.log('Game Voult initialized successfully!');
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ============================================
// Export for global use
// ============================================

window.GameVoult = {
    games: gamesData,
    renderGames,
    getCategoryBadgeClass,
    getCategoryDisplayName,
    getPlayerText
};

