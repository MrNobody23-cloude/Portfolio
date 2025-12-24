# Portfolio - Full Stack MERN Application

A modern, space-themed portfolio website built with the MERN stack featuring dynamic data fetching and stunning animations.

## 🚀 Project Structure

```
Portfolio/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── MyInfo/
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── backend/           # Node.js/Express backend API
│   ├── server.js
│   ├── routes/
│   │   └── api.js
│   ├── data/          # JSON data files
│   │   ├── skills.json
│   │   ├── projects.json
│   │   ├── experience.json
│   │   ├── profiles.json
│   │   └── about.json
│   └── package.json
│
└── README.md
```

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Lucide React Icons

**Backend:**
- Node.js
- Express.js
- CORS

## ⚡ Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd Portfolio
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

### Running the Application

You need to run both frontend and backend servers:

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
```
Backend will run on: `http://localhost:5000`

**Terminal 2 - Frontend Server:**
```bash
cd frontend
npm run dev
```
Frontend will run on: `http://localhost:5173`

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/skills` | GET | Get all skills data |
| `/api/projects` | GET | Get all projects |
| `/api/experience` | GET | Get experience timeline |
| `/api/profiles` | GET | Get coding platform profiles |
| `/api/about` | GET | Get about section data |

## 📝 Data Management

All portfolio data is stored in JSON files located in `backend/data/`. To update your portfolio:

1. Navigate to `backend/data/`
2. Edit the respective JSON file
3. Restart the backend server
4. Changes will reflect immediately

## 🎨 Features

- ✅ Space-themed dark UI
- ✅ Dynamic scroll animations
- ✅ Interactive components
- ✅ Responsive design
- ✅ API-driven content
- ✅ Coding profiles showcase
- ✅ Project gallery
- ✅ Skills visualization
- ✅ Experience timeline

## 🔧 Development

**Backend Development:**
- Uses nodemon for hot reload
- CORS configured for frontend origin
- JSON-based data storage

** Development:**
- Vite for fast HMR
- Tailwind CSS for styling
- Component-based architecture

## 📦 Production Build

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
npm start
```

## 👨‍💻 Author

**Aaryan Patel**
- Full Stack Developer
- [GitHub](https://github.com/aaryanpatel)
- [LeetCode](https://leetcode.com/aaryan_dev)

## 📄 License

MIT License - feel free to use this project for your own portfolio!

---

Built with ❤️ using the MERN stack
