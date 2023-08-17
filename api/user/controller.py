"""
    Api Controller
"""

from models.users import find_user_by_id_from_db
from models.users import create_user_from_db

def create_new_user(user):
    """Create New User"""
    inserted_id = create_user_from_db(user)

    return inserted_id

def get_user_by_id(user_id):
    """Get User By Id"""

    user = find_user_by_id_from_db(user_id)

    return user
