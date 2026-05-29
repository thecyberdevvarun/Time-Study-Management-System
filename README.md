# 🏭 Time Study Management System (TSMS)

> An AI-powered industrial time study platform that replaces manual video analysis with automated activity detection, cycle time calculation, and real-time analytics — cutting analysis time from **2 hours to under 15 minutes**.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)
![YOLOv8](https://img.shields.io/badge/YOLOv8-Ultralytics-FF6B35)

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Setup](#local-setup)
  - [Docker Setup](#docker-setup)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [AI Pipeline](#-ai-pipeline)
- [Database Schema](#-database-schema)
- [Build Phases](#-build-phases)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔍 Overview

The **Time Study Management System (TSMS)** is a full-stack, AI-augmented web application designed for Industrial Engineers and MES (Manufacturing Execution System) teams. It digitizes the traditional shop floor time study workflow — from raw video capture to structured cycle time reports — with optional AI-powered activity auto-detection.

**Before TSMS:**
```
Shop floor → Record video → Office → Watch manually → Excel entry → Report
Total time: ~2 hours per study
```

**After TSMS:**
```
Shop floor → Upload video → Tag operations (or let AI tag) → Export report
Total time: ~15 minutes per study
```

---

## ❗ Problem Statement

Manual time studies in manufacturing suffer from:

| Pain Point | Impact |
|---|---|
| Engineer must be physically present | Lost productivity |
| Manual video review is slow and error-prone | Inconsistent results |
| No standardized data storage | Knowledge silos |
| No historical benchmarking | Missed optimization opportunities |
| Excel-based reporting is fragile | Version control issues |

TSMS solves all of these with a centralized, automated, and auditable platform.

---

## ✨ Key Features

### Phase 1 — Manual Tagging (MVP)
- 📹 **Video Upload** — chunked upload with progress for large shop floor recordings
- 🎬 **Advanced Video Player** — frame stepping, variable speed (0.25×–2×), and zoom
- ⌨️ **Keyboard Shortcut Tagging** — `S` to start, `E` to end any operation; fully customizable
- ⏱️ **Auto Cycle Time Engine** — instant calculation of net, gross, and average cycle times
- 📊 **Excel & PDF Export** — one-click reports formatted to industrial engineering standards
- 🔐 **Auth & RBAC** — JWT-based login with roles: Admin, IE Analyst, Viewer

### Phase 2 — Analytics Dashboard
- 📈 **VA / NVA Split** — visualize Value-Added vs Non-Value-Added time per operation
- 🔥 **Bottleneck Detection** — highlight operations exceeding takt time
- 👷 **Operator Comparison** — benchmark performance across workers and shifts
- 📉 **Line Efficiency Dashboard** — OEE-style metrics per work center
- 🔗 **Work Order & QR Code Integration** — link studies to production orders via QR scan

### Phase 3 — AI Detection Pipeline
- 🤖 **YOLOv8 Activity Detection** — auto-detects: Pick, Place, Weld, Walk, Inspect, Idle
- 🦾 **MediaPipe Pose Tracking** — tracks hand, body motion for ergonomic analysis
- ⚡ **Async Job Queue** — Celery + Redis for non-blocking AI inference
- 🎯 **AI-Assisted Tagging** — review and correct AI-generated segments on the video timeline
- 📡 **Live Progress via WebSocket** — real-time inference status in the browser

### Phase 4 — Production & Integration
- 🐳 **Docker Compose** — one-command full-stack deployment
- 🔄 **CI/CD** — GitHub Actions pipeline with lint, test, build, and deploy stages
- 🏭 **SAP / MES Integration** — REST adapter for pushing cycle times to ERP
- 📱 **Tablet Shop Floor Mode** — optimized UI for live stopwatch studies on the floor

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (React + TS)                  │
│  Video Player │ Tagging UI │ Dashboard │ Reports          │
└───────────────────────┬─────────────────────────────────┘
                        │  REST / WebSocket
┌───────────────────────▼─────────────────────────────────┐
│                  BACKEND (FastAPI)                        │
│  API Gateway │ Video Service │ Time Study Engine          │
│  Job Queue (Celery) │ Report Generator │ Auth (JWT)       │
└──────────┬────────────────────────────┬─────────────────┘
           │                            │
┌──────────▼──────────┐    ┌────────────▼───────────────┐
│   PostgreSQL         │    │   Object Storage (MinIO)    │
│   Studies, ops,      │    │   Raw videos, processed     │
│   timestamps,        │    │   frames, export files      │
│   operators          │    └────────────────────────────┘
└──────────────────────┘
           │
┌──────────▼──────────────────────────────────────────────┐
│                  AI PIPELINE                              │
│  YOLOv8 (activity detection) │ MediaPipe (pose)          │
│  OpenCV (frame extraction)   │ Auto-segmentation engine  │
└─────────────────────────────────────────────────────────┘
```

**Request flow for AI-assisted study:**

1. User uploads video → stored in MinIO
2. FastAPI creates a `Study` record in PostgreSQL
3. Celery worker picks up the job → runs YOLOv8 + MediaPipe inference
4. Activity segments are written back to the database
5. Frontend receives completion event via WebSocket
6. Analyst reviews, adjusts, and exports the report

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 18 | UI framework |
| TypeScript | 5 | Type safety |
| Zustand | 4 | Global state management |
| TailwindCSS | 3 | Utility-first styling |
| React Player | 2 | Video playback foundation |
| Recharts | 2 | Dashboard charts |
| Axios | 1.6 | HTTP client |
| Socket.IO Client | 4 | Real-time WebSocket events |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Python | 3.11+ | Core language |
| FastAPI | 0.111 | REST API framework |
| SQLAlchemy | 2 | ORM |
| Alembic | 1.13 | Database migrations |
| Celery | 5 | Async task queue |
| Redis | 7 | Message broker + cache |
| python-jose | 3 | JWT authentication |
| openpyxl | 3.1 | Excel report generation |
| WeasyPrint | 62 | PDF report generation |
| FFmpeg-python | 0.2 | Video transcoding |

### AI / Computer Vision
| Technology | Purpose |
|---|---|
| Ultralytics YOLOv8 | Activity detection (Pick, Place, Weld, Walk, Idle) |
| MediaPipe | Pose estimation and motion tracking |
| OpenCV | Frame extraction, preprocessing, annotation |
| PyTorch | Model training and inference runtime |
| LabelImg / CVAT | Annotation tool for custom training data |

### Infrastructure
| Technology | Purpose |
|---|---|
| PostgreSQL 15 | Primary relational database |
| MinIO | S3-compatible object storage for videos |
| Redis | Celery broker + WebSocket pub/sub |
| Docker + Compose | Containerized local and production deployment |
| GitHub Actions | CI/CD pipeline |
| Nginx | Reverse proxy + static file serving |

---

## 📁 Project Structure

```
tsms/
├── frontend/                    # React + TypeScript app
│   ├── src/
│   │   ├── components/
│   │   │   ├── VideoPlayer/     # Custom player with frame controls
│   │   │   ├── TaggingPanel/    # Operation marking UI
│   │   │   ├── Dashboard/       # Charts and KPI cards
│   │   │   └── Reports/         # Export components
│   │   ├── store/               # Zustand state slices
│   │   ├── hooks/               # Custom React hooks
│   │   ├── api/                 # Axios API layer
│   │   └── pages/               # Route-level pages
│   ├── public/
│   ├── tailwind.config.ts
│   └── vite.config.ts
│
├── backend/                     # FastAPI application
│   ├── app/
│   │   ├── api/
│   │   │   ├── v1/
│   │   │   │   ├── auth.py      # Login, refresh, RBAC
│   │   │   │   ├── studies.py   # Time study CRUD
│   │   │   │   ├── videos.py    # Upload, streaming endpoints
│   │   │   │   ├── operations.py# Tag, edit, delete operations
│   │   │   │   └── reports.py   # Excel / PDF generation
│   │   ├── core/
│   │   │   ├── config.py        # Settings from env
│   │   │   ├── security.py      # JWT utils
│   │   │   └── events.py        # WebSocket event bus
│   │   ├── models/              # SQLAlchemy ORM models
│   │   ├── schemas/             # Pydantic request/response schemas
│   │   ├── services/
│   │   │   ├── video_service.py # FFmpeg processing
│   │   │   ├── time_engine.py   # Cycle time calculations
│   │   │   ├── report_service.py# Excel/PDF builder
│   │   │   └── storage_service.py# MinIO client
│   │   └── tasks/               # Celery task definitions
│   │       ├── ai_pipeline.py   # YOLO + MediaPipe orchestration
│   │       └── report_tasks.py  # Async report generation
│   ├── migrations/              # Alembic migration files
│   ├── tests/                   # Pytest test suite
│   └── requirements.txt
│
├── ai/                          # AI model development
│   ├── training/
│   │   ├── dataset/             # Annotated factory video frames
│   │   ├── train_yolo.py        # YOLOv8 fine-tuning script
│   │   └── evaluate.py          # Model evaluation
│   ├── inference/
│   │   ├── detector.py          # YOLO inference wrapper
│   │   ├── pose_tracker.py      # MediaPipe pose pipeline
│   │   └── segmenter.py         # Activity segmentation logic
│   └── models/                  # Saved model weights (.pt)
│
├── infra/
│   ├── docker/
│   │   ├── Dockerfile.backend
│   │   ├── Dockerfile.frontend
│   │   └── Dockerfile.worker
│   ├── nginx/
│   │   └── nginx.conf
│   └── docker-compose.yml
│
├── .github/
│   └── workflows/
│       ├── ci.yml               # Lint + test on PR
│       └── deploy.yml           # Build + push on merge to main
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+
- **Python** 3.11+
- **Docker** & **Docker Compose** (recommended)
- **FFmpeg** (for local non-Docker setup)
- **CUDA-capable GPU** (optional, for AI inference acceleration)

### Local Setup

**1. Clone the repository**

```bash
git clone https://github.com/your-username/tsms.git
cd tsms
```

**2. Backend setup**

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Copy and configure environment
cp .env.example .env

# Run database migrations
alembic upgrade head

# Start FastAPI dev server
uvicorn app.main:app --reload --port 8000
```

**3. Start Redis (required for Celery)**

```bash
docker run -d -p 6379:6379 redis:7-alpine
```

**4. Start Celery worker (separate terminal)**

```bash
cd backend
celery -A app.tasks worker --loglevel=info
```

**5. Frontend setup**

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

The app will be available at `http://localhost:5173`

---

### Docker Setup

**Full stack with one command:**

```bash
cp .env.example .env   # Fill in values
docker compose up --build
```

Services started:

| Service | Port | Description |
|---|---|---|
| `frontend` | 5173 | React dev server (Nginx in prod) |
| `backend` | 8000 | FastAPI application |
| `worker` | — | Celery AI task worker |
| `postgres` | 5432 | PostgreSQL database |
| `redis` | 6379 | Message broker |
| `minio` | 9000 / 9001 | Object storage + admin UI |

**Production build:**

```bash
docker compose -f docker-compose.prod.yml up -d
```

---

## 🔑 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Application
APP_ENV=development
SECRET_KEY=your-super-secret-jwt-key-change-this
ACCESS_TOKEN_EXPIRE_MINUTES=60

# Database
DATABASE_URL=postgresql+asyncpg://tsms_user:password@localhost:5432/tsms_db

# Redis
REDIS_URL=redis://localhost:6379/0

# MinIO / S3
MINIO_ENDPOINT=localhost:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET_VIDEOS=tsms-videos
MINIO_BUCKET_EXPORTS=tsms-exports

# AI
YOLO_MODEL_PATH=ai/models/yolov8_factory_activity.pt
AI_CONFIDENCE_THRESHOLD=0.65
DEVICE=cuda  # or cpu

# Optional: SAP integration
SAP_BASE_URL=https://your-sap-host/api/v1
SAP_API_KEY=
```

---

## 📡 API Reference

Base URL: `http://localhost:8000/api/v1`

Interactive docs available at: `http://localhost:8000/docs`

### Authentication

```http
POST /auth/login
Content-Type: application/json

{ "username": "analyst@company.com", "password": "..." }
```

### Studies

```http
GET    /studies                    # List all time studies
POST   /studies                    # Create a new study
GET    /studies/{id}               # Get study details + operations
DELETE /studies/{id}               # Delete a study
```

### Videos

```http
POST   /videos/upload              # Upload video (multipart, chunked)
GET    /videos/{id}/stream         # Stream video for player
GET    /videos/{id}/thumbnail      # Get thumbnail frame
```

### Operations (Timestamps)

```http
POST   /studies/{id}/operations    # Add tagged operation
PUT    /operations/{op_id}         # Edit operation label/times
DELETE /operations/{op_id}         # Remove an operation
GET    /studies/{id}/cycle-times   # Get calculated cycle times
```

### Reports

```http
GET    /studies/{id}/export/excel  # Download .xlsx report
GET    /studies/{id}/export/pdf    # Download PDF report
```

### AI Jobs

```http
POST   /studies/{id}/ai/detect     # Trigger AI detection job
GET    /jobs/{job_id}/status       # Poll job status
WS     /ws/jobs/{job_id}           # WebSocket for live progress
```

---

## 🤖 AI Pipeline

The AI detection pipeline runs asynchronously via Celery:

```
Video file (MinIO)
        │
        ▼
FFmpeg frame extraction (every Nth frame based on FPS)
        │
        ▼
YOLOv8 inference per frame
  → Detects: Pick | Place | Weld | Walk | Inspect | Idle
        │
        ▼
MediaPipe Pose (optional)
  → Tracks: hand position, body movement, ergonomic angles
        │
        ▼
Temporal smoothing (sliding window majority vote)
        │
        ▼
Activity segment merging (consecutive same-label frames → segment)
        │
        ▼
Write segments to PostgreSQL as Operations
        │
        ▼
WebSocket event → frontend notified
```

### Training your own model

The default model is pre-trained on a generic factory dataset. To fine-tune on your own activities:

```bash
cd ai/training

# 1. Annotate videos using CVAT or LabelImg
# 2. Export in YOLO format to dataset/

# 3. Train
python train_yolo.py \
  --data dataset/factory_activities.yaml \
  --epochs 50 \
  --img 640 \
  --batch 16 \
  --name tsms_custom

# 4. Copy best weights
cp runs/detect/tsms_custom/weights/best.pt ../models/yolov8_factory_activity.pt
```

**Supported activity classes (customizable):**

| Class ID | Label | Description |
|---|---|---|
| 0 | `pick` | Operator picking up a part |
| 1 | `place` | Setting down a part |
| 2 | `weld` | Welding or brazing operation |
| 3 | `inspect` | Visual inspection |
| 4 | `walk` | Operator walking (NVA) |
| 5 | `idle` | Waiting / idle time (NVA) |
| 6 | `tool_change` | Changing tooling or fixtures |

---

## 🗄️ Database Schema

Core entities (simplified):

```
users
  id, email, hashed_password, role, created_at

work_orders
  id, order_number, part_number, description, created_by

studies
  id, work_order_id, operator_id, analyst_id, status,
  recorded_at, created_at

videos
  id, study_id, filename, minio_path, duration_seconds,
  fps, resolution, upload_status

operations
  id, study_id, video_id, label, start_time_ms, end_time_ms,
  duration_ms, is_value_added, source (manual|ai), confidence,
  notes, created_at

ai_jobs
  id, study_id, status, model_version, started_at,
  completed_at, error_message
```

Run migrations:

```bash
alembic revision --autogenerate -m "describe your change"
alembic upgrade head
```

---

## 📅 Build Phases

| Phase | Features | Status |
|---|---|---|
| **Phase 1** — MVP | Video upload, player, keyboard tagging, cycle time engine, Excel/PDF export, JWT auth | ✅ Complete |
| **Phase 2** — Analytics | VA/NVA dashboard, bottleneck detection, operator comparison, work order + QR integration | 🚧 In progress |
| **Phase 3** — AI Pipeline | YOLOv8 detection, MediaPipe pose, Celery jobs, WebSocket progress, AI-assisted tagging | 🔜 Planned |
| **Phase 4** — Production | Docker Compose prod, GitHub Actions CI/CD, SAP integration, tablet shop floor mode | 🔜 Planned |

---

## 📸 Screenshots

> Add screenshots or a short screen recording GIF here once the UI is built.

| Video Player + Tagging | Analytics Dashboard | AI Detection Results |
|---|---|---|
| `screenshots/tagging.png` | `screenshots/dashboard.png` | `screenshots/ai-overlay.png` |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please ensure:
- All new backend endpoints have Pytest tests in `backend/tests/`
- Python code passes `ruff` linting (`ruff check .`)
- TypeScript code passes ESLint (`npm run lint`)
- Docker Compose still starts cleanly

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [linkedin.com/in/your-profile](https://linkedin.com/in/your-profile)

---

> Built to solve a real manufacturing problem — replacing manual 2-hour video analysis sessions with an automated, AI-powered time study platform for industrial engineers.