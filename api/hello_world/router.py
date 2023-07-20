"""Sample Router"""
import logging
from flask import request
from flask_apispec import MethodResource

LOGGER = logging.getLogger('logger')

class HelloWorld(MethodResource):
    """Hello World Router"""

    def get(self, **kwargs):
        """Hello World Get"""

        return "Hello World", 200
