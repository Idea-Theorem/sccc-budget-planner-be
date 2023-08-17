"""Sample Router"""
import logging
from flask import request
from flask_apispec import doc
from flask_apispec import MethodResource

LOGGER = logging.getLogger('logger')

@doc(description="Hello World", tags=["Default"])
class HelloWorld(MethodResource):
    """Hello World Router"""

    def get(self, **kwargs):
        """Hello World Get"""

        return "Hello World From Development 3", 200
