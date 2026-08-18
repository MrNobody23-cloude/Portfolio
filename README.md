# 🖥️ AARYAN OS — Web Desktop Portfolio

> A product-grade, high-end Web Desktop Operating System & Interactive Developer Portfolio built with React, Vite, Tailwind CSS, and Node.js/Express.

![AARYAN OS Architecture](https://img.shields.io/badge/AARYAN_OS-v1.1.0-emerald?style=for-the-badge&logo=react)
![Stack](https://img.shields.io/badge/Stack-MERN_/_Vite-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-amber?style=for-the-badge)

---

## 💡 Overview

**AARYAN OS** transforms a traditional developer portfolio into an interactive, multi-window Web Desktop environment. Built from the ground up with clean React architecture, stateful window management, custom UI design tokens, and real-time backend health monitoring, it delivers a memorable experience for recruiters and developers.

---

## 🌟 Key Features

### 🖥️ Desktop & Window Management
- **Stateful Window Manager (`WindowManager`)**: Smooth window drag, resize, maximize/restore, minimize, and z-index layering.
- **Taskbar & System Tray (`Taskbar`, `SystemTray`)**: Active app indicators, real-time clock, quick diagnostic shortcuts, and live backend health indicators.
- **Command Palette & Hotkeys**: Press `Ctrl + K` (or `Cmd + K`) anywhere to summon the universal search and app launcher.
- **Start Menu & Context Menu**: Desktop shortcuts, system power options, and custom right-click context menus.

### 📁 In-Window File Explorer (`ExplorerApp`)
- **Unified Navigation**: Sidebar directory clicks update the existing window's directory contents, breadcrumb, and active highlights without spawning extra application windows.
- **Breadcrumb & History**: Full history stack with Back (`←`) and Forward (`→`) buttons and path indicators (`AARYAN_OS > PROJECTS`).
- **File System Interactions**: Single-click item selection and double-click opening for subfolders, `.app` packages, `.pdf` documents, and career logs.

### 💻 Interactive Command-Line Interface (`TerminalApp`)
- **CLI Utilities**: Execute commands such as `neofetch`, `whoami`, `projects`, `skills`, `experience`, `education`, `achievements`, `resume`, `contact`, `matrix`, `clear`, and `sudo hire aaryan`.
- **Command History**: Navigate previous inputs using Up/Down arrow keys.

### ⚡ Real-Time Server Health Check & Boot Sequence
- **Deterministic Boot Sequence (`BootScreen`)**: Displays a 4.5-second progressive OS initialization sequence on every fresh landing/refresh.
- **Real Backend Probing**: Queries `GET /api/health` with a 4-second timeout to verify server availability.
- **Live Status Polling**: Polls backend status every 15 seconds, dynamically toggling taskbar indicators between **`● ONLINE`** (emerald), **`● OFFLINE`** (rose), and **`● CHECKING`** (amber) without requiring page reloads.

### 🎨 Personalization & Theme Engine (`SettingsApp`, `OSContext`)
- **Global Theme Modes**: Dark Graphite, Warm Ivory, Cyber Terminal, Solarized Dark, Midnight Purple, and Clean Paper.
- **Dynamic Accent System**: Custom accent color pickers (Brass Gold, Olive Green, Terracotta Red, Sapphire Blue, Emerald Green, Violet Purple) that propagate instantly across all OS elements via CSS variables.

---

## 🏗️ Project Architecture

```text
Portfolio/
├── frontend/                     # React Single-Page OS Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── apps/            # Web Apps (ExplorerApp, TerminalApp, SettingsApp, ProjectsApp, etc.)
│   │   │   ├── boot/            # BootScreen initialization sequence
│   │   │   ├── desktop/         # Desktop background, icons, and ContextMenu
│   │   │   ├── taskbar/         # Taskbar, StartMenu, and SystemTray with health check
│   │   │   ├── ui/              # Reusable UI wrappers & SystemStatusWrapper
│   │   │   └── window/          # WindowFrame & WindowManager
│   │   ├── context/
│   │   │   └── OSContext.jsx    # Central OS state, themes, window manager & server health loop
│   │   ├── data/
│   │   │   └── portfolioData.js # Application registry & static desktop configurations
│   │   ├── services/
│   │   │   └── api.js           # Fetch API service with in-memory caching & timeout probing
│   │   ├── index.css            # Central CSS variables theme engine
│   │   ├── App.jsx              # Main app entry & BootScreen / Desktop router
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/                      # Node.js & Express API Server
│   ├── data/                    # JSON Content Storage
│   │   ├── about.json           # Biography & personal info
│   │   ├── achievements.json    # Hackathons & awards data
│   │   ├── education.json       # Academic background
│   │   ├── experience.json      # Career timeline
│   │   ├── profiles.json       # Coding platform handles
│   │   ├── projects.json        # Detailed project repositories
│   │   ├── resume.json          # Resume metadata
│   │   └── skills.json          # Technical skill proficiencies
│   ├── routes/
│   │   └── api.js               # REST API Endpoints & Health Check
│   ├── server.js                # Express app initialization & CORS setup
│   └── package.json
│
└── README.md
```

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
|---|---|---|
| **Frontend Framework** | React 18 | Declarative component hierarchy and hooks |
| **Build System** | Vite 5 | Fast HMR & optimized production bundling |
| **Styling** | Tailwind CSS | Utility-first styling & custom CSS variables integration |
| **Icons** | Lucide React | Clean, modern iconography |
| **State Management** | React Context API (`OSContext`) | Central OS state provider |
| **Backend Runtime** | Node.js / Express.js | Lightweight REST API server |
| **Persistence** | File-backed JSON store | Fast, file-based data layer (`backend/data/`) |

---

## 📡 REST API Reference

The backend API server runs by default on `http://localhost:5000`.

| Endpoint | Method | Description |
|---|---|---|
| `/api/health` | `GET` | Server health check endpoint returning HTTP 200 `{ status: "ok" }` |
| `/api/profile` | `GET` | Fetches personal biography, status, and contact details |
| `/api/projects` | `GET` | Fetches list of verified software projects and repositories |
| `/api/projects/:id` | `GET` | Fetches single project detail by ID |
| `/api/skills` | `GET` | Fetches technical skills categorized with proficiency levels |
| `/api/experience` | `GET` | Fetches career history and professional experience timeline |
| `/api/education` | `GET` | Fetches academic degree and institution details |
| `/api/achievements`| `GET` | Fetches hackathon awards, honors, and certificates |
| `/api/resume` | `GET` | Fetches resume metadata and download URL |
| `/api/profiles` | `GET` | Fetches competitive coding platform links and statistics |
| `/api/contact` | `POST` | Processes and logs contact message submissions |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)

### 1. Installation

Clone the repository and install dependencies for both `backend` and `frontend`:

```bash
# Clone repository
git clone https://github.com/aaryanpatel/portfolio.git
cd portfolio

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Development Mode

Run the backend and frontend in separate terminals:

**Terminal 1 — Backend API Server:**
```bash
cd backend
npm run dev
# Server running on http://localhost:5000
```

**Terminal 2 — Frontend Application:**
```bash
cd frontend
npm run dev
# Application running on http://localhost:5173
```

Now open `http://localhost:5173` in your browser. You will experience the **AARYAN OS** boot sequence followed by the interactive web desktop!

---

## 📊 Live Server Health Monitoring

The frontend automatically detects backend server status:

1. **Backend Running (`http://localhost:5000`)**: Taskbar displays **`● ONLINE`** (emerald indicator).
2. **Backend Stopped**: Taskbar automatically updates to **`● OFFLINE`** (rose indicator) within 15 seconds.
3. **Backend Restored**: Taskbar automatically reverts to **`● ONLINE`** without requiring a page refresh.

> [!NOTE]
> Even if the backend server is offline, the AARYAN OS desktop frontend remains fully interactive and functional.

---

## 👨‍💻 Author

**Aaryan Patel**
- Computer Engineering Student & Full Stack Developer
- **Location:** Navi Mumbai, India
- **GitHub:** [@MrNobody23-cloude](https://github.com/MrNobody23-cloude)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — feel free to use and customize it for your own portfolio projects!
