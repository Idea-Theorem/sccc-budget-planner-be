from api.hello_world.router import HelloWorld

import util.constants.endpoints as ENDPOINTS

def register_urls(APP):
    """Register all api here"""
    APP.register_url(ENDPOINTS.HELLO_WORLD, HelloWorld, "Hello World")
