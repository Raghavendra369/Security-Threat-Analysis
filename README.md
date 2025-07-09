# ConSecure : Security-Threat-Analysis
A full stack application which is to monitor, analyze and predict the cybersecurity threats using real-time data and machine learning.

## Features Implemented
- **Threat Statistics Dashboard** (bar + pie charts)
- **Machine Learning Integration** using TF-IDF and SVM
- **Threat Table** with:
  - Pagination
  - Search by threat description
  - Category filter
  - ID-based detail view
- **Real-Time Threat Analyzer**: Paste any description to get predicted category
- **RESTful FastAPI backend** with MongoDB
- **Responsive React frontend** with Axios-based API integration

## Tech Stack
1) Backend -> FastAPI(Python)
    - It is lightweight, supports asynchronous programming and allows rapid development of REST API's with automatic documentation through Swagger UI.
2) Database -> MongoDB
    - MongoDB is flexible and is ideal for handling the unstructured cybersecurity data. Easy integration with python using pymongo.
3) Frontend -> ReactJS
    - React specializes with component based architecture and its ability to build dynamic single-page applications.

## Project Structure
root
-  backend
    - main.py
    - train_model.py
    - routers/
        - threats.py
        - analyze.py
    - model.pkl
    - vectorizer.pkl
    - cyber_threats.csv
    - requirements.txt
-  frontend
    - src/
        - components/
            - App.js
    - package.json
- requirements.txt

## Setup Instructions

### Virtual Environment Setup and Dependencies Installation
```bash
python -m venv venv
.venv\Scripts\activate          # On Windows
pip install -r requirements.txt
```
---
### Backend Setup
Now we move inside the backend folder:
```bash
cd backend
```

#### Data Ingestion
Ensure MongoDB is running locally (default: `mongodb://localhost:27017`). Then insert the dataset:
```bash
python ingestion.py   # (A script that reads `cyber_threats.csv` and pushes to MongoDB)
```
> If you don’t have `ingestion.py`, you can insert via a Jupyter notebook or simple pymongo script.

#### Model Training
```bash
python train_model.py
```
This trains and saves:
- `model.pkl`: ML model
- `vectorizer.pkl`: TF-IDF transformer

#### Start the Backend
```bash
uvicorn main:app --reload
```
API docs: [http://localhost:8000/docs](http://localhost:8000/docs)

---
### Frontend Setup
```bash
cd frontend
npm install
npm start
```
> Frontend runs on [http://localhost:3000](http://localhost:3000)

---
## Testing
Manual Testing is supported via **Swagger UI** at `/docs` for backend routes and **Frontend UI** for all the features.

## Make Sure

- Ensure MongoDB is running during development
- CORS is enabled to support frontend-backend interaction
- If you update the model, **retrain + resave `model.pkl` and `vectorizer.pkl`**
