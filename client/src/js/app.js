const listView = document.querySelector('#list-view');
const detailView = document.querySelector('#detail-view');
const notFoundView = document.querySelector('#not-found-view');
const guideGrid = document.querySelector('#guide-grid');
const detailCard = document.querySelector('#detail-card');
const listStatus = document.querySelector('#list-status');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const attributeFilter = document.querySelector('#attribute-filter');
const backLink = document.querySelector('#back-link');

const escapeHtml = (value) =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const showView = (view) => {
  listView.hidden = view !== 'list';
  detailView.hidden = view !== 'detail';
  notFoundView.hidden = view !== 'not-found';
};

const guideCardTemplate = (guide) => `
  <article class="guide-card">
    <div class="guide-card-content">
      <p class="guide-number">Guide ${String(guide.id).padStart(2, '0')}</p>
      <p class="guide-meta">${escapeHtml(guide.category)} | ${escapeHtml(guide.difficulty)}</p>
      <h2>${escapeHtml(guide.title)}</h2>
      <p>${escapeHtml(guide.description)}</p>
      <p><strong>Main command:</strong> <code>${escapeHtml(guide.command)}</code></p>
      <a href="/git/${escapeHtml(guide.slug)}" role="button" data-link>View details</a>
    </div>
  </article>
`;

const detailTemplate = (guide) => `
  <h1>${escapeHtml(guide.title)}</h1>
  <p>${escapeHtml(guide.description)}</p>

  <dl class="details-list">
    <dt>Guide ID</dt>
    <dd>${escapeHtml(guide.id)}</dd>

    <dt>Slug</dt>
    <dd>${escapeHtml(guide.slug)}</dd>

    <dt>Category</dt>
    <dd>${escapeHtml(guide.category)}</dd>

    <dt>Difficulty</dt>
    <dd>${escapeHtml(guide.difficulty)}</dd>

    <dt>Main command</dt>
    <dd><code>${escapeHtml(guide.command)}</code></dd>

    <dt>Syntax</dt>
    <dd><code>${escapeHtml(guide.syntax)}</code></dd>

    <dt>Example</dt>
    <dd><code>${escapeHtml(guide.example)}</code></dd>

    <dt>When to use it</dt>
    <dd>${escapeHtml(guide.whenToUse)}</dd>

    <dt>Common mistake</dt>
    <dd>${escapeHtml(guide.warning)}</dd>

    <dt>Submitted by</dt>
    <dd>${escapeHtml(guide.submittedBy)}</dd>

    <dt>Submitted on</dt>
    <dd>${new Date(guide.submittedOn).toLocaleDateString()}</dd>
  </dl>
`;

const fetchJson = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};

const loadGuides = async () => {
  showView('list');
  listStatus.textContent = 'Loading guides...';
  guideGrid.innerHTML = '';

  const params = new URLSearchParams();
  const search = searchInput.value.trim();
  const attribute = attributeFilter.value;

  if (search) {
    params.set('search', search);
    params.set('attribute', attribute);
  }

  try {
    const queryString = params.toString();
    const guides = await fetchJson(`/api/guides${queryString ? `?${queryString}` : ''}`);
    guideGrid.innerHTML = guides.map(guideCardTemplate).join('');
    listStatus.textContent = guides.length
      ? `${guides.length} guide${guides.length === 1 ? '' : 's'} found.`
      : 'No guides matched your search.';
  } catch (error) {
    listStatus.textContent = 'Unable to load guides. Check the server and database connection.';
  }
};

const loadGuideDetail = async (slug) => {
  showView('detail');
  detailCard.innerHTML = '<p class="status-message">Loading guide...</p>';

  try {
    const guide = await fetchJson(`/api/guides/${slug}`);
    document.title = `${guide.title} | Ultimate Git Guide`;
    detailCard.innerHTML = detailTemplate(guide);
  } catch (error) {
    document.title = '404 | Ultimate Git Guide';
    showView('not-found');
  }
};

const route = () => {
  const detailMatch = window.location.pathname.match(/^\/git\/([^/]+)$/);

  document.title = 'Ultimate Git Guide';

  if (detailMatch) {
    loadGuideDetail(detailMatch[1]);
    return;
  }

  if (window.location.pathname !== '/') {
    showView('not-found');
    return;
  }

  loadGuides();
};

searchForm.addEventListener('input', () => {
  loadGuides();
});

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  loadGuides();
});

document.addEventListener('click', (event) => {
  const link = event.target.closest('[data-link], #back-link');

  if (!link || link.origin !== window.location.origin) {
    return;
  }

  event.preventDefault();
  window.history.pushState({}, '', link.href);
  route();
});

window.addEventListener('popstate', route);

route();
