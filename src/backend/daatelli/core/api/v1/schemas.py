from datetime import datetime
from enum import Enum
from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class Role(str, Enum):
    member = "Member"
    researcher = "Researcher"
    author = "Author"
    collaborator = "Collaborator"


class UserBase(BaseModel):
    id: UUID
    full_name: str
    email: str
    field: str
    interests: list[str]
    role: Role
    institution: str
    affiliations: list[str]
    refs: str
    create_at: datetime


class UserReadResponse(UserBase):
    onboarded: bool
    last_login_at: Optional[datetime]
    avatar: Optional[str]


class UserCreate(UserBase):
    username: str
    password1: str
    password2: str

class UserAssociationItem(BaseModel):
    id: UUID
    full_name: str
    avatar: Optional[str]

