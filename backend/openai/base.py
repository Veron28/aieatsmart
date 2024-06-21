import json

import aiohttp

from backend.data.config import headers, openai_url, PROXY


async def openai_request(payload):
    async with aiohttp.ClientSession(connector=aiohttp.TCPConnector(verify_ssl=False)) as session:
        async with session.post(openai_url, headers=headers, data=json.dumps(payload), proxy=PROXY) as resp:
            return await resp.json()
