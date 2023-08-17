"""User Schema"""

from marshmallow import Schema, fields, validate
from util.constants.users import ROLES

class UserSchema(Schema):
    """User Schema"""
    id = fields.Str(required=False)
    email = fields.Email(required=True)
    first_name = fields.Str(required=True)
    last_name = fields.Str(required=True)
    phone = fields.Str(required=False, allow_none=True)
    role = fields.Str(required=True, validate=validate.OneOf(choices=ROLES))
