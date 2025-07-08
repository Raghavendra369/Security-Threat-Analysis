from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from fastapi.responses import JSONResponse
import pickle
import os

# Load vectorizer and model once
with open("vectorizer.pkl", "rb") as f_vec:
    vectorizer = pickle.load(f_vec)

with open("model.pkl", "rb") as f_model:
    model = pickle.load(f_model)

router = APIRouter()

# Request schema
class ThreatInput(BaseModel):
    description: str

# Response schema
class PredictionOutput(BaseModel):
    predicted_category: str

@router.post("/api/analyze", response_model=PredictionOutput)
def analyze_threat(threat: ThreatInput):
    if not threat.description.strip():
        raise HTTPException(status_code=400, detail="Description cannot be empty.")

    try:
        vec = vectorizer.transform([threat.description])
        prediction = model.predict(vec)[0]
        return {"predicted_category": prediction}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {e}")
