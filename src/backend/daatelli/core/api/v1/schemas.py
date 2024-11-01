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


class FindingsBadge(str, Enum):
    significant = "significant"
    unexpected = "unexpected"
    outlier = "outlier"
    correlations = "correlations"


class UserTag(str, Enum):
    verified = "Verified"
    topResearcher = "Top Researcher"


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


class Citation(BaseModel):
    id: UUID
    name: str
    link: str


class FindingsItemBase(BaseModel):
    id: UUID
    badge: FindingsBadge
    text: str
    citations: Optional[list[Citation]]


class FindingsItem(FindingsItemBase):
    pass


class Radar(BaseModel):
    id: UUID
    should_match: bool
    description: str


class FindingsPost(BaseModel):
    id: UUID
    owner: str
    tag: Optional[UserTag]
    abstract: str
    findings: list[FindingsItem]
    likes: int
    comments: int
    radar: Optional[Radar]
    created_at: datetime


class FindingsBase(BaseModel):
    files: list[str]
    private_copy: bool
    researchers: list[UUID]
    doi_or_link: Optional[str]
    abstract: Optional[str]
    tags: Optional[list[str]]
    domain_of_research: Optional[str]
    analysis_type: Optional[str]
    findings: list[FindingsItem]


class FindingsCreate(FindingsBase):
    attestation: bool

class ApprovalStatus(str, Enum):
    pending = "Pending"
    approved = "Approved"
    action_needed = "Action Needed"
    rejected = "Rejected"

class FindingsReadResponse(BaseModel):
    id: UUID
    approval_status: ApprovalStatus
