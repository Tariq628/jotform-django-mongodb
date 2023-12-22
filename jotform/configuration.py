import os
from os.path import dirname, join
import environ

def get_env(variable_name, default=""):
    local_env = join(dirname(__file__), ".env.development")
    if os.path.exists(local_env):
        # Override the variables from .env with values from .env.development
        environ.Env.read_env(env_file=local_env)
    # Loading all environment variables
    env = environ.Env()
    environ.Env.read_env()
    return env.str(variable_name, default)

IS_DEVELOPMENT = get_env('DEBUG', False)
MONGODB_USER = get_env("MONGODB_USER")
MONGODB_PASSWORD = get_env("MONGODB_PASSWORD")
MONGODB_HOST = get_env("MONGODB_HOST")
MONGODB_PORT = get_env("MONGODB_PORT")
MONGODB_NAME = get_env("MONGODB_NAME")