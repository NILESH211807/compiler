# 🚀 Code Compiler - Online Code Execution Platform

A full-stack web application that allows users to write, run, and share code snippets in multiple programming languages. The platform features a modern UI with Monaco Editor, Docker-based code execution, and shareable code snippets.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Supported Languages](#supported-languages)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Security Features](#security-features)
- [Key Components](#key-components)
- [UI Preview](#ui-preview)
- [Future Enhancements](#future-enhancements)

---

## 📖 Overview

**Code Compiler** is an online IDE that enables users to:
- Write code in 9+ programming languages
- Execute code in isolated Docker containers
- View real-time output and error messages
- Share code snippets via unique shareable links
- Support for standard input (stdin)
- Dark mode UI with modern design

The project uses a microservices architecture with a Next.js frontend and Express.js backend, ensuring scalability and maintainability.

---

## ✨ Features

### Core Features

✅ **Multi-Language Support**
- JavaScript/Node.js
- Python
- Java
- C++
- C
- Go
- Rust
- PHP
- Support for multiple language versions

✅ **Code Editor**
- Monaco Editor (VS Code-like experience)
- Syntax highlighting
- Auto-completion
- Line numbers and themes
- Custom dark theme optimization

✅ **Code Execution**
- Docker-containerized execution environment
- Isolated and secure code execution
- Real-time output display
- Error handling and error messages
- Support for standard input (stdin)

✅ **Code Sharing**
- Generate unique shareable links
- Store code snippets in MongoDB
- View shared code with original formatting
- Copy shared code for editing

✅ **User Interface**
- Responsive design (mobile, tablet, desktop)
- Dark mode theme
- Language selector dropdown
- Run and Share buttons
- Loading states and animations
- Toast notifications for user feedback

✅ **Security**
- Code validation against dangerous patterns
- Memory and CPU limits per execution
- Process limit enforcement
- No network access from containers
- Dangerous imports/functions blocked (child_process, fs, os, etc.)

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **Next.js 15.5** | React framework with server-side rendering |
| **React 19** | UI component library |
| **TailwindCSS 4** | Utility-first CSS framework |
| **Monaco Editor** | Advanced code editor component |
| **Axios** | HTTP client for API requests |
| **Lucide React** | Icon library |
| **React Hot Toast** | Toast notifications |
| **Sonner** | Alternative toast notifications |
| **Next Themes** | Dark mode support |

### Backend
| Technology | Purpose |
|------------|---------|
| **Express.js 5.1** | Web framework |
| **Node.js** | Runtime environment |
| **MongoDB 8.19** | NoSQL database |
| **Mongoose** | MongoDB ODM |
| **Dockerode 4.0** | Docker API client |
| **Joi 18.0** | Schema validation |
| **UUID 13.0** | Unique identifier generation |
| **fs-extra** | File system utilities |
| **CORS** | Cross-origin resource sharing |
| **Dotenv** | Environment configuration |

### Infrastructure
| Technology | Purpose |
|------------|---------|
| **Docker** | Container runtime for code isolation |
| **MongoDB** | Cloud database (Atlas or self-hosted) |
| **Node 20 Docker Image** | Base image for backend container |

---

## 🎯 Supported Languages

| Language | Version | Docker Image | Compilation |
|----------|---------|--------------|-------------|
| JavaScript | Node 20 | `node:20` | JIT compiled |
| Python | 3.11 | `python:3.11` | Interpreted |
| Java | 21 | `openjdk:21` | Compiled to bytecode |
| C++ | Latest (GCC) | `gcc:latest` | Compiled (-O2, C++17) |
| C | Latest (GCC) | `gcc:latest` | Compiled (-O2) |
| Go | Latest | `golang:latest` | Compiled |
| Rust | Latest | `rust:latest` | Compiled |
| PHP | Latest | `php:latest` | Interpreted |

---

## 📁 Project Structure

### Backend Structure
```
backend/
├── app.js                          # Main Express application
├── package.json                    # Backend dependencies
├── Dockerfile                      # Container configuration
├── nodemon.json                    # Development watch config
├── config/
│   └── db.js                       # MongoDB connection
├── controllers/
│   └── compiler.controller.js      # Request handlers & business logic
├── models/
│   └── share.model.js              # MongoDB Share schema
├── routers/
│   └── compiler.router.js          # API route definitions
├── middlewares/
│   └── errorHandler.js             # Error handling middleware
├── utils/
│   ├── docker.js                   # Docker execution logic
│   └── getLangConfig.js            # Language configurations
├── validator/
│   └── runCodeSchema.js            # Input validation schemas
└── temp/                           # Temporary code storage
```

### Frontend Structure
```
frontend/
├── package.json                    # Frontend dependencies
├── next.config.mjs                 # Next.js configuration
├── jsconfig.json                   # JavaScript config
├── tailwind.config.js              # Tailwind configuration
├── postcss.config.mjs              # PostCSS configuration
├── src/
│   ├── app/
│   │   ├── layout.js               # Root layout with providers
│   │   ├── globals.css             # Global styles
│   │   ├── page.jsx                # Home page
│   │   ├── (publicPages)/
│   │   │   ├── layout.jsx          # Public pages layout
│   │   │   ├── [language]/
│   │   │   │   └── page.jsx        # Language-specific compiler page
│   │   │   └── share/
│   │   │       └── [shareId]/
│   │   │           └── page.jsx    # Shared code viewer page
│   ├── components/
│   │   ├── Compiler.jsx            # Main compiler component
│   │   ├── LanguagesList.jsx       # Language selector dropdown
│   │   ├── Navbar.jsx              # Navigation bar
│   │   ├── Loader.jsx              # Loading spinner
│   │   ├── ShareLink.jsx           # Share modal component
│   │   └── ui/
│   │       ├── tooltip.jsx         # Tooltip components
│   │       └── sonner.jsx          # Toast setup
│   ├── pages/
│   │   └── Compiler.jsx            # Main compiler logic
│   ├── utils/
│   │   ├── fetch.js                # Axios wrapper
│   │   ├── languages.js            # Language configurations
│   │   ├── copy.js                 # Clipboard utility
│   │   └── getShareData.js         # Share API calls
│   └── assets/
│       └── images/                 # Language icons
└── components.json                 # Component library config
```

---

## 🚀 Installation

### Prerequisites
- Node.js 20.x or higher
- npm or yarn
- Docker and Docker Daemon running
- MongoDB (local or cloud - MongoDB Atlas)
- Git

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd compiler
```

### Step 2: Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in `backend` directory:
```env
PORT=5000
CLIENT_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/compiler
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/compiler
NODE_ENV=development
```

### Step 3: Frontend Setup
```bash
cd ../frontend
npm install
```

Create `.env.local` file in `frontend` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Step 4: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Or for development with auto-reload:
npx nodemon app.js
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Runs on http://localhost:3000
```

---

## ⚙️ Configuration

### Environment Variables

#### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:3000` |
| `MONGODB_URI` | Database connection string | `mongodb://localhost/compiler` |
| `NODE_ENV` | Environment mode | `development` / `production` |

#### Frontend (.env.local)
| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:5000` |

### Docker Configuration
The backend uses Dockerode to execute user code in isolated containers with:
- **Memory Limit**: 128 MB
- **CPU Limit**: 0.5 CPU cores
- **Process Limit**: 50 processes max
- **Network**: Disabled (no internet access)
- **Auto-cleanup**: Containers removed after execution

---

## 📖 Usage

### Running Code

1. **Select Language**: Click the language dropdown in navbar
2. **Write Code**: Edit code in Monaco Editor
3. **Add Input (Optional)**: Provide stdin data if needed
4. **Run Code**: Click "Run" button
5. **View Output**: See results in the output panel

### Sharing Code

1. **Write/Run Code**: Prepare code snippet
2. **Click Share**: Opens share modal
3. **Generate Link**: Creates unique shareable link
4. **Copy/Send**: Copy URL and share with others
5. **View Shared Code**: Anyone can view at `/share/[shareId]`

### Examples

#### JavaScript
```javascript
console.log('Hello World');
```

#### Python
```python
name = input("Enter your name: ")
print(f"Hello, {name}!")
```

#### Java
```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
```

---

## 🔗 API Endpoints

### Code Execution
**POST** `/api/code/run`
```json
{
  "code": "console.log('Hello');",
  "language": "javascript",
  "input": ""  // optional
}
```

**Response:**
```json
{
  "output": "Hello\n",
  "error": null,
  "exitCode": 0
}
```

### Share Code
**POST** `/api/code/share`
```json
{
  "code": "print('Hello')",
  "language": "python",
  "shareId": "optional-existing-id"
}
```

**Response:**
```json
{
  "shareId": "abc123xyz",
  "url": "/share/abc123xyz"
}
```

### Get Shared Code
**GET** `/api/code/share/:shareId`

**Response:**
```json
{
  "_id": "...",
  "shareId": "abc123xyz",
  "code": "print('Hello')",
  "language": "python",
  "createdAt": "2024-12-06T..."
}
```

---

## 🔒 Security Features

### Code Validation
- **Dangerous Pattern Detection**: Blocks access to:
  - `child_process` module (Node.js)
  - `fs` module (file system access)
  - `os` module (system access)
  - System calls and `eval()` functions
  - Java Runtime execution
  - Python `__import__` with os module

### Execution Isolation
- **Docker Containers**: Each code execution runs in isolated container
- **Resource Limits**:
  - Memory: 128 MB max
  - CPU: 0.5 cores max
  - Processes: 50 max
- **Network Disabled**: No external network access
- **Automatic Cleanup**: Containers removed after execution
- **Timeout**: Execution timeout prevention

### Database Security
- MongoDB connection via environment variables
- Unique indexes on share IDs
- Automatic timestamp tracking

---

## 🎨 Key Components

### Frontend Components

#### Compiler.jsx
Main component handling:
- Monaco Editor initialization
- Code state management
- API calls to backend
- Output display
- Share functionality

#### Navbar.jsx
Navigation bar with:
- Application title
- Language selector dropdown
- Responsive design

#### LanguagesList.jsx
Language selection dropdown:
- Language icons
- Quick language switching
- Search functionality (optional)

#### ShareLink.jsx
Share modal components:
- Link generation UI
- Copy to clipboard
- Share link display

#### Loader.jsx
Loading spinner component for:
- Initial page load
- Code execution

### Backend Controllers

#### compiler.controller.js
Main controller with three methods:

1. **runCode()**
   - Validates input using Joi
   - Executes code in Docker
   - Returns output/errors

2. **shareCode()**
   - Saves code to MongoDB
   - Generates unique shareId
   - Returns shareable URL

3. **getCodeById()**
   - Retrieves shared code
   - Returns code with metadata

---

## 🎬 UI Preview

### Layout Structure
```
┌─────────────────────────────────────────────────────────┐
│  Code Compiler                  [Select Language] ▼     │
├──────────────────┬──────────────────────────────────────┤
│                  │                                      │
│  Code Editor     │         Output Panel                │
│                  │                                      │
│  (50-70vh)       │         Run | Share                  │
│                  │                                      │
├──────────────────┼──────────────────────────────────────┤
│    Monaco        │      Console Output / Errors        │
│    Editor        │      (Real-time results)            │
│                  │                                      │
└──────────────────┴──────────────────────────────────────┘
```

### Features in UI
- **Dark Theme**: Custom dark theme optimized for coding
- **Responsive Grid**: 1 column (mobile), 2 columns (desktop)
- **Split View**: Code on left, output on right
- **Button States**: Run (disabled during execution), Share (always enabled)
- **Loading States**: Spinner during execution
- **Toast Notifications**: Success/error messages
- **Language Icons**: Visual language indicators
- **Syntax Highlighting**: Full syntax support via Monaco

---

## 🔄 Data Flow

```
User Input
    ↓
Frontend (Compiler.jsx)
    ↓
Axios Request
    ↓
Backend Express Router
    ↓
Compiler Controller
    ↓
Validation (Joi Schema)
    ↓
Code Security Check
    ↓
Docker Execution
    ↓
Language Config Applied
    ↓
Container Created & Run
    ↓
Output Captured
    ↓
Response Sent Back
    ↓
Frontend Display (Toast + Output Panel)
```

---

## 📊 Database Schema

### Share Model (MongoDB)
```javascript
{
  _id: ObjectId,
  shareId: String (unique, indexed),  // e.g., "abc123xyz"
  language: String,                    // e.g., "python"
  code: String,                        // Full source code
  createdAt: Date (auto),              // Timestamp
  updatedAt: Date (auto)               // Timestamp
}
```

---

## 🚀 Deployment

### Docker Deployment
```bash
# Build backend image
docker build -t compiler-backend ./backend

# Run backend container
docker run -p 5000:5000 \
  -e MONGODB_URI=<your-mongodb-uri> \
  -e CLIENT_URL=<your-frontend-url> \
  compiler-backend
```

### Platform Options
- **Vercel**: Deploy Next.js frontend
- **Render/Railway**: Deploy Express backend
- **MongoDB Atlas**: Cloud database
- **Docker Hub**: Container registry

---

## 📈 Performance Optimization

- **Turbopack**: Next.js with Turbopack for faster builds
- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js image optimization
- **Container Reuse**: Docker image caching
- **Memory Management**: 128 MB limit per execution
- **Database Indexing**: Indexed queries on shareId

---

## 🐛 Error Handling

### Frontend Error Handling
- Try-catch in API calls
- Toast notifications for errors
- User-friendly error messages
- Loading states during requests

### Backend Error Handling
- Joi validation errors
- Docker execution errors
- MongoDB connection errors
- Security validation failures
- Container timeout handling

### Common Errors
| Error | Cause | Solution |
|-------|-------|----------|
| "Language not found" | Invalid language in URL | Select valid language |
| "Code contains dangerous patterns" | Security violation | Remove restricted imports |
| "Container execution timeout" | Code runs too long | Optimize code logic |
| "MongoDB connection failed" | DB not accessible | Check connection string |

---

## 🔮 Future Enhancements

### Planned Features
- [ ] User authentication and profiles
- [ ] Code snippets library
- [ ] Collaboration (real-time co-coding)
- [ ] Code formatting and beautification
- [ ] Keyboard shortcuts guide
- [ ] Syntax error highlighting
- [ ] Debugging mode with breakpoints
- [ ] Performance metrics dashboard
- [ ] Multiple file support
- [ ] Custom Docker images
- [ ] Competitive programming mode
- [ ] Code templates library
- [ ] Execution history
- [ ] Popular snippets trending
- [ ] AI code suggestions

---

## 📝 License

This project is licensed under the ISC License.

---

## 👤 Author

**Nilesh** - Full Stack Developer

---

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check documentation
- Review error messages and logs

---

## 🙏 Acknowledgments

- Monaco Editor for the editor component
- Docker for containerization
- Next.js and Express.js communities
- All open-source contributors

---

**Last Updated**: December 6, 2024

**Version**: 1.0.0

**Status**: Active Development
