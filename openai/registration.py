import asyncio
from typing import List


from openai.base import openai_request
from openai.prompting.system_texts import system_text_for_registration


def payload(messages: List[dict], max_tokens: int = 1000):
    return {
        "model": "gpt-4o",
        "messages": messages,
        "max_tokens": max_tokens
    }
