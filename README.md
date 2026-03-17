# Iconic Transformers and Electricals - AI Workflow Platform

## Project Overview

A full-stack, AI-powered intelligent web platform for transformer manufacturing management. Integrates predictive maintenance, demand forecasting, customer services, and an interactive NLP chatbot.

## Tech Stack

1. **Frontend**: React (Vite), Tailwind CSS, React Router, Recharts, Lucide React
2. **Backend API**: Node.js, Express, MongoDB, JSON Web Token
3. **Machine Learning Microservices**: Python (FastAPI), Scikit-Learn (Random Forest), Prophet (Time Series)

## Folder Structure

```
nexusai/
├── frontend/
│   ├── src/
│   │   ├── components/ (Layout, Nav, Admin Dash elements)
│   │   ├── pages/ (Home, About, Services, Contact, Profile, Admin Dashboard, AITools, Auth)
│   │   ├── index.css (Tailwind configurations)
│   │   └── App.jsx (Routing)
│   ├── index.html
│   ├── tailwind.config.js
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── models/ (MongoDB Schema: User, Order, Service)
│   ├── server.js (Express endpoints & JWT Auth flow)
│   ├── package.json
│   └── .env (Environment variables - MongoDB URI, JWT Secret)
├── ml_services/
│   ├── models/
│   │   ├── predictive_maintenance.py (Telemetry RandomForest Model: 30-day window)
│   │   └── demand_forecasting.py (Prophet TimeSeries Model: 12-week prediction)
│   ├── app.py (FastAPI application exposing ML microservices)
│   └── requirements.txt
```

## How to Run Locally

### 1. Frontend
```bash
cd frontend
npm install
npm run dev
```

### 2. Backend API
```bash
cd backend
npm install
npm run dev
```

### 3. ML Services
```bash
cd ml_services
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

## AI Models

### Predictive Maintenance
Analyzes transformer telemetry data (vibration, temperature, oil conditions, load levels) yielding a 30-day prognosis categorizing transformers into Healthy, Maintenance Required, or Critical Failure Risk.

### Demand Forecasting
Employs Meta’s Prophet Library analyzing historical data and seasonal/industrial trends to provide a 12-week inventory and service demand prediction, visualized within the Admin Dashboard interfnace.

### Customer Support Chatbot
Natural language processing interface facilitating 24/7 autonomous responses concerning manufacturing capacities, service details, and general company inquiries.
