# Editco.Media - Website Documentation

## 🎯 Project Overview

Editco.Media is a modern, premium website showcasing the agency's services, portfolio, team, and client engagement capabilities. Built with React and Node.js, the website features smooth animations, glassmorphism effects, and a clean, professional design.

<!-- **Live Website:** [editcomedia.com](https://editcomedia.com) -->

---

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - Modern UI library
- **Vite 7.2.4** - Fast build tool and dev server
- **CSS3** - Custom styling with glassmorphism effects
- **JavaScript (ES6+)** - Modern JavaScript features

### Backend
- **Node.js** - Runtime environment
- **Express 5.2.1** - Web framework
- **MongoDB** - Database (via Mongoose)
- **Mongoose 9.1.1** - MongoDB ODM
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcryptjs** - Password hashing
- **cookie-parser** - Cookie management

---

## 📁 Project Structure

```
editcomedia/
├── frontend/
│   └── frontend/
│       ├── src/
│       │   ├── components/
│       │   │   ├── Navbar.jsx & Navbar.css
│       │   │   ├── Hero.jsx & Hero.css
│       │   │   ├── ServicesSection.jsx & ServicesSection.css
│       │   │   ├── ServiceCard.jsx & ServiceCard.css
│       │   │   ├── WorksSection.jsx & WorksSection.css
│       │   │   ├── OurTeamSection.jsx & OurTeamSection.css
│       │   │   ├── TeamCard.jsx & TeamCard.css
│       │   │   ├── RenderEngineSection.jsx & RenderEngineSection.css
│       │   │   ├── BuiltBySection.jsx & BuiltBySection.css
│       │   │   ├── LoginSection.jsx & LoginSection.css
│       │   │   ├── Footer.jsx & Footer.css
│       │   │   └── GetStartedForm.jsx & GetStartedForm.css
│       │   ├── App.jsx
│       │   ├── App.css
│       │   └── main.jsx
│       ├── package.json
│       └── vite.config.js
│
└── backend/
    ├── src/
    │   ├── config/
    │   │   └── db.js
    │   ├── controllers/
    │   │   └── authController.js
    │   ├── middleware/
    │   │   └── validation.js
    │   ├── models/
    │   │   └── User.js
    │   └── routes/
    │       └── auth.js
    ├── index.js
    └── package.json
```

---

## ✨ Key Features

### 1. **Hero Section**
- Animated grid background with cursor-following glow effect
- Clean, bold typography
- Call-to-action buttons (Get Started, Explore Work)
- Smooth scroll navigation

### 2. **Services Section**
- Scroll-locked card carousel
- Glassmorphism card design with high blur effects
- 12 service offerings displayed sequentially
- Smooth transitions between cards
- Intro card: "What We Ship"

### 3. **Works/Portfolio Section**
- Grid layout showcasing projects
- Project filtering (All, AI Automations, Websites, Other)
- Gallery modal for AI Automations project
- External links to deployed projects
- "View all projects" inline expansion

### 4. **Team Section**
- Three co-founders displayed
- Hover effects revealing LinkedIn profiles
- Glassmorphism card design
- Premium dark theme

### 5. **Why Editco Section**
- Circular flow diagram with SVG paths
- Animated text labels positioned along the flow
- Dark theme with yellow accents
- Smooth transitions

### 6. **Our Impact Section**
- Three impact cards with statistics
- Clean, readable typography
- Dark theme consistency

### 7. **Built by Editco Section**
- Three internal projects showcased
- Links to agency platforms
- Card-based layout

### 8. **Login/Registration Section**
- User authentication system
- Registration and login forms
- JWT token-based authentication
- Cookie-based session management
- Spotlight effect on section

### 9. **Get Started Form**
- Comprehensive project inquiry form
- Multi-step form sections:
  - Your Info (Name, Email, Phone)
  - Project Basics (Type, Budget, Timeline)
  - Service Selection (Checkboxes)
  - Project Details (Textarea)
- Form validation
- Success message display
- Hash-based routing for form page

### 10. **Footer**
- Brand information
- Social media links (LinkedIn, Instagram)
- Quick navigation links
- Contact information

---

## 🎨 Design System

### Color Palette
- **Primary Black:** `#000000`
- **Dark Grey:** `#313131`
- **Yellow Accent:** `#FFD600`
- **White:** `#ffffff`

### Typography
- Clean, modern sans-serif fonts
- Bold headings with letter-spacing adjustments
- Readable body text with proper line-height

### Effects
- **Glassmorphism:** High blur backdrop filters (`backdrop-filter: blur(800px)`)
- **Smooth Animations:** CSS transitions with `cubic-bezier(0.4, 0, 0.2, 1)`
- **Scroll Animations:** Intersection Observer API
- **Grid Glow:** Cursor-following radial gradients

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database (or MongoDB Atlas)
- npm or yarn

### Frontend Setup

```bash
cd frontend/frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` (default Vite port)

### Backend Setup

1. **Install Dependencies**
```bash
cd backend
npm install
```

2. **Configure Database**
   - Create a `.env` file in the `backend` directory
   - Copy the following template and fill in your values:
   ```
   MONGO_URI=your_mongodb_connection_string_here
   JWT_SECRET=your-secret-key-here
   PORT=5000
   ```
   - **IMPORTANT:** Never commit the `.env` file to git. It's already in `.gitignore`
   - Get your MongoDB URI from MongoDB Atlas dashboard

3. **Environment Variables** (Required)
   - `MONGO_URI` - MongoDB connection string (required)
   - `JWT_SECRET` - Secret key for JWT tokens (required)
   - `PORT` - Server port (optional, defaults to 5000)

4. **Start Server**
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

---

## 📝 Component Details

### Navbar Component
- Fixed navigation bar
- Smooth scroll to sections
- Hash-based routing for "Get Started"
- Responsive design

### Hero Component
- Full viewport height section
- Animated grid background
- Mouse tracking for glow effect
- Call-to-action buttons

### ServicesSection Component
- Scroll-locked card carousel
- Uses `requestAnimationFrame` for smooth animations
- Wheel event handling for card navigation
- Smooth interpolation (lerp) for transitions
- 12 service cards + intro card

### WorksSection Component
- Project grid layout
- Modal for image galleries
- Filter system for project categories
- Inline expansion for "View all projects"

### OurTeamSection Component
- Three team member cards
- Intersection Observer for scroll animations
- Hover effects with LinkedIn integration

### RenderEngineSection Component
- Contains "Why Editco" flow diagram
- Contains "Our Impact" statistics
- SVG-based circular flow visualization
- Animated text positioning

### LoginSection Component
- User registration form
- User login form
- Toggle between registration/login
- Backend integration for authentication
- Success redirect to home

### GetStartedForm Component
- Full-page form (hash-based routing)
- Multi-section form layout
- Form validation
- Success state display
- Ready for n8n webhook integration

---

## 🔐 Backend Architecture

### MVC Pattern
- **Models:** User schema definition (`User.js`)
- **Views:** Not applicable (API only)
- **Controllers:** Business logic (`authController.js`)
- **Routes:** API endpoints (`auth.js`)
- **Middleware:** Validation (`validation.js`)

### API Endpoints

#### POST `/api/auth/register`
- Register a new user
- Body: `{ firstName, lastName, emailID, password, gender, age }`
- Returns: Success message

#### POST `/api/auth/login`
- Login existing user
- Body: `{ emailID, password }`
- Returns: Success message + sets HTTP-only cookie with JWT token

#### POST `/api/auth/logout`
- Logout user
- Clears authentication cookie

### Database Schema

**User Model:**
```javascript
{
  firstName: String (required)
  lastName: String (required)
  emailID: String (required, unique)
  password: String (required, hashed)
  gender: String (required, enum: ['male', 'female', 'other'])
  age: Number (required)
  timestamps: true
}
```

---

## 🎯 Key Implementation Details

### Scroll Locking (Services Section)
- Custom wheel event handler
- Prevents default scroll behavior within section
- Smooth card-by-card navigation
- Allows natural scroll at section boundaries

### Glassmorphism Effects
- High blur values (`backdrop-filter: blur(800px)`)
- Semi-transparent backgrounds
- Border highlights
- Layered z-index management

### Smooth Animations
- `requestAnimationFrame` for performance
- Lerp (linear interpolation) for smooth transitions
- CSS transitions with cubic-bezier timing
- Intersection Observer for scroll-triggered animations

### Hash-Based Routing
- Single-page application navigation
- Hash change detection (`#get-started`)
- Conditional rendering based on hash
- Smooth scroll to sections

---

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints:
  - Desktop: Default styles
  - Tablet: `@media (max-width: 768px)`
  - Mobile: `@media (max-width: 480px)`
- Flexible layouts with CSS Grid and Flexbox
- Touch-friendly interactions

---

## 🔄 Future Enhancements

### Planned Features
1. **n8n Integration:** Connect Get Started form to n8n automation workflow
2. **Protected Routes:** Implement authentication middleware for admin sections
3. **Content Management:** Admin panel for updating content
4. **Analytics:** User behavior tracking
5. **SEO Optimization:** Meta tags, structured data
6. **Performance:** Image optimization, lazy loading
7. **Accessibility:** ARIA labels, keyboard navigation improvements

---

## 🐛 Known Issues & Solutions

### Select Dropdown Styling
- Browser default styling limitations for `<select>` options
- Some browsers show default blue highlight (browser limitation)
- Select element itself styled correctly

### Scroll Locking Edge Cases
- Smooth transitions at section boundaries
- Handled with threshold checks in wheel event handler

---

## 📄 License

This project is proprietary software for Editco.Media.

---

## 👥 Team

- **Tej Balam** - Co-founder
- **Deepika Mundla** - Co-founder  
- **Harsha Polina** - Co-founder

---

## 📞 Contact

- **Email:** hello@editco.media
- **LinkedIn:** [Editco.Media](https://www.linkedin.com/company/editcomedia)
- **Instagram:** [@editco.media](https://www.instagram.com/editco.media/)

---

## 🏗️ Development Timeline

- **Initial Setup:** React + Vite project structure
- **Design Implementation:** Dark theme with glassmorphism
- **Component Development:** All sections built incrementally
- **Backend Integration:** User authentication system
- **Animations & Effects:** Scroll locking, smooth transitions
- **Form Implementation:** Get Started form with validation
- **Polish & Optimization:** Code cleanup, unused file removal

---

## 📚 Technologies Used in Detail

### Frontend Libraries
- **React:** Component-based UI development
- **Vite:** Fast HMR and optimized builds
- **ESLint:** Code quality and consistency

### Backend Libraries
- **Express:** RESTful API server
- **Mongoose:** MongoDB object modeling
- **JWT:** Secure token-based authentication
- **bcryptjs:** Password security
- **cookie-parser:** HTTP cookie parsing

### CSS Features
- CSS Grid & Flexbox: Layout systems
- Backdrop Filter: Glassmorphism effects
- CSS Animations: Smooth transitions
- Custom Properties: CSS variables
- Media Queries: Responsive design

---

## 🎨 Design Philosophy

Editco.Media website follows these design principles:

1. **Minimalism:** Clean, uncluttered interfaces
2. **Premium Feel:** High-quality visuals and interactions
3. **Performance:** Fast loading and smooth animations
4. **Accessibility:** Readable typography and clear navigation
5. **Consistency:** Unified color scheme and design language

---

**Last Updated:** January 2025
**Version:** 1.0.0

