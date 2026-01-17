const filterButtons = document.querySelectorAll('[data-filter]');
const filterCards = document.querySelectorAll('[data-category]');
const searchInput = document.querySelector('[data-search]');
let activeFilter = 'all';
let searchTerm = '';

if (filterButtons.length) {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      activeFilter = button.getAttribute('data-filter');
      applyFilters();
    });
  });
}

const applyFilters = () => {
  filterCards.forEach((card) => {
    const categories = card.getAttribute('data-category') || '';
    const text = card.textContent.toLowerCase();
    const matchesFilter = activeFilter === 'all' || categories.includes(activeFilter);
    const matchesSearch = !searchTerm || text.includes(searchTerm);
    card.style.display = matchesFilter && matchesSearch ? 'block' : 'none';
  });
};

if (searchInput) {
  searchInput.addEventListener('input', (event) => {
    searchTerm = event.target.value.trim().toLowerCase();
    applyFilters();
  });
}

const copyButtons = document.querySelectorAll('[data-copy]');

copyButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const targetId = button.getAttribute('data-copy');
    const target = document.getElementById(targetId);
    if (!target) return;
    try {
      await navigator.clipboard.writeText(target.textContent.trim());
      button.textContent = 'Copied';
      setTimeout(() => {
        button.textContent = 'Copy';
      }, 1600);
    } catch (error) {
      button.textContent = 'Copy failed';
    }
  });
});

window.analytics = {
  track: (event, data = {}) => {
    if (window.location.hostname === 'localhost') {
      console.info('[Analytics Placeholder]', event, data);
    }
  },
};

window.analytics.track('page_view', { path: window.location.pathname });
