"""Users Model"""
import logging
from enum import Enum
from uuid import uuid4
from typing import Union
from typing_extensions import Annotated
from datetime import datetime
from pydantic import BaseModel
from pydantic import Field
from util.db.driver.mongodb import MongoDb
from bson import ObjectId

DRIVER = MongoDb(__name__)
LOGGER = logging.getLogger("default")

class Role(str, Enum):
    """Role Enum"""
    admin = 'ADMIN'
    super_admin = 'SUPER-ADMIN'

class Users(BaseModel):
    """User Model"""
    id: Annotated[str, Field(default_factory=lambda: uuid4().hex)]
    email: str
    first_name: str
    last_name: str
    phone: Union[str, None]
    role: str = Field(choices=["ADMIN", "SUPER-ADMIN"])
    created_at: datetime
    updated_at: datetime

def create_user_from_db(user):
    """Create User"""
    created_at = datetime.now() 
    user["id"] = str(ObjectId())
    user["created_at"] = created_at
    user["updated_at"] = created_at

    current_entity = Users(**user)
    result = DRIVER.insert_one(current_entity)

    return str(result.inserted_id)

def find_user_by_id_from_db(user_id):
    """Look for user"""
    filter = {
        "id" : user_id
    }

    current_entity = DRIVER.find_one(filter)

    return current_entity
