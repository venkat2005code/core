document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const header = document.querySelector('.header');
            if (header) header.classList.toggle('menu-active');
        });
    }

    // Active Link Highlighting (Issue 18)
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const allLinks = document.querySelectorAll('.nav-links a');
    
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
            const parentItem = link.closest('.nav-item');
            if (parentItem) parentItem.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Mobile Navbar Dropdown Toggle
    const dropdownItems = document.querySelectorAll('.nav-links .nav-item');
    dropdownItems.forEach(item => {
        const dropdown = item.querySelector('.dropdown');
        const link = item.querySelector('a');
        
        if (dropdown && link) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    item.classList.toggle('dropdown-active');
                }
            });
        }
    });

    // RTL/LTR Toggle
    const dirToggle = document.getElementById('dirToggle');
    const htmlTag = document.documentElement;

    const updateDirToggle = () => {
        if (dirToggle) {
            dirToggle.textContent = htmlTag.getAttribute('dir') === 'rtl' ? 'RTL' : 'LTR';
        }
    };

    if (dirToggle) {
        updateDirToggle(); // Initialize
        dirToggle.addEventListener('click', () => {
            const currentDir = htmlTag.getAttribute('dir');
            if (currentDir === 'rtl') {
                htmlTag.setAttribute('dir', 'ltr');
            } else {
                htmlTag.setAttribute('dir', 'rtl');
            }
            updateDirToggle();
        });
    }

    // Sidebar Toggle (Dashboards)
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('active');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && sidebar.classList.contains('active') && !sidebar.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        });
    }

    // Initialize map placeholder behavior
    const mapPlaceholders = document.querySelectorAll('.map-placeholder');
    mapPlaceholders.forEach(placeholder => {
        placeholder.innerHTML = `
            <div class="flex items-center justify-center w-full" style="height: 400px; background-color: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: var(--border-radius); color: var(--clr-text-secondary); background-image: radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05), transparent); overflow: hidden; position: relative;">
                <div style="position: absolute; inset: 0; opacity: 0.1; background-image: url('https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80'); background-size: cover;"></div>
                <span class="flex items-center gap-2" style="position: relative; z-index: 1;">
                    <i class="fa-solid fa-map-location-dot"></i> Interactive Logistics Network
                </span>
            </div>
        `;
    });

    // --- Theme Management ---
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    const getTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    };

    const applyTheme = (theme) => {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (themeIcon) {
            themeIcon.className = theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }
    };

    // Initial Apply
    applyTheme(getTheme());

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            applyTheme(newTheme);
        });
    }

    // Listen for system changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
});
