from . import app
import unittest

class TestConfig(unittest.TestCase):
    def setUp(self) -> None:
        pass

    def tearDown(self) -> None:
        pass

    def test_app_config(self) -> None:
        assert app.config["ENV"] == "DEVELOPMENT"
        assert app.config["CLIENT_SECRET"] == "gKx@XbR?C:_T345z3RghHus@Q?e2H.uh"
