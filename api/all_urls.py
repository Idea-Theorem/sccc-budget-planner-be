from api.hello_world.router import HelloWorld
from api.user.router import AdminUserRouter

import util.constants.endpoints as ENDPOINTS

def register_urls(APP):
    """Register all api here"""
    APP.register_url(ENDPOINTS.HELLO_WORLD, HelloWorld, "Hello World")
    APP.register_url(ENDPOINTS.ADMIN_USER, AdminUserRouter, "Admin User Endpoint")
