"""Base PyMongo Class"""

import logging
from pydantic import BaseModel
from pymongo import MongoClient
from bson import ObjectId

from environment import DB_CONN_STRING
from environment import DB_NAME

LOGGER = logging.getLogger("default")

class MongoDb:
    """Mongo Driver"""

    def __init__(self, __name__) -> None:
        self.collection_name = __name__.split(".")[-1]
        self.client = MongoClient(DB_CONN_STRING)
        self.db = self.client[DB_NAME]
        self.collection = self.db[self.collection_name]

    def insert_one(self, row: BaseModel):
        """Insert One"""
        try:
            raw_dict = row.dict()

            if "id" in raw_dict:
                raw_dict["_id"] = ObjectId(raw_dict["id"])
            query_result = self.collection.insert_one(raw_dict)
            return query_result
        except Exception as error: 
            LOGGER.error(error)
            raise Exception(error)

    def find_one(self, filter):
        """Fine One"""
        try:
            results = self.collection.find_one(filter)
            return results
        except Exception as error: 
            LOGGER.error(error)
            raise Exception(error)
