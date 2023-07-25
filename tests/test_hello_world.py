import pytest
from util.constants.endpoints import HELLO_WORLD

class TestHelloWorld:
    """Hello World Test Suits"""
    def test_response_status(self, client):
        """Test Respones Status"""
        assert client.get(HELLO_WORLD).status_code == 200
