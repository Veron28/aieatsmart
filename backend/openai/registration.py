from typing import List


def payload(messages: List[dict], max_tokens: int = 1000):
    return {
        "model": "gpt-4o",
        "messages": messages,
        "max_tokens": max_tokens
    }
