from environs import Env

env = Env()
env.read_env()

ADMINS = env.list("ADMINS")
BOT_TOKEN = env.str("BOT_TOKEN")
PROXY = env.str("PROXY")
API_KEY = env.str("API_KEY")
DATABASE_URL = env.str("DATABASE_URL")
WEBAPP_URL = env.str("WEBAPP_URL")

headers = {
  "Content-Type": "application/json",
  "Authorization": f"Bearer {API_KEY}"
}

openai_url = "https://api.openai.com/v1/chat/completions"


