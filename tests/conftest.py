import pytest
from app import app as APPLICATION

@pytest.fixture
def app():
    """App Fixture"""
    return APPLICATION

@pytest.fixture
def client(app):
    """Client Fixture"""
    return app.test_client()
