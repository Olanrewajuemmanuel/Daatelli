from fastapi import APIRouter

from daatelli.core.api.v1.auth import router as auth_router
from daatelli.core.api.v1.users import router as users_router

router = APIRouter(prefix="/api/v1")

router.include_router(auth_router)
router.include_router(users_router)

