from pydantic import BaseModel
from typing import Optional

class Threat(BaseModel):
    id: Optional[str]
    cleaned_description: str
    threat_category: str
    severity_score: int
