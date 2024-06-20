from aiohttp import web
import aiohttp
import aiohttp_jinja2
import jinja2
import aiohttp_cors

from api.v1.route import Routes

app = web.Application()
app.add_routes(
    [
        web.post('/api/v1/auth', Routes.auth),
        web.post('/api/v1/user_reg_start', Routes.user_reg_start),
        web.post('/api/v1/user_main_info', Routes.user_main_info),
        web.post('/api/v1/user_health_info', Routes.user_health_info),
        web.post('/api/v1/user_goal_info', Routes.user_goal_info),
        web.post('/api/v1/user_limit_info', Routes.user_limit_info),
        web.post('/api/v1/user_stress_and_activity_info', Routes.user_stress_and_activity_info),
    ]
)

cors = aiohttp_cors.setup(app, defaults={"*": aiohttp_cors.ResourceOptions(
    allow_credentials=True,
    expose_headers="*",
    allow_headers="*",
)})

for route in list(app.router.routes()):
    cors.add(route)

aiohttp_jinja2.setup(app, loader=jinja2.FileSystemLoader('api/v1/templates'), enable_async=True)
