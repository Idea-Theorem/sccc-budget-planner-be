"""User Router"""
import logging
from flask import request
from flask import jsonify
from flask_apispec import marshal_with
from flask_apispec import use_kwargs
from flask_apispec import MethodResource
from flask_apispec import doc
from .controller import get_user_by_id
from .controller import create_new_user

from util.api_schemas.user import UserSchema
from util.api_schemas.common import IdSchema

LOGGER = logging.getLogger("default")

@doc(tags=["Admin"])
class AdminUserRouter(MethodResource):
    """Admin User Router"""

    @marshal_with(UserSchema)
    @use_kwargs(IdSchema, location="query")
    def get(self, **kwargs):
        """Get User"""
        user_id = request.args.get("id")
        response = get_user_by_id(user_id)

        return response

    @use_kwargs(UserSchema)
    @marshal_with(IdSchema)
    def post(self, **kwargs):
        """Create New User"""
        data = request.get_json()

        inserted_id = create_new_user(data)

        response = {
            "id" : inserted_id
        }

        return jsonify(response)
