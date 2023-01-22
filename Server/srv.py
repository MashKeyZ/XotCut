import websockets
import asyncio

PORT = 8080

print("Server listening on Port "+str(PORT))

async def echo(websocket, path):
    print("A client just connected...")
    try:
        async for message in websocket:
            print("Recieved message from client : "+message)
            await websocket.send("Server : "+message)
    except websockets.exceptions.ConnectionClosed as e:
        print("A client disconnected")
        print(e)
#Create an instance of a server
#start_server=websockets.serve(echo,"localhost",PORT)


async def main():
    start_server = await websockets.serve(echo, "localhost", 8080)
    await start_server.wait_closed()

asyncio.run(main())