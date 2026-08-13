/**
 * SPA View Router & Main Application Logic (Leo Parpeix Style)
 * Chauhan Aditya Portfolio
 */
document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initSPARouting();
  renderWorkProjects();
  renderArchives();
  initSoundEqualizer();
  initCreditsModal();
});

/* Custom Cursor & Follower */
function initCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const follower = document.getElementById('cursor-follower');

  if (!dot || !follower) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.18;
    followerY += (mouseY - followerY) * 0.18;

    follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  const hoverables = 'a, button, .project-mockup-card, .footer-btn-credits, .archive-item';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverables)) {
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverables)) {
      document.body.classList.remove('cursor-hover');
    }
  });
}

/* SPA View Router (Work, About, Playground) */
function initSPARouting() {
  const tabs = document.querySelectorAll('.nav-tab-link');
  const views = document.querySelectorAll('.view-section');

  function switchView(viewName) {
    // Update active tab
    tabs.forEach(tab => {
      if (tab.getAttribute('data-view') === viewName) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Update active view
    views.forEach(view => {
      if (view.id === `view-${viewName}`) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    // Update theme class on body
    document.body.classList.remove('theme-about', 'theme-playground');
    if (viewName === 'about') {
      document.body.classList.add('theme-about');
    } else if (viewName === 'playground') {
      document.body.classList.add('theme-playground');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.soundManager) window.soundManager.playClick();
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const viewName = tab.getAttribute('data-view');
      switchView(viewName);
    });
  });

  // Check URL hash on load
  const hash = window.location.hash.replace('#', '');
  if (hash && ['work', 'about', 'playground'].includes(hash)) {
    switchView(hash);
  }
}

/* Render Work Projects (Horizontal Drag Cards) */
function renderWorkProjects() {
  const container = document.getElementById('projects-slider-container');
  if (!container) return;

  container.innerHTML = PROJECTS_DATA.map(project => `
    <div class="project-slide-item">
      <div class="project-mockup-card">
        <div style="width:100%; height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; background:linear-gradient(135deg, rgba(8,61,42,0.15), rgba(16,185,129,0.08)); padding:40px; text-align:center;">
          <span style="font-family:var(--font-code); font-size:0.85rem; color:var(--text-muted); margin-bottom:12px;">${project.index} // ${project.category}</span>
          <h2 style="font-family:var(--font-headline); font-size:clamp(2rem, 4vw, 3.2rem); margin-bottom:16px;">${project.title}</h2>
          <p style="max-width:600px; font-size:1rem; color:var(--text-muted); line-height:1.6;">${project.description}</p>
        </div>
      </div>

      <div class="project-meta-row">
        <div class="meta-left">
          <div class="meta-index">${project.index}</div>
          <div class="meta-title-block">
            <h3>${project.title}</h3>
            <p>(${project.category})</p>
          </div>
        </div>

        <div class="meta-right">
          <div class="meta-col">
            <span class="meta-label">YEAR</span>
            <span class="meta-val">${project.year}</span>
          </div>

          <div class="meta-col">
            <span class="meta-label">TEAM</span>
            <span class="meta-val">${project.team}</span>
          </div>

          <div class="meta-col">
            <span class="meta-label">ROLES</span>
            <span class="meta-val">${project.roles.join(', ')}</span>
          </div>

          ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="project-link-btn">Project link ↗</a>` : ''}
          ${project.repoUrl ? `<a href="${project.repoUrl}" target="_blank" class="project-link-btn">GitHub Code ↗</a>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

/* Render Archives List */
function renderArchives() {
  const container = document.getElementById('archives-container');
  if (!container) return;

  container.innerHTML = ARCHIVES_DATA.map(item => `
    <div class="archive-item">
      <div>
        <div class="archive-title">${item.title}</div>
        <div class="archive-desc">${item.description}</div>
      </div>
      <div style="font-family:var(--font-code); font-size:0.85rem; color:var(--text-muted);">${item.stack} • ${item.year}</div>
    </div>
  `).join('');
}

/* Sound Equalizer Animation Toggle */
function initSoundEqualizer() {
  const btn = document.getElementById('sound-eq-btn');
  if (!btn) return;

  let isPlaying = true;
  btn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
      btn.classList.add('playing');
    } else {
      btn.classList.remove('playing');
    }
    if (window.soundManager) window.soundManager.toggle();
  });
}

/* Credits Modal */
function initCreditsModal() {
  const modal = document.getElementById('credits-modal');
  const openBtns = document.querySelectorAll('.footer-btn-credits');
  const closeBtn = document.querySelector('.credits-close-btn');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}
