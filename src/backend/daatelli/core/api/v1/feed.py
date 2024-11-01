from datetime import datetime, timedelta
from uuid import uuid4

from fastapi import APIRouter
from typing import List
from daatelli.core.api.v1.schemas import FindingsPost

router = APIRouter(prefix="/feed", tags=["Feed"])


@router.get("/", response_model=List[FindingsPost])
async def get_feed():
    return [
        {
            "id": uuid4(),
            "owner": "John Doe",
            "tag": "Verified",
            "abstract": "This is a test abstract with a lot of text after it. Ice cream, a beloved frozen dessert, has captivated taste buds worldwide. This creamy treat comes in countless flavors, from classic vanilla to exotic combinations, offering a refreshing respite on hot days and a comforting indulgence year-round. Its popularity continues to grow, influencing both culinary trends and social gatherings.",
            "findings": [
                {
                    "id": uuid4(),
                    "badge": "significant",
                    "text": "25% of the population has a positive correlation with the number of ice cream shops",
                    "citations": None,
                },
                {
                    "id": uuid4(),
                    "badge": "unexpected",
                    "text": "Almost three-quarters (72.24%) of the population has a positive correlation with the number of ice cream sales",
                    "citations": None,
                },
                {
                    "id": uuid4(),
                    "badge": "significant",
                    "text": "25% of the population has a positive correlation with the number of ice cream shops",
                    "citations": None,
                },
                {
                    "id": uuid4(),
                    "badge": "unexpected",
                    "text": "Almost three-quarters (72.24%) of the study population has a positive correlation with the number of ice cream sales",
                    "citations": None,
                },
                {
                    "id": uuid4(),
                    "badge": "significant",
                    "text": "25% of the population has a positive correlation with the number of ice cream shops",
                    "citations": None,
                },
            ],
            "likes": 0,
            "comments": 0,
            "radar": None,
            "created_at": datetime.now(),
        },
        {
            "id": uuid4(),
            "owner": "Kamala Knowles",
            "tag": "Top Researcher",
            "abstract": "This is another test abstract",
            "findings": [
                {
                    "id": uuid4(),
                    "badge": "significant",
                    "text": "34.5% of the students do not wash their hands after using the restroom",
                    "citations": None,
                },
            ],
            "likes": 2,
            "comments": 0,
            "radar": {
                "id": uuid4(),
                "should_match": True,
                "description": "3rd+, a possible collaborator",
            },
            "created_at": datetime.now() - timedelta(days=2),
        },
    ]
