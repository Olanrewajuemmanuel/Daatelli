from fastapi import APIRouter

from daatelli.core.api.v1.auth import router as auth_router
from daatelli.core.api.v1.users import router as users_router
from daatelli.core.api.v1.feed import router as feed_router
from daatelli.core.api.v1.findings import router as findings_router

router = APIRouter(prefix="/api/v1")

router.include_router(auth_router)
router.include_router(users_router)
router.include_router(feed_router)
router.include_router(findings_router)
