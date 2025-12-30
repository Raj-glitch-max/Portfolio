# 🚀 ADITYA PRATAMA - DEVOPS PORTFOLIO WEBSITE
## COMPLETE SPECIFICATION (Ultra-Detailed for Implementation)

---

# **SECTION 0: IMPORTANT INFORMATION NEEDED FROM ADITYA**

**BEFORE building anything, collect:**

1. **Personal Info**
   - Full name: Aditya Pratama ✓
   - Title: DevOps | SRE | Cloud Engineer ✓
   - Email: aditya@adityacprtm.dev ✓
   - Location: Jakarta, ID ✓
   - Phone: (optional)
   - Profile photo: (HIGH QUALITY, preferably 800x800px)

2. **Social Links**
   - GitHub URL: 
   - LinkedIn URL:
   - Twitter/X URL:
   - Portfolio/Website URL:
   - Any other: (Dev.to, Medium, etc)

3. **About Section**
   - Bio paragraph (2-3 sentences)
   - Why DevOps engineer (1 paragraph)
   - Current learning goals

4. **Skills**
   - List all: Docker, Kubernetes, Terraform, AWS, GCP, CI/CD, etc
   - For each: proficiency level (Expert/Advanced/Intermediate)

5. **Projects** (At least 3-4)
   - Project name:
   - Description (1-2 sentences):
   - Tech stack:
   - GitHub link:
   - Live demo link (optional):
   - Screenshots/images:
   - For EACH project, need: Architecture diagram (or description to create)

6. **Blog Posts** (if any)
   - Title:
   - Description:
   - Link/URL:
   - Date published:

7. **Experience/Resume**
   - Company name:
   - Position:
   - Duration:
   - Description of work:
   - (Repeat for each position)

8. **Education**
   - College/University:
   - Degree:
   - Year:
   - Major:

---

# **SECTION 1: TECHNOLOGY STACK (EXACT TOOLS)**

## **1.1 Frontend Framework**
- **Next.js 14.0+** (React framework with built-in routing)
  - Why: Server-side rendering, fast performance, built-in optimization
  - Alternative: React 18 + Vite (if Antigravity struggles with Next.js)

## **1.2 Animation Libraries (CRITICAL)**

### **Framer Motion**
- **Purpose**: Component animations, smooth transitions, variants
- **Use Cases in Portfolio**:
  - Button hover effects
  - Page transitions (fade, slide)
  - Card animations
  - Staggered list animations
- **Example**: When profile header appears, use `initial={{opacity: 0, y: -50}} animate={{opacity: 1, y: 0}}`

### **GSAP (GreenSock Animation Platform)**
- **Purpose**: Advanced timeline-based animations, complex sequences
- **Use Cases**:
  - Git merge branch animation ($ ls/portfolio loading)
  - Docker layer stacking animation
  - Query text typing animation
  - Particle system movement
- **Why**: More powerful than Framer Motion for complex sequences

### **Three.js**
- **Purpose**: 3D graphics, 3D visual effects
- **Use Cases**:
  - Kubernetes pod grid (3D visualization)
  - Network topology diagram (3D nodes)
  - Floating geometric shapes in background
- **Alternative**: Babylon.js (if Three.js too complex)

### **Canvas API** (Native JavaScript)
- **Purpose**: Custom 2D animations, particle system
- **Use Cases**:
  - Particle system (floating dots)
  - Code rain animation (Matrix-style)
  - Glitch effect
  - Custom spinner

## **1.3 Styling & UI**
- **Tailwind CSS**: Utility-first CSS framework
  - Use for: Layout, spacing, responsive design
  - Configuration: Dark mode enabled
  
- **Shadcn/ui**: Pre-built accessible components
  - Use for: Buttons, cards, dropdowns (if needed)
  
- **CSS Modules/CSS-in-JS**: Custom animations
  - Use for: Keyframe animations, custom glitch effects

## **1.4 Typography & Fonts**
```
Primary Monospace: JetBrains Mono
  - Weight: Regular (400), Bold (600)
  - Use: Terminal text, code, headings
  - Size: 14px (body), 24px (headings), 56px (large titles)

Backup Monospace: Fira Code
  - Use: Code blocks, fallback for JetBrains

Body Font: Inter
  - Weight: Regular (400), Medium (500)
  - Use: Body text, descriptions
  - Size: 14px-16px

Import from Google Fonts or local files
```

## **1.5 State Management**
- **React Context API** (for simple state)
  - Store: Current section (about/skills/projects/etc)
  - Store: Loading state
  - Store: User preferences (theme, etc)

