const express = require('express');
const gitGuides = require('./data/gitGuides');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const layout = ({ title, description, body }) => `<!doctype html>
<html lang="en" data-theme="light">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${escapeHtml(description)}">
    <title>${escapeHtml(title)}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body>
    <header class="site-header">
      <nav class="container">
        <a href="/" class="site-title">Ultimate Git Guide</a>
        <a href="/">Home</a>
      </nav>
    </header>
    ${body}
  </body>
</html>`;

const guideCard = (guide) => `
  <article class="guide-card">
    <div class="guide-card-content">
      <p class="guide-number">Guide ${String(guide.id).padStart(2, '0')}</p>
      <p class="guide-meta">${escapeHtml(guide.category)} | ${escapeHtml(guide.difficulty)}</p>
      <h2>${escapeHtml(guide.title)}</h2>
      <p>${escapeHtml(guide.description)}</p>
      <p><strong>Main command:</strong> <code>${escapeHtml(guide.command)}</code></p>
      <a href="/git/${escapeHtml(guide.slug)}" role="button">View details</a>
    </div>
  </article>`;

app.get('/', (req, res) => {
  const body = `
    <main class="container">
      <section>
        <h2>Git Topics</h2>
        <div class="guide-grid">
          ${gitGuides.map(guideCard).join('')}
        </div>
      </section>
    </main>`;

  res.send(layout({
    title: 'Ultimate Git Guide',
    description: 'A listicle web app that teaches eight essential Git workflows.',
    body
  }));
});

app.get('/git/:slug', (req, res, next) => {
  const guide = gitGuides.find((item) => item.slug === req.params.slug);

  if (!guide) {
    return next();
  }

  const body = `
    <main class="container">
      <p><a href="/">Back to all topics</a></p>

      <article class="detail-page">
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
        </dl>
      </article>
    </main>`;

  res.send(layout({
    title: `${guide.title} | Ultimate Git Guide`,
    description: guide.description,
    body
  }));
});

app.use((req, res) => {
  const body = `
    <main class="container">
      <section class="not-found">
        <h1>404</h1>
        <p>The page you are looking for does not exist.</p>
        <a href="/" role="button">Return home</a>
      </section>
    </main>`;

  res.status(404).send(layout({
    title: '404 | Ultimate Git Guide',
    description: 'The requested Git guide page was not found.',
    body
  }));
});

app.listen(PORT, () => {
  console.log(`Ultimate Git Guide is running at http://localhost:${PORT}`);
});
