import { portfolioData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initApp();
});

function initApp() {
    populateYearsFilter();
    renderPublications();
    renderResearchHighlights();
    renderAwards();
    renderExperience();
    renderSkills();
    renderProfessionalActivities();
    setupEventListeners();
    handleScrollBasedBehavior();
}

function setupEventListeners() {
    document.getElementById('filter-keyword').addEventListener('input', () => renderPublications());
    document.getElementById('filter-year').addEventListener('change', () => renderPublications());

    const tabs = document.querySelectorAll('.tab-button');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const panelId = tab.id.replace('tab-', 'panel-');
            
            document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.add('hidden'));
            document.getElementById(panelId).classList.remove('hidden');

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
    
    document.getElementById('tab-reviewer').classList.add('active');
    document.getElementById('panel-reviewer').classList.remove('hidden');

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

function handleScrollBasedBehavior() {
    const header = document.getElementById('main-header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

function populateYearsFilter() {
    const years = [...new Set(portfolioData.publications.map(p => p.year))].sort((a, b) => b - a);
    const select = document.getElementById('filter-year');
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        select.appendChild(option);
    });
}

function renderPublications() {
    const keyword = document.getElementById('filter-keyword').value.toLowerCase();
    const year = document.getElementById('filter-year').value;
    const listContainer = document.getElementById('publications-list');
    
    const filteredPublications = portfolioData.publications.filter(p => {
        const keywordMatch = keyword === '' || p.title.toLowerCase().includes(keyword) || p.authors.join(' ').toLowerCase().includes(keyword);
        const yearMatch = year === '' || p.year.toString() === year;
        return keywordMatch && yearMatch;
    });

    if (filteredPublications.length === 0) {
        listContainer.innerHTML = `<p class="text-center text-gray-500">No publications found matching your criteria.</p>`;
        return;
    }

    listContainer.innerHTML = filteredPublications.map(p => {
        const authorsHtml = p.authors.map(author => author.toLowerCase().includes('tang') ? `<strong>${author}</strong>` : author).join(', ');

        const badges = [];
        if (p.isHighlyCited) {
            badges.push(`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><i data-lucide="award" class="mr-1 h-3 w-3"></i>Top 1% Highly Cited</span>`);
        }
        if (p.isEditorsChoice) {
            badges.push(`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><i data-lucide="star" class="mr-1 h-3 w-3"></i>Editor's Choice</span>`);
        }

        return `
            <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-transparent hover:border-academic-blue transition-all">
                <div class="flex flex-col sm:flex-row justify-between sm:items-start gap-2">
                    <p class="text-sm text-gray-500">${p.year} &bull; ${p.type}</p>
                    <div class="flex gap-2 flex-wrap">${badges.join('')}</div>
                </div>
                <h4 class="font-lora text-lg text-charcoal-blue mt-2">${p.title}</h4>
                <p class="text-sm text-wet-asphalt mt-2">${authorsHtml}</p>
                <p class="text-sm text-gray-500 italic mt-1">${p.journal}</p>
            </div>
        `;
    }).join('');

    lucide.createIcons();
}

function renderResearchHighlights() {
    const highlightsContainer = document.getElementById('research-highlights');
    const highlightedPapers = portfolioData.publications.filter(p => p.isHighlyCited || p.isEditorsChoice).slice(0, 2);

    highlightsContainer.innerHTML = highlightedPapers.map(p => `
        <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div class="flex gap-2 mb-2">
                ${p.isHighlyCited ? `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><i data-lucide="award" class="mr-1 h-3 w-3"></i>Top 1% Cited</span>` : ''}
                ${p.isEditorsChoice ? `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><i data-lucide="star" class="mr-1 h-3 w-3"></i>Editor's Choice</span>` : ''}
            </div>
            <h4 class="font-semibold text-charcoal-blue">${p.title}</h4>
            <p class="text-sm text-wet-asphalt mt-1">This paper provides a key reference in its field, contributing significantly to the understanding of ${p.title.toLowerCase().includes('detection') ? 'geospatial object detection' : 'low-light spectral analysis'}.</p>
        </div>
    `).join('');
    lucide.createIcons();
}

function renderAwards() {
    const container = document.querySelector('#honors-awards ul');
    container.innerHTML = portfolioData.awards.map((award, index) => `
        <li>
            <div class="relative pb-8">
                ${index !== portfolioData.awards.length - 1 ? '<span class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>' : ''}
                <div class="relative flex items-start space-x-3">
                    <div>
                        <div class="relative px-1">
                            <div class="h-8 w-8 bg-academic-blue rounded-full ring-8 ring-white flex items-center justify-center">
                                <i data-lucide="award" class="h-5 w-5 text-white"></i>
                            </div>
                        </div>
                    </div>
                    <div class="min-w-0 flex-1 py-1.5">
                        <div class="text-sm text-gray-500">
                            <span class="font-medium text-charcoal-blue">${award.award}</span>
                            <span class="ml-2 whitespace-nowrap font-semibold">${award.year}</span>
                        </div>
                        <div class="mt-1 text-sm text-wet-asphalt">
                            <p>${award.institution}</p>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    `).join('');
    lucide.createIcons();
}

function renderExperience() {
    const container = document.getElementById('experience-timeline');
    container.innerHTML = portfolioData.experience.map(exp => `
        <div class="relative">
            <div class="absolute -left-[34px] top-1.5 h-4 w-4 rounded-full bg-white border-2 border-academic-blue"></div>
            <p class="font-semibold text-charcoal-blue">${exp.role}</p>
            <p class="text-sm text-academic-blue">${exp.company}</p>
            <p class="text-xs text-gray-500 mt-1">${exp.duration}</p>
        </div>
    `).join('');
}

function renderSkills() {
    const container = document.getElementById('technical-skills');
    container.innerHTML = Object.entries(portfolioData.skills).map(([category, skills]) => `
        <div>
            <h4 class="font-semibold text-charcoal-blue">${category}</h4>
            <div class="flex flex-wrap gap-2 mt-2">
                ${skills.map(skill => `<span class="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm">${skill}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function renderProfessionalActivities() {
    const reviewerPanel = document.getElementById('panel-reviewer');
    const membershipPanel = document.getElementById('panel-memberships');

    reviewerPanel.innerHTML = `
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 list-disc list-inside text-wet-asphalt">
            ${portfolioData.professionalActivities.reviewing.map(item => `<li>${item}</li>`).join('')}
        </ul>`;
    
    membershipPanel.innerHTML = `
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 list-disc list-inside text-wet-asphalt">
            ${portfolioData.professionalActivities.memberships.map(item => `<li>${item}</li>`).join('')}
        </ul>`;
}
