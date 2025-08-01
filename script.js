// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// CTA Button functionality
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        const newsSection = document.querySelector('#news');
        newsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// News card click functionality
document.querySelectorAll('.news-card').forEach(card => {
    card.addEventListener('click', () => {
        // Add a subtle animation when clicked
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    });
});

// Player card hover effects
document.querySelectorAll('.player-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const playerImage = card.querySelector('.player-image img');
        if (playerImage) {
            playerImage.style.transform = 'scale(1.1)';
        }
    });

    card.addEventListener('mouseleave', () => {
        const playerImage = card.querySelector('.player-image img');
        if (playerImage) {
            playerImage.style.transform = 'scale(1)';
        }
    });
});

// Team card click functionality
document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('click', () => {
        const teamName = card.querySelector('h3').textContent;
        alert(`You clicked on ${teamName}! This could open a detailed team page.`);
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.news-card, .player-card, .team-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Dynamic news counter
function updateNewsCounter() {
    const newsCards = document.querySelectorAll('.news-card');
    const totalNews = newsCards.length;
    
    // You could display this somewhere on the page
    console.log(`Total news articles: ${totalNews}`);
}

// Update counter when page loads
updateNewsCounter();

// Search functionality (placeholder)
function searchNews(query) {
    const newsCards = document.querySelectorAll('.news-card');
    const searchTerm = query.toLowerCase();
    
    newsCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const content = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || content.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Add search functionality to a potential search input
// This could be expanded with an actual search input field
function addSearchFunctionality() {
    // Example: Add a search input to the navigation
    const navContainer = document.querySelector('.nav-container');
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search news...';
    searchInput.className = 'search-input';
    searchInput.style.cssText = `
        padding: 8px 15px;
        border: none;
        border-radius: 20px;
        margin-left: 20px;
        font-size: 14px;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        outline: none;
    `;
    
    searchInput.addEventListener('input', (e) => {
        searchNews(e.target.value);
    });
    
    // Uncomment the line below to add search functionality
    // navContainer.appendChild(searchInput);
}

// Initialize search functionality
addSearchFunctionality();

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
    });
    
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
});

// Add a "Back to Top" button
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(backToTop);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
createBackToTopButton();

// Add a simple news ticker effect
function createNewsTicker() {
    const tickerContainer = document.createElement('div');
    tickerContainer.className = 'news-ticker';
    tickerContainer.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        background: linear-gradient(45deg, #ffd700, #ffed4e);
        color: #333;
        padding: 10px 0;
        font-weight: 600;
        z-index: 999;
        transform: translateY(-100%);
        transition: transform 0.3s ease;
    `;
    
    const tickerContent = document.createElement('div');
    tickerContent.style.cssText = `
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
        white-space: nowrap;
        overflow: hidden;
    `;
    
    const newsItems = [
        "⚽ Messi scores hat-trick in Inter Miami victory",
        "🏀 LeBron James reaches 40,000 career points",
        "⚽ Ronaldo breaks Saudi League scoring record",
        "🏈 NFL Draft: Top prospects revealed"
    ];
    
    let currentIndex = 0;
    
    function updateTicker() {
        tickerContent.textContent = newsItems[currentIndex];
        currentIndex = (currentIndex + 1) % newsItems.length;
    }
    
    updateTicker();
    setInterval(updateTicker, 5000);
    
    tickerContainer.appendChild(tickerContent);
    document.body.appendChild(tickerContainer);
    
    // Show ticker after a delay
    setTimeout(() => {
        tickerContainer.style.transform = 'translateY(0)';
    }, 2000);
}

// Initialize news ticker
createNewsTicker();

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add a simple theme toggle (could be expanded)
function addThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: none;
        cursor: pointer;
        z-index: 1000;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-theme')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    });
}

// Initialize theme toggle
addThemeToggle();

// Add a simple notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Example usage of notification system
// showNotification('Welcome to SportsNews!', 'success');

// Add a simple analytics tracker
function trackEvent(eventName, data = {}) {
    console.log(`Event: ${eventName}`, data);
    // In a real application, this would send data to an analytics service
}

// Track page views and interactions
document.addEventListener('DOMContentLoaded', () => {
    trackEvent('page_view', {
        page: 'home',
        timestamp: new Date().toISOString()
    });
});

// Track card clicks
document.querySelectorAll('.news-card, .player-card, .team-card').forEach(card => {
    card.addEventListener('click', () => {
        const cardType = card.className.includes('news') ? 'news' : 
                        card.className.includes('player') ? 'player' : 'team';
        trackEvent('card_click', {
            type: cardType,
            title: card.querySelector('h3')?.textContent || 'Unknown'
        });
    });
});

console.log('SportsNews website loaded successfully! 🏆');