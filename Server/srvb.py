import websockets
import asyncio
import keyboard as kb
import time
import win32com.client
import socket
import qrcode

Port = 8080

print("Server listening on Port "+str(Port))

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
   PORT = getPort()
   IpAddress = getIp()
   url = "ws://"+IpAddress+":"+str(PORT)
   img = qrcode.make(url)
   type(img)  # qrcode.image.pil.PilImage
   img.save("some_file.png")
   print(IpAddress)
   print(PORT)
   start_server = await websockets.serve(echo, IpAddress, PORT)
   await start_server.wait_closed()

def getIp():
    try:
        hostname = socket.gethostname()
        print(hostname)
        hostip = socket.gethostbyname(hostname) 
        return hostip
    except:
        print("Could not get IP address :")

def getPort():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.bind(('', 0))
        port = s.getsockname()[1]
        return port
    except:
        print("Could not available PORT")


asyncio.run(main())