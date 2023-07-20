"""Script for init sqlite table from data folder."""

import sqlite3

connection = sqlite3.connect('../data/sqlite/database.db')


with open('../data/sqlite/database.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

text = None
with open("./data.txt", "r") as reader:
    text = reader.read()

insert_query = f"INSERT INTO web_content (id, text, version) VALUES ({1}, \"{text}\", {1})"

cur.execute(insert_query)

connection.commit()
connection.close()