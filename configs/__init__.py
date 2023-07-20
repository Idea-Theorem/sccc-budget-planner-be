import os

project_name = os.environ.get("PROJECT_NAME")

if project_name == "dev":
    from .dev import *
else:
    from .local import *