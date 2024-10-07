from fastapi import APIRouter

from daatelli.api.v1.auth import router as auth_router
from daatelli.api.v1.health_check import router as health_check_router

router = APIRouter(prefix="/api/v1")

router.include_router(auth_router)
router.include_router(health_check_router)

