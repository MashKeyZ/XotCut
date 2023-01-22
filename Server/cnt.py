import websockets
import asyncio

async def listen():
    url = "ws://127.0.0.1:8080"
    
    async with websockets.connect(url) as ws:

        while True:
            mesg = input("Send a message : ")
            await ws.send(mesg)
            msg = await ws.recv()
            print(msg)
            mesg = ""

asyncio.run(listen())