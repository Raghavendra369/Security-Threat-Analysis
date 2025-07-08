from fastapi import APIRouter, Query, HTTPException
from fastapi.responses import JSONResponse
from database import threats_collection
from models import Threat
from bson import ObjectId
import re

router = APIRouter()


@router.get("/api/threats/stats")
def get_threat_stats():
    total = threats_collection.count_documents({})
    categ_stats = threats_collection.aggregate([
        {"$group": {"_id": "$Threat Category", "count": {"$sum": 1}}}
    ])
    by_category = {doc["_id"]: doc["count"] for doc in categ_stats}
    severity_stats = threats_collection.aggregate([
        {"$group": {"_id": "$Severity Score", "count": {"$sum": 1}}}
    ])
    by_severity = {str(doc["_id"]): doc["count"] for doc in severity_stats}
    return {
        "total": total,
        "by_category": by_category,
        "by_severity": by_severity
    }

@router.get("/api/threats/{id}", response_model=Threat)
def get_threat_by_id(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
    threat = threats_collection.find_one({"_id": ObjectId(id)})
    if not threat:
        raise HTTPException(status_code=404, detail="Threat not found")
    return {
        "id": str(threat.get("_id")),
        "cleaned_description": threat.get("Cleaned Threat Description", ""),
        "threat_category": threat.get("Threat Category", ""),
        "severity_score": threat.get("Severity Score", 0)
    }




@router.get("/api/threats", response_model=list[Threat])
def get_threats(
    page:int= 1, 
    limit:int = Query(10, le=100),
    search: str = Query(None, min_length=3, max_length=50, description="Search term for threat description"),
    category: str = Query(None,min_length= 3, max_length=20, description="Filter by threat category"),
    # sort: str = Query("Severity Score"),
    # order: str = Query("desc")
):
    query = {}
    if search:
        query["Cleaned Threat Description"] = {"$regex": search, "$options": "i"}

    if category:
        query["Threat Category"] = {"$regex": category, "$options": "i"}

    # sort_order = -1 if order.lower() == "desc" else 1

    skip = (page - 1) * limit
    cursor = threats_collection.find(query).skip(skip).limit(limit)
    results = []
    for doc in cursor:
        results.append({
            "id": str(doc.get("_id")),
            "cleaned_description": doc.get("Cleaned Threat Description", ""),
            "threat_category": doc.get("Threat Category", ""),
            "severity_score": doc.get("Severity Score", 0)
        })
    return results



