import json

import asyncio


async def get_invoice_url(data):
    data_string = json.dumps(data)
    python_executable = 'venv/bin/python'
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