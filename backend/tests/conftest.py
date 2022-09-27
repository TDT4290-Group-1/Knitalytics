from app import create_app
import pytest
import sys
import os


current = os.path.dirname(os.path.realpath(__file__))
parent = os.path.dirname(current)

sys.path.append(parent)


@pytest.fixture()
def app():
    app = create_app()
    app.config.update(
        {
            "TESTING": True,
        }
    )

    # other setup can go here

    yield app

    # clean up / reset resources here


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def runner(app):
    return app.test_cli_runner()