- **Alternative**: Zustand (if context gets complex)

## **1.6 Build & Deployment**
- **Build**: Next.js built-in build system
- **Package Manager**: npm or pnpm
- **Deployment**: Vercel (recommended for Next.js)
  - Alternative: Netlify, GitHub Pages

## **1.7 Development Tools**
- **Editor**: VS Code
- **Git**: GitHub
- **Browser DevTools**: Chrome DevTools (for performance testing)

---

# **SECTION 2: DESIGN SYSTEM (EXACT SPECIFICATIONS)**

## **2.1 Color Palette (HEX CODES - DO NOT CHANGE)**

### **Primary Colors (Neon)**
```
Cyan (Main): #00d9ff
  - Used for: Text glow, borders, primary highlights
  - RGB: 0, 217, 255
  
Magenta (Secondary): #ff006e
  - Used for: Hover glows, accents
  - RGB: 255, 0, 110

Yellow (Alert): #ffbe0b
  - Used for: Important highlights, warnings
  - RGB: 255, 190, 11
```

### **Background Colors**
```
Deep Navy (Main BG): #0a0e27
  - Used for: Main page background
  - RGB: 10, 14, 39

Dark Gray (Surface): #161b22
  - Used for: Cards, modals, containers
  - RGB: 22, 27, 34

Darker Gray (Hover): #21262d
  - Used for: Hover states on cards
  - RGB: 33, 38, 45
```

### **Text Colors**
```
White (Primary Text): #ffffff or #f0f0f0
  - Used for: Main text, headings
  
Light Gray (Secondary Text): #8b949e
  - Used for: Descriptions, labels
  - RGB: 139, 148, 158

Muted Gray (Hint Text): #6e7681
  - Used for: Hints, small text
  - RGB: 110, 118, 129
```

### **Status Colors**
```
Success (Green): #00ff41
  - Used for: Checkmarks, success states
  - RGB: 0, 255, 65

Error (Red): #ff4444
  - Used for: Errors, warnings
  - RGB: 255, 68, 68

Loading (Blue): #0066ff
  - Used for: Loading states
  - RGB: 0, 102, 255
```

## **2.2 Spacing System (BASE UNIT: 8px)**
```
xs: 4px (rarely used)
sm: 8px (small gaps)
md: 16px (default gap)
lg: 24px (large gap)
xl: 32px (extra large gap)
2xl: 48px (huge gap)

Use: margin: 16px, padding: 24px, gap: 16px
NEVER use random numbers like 15px or 25px
```

## **2.3 Typography Rules**

### **Headings**
```
H1 (Page Title):
  - Font: JetBrains Mono Bold
  - Size: 48px-56px
  - Color: #00d9ff (cyan)
  - Text-shadow: 0 0 20px rgba(0, 217, 255, 0.5)
  - Example: "$ ls /portfolio/"

H2 (Section Title):
  - Font: JetBrains Mono Bold
  - Size: 32px-40px
  - Color: #ffffff
  - Margin-bottom: 24px

H3 (Subsection):
  - Font: JetBrains Mono
  - Size: 20px-24px
  - Color: #ffffff
```

### **Body Text**
```
Regular:
  - Font: Inter Regular
  - Size: 14px-16px
  - Line-height: 1.6
  - Color: #8b949e (gray)
  - Max-width: 600px (for readability)

Monospace (Code/Terminal):
  - Font: Fira Code
  - Size: 13px-14px
  - Color: #00d9ff
  - Background: #161b22
  - Padding: 12px
  - Border-radius: 4px
```

## **2.4 Border Radius (Consistency)**
```
sm: 4px (small elements)
md: 8px (cards, inputs)
lg: 12px (large cards, modals)
full: 9999px (circular elements, pills)

NEVER use random values like 5px or 10px
```

## **2.5 Shadows (Glowing Effect)**
```
Default Card Shadow:
  box-shadow: 0 4px 16px rgba(0, 217, 255, 0.15)

Hover Glow (Active Element):
  box-shadow: 0 0 20px rgba(0, 217, 255, 0.4)

Neon Glow (Text/Border):
  text-shadow: 0 0 10px rgba(0, 217, 255, 0.6)
  
Error Shadow (Red):
  box-shadow: 0 0 20px rgba(255, 68, 68, 0.3)
```

