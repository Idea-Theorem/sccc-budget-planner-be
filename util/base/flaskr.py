"""Base Flask App"""
import logging
import traceback
from flask.logging import default_handler
from flask import Flask
from flask_apispec import FlaskApiSpec
from werkzeug.exceptions import HTTPException
from webargs.flaskparser import parser

LOGGER = logging.getLogger('default')

@parser.error_handler
def handle_request_parsing_error(err, req, schema, *, error_status_code, error_headers):
    """webargs error handler that uses Flask-RESTful's abort function to return
    a JSON error response to the client.
    """
    raise Exception(err.messages)

class AppErrorHandler:
    """Application Error Handler"""

    def handle_exception(self, e):
        """Handle Exception"""

        LOGGER.info(traceback.format_exc())
        response = {
            "name" : "",
            "error_message" : "",
            "status_code" : ""
        }

        if isinstance(e, HTTPException):
            response["error_message"] = e.description
            response["status_code"] = e.code
            response["name"] = e.name
        else:
            response["error_message"] = str(e)
            response["status_code"] = 500
            response["name"] = "Internal Server Error"

        return response, response["status_code"]

class FlaskApp:
    """Flask Application Base"""

    def __init__(self, name, config) -> None:
        self.app = Flask(name)
        self.app.config.from_object(config)
        self.app.register_error_handler(Exception, AppErrorHandler().handle_exception)
        self.app.after_request(self.after_request_cb)
        self.docs = FlaskApiSpec(self.app)
        self.set_logger()

    def set_logger(self):
        """Overwrite flask default logger"""
        logger = logging.getLogger('default')
        logger.setLevel(logging.DEBUG)
        formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        default_handler.setFormatter(formatter)
        logger.handlers.clear()
        logger.addHandler(default_handler)

    def after_request_cb(self, response):
        """After request callback"""
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")

        return response

    def get_app(self):
        """Get Flask App"""
        return self.app

    def register_url(self, uri, resource, api_name):
        """Register Url"""
        self.app.add_url_rule(uri, view_func=resource.as_view(api_name))
        self.docs.register(resource, api_name)
