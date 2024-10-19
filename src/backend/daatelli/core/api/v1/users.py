from datetime import datetime
from typing import List
from uuid import uuid4
from fastapi import APIRouter

from daatelli.core.api.v1.schemas import UserAssociationItem, UserCreate, UserReadResponse

router = APIRouter(prefix="/users", tags=["Users"])

@router.post('/')
async def add_user(user: UserCreate):
    # TODO: Implement registration logic
    return {'message': 'User created successfully'}

@router.get("/me", response_model=UserReadResponse)
async def read_current_user():
    # TODO: Implement
    return UserReadResponse(id=uuid4(), full_name='John Doe', email='john.doe@example.com', field='Computer Science', interests=['Machine Learning', 'Data Science'], role='Researcher', institution='Harvard University', affiliations=['MIT', 'Stanford'], refs='Social Media', create_at=datetime.now(), onboarded=True, last_login_at=datetime.now(), avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp")

@router.get("/associations", response_model=List[UserAssociationItem])
async def get_users_by_association(association: bool = True, limit: int = 100):
    # TODO: Implement
    return [
        UserAssociationItem(id=uuid4(), full_name='Jonathan Pedigo', avatar='https://c5.rgstatic.net/m/41010379691719/images/icons/svgicons/publication-creation-grey.svg'),
        UserAssociationItem(id=uuid4(), full_name='Rowling Potter', avatar=None),
        UserAssociationItem(id=uuid4(), full_name='Bex Tiller', avatar='https://c5.rgstatic.net/m/41010379691719/images/icons/svgicons/publication-creation-grey.svg'),
    ]