## **2.6 Transparency & Opacity**
```
Full opacity: 1 (100%)
High opacity: 0.9 (90%)
Medium opacity: 0.6 (60%)
Low opacity: 0.3 (30%)
Very low opacity: 0.1 (10%)
Barely visible: 0.05 (5%)

Background blur (glassmorphism):
  backdrop-filter: blur(10px)
  background-color: rgba(22, 27, 34, 0.7)
```

---

# **SECTION 3: PAGE STRUCTURE & FLOW**

## **3.1 Complete User Journey (START TO END)**

### **STEP 1: User Lands on Website**
**Page**: Homepage
**URL**: `/`
**What User Sees**:
```
1. Dark background with animated particles
2. "$ ls /portfolio/" text centered, glowing cyan
3. Below it, 5 script buttons in vertical line:
   - 📄 ./about.sh
   - 🎯 ./skills.sh
   - 🚀 ./projects.sh
   - 📝 ./blog.sh
   - 📬 ./contact.sh
4. Bottom hint: "click any script to initialize deployment"
5. Background: Falling code (Matrix style), particles floating
```

**Animations**:
- Script buttons: Subtle pulse/breathing (glow intensity 0.3 → 0.5 → 0.3) every 2 seconds
- Each button staggered 100ms apart (so they don't pulse together)
- Particles: Smooth movement, no sudden changes
- Code rain: Scrolling slowly down, very faint (1% opacity)

**No Profile Header Yet** ❌
**No Sidebar Yet** ❌

---

### **STEP 2A: User Clicks "$ ls /portfolio/" Command**
**Action**: Click cyan text OR any script button
**What Happens**:

**Phase 1 (500ms): Transition**
```
1. Screen darkens (overlay appears, 70% opacity)
2. Background blurs (15px blur)
3. Modal appears in center (scales from 0.8x → 1.0x)
```

**Phase 2 (4-5 seconds): Animation State (UNIQUE for $ ls)**
```
Show: SQL Query Execution Animation

Visual:
┌─────────────────────────────────────┐
│ SELECT * FROM portfolio             │
│ WHERE status = 'active'             │
│ LIMIT 1;                            │
│                                     │
│ Executing query...                  │
│ ████████░░ 80%                      │
│                                     │
│ 1 row returned ✓                    │
└─────────────────────────────────────┘

Animation Details:
- Query text types out (typewriter effect): 1500ms
- Loading spinner appears, rotates
- Status text updates: "Executing...", "Parsing...", "Complete"
- Progress bar fills (0% → 100%): 3000ms
- Success checkmark appears with green glow
```

**Phase 3 (1 second): Modal Fades Out**
```
Modal fades out (opacity 1 → 0)
Blur removes from background
Screen lightens (overlay fades)
```

**Phase 4: Result**
```
NEW ELEMENTS APPEAR:
1. Profile Header (Floating Card, Top Center)
   - Your photo (80px circle) on left
   - Name: "Aditya Pratama"
   - Title: "DevOps | SRE | Cloud Engineer"
   - Right side: Email, Location, Status, CV button
   - Glassmorphism: blur + transparent background
   - Appears with: Slide up + Fade in (300ms)

2. Script Sidebar (Left Side, Floating)
   - Vertical list of 5 scripts
   - Each with icon + name
   - Gap: 20px between each
   - Active script: Glows cyan
   - Appears with: Slide in from left (300ms)

3. Main Content Area
   - Empty/waiting
   - Shows hint: "Click a script to load content"
```

---

### **STEP 2B: User Clicks "./about.sh" (From Sidebar)**
**Action**: Click "./about.sh" option
**What Happens**:

**Phase 1 (500ms): Transition**
```
Same as above: Darken, blur, modal appears
```

**Phase 2 (3-4 seconds): Animation State (UNIQUE for about)**
```
Show: Git Branch Merge Animation

Visual:
- Two branches appear (left: "dev", right: "main")
- Small circles (commits) flow along branches
- Branches move toward each other
- They merge in the middle
- A larger circle appears (merge commit)
- Timeline appears showing your journey:
  - Birth → Education → Learning → Current
- Each milestone animates in

Color: Green (#00ff41) + Cyan (#00d9ff)
```

**Phase 3: Modal Fades Out**

**Phase 4: Content Appears**
```
Main content area now shows:
- Title: "About Aditya Pratama"
- Timeline (visual, animated)
  Year: [Milestone text]
- Bio paragraphs
- Skills highlights
- Scroll down to see more
```

---

### **STEP 2C: User Clicks "./skills.sh"**
**Action**: Click "./skills.sh"
**What Happens**:

**Phase 2: Animation State (UNIQUE for skills)**
```
Show: Kubernetes Pod Scaling Animation

Visual:
- Empty grid (5x3 = 15 nodes)
- Pods spawn one-by-one (spinning animation)
- Each pod labeled: "Docker", "Kubernetes", "Terraform", etc
- Load balancer shows traffic routing
- Shows: "15/15 pods running ✓"

Color: Purple (#8000ff) + Cyan
Duration: 4-5 seconds
```

**Phase 4: Content Appears**
```
- Title: "Skills & Technologies"
- Floating skill bubbles (3D effect)
- Each bubble shows a skill
- Hover over bubble: Shows proficiency level + details
- Interactive visualization
```

---

### **STEP 2D: User Clicks "./projects.sh"**
**Action**: Click "./projects.sh"
**What Happens**:

**Phase 2: Animation State (UNIQUE for projects)**
```
Show: Docker Build Layers Animation

Visual:
Step 1/5: FROM devops-engineer:latest
Step 2/5: COPY projects /portfolio
Step 3/5: RUN initialize-projects
Step 4/5: EXPOSE 3000
Step 5/5: CMD ["serve"]

- Each step shown as building rectangle
- Progress bar shows % complete
- Terminal-style output
- Finally: "Successfully built: projects:v1.0 ✓"

Color: Orange (#ff6b35) + Yellow
Duration: 4-5 seconds
```

**Phase 4: Content Appears**
```
- Title: "Projects"
- Grid of project cards
- Each card shows:
  - Project name
  - Description
  - Tech stack (icons)
  - Links (GitHub, Demo)
- User can click a card to see:
  - Full project details
  - Architecture diagram (animated)
  - Live demo link
```

---

### **STEP 2E: User Clicks "./blog.sh"**
**Action**: Click "./blog.sh"
**What Happens**:

**Phase 2: Animation State (UNIQUE for blog)**
```
Show: Log Stream Animation (Terminal Style)

Visual:
[INFO] Fetching blog posts...
[INFO] Building index...
[SUCCESS] 8 posts loaded ✓
[SUCCESS] Blog service ready ✓

- Each log line appears with timestamp
- Color-coded: Blue (info), Green (success)
- Cursor blinking at end
- Text animates smoothly

Color: Blue (#0066ff) + Green (#00ff41)
Duration: 3-4 seconds
```

**Phase 4: Content Appears**
```
- Title: "Blog Posts"
- List of blog posts
- Each post shows:
  - Title
  - Date published
  - Description
  - Link to read full post
- Entries appear one-by-one (staggered)
```

---

### **STEP 2F: User Clicks "./contact.sh"**
**Action**: Click "./contact.sh"
**What Happens**:

**Phase 2: Animation State (UNIQUE for contact)**
```
Show: Network Topology Diagram Animation

Visual:
- Center node: "You"
- Branches to 4 endpoints:
  • LinkedIn (latency: 45ms) ✓
  • GitHub (status: Online) ✓
  • Email (status: Active) ✓
  • Twitter (status: Online) ✓

- Glowing lines connect nodes
- Packets flow through connections
- Health indicators pulse green

Color: Green (#00ff41) + Cyan
Duration: 4-5 seconds
```

**Phase 4: Content Appears**
```
- Title: "Get in Touch"
- Contact options:
  - Email (clickable)
  - LinkedIn (button)
  - GitHub (button)
  - Twitter (button)
- Optional: Contact form (name, message, submit)
- Or: Just show links/social connections
```

---

## **3.2 Navigation Between Sections**

**After any section loads:**
```
User can:
1. Click different script in sidebar (loads that section)
2. Scroll down to see more content
3. Click profile header to refresh/reload
4. No page reload needed (all SPA - Single Page Application)
```

**Each click on sidebar:**
```
1. Current content fades out (300ms)
2. New loading animation plays (4-5s)
3. New content fades in (300ms)
```

---

# **SECTION 4: BACKGROUND ELEMENTS (ALWAYS VISIBLE)**

## **4.1 Animated Background (Global)**

### **Element 1: Particles**
```
Specifications:
- Count: 20-30 small dots
- Size: 2-4px diameter
- Color: #00d9ff (cyan) with 30% opacity
- Movement: Smooth curved paths, slow speed
- Speed: 0.5-1.5 pixels per frame
- Reset: When particle reaches edge, restart from opposite side

Animation:
- Use Canvas API for performance
- Each particle has: x, y, vx, vy (velocity)
- Update position every frame (requestAnimationFrame)
- Create smooth trails (optional)

Interaction:
- When user moves cursor near particle
- Particle subtly attracts (slight pull toward cursor)
- Not aggressive, just 10-15% movement
```

### **Element 2: Code Rain (Matrix Style)**
```
Specifications:
- Random DevOps commands scrolling down
- Example commands:
  $ docker pull aditya/portfolio:latest
  $ kubectl apply -f deployment.yaml
  $ terraform init
  $ git push origin main
  $ sudo systemctl restart devops-agent

- Position: Random x position, top to bottom
- Opacity: 1-5% (very faint, barely visible)
- Font: Fira Code, 12px
- Color: #00d9ff
- Speed: Very slow (1 command per 3-4 seconds)
- Duration: Full viewport height scroll takes 8-10 seconds

Implementation:
- Use Canvas or simple HTML elements
- Randomly select command from list
- Fade in at top, fade out at bottom
```

### **Element 3: Scan Lines (TV Effect)**
```
Specifications:
- Horizontal lines moving top to bottom
- Width: Full viewport width
- Height: 2px per line
- Opacity: 5% (very subtle)
- Color: #00d9ff

Animation:
- Move from top (y=0) to bottom (y=viewport height)
- Duration: 8 seconds per cycle
- Loop infinitely
- Create "CRT monitor" feel

Implementation:
- Use CSS animation or Canvas
- Multiple lines spaced 20px apart
```

### **Element 4: Glitch Effect (Every 8-10 Seconds)**
```
Timing:
- Random interval: 8-12 seconds
- Duration: 100-200ms

Visual Effect:
- RGB color split (chromatic aberration):
  - Red channel: shift right 2-3px
  - Green channel: no shift
  - Blue channel: shift left 2-3px
- Result: Red-cyan split look
- Add horizontal scan line distortion
- Then snap back to normal

Implementation:
- Use CSS filter or Canvas
- Or: Use mix-blend-mode with pseudo-elements
- Quick transition back to normal
```

### **Element 5: Floating Geometric Shapes (Corners)**
```
Top-Left Corner:
- Shape: Triangle
- Color: #ff006e (magenta)
- Size: 150px
- Opacity: 10-15%
- Animation: Slow rotation (one full rotation = 20 seconds)

Top-Right Corner:
- Shape: Square
- Color: #00d9ff (cyan)
- Size: 120px
- Opacity: 10-15%
- Animation: Slow rotation + scale pulse (1.0 → 1.1 → 1.0)

Bottom-Left Corner:
- Shape: Hexagon
- Color: #ffbe0b (yellow)
- Size: 100px
- Opacity: 10-15%
- Animation: Slow rotation + fade pulse

Bottom-Right Corner:
- Shape: Circle with spikes
- Color: #00ff41 (green)
- Size: 130px
- Opacity: 10-15%
- Animation: Slow rotation only

Implementation:
- SVG elements or CSS shapes
- Position: Fixed, outside viewport (partially visible)
- Use GSAP for smooth continuous rotation
```

---

# **SECTION 5: COMPONENT SPECIFICATIONS**

## **5.1 Profile Header (Floating Card)**

```
Position: Top center of page (when visible)
Type: Floating glassmorphic card

Layout:
┌─────────────────────────────────┐
│ [Photo] Name & Title  [Info...]  │
└─────────────────────────────────┘

Left Section (40%):
- Profile photo: 80px circular image
  - Border: 2px cyan glow
  - Margin-right: 16px
- Name: "Aditya Pratama"
  - Font: JetBrains Mono Bold, 24px
  - Color: #ffffff
- Title: "DevOps | SRE | Cloud Engineer"
  - Font: Inter Regular, 14px
  - Color: #8b949e

Right Section (60%):
- Grid of 4 items (2x2):
  
  Row 1:
  - EMAIL LABEL + "aditya@adityacprtm.dev" with mail icon
  - CV BUTTON (cyan border, download icon)
  
  Row 2:
  - LOCATION LABEL + "Jakarta, ID" with location icon
  - STATUS (green dot + "Available for Projects")

Typography:
- Labels: 10px uppercase, color #6e7681
- Values: 14px, color #ffffff
- Icons: 16px, inline

Styling:
- Background: rgba(22, 27, 34, 0.8) (dark gray + transparent)
- Backdrop-filter: blur(10px)
- Border: 1px solid #30363d (dark border)
- Border-radius: 12px
- Padding: 20px 24px
- Margin: 0 auto
- Max-width: 900px
- Box-shadow: 0 4px 16px rgba(0, 217, 255, 0.15)

Hover Effects:
- Box-shadow increases: 0 0 20px rgba(0, 217, 255, 0.3)
- Slight scale: 1.02x
- Duration: 300ms (smooth)

Responsive:
- Desktop (1200px+): Full width (900px max-width)
- Tablet (768px): Adjust font sizes, stack on smaller screens
- Mobile (< 768px): Stack vertically or hide non-essential info
```

## **5.2 Script Sidebar (Left Side)**

```
Position: Left side of page (when visible)
Type: Floating vertical list

Layout:
[Icon] ./about.sh
[Icon] ./skills.sh
[Icon] ./projects.sh
[Icon] ./blog.sh
[Icon] ./contact.sh

Specifications Per Item:
- Height: 50px
- Padding: 12px 16px
- Margin-bottom: 16px
- Border: 1px solid transparent
- Border-radius: 8px
- Display: Flex, align-items center, gap 12px

Icon:
- Size: 20px
- Color: #8b949e (gray)
- Change to cyan on hover/active

Text:
- Font: JetBrains Mono Regular, 14px
- Color: #8b949e
- Change to cyan on hover/active

Inactive State (other scripts):
- Background: transparent
- Border: 1px transparent
- Opacity: 0.6

Active State (current script):
- Background: rgba(0, 217, 255, 0.1)
- Border: 1px solid #00d9ff
- Color: #00d9ff
- Glow: 0 0 15px rgba(0, 217, 255, 0.3)
- Opacity: 1

Hover State:
- Background: rgba(0, 217, 255, 0.05)
- Border: 1px solid #00d9ff
- Scale: 1.05x
- Cursor: pointer
- Duration: 200ms

Container Styling:
- Width: 250px
- Position: Fixed left
- Top: 150px (below profile header)
- Padding: 20px
- Background: rgba(10, 14, 39, 0.5) (semi-transparent)
- Border-radius: 12px
- Z-index: 10

Responsive:
- Desktop (1200px+): Show as sidebar
- Tablet (768px-1199px): Reduce width to 200px, smaller text
- Mobile (< 768px): Hide sidebar, show as hamburger menu
```

## **5.3 Loading Modal (During Animation)**

```
Position: Center of screen
Type: Floating card, full-screen overlay behind it

Container:
- Width: 600px (fixed)
- Background: rgba(22, 27, 34, 0.95)
- Backdrop-filter: blur(10px)
- Border: 1px solid #00d9ff
- Border-radius: 16px
- Padding: 40px
- Box-shadow: 0 0 40px rgba(0, 217, 255, 0.3)
- Position: Center (50% from left, 50% from top)
- Z-index: 100

Overlay (Behind Modal):
- Position: Full screen
- Background: rgba(0, 0, 0, 0.7)
- Backdrop-filter: blur(8px)
- Z-index: 99

Animation Entry:
- Start: Scale 0.8x, opacity 0
- End: Scale 1.0x, opacity 1
- Duration: 300ms
- Easing: easeOut

Animation Exit:
- Start: Scale 1.0x, opacity 1
- End: Scale 0.8x, opacity 0
- Duration: 300ms

Content Inside Modal:
- Depends on which animation (see Section 3)
- Always centered, max-width 100%
- Use flexbox for centering

Responsive:
- Desktop (1200px+): 600px width
- Tablet (768px-1199px): 80% width
- Mobile (< 768px): 90% width
```

## **5.4 Main Content Area**

```
Position: Right of sidebar, below profile header
Type: Large card with content

Layout:
- Margin-left: 300px (to not overlap sidebar)
- Margin-top: 180px (below profile)
- Margin-right: 40px
- Max-width: 900px

Content Container:
- Background: rgba(22, 27, 34, 0.6)
- Border: 1px solid #30363d
- Border-radius: 12px
- Padding: 40px
- Min-height: 500px

Typography Inside:
- H2 (Section title): 32px, cyan, glow
- H3 (Subsection): 20px, white
- Paragraph: 16px, gray, line-height 1.6
- Code blocks: Fira Code, gray bg, cyan text

Animation Entry:
- Content fades in: opacity 0 → 1 (500ms)
- Slide in from right: translateX(50px) → 0 (500ms)

Animation Exit:
- Content fades out: opacity 1 → 0 (300ms)
- Slide out to left: translateX(-50px) (300ms)

Responsive:
- Desktop: Full width minus sidebar
- Tablet: Adjust margin-left, reduce padding
- Mobile: No sidebar, full width with padding
```

---

# **SECTION 6: DETAILED ANIMATION SPECIFICATIONS**

### **Animation 1: $ ls /portfolio/ (SQL Query)**

**Duration**: 4-5 seconds total
**Tools**: GSAP for timeline, Canvas for spinner

```
Timeline:
0s - 1.5s:
  - Query text appears (typewriter effect)
  - Text: "SELECT * FROM portfolio WHERE status = 'active' LIMIT 1;"
  - Type speed: 1 character every 30ms
  - Color: #00d9ff

1.5s - 3s:
  - Loading spinner appears below text
  - Spinner: Rotating circle, cyan color
  - Status text appears: "Executing query..."
  - Progress bar appears below (0% width)
  - Bar fills: 0% → 100% over 1.5 seconds
  - Color: Cyan gradient

3s - 3.5s:
  - Status text changes: "Parsing results..."
  - Progress nearly complete

3.5s - 4s:
  - Status text: "Complete ✓"
  - Success checkmark appears with animation
  - Checkmark: Draws itself (stroke animation)
  - Glow: 0 0 20px green color

4s - 4.5s:
  - Result text appears: "1 row returned ✓"
  - Font: Smaller, green color
  - Scale animation: 0.5x → 1.0x

4.5s - 5s:
  - Pause before fade out
  - All elements glow slightly

Exit (5s - 5.5s):
  - Everything fades out (opacity 1 → 0)
  - Modal scales down (1.0x → 0.8x)
  - After: Profile header slides up
```

### **Animation 2: ./about.sh (Git Merge)**

**Duration**: 3-4 seconds total
**Tools**: Framer Motion for branches, GSAP for merge

```
Timeline:
0s - 0.5s:
  - Two branches appear (simple lines)
  - Left branch: labeled "dev"
  - Right branch: labeled "main"
  - Both start vertical, 200px apart

0.5s - 2s:
  - Commits flow along branches (small circles)
  - Each commit: 20px circle, cyan color
  - Commits move down each branch
  - Stagger: One commit every 200ms
  - Total: 5-6 commits on each branch

2s - 2.5s:
  - Branches curve toward each other
  - Movement: Smooth, easing function
  - Branches meet in middle

2.5s - 3s:
  - Merge commit appears at intersection
  - Larger circle (30px), green color
  - Animation: Scale in + rotate (checkmark appear inside)
  - Text appears: "Merged successfully ✓"

3s - 4s:
  - Timeline appears below
  - Timeline shows: Birth → Education → Learning → DevOps
  - Each milestone: Icon + year + text
  - Appear one-by-one with stagger (100ms)
  - Milestone animation: Slide in + fade in

Exit:
  - Everything fades out
  - Then content slides in from right
```

### **Animation 3: ./skills.sh (K8s Pod Scaling)**

**Duration**: 4-5 seconds total
**Tools**: Three.js for 3D grid, Canvas for pods

```
Timeline:
0s - 0.5s:
  - Grid appears (5x3 = 15 node slots)
  - Grid is 3D perspective
  - Background: Semi-transparent
  - Each node: 60px square, dark border

0.5s - 3.5s:
  - Pods spawn one-by-one
  - Each pod: Spinning cube animation (rotateY)
  - Pod fills slot with scaling animation (0.5x → 1.0x)
  - Each pod labeled: Skill name (Docker, K8s, etc)
  - Color: Different color per skill
  - Stagger: 150ms between each pod
  - Total pods appear: 15

3.5s - 4s:
  - Load balancer visualization appears (top)
  - Load balancer: Triangle/diamond shape
  - Animated arrows flow down to pods
  - Text: "Load balanced across 15 pods ✓"

4s - 4.5s:
  - All pods glow together
  - Pulsing animation (opacity 0.8 → 1.0)
  - Counter appears: "15/15 pods running ✓"

Exit:
  - Grid fades out
  - Pods animate away (fly off screen)
  - Content slides in
```

### **Animation 4: ./projects.sh (Docker Build)**

**Duration**: 4-5 seconds total
**Tools**: GSAP for timeline, SVG for rectangles

```
Timeline:
0s - 0.5s:
  - Title appears: "Building image: projects:latest"
  - Font: Cyan, monospace

0.5s - 1.5s:
  Step 1/5: FROM devops-engineer:latest
  - Rectangle appears (expanding horizontally)
  - Text types out
  - Progress dot: ● (green when complete)
  - Duration: 1s

1.5s - 2.5s:
  Step 2/5: COPY projects /portfolio
  - Same as step 1
  - Rectangle expands further
  - New rectangle below step 1

2.5s - 3.5s:
  Step 3/5: RUN initialize-projects
  - Same format
  - Takes 1s

3.5s - 4s:
  Step 4/5: EXPOSE 3000
  - Shorter step (0.5s)

4s - 4.5s:
  Step 5/5: CMD ["serve"]
  - Final step

Overall Progress Bar:
  - Appears on right side
  - Fills 0% → 100% over entire 4.5s
  - Shows percentage: "0%", "20%", "40%", etc

Success Message:
  - After all steps: "Successfully built: projects:v1.0 ✓"
  - Green checkmark animation
  - Glow effect

Exit:
  - All fades out
  - Content slides in
```

### **Animation 5: ./blog.sh (Log Stream)**

**Duration**: 3-4 seconds total
**Tools**: CSS animations, Canvas for terminal effect

```
Timeline:
0s - 0.3s:
  - Terminal window appears (size in, fade in)
  - Background: Dark gray
  - Cursor blinking

0.3s - 0.8s:
  [INFO] Fetching blog posts from database...
  - Line appears with timestamp: [13:24:15]
  - Color: Blue (#0066ff)
  - Cursor moves to next line

0.8s - 1.2s:
  [INFO] Building search index...
  - Same format

1.2s - 1.6s:
  [INFO] Compiling markdown to HTML...
  - Same format

1.6s - 2s:
  [SUCCESS] 8 blog posts loaded ✓
  - Color: Green (#00ff41)
  - Checkmark animation

2s - 2.5s:
  [SUCCESS] Blog service ready ✓
  - Same as above

2.5s - 3s:
  - Cursor keeps blinking
  - Terminal waits

Exit:
  - Terminal fades out
  - Content (blog list) slides in from bottom
  - Each blog post animates in with stagger
```

### **Animation 6: ./contact.sh (Network Topology)**

**Duration**: 4-5 seconds total
**Tools**: Three.js for 3D or SVG for 2D

```
Timeline:
0s - 0.5s:
  - Center node appears: "You" or profile name
  - Node: Larger circle, cyan color
  - Animation: Scale in + rotate

0.5s - 1.5s:
  - Connection to LinkedIn appears
  - Glowing line draws itself (stroke animation)
  - Endpoint node appears
  - Label: "LinkedIn" with icon
  - Latency appears: "45ms"
  - Color: Cyan glow

1.5s - 2.5s:
  - Connection to GitHub appears
  - Same as LinkedIn
  - Status: "Online ✓" (green dot)

2.5s - 3.5s:
  - Connection to Email appears
  - Same as above
  - Status: "Active ✓"

3.5s - 4s:
  - Connection to Twitter appears
  - Same as above
  - Status: "Online ✓"

4s - 4.5s:
  - All connections pulse together
  - Packet animation: Small dots flow from center to endpoints
  - Health check: "All services operational ✓"

Exit:
  - Network fades out
  - Contact cards slide in
```

---

# **SECTION 7: INFORMATION COLLECTION CHECKLIST**

**Ask Aditya for:**

- [ ] Professional photo (800x800px, PNG or JPG)
- [ ] Full bio (2-3 paragraphs)
- [ ] Current learning goals
- [ ] List of 10+ skills with proficiency levels
- [ ] 4+ completed projects with details:
  - Project name
  - Description (2-3 sentences)
  - Tech stack (list)
  - GitHub link
  - Live demo link (if available)
  - Project image/screenshot
  - Architecture diagram (or description to create)
- [ ] 3+ blog posts (if any):
  - Title, description, link, date
- [ ] Work experience (3+ roles):
  - Company, position, duration, description
- [ ] Education details
- [ ] Social media links (GitHub, LinkedIn, Twitter, etc)

---

# **NEXT STEPS FOR ANTIGRAVITY**

1. **REVIEW this document thoroughly**
2. **Ask clarifying questions** if anything is unclear
3. **Collect all information** from Aditya using the checklist
4. **Start with PHASE 1**: Build homepage only
5. **Then PHASE 2**: Build loading animations
6. **Then PHASE 3**: Build content pages
7. **Test on desktop, tablet, mobile**
8. **Deploy to Vercel**

---

**END OF COMPLETE SPECIFICATION**

This document is your BIBLE. Everything here is specific, actionable, and ready to implement.
