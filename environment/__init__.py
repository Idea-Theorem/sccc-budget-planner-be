import os
from .common import *

project_name = os.environ.get("WEBSITE_SITE_NAME")

if project_name == "dev":
    from .dev import *
else:
    from .local import *