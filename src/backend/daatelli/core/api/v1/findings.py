import uuid
from fastapi import APIRouter
from daatelli.core.api.v1.schemas import FindingsCreate, FindingsReadResponse

router = APIRouter(prefix="/findings", tags=["Findings"])


@router.post("/", response_model=FindingsReadResponse)
async def create_finding(finding: FindingsCreate):
    return FindingsReadResponse(id=uuid.uuid4(), 
                                 approval_status="Pending")

@router.get("/{id}")
async def get_finding(id: str):
    return {
        "approval_status": "Pending",
        "id": id,
    }