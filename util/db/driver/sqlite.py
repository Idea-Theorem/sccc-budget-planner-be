import logging
import os
import sqlite3
from environment import SQLITE_DB_NAME

LOGGER = logging.getLogger('logger')
DB_PATH = os.getcwd() + f"/data/sqlite/{SQLITE_DB_NAME}"

class SqliteDriver:
    """Sqlite Driver"""

    def execute_query(self, query_str):
        """Execute Query"""

        results = []
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute(query_str)

            query_results = cursor.fetchall()

            for row in query_results:
                results.append(row)
            
            cursor.close()

        return results
