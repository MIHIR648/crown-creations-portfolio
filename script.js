/**
 * MIHIR JANI® — CREATIVE PORTFOLIO MASTER SCRIPT
 * Handles dynamic content population, elastic pull-cord physics, custom cursor,
 * magnetic buttons, project modals, filtering, and real form dispatch.
 */

(function () {
  'use strict';

  const cfg = window.PORTFOLIO_CONFIG || {};
  const personal = cfg.personal || {};
  const projects = cfg.projects || [];
  const skills = cfg.skills || [];
  const experience = cfg.experience || [];

  // =========================================================================
  // 1. POPULATE DYNAMIC CONFIGURATION DATA
  // =========================================================================
  function populateConfigData() {
    // Current Year
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Social Links & Contact
    const displayEmail = document.getElementById('displayEmail');
    if (displayEmail && personal.email) displayEmail.textContent = personal.email;

    const copyEmailTrigger = document.getElementById('copyEmailTrigger');
    if (copyEmailTrigger && personal.email) copyEmailTrigger.setAttribute('data-copy', personal.email);

    const phoneTrigger = document.getElementById('phoneTrigger');
    if (phoneTrigger && personal.phone) {
      phoneTrigger.href = `tel:${personal.phone.replace(/\s+/g, '')}`;
      const phoneVal = phoneTrigger.querySelector('.email-value');
      if (phoneVal) phoneVal.textContent = personal.phone;
    }

    const whatsappLink = document.getElementById('whatsappLink');
    if (whatsappLink && personal.whatsappUrl) whatsappLink.href = personal.whatsappUrl;

    const instaLink = document.getElementById('instaLink');
    if (instaLink && personal.instagramUrl) instaLink.href = personal.instagramUrl;

    const linkedinLink = document.getElementById('linkedinLink');
    if (linkedinLink && personal.linkedinUrl) linkedinLink.href = personal.linkedinUrl;

    const behanceLink = document.getElementById('behanceLink');
    if (behanceLink && personal.behanceUrl) behanceLink.href = personal.behanceUrl;

    const resumeBtn = document.getElementById('resumeBtn');
    if (resumeBtn && personal.resumeUrl) {
      resumeBtn.href = personal.resumeUrl;
      resumeBtn.setAttribute('download', 'Mihir_Jani_CV.pdf');
    }

    // Render Projects
    renderProjects('all');

    // Render Skills
    renderSkills();

    // Render Experience Timeline
    renderExperience();
  }

  // =========================================================================
  // 2. RENDER SELECTED PROJECTS
  // =========================================================================
  const projectsContainer = document.getElementById('projectsContainer');

  function renderProjects(filterCategory = 'all') {
    if (!projectsContainer) return;
    projectsContainer.innerHTML = '';

    const filterLower = filterCategory.toLowerCase();
    const filtered = filterCategory === 'all'
      ? projects
      : projects.filter(p => {
          const cat = (p.category || '').toLowerCase();
          const catShort = (p.categoryShort || '').toLowerCase();
          if (filterLower === 'packaging' || filterLower === 'product') {
            return cat.includes('product') || cat.includes('packaging') || catShort.includes('product') || catShort.includes('packaging');
          }
          if (filterLower === 'ui/ux' || filterLower === 'ui' || filterLower === 'ux' || filterLower === 'digital') {
            return cat.includes('ui') || cat.includes('ux') || cat.includes('web') || catShort.includes('ui') || catShort.includes('ux');
          }
          return cat.includes(filterLower) || catShort.includes(filterLower) || cat === filterLower;
        });

    filtered.forEach((p, index) => {
      const card = document.createElement('article');
      card.className = 'project-card';
      card.setAttribute('data-id', p.id);
      card.setAttribute('data-category', p.category);

      card.innerHTML = `
        <div class="project-media-wrap">
          <img src="${p.image}" alt="${p.title}" class="project-img" loading="lazy" />
          <span class="project-category-badge">${p.categoryShort || p.category}</span>
          <span class="project-year-badge">${p.year}</span>
        </div>
        <div class="project-content-body">
          <div>
            <h3 class="project-title">${p.title}</h3>
            <p class="project-description">${p.description}</p>
          </div>
          <div class="project-card-footer">
            <span class="view-project-link">VIEW CASE STUDY ↗</span>
            <span class="project-num" style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-subtle);">0${index + 1}</span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => openCaseStudy(p));
      projectsContainer.appendChild(card);
    });
  }

  // Filter Buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.getAttribute('data-filter');
      renderProjects(filter);
    });
  });

  // =========================================================================
  // 3. RENDER SKILLS & WHAT I BUILD WITH
  // =========================================================================
  function renderSkills() {
    const container = document.getElementById('skillsContainer');
    if (!container) return;
    container.innerHTML = '';

    skills.forEach(skill => {
      const card = document.createElement('div');
      card.className = 'skill-chip-card';
      card.innerHTML = `
        <span class="skill-cat-label">${skill.category.toUpperCase()}</span>
        <h3 class="skill-name-title">${skill.name}</h3>
        <p class="skill-desc-text">${skill.desc}</p>
      `;
      container.appendChild(card);
    });
  }

  // =========================================================================
  // 4. RENDER EXPERIENCE TIMELINE
  // =========================================================================
  function renderExperience() {
    const container = document.getElementById('experienceTimeline');
    if (!container) return;
    container.innerHTML = '';

    experience.forEach(item => {
      const row = document.createElement('div');
      row.className = 'timeline-item';
      row.innerHTML = `
        <div class="timeline-period-badge">
          <span>${item.period}</span>
          <span class="timeline-loc-tag">${item.location}</span>
        </div>
        <div class="timeline-details">
          <h3 class="timeline-role-title">${item.role}</h3>
          <div class="timeline-org">${item.organization}</div>
          <p class="timeline-text">${item.desc}</p>
        </div>
      `;
      container.appendChild(row);
    });
  }

  // =========================================================================
  // 5. CASE STUDY MODAL OVERLAY
  // =========================================================================
  const caseStudyModal = document.getElementById('caseStudyModal');
  const caseCloseBtn = document.getElementById('caseCloseBtn');

  function openCaseStudy(project) {
    if (!caseStudyModal) return;
    initAudio();
    playPluck(1.6);

    document.getElementById('modalCat').textContent = project.categoryShort || project.category;
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalYear').textContent = project.year;
    document.getElementById('modalImage').src = project.image;
    document.getElementById('modalImage').alt = project.title;
    document.getElementById('modalDesc').textContent = project.description;
    document.getElementById('modalChallenge').textContent = project.challenge;
    document.getElementById('modalSolution').textContent = project.solution;

    const deliverablesList = document.getElementById('modalDeliverables');
    deliverablesList.innerHTML = '';
    (project.deliverables || []).forEach(deliv => {
      const li = document.createElement('li');
      li.textContent = deliv;
      deliverablesList.appendChild(li);
    });

    const toolsWrap = document.getElementById('modalTools');
    toolsWrap.innerHTML = '';
    (project.tools || []).forEach(tool => {
      const span = document.createElement('span');
      span.className = 'tool-badge';
      span.textContent = tool;
      toolsWrap.appendChild(span);
    });

    caseStudyModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeCaseStudy() {
    if (caseStudyModal) {
      caseStudyModal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  if (caseCloseBtn) caseCloseBtn.addEventListener('click', closeCaseStudy);
  if (caseStudyModal) {
    caseStudyModal.addEventListener('click', (e) => {
      if (e.target === caseStudyModal) closeCaseStudy();
    });
  }

  const modalInquireBtn = document.getElementById('modalInquireBtn');
  if (modalInquireBtn) {
    modalInquireBtn.addEventListener('click', () => {
      closeCaseStudy();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && caseStudyModal && caseStudyModal.classList.contains('is-open')) {
      closeCaseStudy();
    }
  });

  // =========================================================================
  // 6. AUDIO SYNTHESIZER (Web Audio API)
  // =========================================================================
  let audioCtx = null;
  let soundEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playPluck(multiplier = 1) {
    if (!soundEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      const now = audioCtx.currentTime;
      const freq = 240 * multiplier;
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + 0.12);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.13);
    } catch (e) {}
  }

  function playSnap() {
    if (!soundEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      const now = audioCtx.currentTime;
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.16);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.17);
    } catch (e) {}
  }

  const soundToggle = document.getElementById('sound-toggle');
  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      initAudio();
      soundEnabled = !soundEnabled;
      const label = soundToggle.querySelector('.sound-label');
      if (label) label.textContent = soundEnabled ? 'AUDIO: ON' : 'AUDIO: MUTED';
      soundToggle.style.opacity = soundEnabled ? '1' : '0.5';
    });
  }

  // =========================================================================
  // 7. ELASTIC PULL-CORD HERO ARENA PHYSICS
  // =========================================================================
  const pullArena = document.getElementById('pullArena');
  const cordsSvg = document.getElementById('cordsSvg');
  const handAnchor = document.getElementById('handAnchor');
  const hireDraggable = document.getElementById('hireDraggable');
  const hireButton = document.getElementById('hireButton');

  if (pullArena && cordsSvg && handAnchor && hireDraggable) {
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let currentX = 0;
    let currentY = 0;
    let restX = 0;
    let restY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let springAnimId = null;

    function calculatePositions() {
      const arenaRect = pullArena.getBoundingClientRect();
      const handRect = handAnchor.getBoundingClientRect();

      // Grip point on the hand fingers
      const anchorX = handRect.left - arenaRect.left + handRect.width * 0.86;
      const anchorY = handRect.top - arenaRect.top + handRect.height * 0.42;

      restX = arenaRect.width * 0.62;
      restY = arenaRect.height * 0.5;

      if (!isDragging && velocityX === 0 && velocityY === 0) {
        currentX = restX;
        currentY = restY;
        updateButtonTransform(currentX, currentY);
      }

      return { anchorX, anchorY };
    }

    function updateButtonTransform(x, y) {
      hireDraggable.style.left = `${x}px`;
      hireDraggable.style.top = `${y}px`;
    }

    function drawCords(anchorX, anchorY, targetX, targetY) {
      const dx = targetX - anchorX;
      const dy = targetY - anchorY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const sag = Math.max(10, 75 - dist * 0.14);
      const tensionFactor = Math.min(1.4, Math.max(0.6, 280 / (dist + 50)));

      const ctrlX = (anchorX + targetX) / 2;
      const ctrlY = (anchorY + targetY) / 2 + sag * 0.5;

      const mainCord = `M ${anchorX} ${anchorY} Q ${ctrlX} ${ctrlY} ${targetX - 20} ${targetY}`;
      const topCord = `M ${anchorX} ${anchorY - 3} Q ${ctrlX} ${ctrlY - 14} ${targetX - 22} ${targetY - 10}`;
      const btmCord = `M ${anchorX} ${anchorY + 3} Q ${ctrlX} ${ctrlY + 14} ${targetX - 22} ${targetY + 10}`;

      cordsSvg.innerHTML = `
        <defs>
          <linearGradient id="cordGradNeon" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#FF2E93" />
            <stop offset="25%" stop-color="#F5E900" />
            <stop offset="70%" stop-color="#00F0FF" />
            <stop offset="100%" stop-color="#F5E900" />
          </linearGradient>
          <filter id="neonCordGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#F5E900" flood-opacity="0.8" />
            <feDropShadow dx="0" dy="0" stdDeviation="12" flood-color="#00F0FF" flood-opacity="0.5" />
          </filter>
        </defs>
        <!-- Outer Glow Layer -->
        <path d="${mainCord}" stroke="rgba(245, 233, 0, 0.2)" stroke-width="${8 * tensionFactor}" fill="none" />
        <!-- Secondary Fiber Strands -->
        <path d="${topCord}" stroke="rgba(0, 240, 255, 0.7)" stroke-width="${1.6 * tensionFactor}" stroke-dasharray="4 2" fill="none" filter="url(#neonCordGlow)" />
        <path d="${mainCord}" stroke="url(#cordGradNeon)" stroke-width="${3.2 * tensionFactor}" fill="none" filter="url(#neonCordGlow)" />
        <path d="${btmCord}" stroke="rgba(245, 233, 0, 0.5)" stroke-width="${1.4 * tensionFactor}" fill="none" />
        <!-- Anchor Knot Glowing Bead -->
        <circle cx="${anchorX}" cy="${anchorY}" r="5" fill="#F5E900" stroke="#FFFFFF" stroke-width="2" filter="url(#neonCordGlow)" />
      `;
    }

    function renderPhysics() {
      const { anchorX, anchorY } = calculatePositions();
      drawCords(anchorX, anchorY, currentX, currentY);
    }

    function runSpringPhysics() {
      if (isDragging) return;

      const stiffness = 0.14;
      const damping = 0.74;

      const forceX = (restX - currentX) * stiffness;
      const forceY = (restY - currentY) * stiffness;

      velocityX = (velocityX + forceX) * damping;
      velocityY = (velocityY + forceY) * damping;

      currentX += velocityX;
      currentY += velocityY;

      updateButtonTransform(currentX, currentY);
      renderPhysics();

      if (Math.abs(velocityX) > 0.1 || Math.abs(velocityY) > 0.1 || Math.abs(currentX - restX) > 0.5) {
        springAnimId = requestAnimationFrame(runSpringPhysics);
      } else {
        currentX = restX;
        currentY = restY;
        updateButtonTransform(currentX, currentY);
        renderPhysics();
        cancelAnimationFrame(springAnimId);
        springAnimId = null;
      }
    }

    hireDraggable.addEventListener('pointerdown', (e) => {
      initAudio();
      isDragging = true;
      hireDraggable.classList.add('is-dragging');
      hireDraggable.setPointerCapture(e.pointerId);

      dragStartX = e.clientX - currentX;
      dragStartY = e.clientY - currentY;

      playPluck(1.3);
      if (springAnimId) {
        cancelAnimationFrame(springAnimId);
        springAnimId = null;
      }
    });

    hireDraggable.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const arenaRect = pullArena.getBoundingClientRect();
      const rawX = e.clientX - arenaRect.left;
      const rawY = e.clientY - arenaRect.top;

      const minX = arenaRect.width * 0.35;
      const maxX = arenaRect.width * 0.94;
      const minY = 35;
      const maxY = arenaRect.height - 35;

      currentX = Math.max(minX, Math.min(maxX, rawX));
      currentY = Math.max(minY, Math.min(maxY, rawY));

      updateButtonTransform(currentX, currentY);
      renderPhysics();
    });

    function handlePointerUp(e) {
      if (!isDragging) return;
      isDragging = false;
      hireDraggable.classList.remove('is-dragging');
      try {
        hireDraggable.releasePointerCapture(e.pointerId);
      } catch (err) {}

      playSnap();

      const pullDelta = Math.sqrt(
        Math.pow(currentX - restX, 2) + Math.pow(currentY - restY, 2)
      );

      // If pulled significantly or clicked, smooth scroll to Contact Section
      if (pullDelta > 70) {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }

      runSpringPhysics();
    }

    hireDraggable.addEventListener('pointerup', handlePointerUp);
    hireDraggable.addEventListener('pointercancel', handlePointerUp);

    // Direct click trigger
    if (hireButton) {
      hireButton.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
      });
    }

    window.addEventListener('resize', () => {
      calculatePositions();
      renderPhysics();
    });

    window.addEventListener('load', () => {
      calculatePositions();
      renderPhysics();
    });

    if (document.fonts) {
      document.fonts.ready.then(() => {
        calculatePositions();
        renderPhysics();
      });
    }

    setTimeout(() => {
      calculatePositions();
      renderPhysics();
    }, 100);

    setTimeout(() => {
      calculatePositions();
      renderPhysics();
    }, 450);
  }

  // =========================================================================
  // 8. PARALLAX FLOATING ORBIT WORDS
  // =========================================================================
  const orbitWords = document.querySelectorAll('.orbit-word');
  if (pullArena && orbitWords.length > 0) {
    pullArena.addEventListener('mousemove', (e) => {
      const rect = pullArena.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      const mouseY = (e.clientY - rect.top) / rect.height - 0.5;

      orbitWords.forEach(word => {
        const speed = parseFloat(word.getAttribute('data-speed') || '1');
        const offsetX = mouseX * 26 * speed;
        const offsetY = mouseY * 20 * speed;
        word.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    });

    pullArena.addEventListener('mouseleave', () => {
      orbitWords.forEach(word => {
        word.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  // =========================================================================
  // 9. CUSTOM DESKTOP MOUSE CURSOR & MAGNETIC BUTTONS
  // =========================================================================
  const cursorDot = document.getElementById('cursorDot');
  const cursorOutline = document.getElementById('cursorOutline');

  if (cursorDot && cursorOutline && window.matchMedia('(min-width: 1024px)').matches) {
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function animateCursor() {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;
      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;
      requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);

    // Dynamic Interactive Hover Elements using delegation
    window.addEventListener('mouseover', (e) => {
      const interactive = e.target.closest('a, button, .project-card, .skill-chip-card, input, select, textarea, .hire-pill-button, .filter-btn, .copy-pill-btn, .whatsapp-card, .sound-pill');
      if (interactive) {
        cursorOutline.classList.add('cursor-hover');
      } else {
        cursorOutline.classList.remove('cursor-hover');
      }
    });
  }

  // Magnetic Buttons
  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

  // =========================================================================
  // 10. 3D TILT ON ABOUT ME PHOTO CARD
  // =========================================================================
  const aboutPhotoCard = document.getElementById('aboutPhotoCard');
  if (aboutPhotoCard) {
    aboutPhotoCard.addEventListener('mousemove', (e) => {
      const rect = aboutPhotoCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotX = ((y - centerY) / centerY) * -5;
      const rotY = ((x - centerX) / centerX) * 5;
      aboutPhotoCard.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.01)`;
    });

    aboutPhotoCard.addEventListener('mouseleave', () => {
      aboutPhotoCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  }

  // =========================================================================
  // 11. 1-CLICK EMAIL COPY
  // =========================================================================
  const copyTrigger = document.getElementById('copyEmailTrigger');
  if (copyTrigger) {
    copyTrigger.addEventListener('click', () => {
      initAudio();
      const email = copyTrigger.getAttribute('data-copy') || personal.email || 'crowncreations30@gmail.com';
      const btn = copyTrigger.querySelector('.copy-pill-btn');

      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          if (btn) btn.textContent = 'COPIED!';
          playPluck(2);
          setTimeout(() => {
            if (btn) btn.textContent = 'COPY';
          }, 2000);
        });
      }
    });
  }

  // =========================================================================
  // 12. REAL FUNCTIONAL CONTACT FORM (Formspree or Real Mailto Dispatch)
  // =========================================================================
  const projectContactForm = document.getElementById('projectContactForm');
  const formStatusBanner = document.getElementById('formStatusBanner');

  if (projectContactForm) {
    projectContactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      initAudio();
      playSnap();

      const name = document.getElementById('formName').value;
      const email = document.getElementById('formEmail').value;
      const projectType = document.getElementById('formProjectType').value;
      const message = document.getElementById('formMessage').value;
      const submitBtn = document.getElementById('formSubmitBtn');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'TRANSMITTING...';
      }

      // Check if user has specified an active Formspree endpoint in config.js
      const endpoint = (personal && personal.formspreeEndpoint) ? personal.formspreeEndpoint.trim() : '';

      if (endpoint && endpoint.startsWith('http')) {
        try {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ name, email, projectType, message })
          });

          if (res.ok) {
            showFormStatus(true, `✓ SUCCESS: Thank you ${name}! Your project inquiry has been received.`);
            projectContactForm.reset();
          } else {
            throw new Error('Service responded with error');
          }
        } catch (err) {
          // Fallback to direct client mailto
          dispatchDirectMail(name, email, projectType, message);
        }
      } else {
        // Direct real mail client dispatch
        dispatchDirectMail(name, email, projectType, message);
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.querySelector('span').textContent = 'START A PROJECT';
      }
    });
  }

  function dispatchDirectMail(name, email, projectType, message) {
    const subject = encodeURIComponent(`[Project Inquiry] ${projectType} — from ${name}`);
    const body = encodeURIComponent(
      `Hello Mihir Jani,\n\nI would like to start a new design project with you.\n\nProject Discipline: ${projectType}\nClient Name: ${name}\nClient Email: ${email}\n\nProject Details & Objectives:\n${message}\n\nLooking forward to hearing from you!`
    );
    const targetEmail = personal.email || 'crowncreations30@gmail.com';
    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;

    showFormStatus(true, `✓ TRANSMISSION INITIATED: Opening your email client to send your brief directly to ${targetEmail}.`);
    if (projectContactForm) projectContactForm.reset();
  }

  function showFormStatus(isSuccess, text) {
    if (!formStatusBanner) return;
    formStatusBanner.className = `form-status ${isSuccess ? 'success' : 'error'}`;
    formStatusBanner.textContent = text;
    formStatusBanner.classList.remove('hidden');

    setTimeout(() => {
      formStatusBanner.classList.add('hidden');
    }, 7000);
  }

  // =========================================================================
  // 13. MOBILE MENU TOGGLE
  // =========================================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');

  const mobileDrawerClose = document.getElementById('mobileDrawerClose');

  function openMobileMenu() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileMenu() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      if (mobileDrawer.classList.contains('is-open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    if (mobileDrawerClose) {
      mobileDrawerClose.addEventListener('click', closeMobileMenu);
    }

    mobileDrawer.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // Run initial population safely once
  let isInitialized = false;
  function initPortfolio() {
    if (isInitialized) return;
    isInitialized = true;
    populateConfigData();
  }

  document.addEventListener('DOMContentLoaded', initPortfolio);
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initPortfolio();
  }
})();
