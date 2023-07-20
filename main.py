from util.base.flaskr import FlaskApp
from api.all_urls import register_urls
from configs import Settings

BASE = FlaskApp(__name__, Settings)
register_urls(BASE)
APPLICATION = BASE.get_app()

if __name__ == "__main__":
    APPLICATION.run()