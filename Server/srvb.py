import websockets
import asyncio
import keyboard as kb
import time
import win32com.client

PORT = 8080

print("Server listening on Port "+str(PORT))

connected = set()

async def echo(websocket, path):
    print("A client just connected...")
    connected.add(websocket)
    try:
        async for message in websocket:
            word = win32com.client.Dispatch("Word.Application")
            word.Visible = True
            word.ActiveDocument.Activate()
            print(word)
            time.sleep(3)
           # kb.write(message) 
            for conn in connected:
                if conn!=websocket: 
                    await websocket.send(message)
                kb.write(message) 
    except websockets.exceptions.ConnectionClosed as e:
        print("A client disconnected")
        print(e)

    finally:
        connected.remove(websocket)

async def main():
    start_server = await websockets.serve(echo, "10.0.0.14", 8080)
    await start_server.wait_closed()

asyncio.run(main())