from openai.prompting.system_texts import base_text


def ask_calories_payload(user_text: str, photo, max_tokens: int = 300):
    return {
        "model": "gpt-4-vision-preview",
        "messages": [
            {
                "role": "system",
                "content": base_text,
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": user_text
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{photo}"
                        }
                    }
                ]
            }
        ],
        "max_tokens": max_tokens
    }