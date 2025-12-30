# Raj Patil - DevOps Portfolio

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://your-portfolio-url.vercel.app)
[![Built with Vite](https://img.shields.io/badge/built%20with-Vite-646CFF)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)](https://www.typescriptlang.org/)

Animated portfolio showcasing DevOps and Cloud Infrastructure expertise with a terminal-themed cyberpunk aesthetic.

![Portfolio Preview](/profile.png)

## ✨ Features

- **6 Unique Loading Animations** - SQL Query, Git Merge, K8s Pod Scaling, Docker Build, Log Streaming, Network Topology
- **Fully Responsive Design** - Optimized for mobile, tablet, and desktop
- **Interactive Project Showcase** - Detailed modals with tech stacks and achievements
- **Background Effects** - Particle system, code rain, scan lines, glitch effects, floating shapes
- **Terminal Aesthetic** - Cyberpunk-themed with neon colors and glassmorphism
- **Accessible** - Keyboard navigation, ARIA labels, semantic HTML
- **Performance Optimized** - 60fps animations, lazy loading, mobile-optimized particle counts

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library with hooks
- **Vite** - Build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first styling

### Animation Libraries
- **Framer Motion** - React animation library
- **GSAP** - Professional-grade animation
- **Three.js** - 3D graphics (K8s animation)
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Three.js helpers

### Icons & UI
- **Lucide React** - Beautiful icon set
- **clsx** - Conditional class names
- **tailwind-merge** - Merge Tailwind classes

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Raj-glitch-max/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be running at `http://localhost:5173/`

## 📦 Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The production-ready files will be in the `dist/` folder.

## 🎨 Design System

### Colors
- **Cyan Neon**: `#00d9ff` - Primary accent
- **Magenta Neon**: `#ff006e` - Secondary accent
- **Yellow Neon**: `#ffbe0b` - Highlights
- **Success Green**: `#00ff41` - Success states
- **Deep Navy**: `#0a0e27` - Main background

### Typography
- **Headings**: JetBrains Mono (monospace)
- **Body**: Inter (sans-serif)

### Animations
- Entrance animations: 300-500ms
- Hover effects: 200ms
- Section transitions: 500ms
- Loading animations: 3-5 seconds

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── profile.png
│   └── raj-patil-cv.pdf
├── src/
│   ├── components/
│   │   ├── animations/      # Loading animations
│   │   ├── background/      # Background effects
│   │   ├── sections/        # Content sections
│   │   ├── Homepage.tsx
│   │   ├── LoadingModal.tsx
│   │   ├── ProfileHeader.tsx
│   │   ├── ScriptSidebar.tsx
│   │   └── MainContentArea.tsx
│   ├── context/
│   │   └── AppContext.tsx   # Global state
│   ├── lib/
│   │   ├── constants.ts     # Data & config
│   │   ├── types.ts         # TypeScript types
│   │   └── utils.ts         # Helper functions
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🎯 Sections

1. **Homepage** - Terminal-style title with script buttons
2. **About** - Timeline, bio, education, interests
3. **Skills** - 22 skills with proficiency indicators
4. **Projects** - 4 major DevOps projects with detailed modals
5. **Blog** - Coming soon placeholder
6. **Contact** - Social links and contact information

## 🔧 Customization

### Update Personal Information
Edit `src/lib/constants.ts`:
- `PERSONAL_INFO` - Name, email, bio, etc.
- `SKILLS` - Add/remove skills
- `PROJECTS` - Update project details
- `EDUCATION` - Educational background
- `SOCIAL_LINKS` - Social media links

### Change Colors
Update `tailwind.config.js` colors section or modify CSS variables in `src/index.css`

### Add New Sections
1. Create component in `src/components/sections/`
2. Add route in `src/App.tsx`
3. Add script button in sidebar

## 📊 Performance

- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **FPS**: 60fps on desktop, 30fps+ on mobile
- **Bundle Size**: < 1MB
- **First Contentful Paint**: < 2s

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels for screen readers
- Keyboard navigation support
- Focus visible states
- High contrast text
- Alt text for images

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

**Raj Patil**
- Email: rpdinkar92260@gmail.com
- LinkedIn: [raj-patil-311b6b259](https://www.linkedin.com/in/raj-patil-311b6b259/)
- GitHub: [Raj-glitch-max](https://github.com/Raj-glitch-max)
- Twitter: [@RAJPATIL901](https://x.com/RAJPATIL901)

## 🙏 Acknowledgments

- Design inspiration from modern DevOps tools and cyberpunk aesthetics
- Animation libraries: Framer Motion, GSAP, Three.js
- Icons: Lucide React
- Fonts: Google Fonts (JetBrains Mono, Inter)

---

**Built with ❤️ and ☕ by Raj Patil**
