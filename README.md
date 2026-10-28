# MIHIR JANI® — Independent Graphic Designer & Visual Creator

A creative agency & editorial portfolio website inspired by the viral **"PULL ME INTO YOUR TEAM"** visual language and tailored for an award-winning Graphic Designer.

![Mihir Jani](assets/headshot.jpg)

---

## 🎨 Design Direction & Palette
* **Primary Background:** Warm Off-White (`#F5F2E9`)
* **Secondary Background:** Deep Black (`#111111`)
* **Accent Colour:** Electric Yellow (`#F5E900`)
* **Typography:** Bold Brutalist Display (`Syne`), Editorial Luxury Serif Italic (`Cormorant Garamond`), Clean Modern Sans (`Plus Jakarta Sans`), and Technical Monospace (`Space Mono`).
* **Visual Rhythm:** Alternating high-contrast light and dark sections with asymmetric project layouts, micro-interactions, and generous whitespace.

---

## ⚡ Interactive Mechanics & Features
1. **Interactive Tension Cord Hero:**
   * Suited hand illustration anchored on the left.
   * Dynamic SVG bezier tension cords that stretch, sag, and vibrate as you drag.
   * Tactile **"LET'S TALK"** pill button with real-time spring oscillation damping physics.
   * Web Audio API synthesizer clicks and pluck feedback (with mute pill toggle).
   * Floating Parallax Words: `SHIP`, `TOGETHER`, `HELLO`, `LET'S`, `TALK` (Electric Yellow), `BUILD`.
2. **Desktop Custom Cursor & Magnetic Elements:**
   * Custom cursor dot and trailing ring that expands and turns yellow when hovering interactive elements.
   * Magnetic pull on primary buttons.
3. **Selected Projects (Asymmetric Showcase):**
   * Filterable grid with 6 graphic design disciplines:
     1. Brand Identity & Logo Design
     2. Social Media Campaigns
     3. Advertising & Marketing Creatives
     4. Packaging Design
     5. Poster & Editorial Design
     6. UI/UX & Web Design
   * **Individual Case Study Overlay Modal:** Clicking any project opens full design details, client challenge, solution, deliverables list, and software used.
4. **About Me (Dark Editorial Section):**
   * Full portrait photo card of Mihir Jani with passport stamps, crop marks, and 3D card tilt physics.
   * Philosophy breakdown and direct **"Download Resume (PDF)"** action.
5. **What I Build With (Capabilities Arsenal):**
   * Interactive cards for Adobe Photoshop, Illustrator, InDesign, Figma, Canva, Branding, Social Media, Advertising, and AI workflows (no boring percentage bars).
6. **Experience & Milestones Timeline:**
   * Clean chronological timeline with locations and project highlights.
7. **Real Working Contact Section & Form:**
   * 1-click email copy with instant feedback.
   * Direct WhatsApp chat button.
   * Real contact form that supports direct Formspree webhook submission or instant mail client dispatch.
8. **Minimal Dark Footer:**
   * `MIHIR JANI®` • *"Designed with curiosity. Created with purpose."* • Back to Top button.

---

## ⚙️ How to Update Projects, Images & Links

All personal info, project metadata, links, and text are centralized in:
> **[`config.js`](file:///C:/Users/janim/.gemini/antigravity/scratch/crown-creations-portfolio/config.js)**

* **Resume / CV:** Your real `CV.pdf` is located in `assets/projects/CV.pdf` (and `assets/project/CV.pdf`). Clicking **"DOWNLOAD RESUME (PDF)"** or **"Download CV (PDF)"** downloads this exact file.

### Adding Your Real Project Images:
1. Place your exported image files (PNG, JPG, or WebP) inside:
   `C:\Users\janim\.gemini\antigravity\scratch\crown-creations-portfolio\assets\projects\`
2. Open `config.js` and update the `image` path for each project:
   ```javascript
   {
     id: "project-1",
     title: "Your Project Name",
     image: "assets/projects/my-branding-project.png",
     ...
   }
   ```
3. Refresh `index.html` in your browser!

---

## 🚀 How to Run Locally & Deploy

### Run Locally:
Double-click `index.html` or run in PowerShell:
```powershell
Start-Process "C:\Users\janim\.gemini\antigravity\scratch\crown-creations-portfolio\index.html"
```

### Free Deployment:
* **GitHub Pages:** Push this folder to a GitHub repository, enable GitHub Pages from repository settings pointing to `/ (root)`.
* **Vercel / Netlify:** Drag-and-drop this entire folder into [Vercel](https://vercel.com) or [Netlify](https://netlify.com) for instant deployment with free SSL.
