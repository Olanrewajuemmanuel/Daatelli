import toml
import os


def get_version() -> str:
    pyproject_path = os.path.join(os.path.dirname(__file__), "../../pyproject.toml")
    try:
        pyproject = toml.load(pyproject_path)
        return pyproject["tool"]["poetry"]["version"]
    except (FileNotFoundError, KeyError):
        return "0.1.0"
