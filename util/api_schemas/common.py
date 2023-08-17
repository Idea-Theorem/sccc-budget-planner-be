"""Common Schema"""

from marshmallow import Schema, fields

class IdSchema(Schema):
    """Id Schema"""
    id = fields.Str(required=True)

class IdOptionalSchema(Schema):
    """Id Optional Schema"""
    id = fields.Str(allow_none=True, required=False)
