import json

import asyncio

from backend.data.config import PATH_PYTHON3


async def get_invoice_url(data):
    data_string = json.dumps(data)
    python_executable = PATH_PYTHON3
    process = await asyncio.create_subprocess_exec(
        python_executable, 'utils/invoice_generator.py', data_string,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE
    )
    stdout, stderr = await process.communicate()
    if stdout:
        return stdout.decode().strip()
    else:
        raise Exception("Invoice link generation failed: " + stderr.decode())