import uvicorn

from contextlib import asynccontextmanager
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator
from loguru import logger

from daatelli.core.api.router import router


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Daatelli Core API is starting up...")
    # initialize migrations, telemetry and other resources here...
    yield
    # clean up resources here...
    logger.info("Shutting down...Until next time!")


def create_app() -> FastAPI:
    from daatelli.version import get_version

    __version__ = get_version()
    app = FastAPI(
        lifespan=lifespan,
        title="Daatelli",
        description="Daatelli Core API",
        version=__version__,
    )

    app.include_router(router)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    Instrumentator().instrument(app).expose(app)
    logger.info("Metrics available at /metrics")
    return app


if __name__ == "__main__":
    uvicorn.run("daatelli.core.main:create_app", host="127.0.0.1", port=8000, workers=2)
