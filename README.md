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
