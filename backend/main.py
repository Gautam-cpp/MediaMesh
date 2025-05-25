from session_Dependency import app
from routes.auth_route import auth_router
from routes.content_route import content_router

app.include_router(auth_router)
app.include_router(content_router)
