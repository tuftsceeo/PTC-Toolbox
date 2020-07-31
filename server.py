"""
A simple Python script to receive messages from a client over
Bluetooth using PyBluez (with Python 3.7).
"""

import code
#import subprocess
import bluetooth
import os
import time
from ports import *

hostMACAddress = '' #leave empty
port = 3
backlog = 1
size = 1024
s = bluetooth.BluetoothSocket(bluetooth.RFCOMM)
s.bind((hostMACAddress, port))
s.listen(backlog)

vars = globals().copy()
vars.update(locals())
shell = code.InteractiveConsole(vars)

print("up and running")

def fileWrite(msg):
    shell.push("import sys")
    shell.push("stdoutOrigin = sys.stdout")
    shell.push("sys.stdout = open(\"log.txt\", \"w\")")
    shell.push(msg)
    shell.push("sys.stdout.close()")
    shell.push("sys.stdout=stdoutOrigin")

try:
    client, clientInfo = s.accept()
    while 1:
        data = client.recv(size)
        if data:
            msg = data.decode()
            if msg != "ignore":
                fileWrite(msg)
                sensor_name = msg[0:1]
                try:
                    f = open("log.txt", 'r')
                    line = f.readline().rstrip()
                    #print(line)
                    if (os.path.getsize("log.txt") == 0):
                        client.send("ignore") # Echo back to client
                    else:
                        client.send(sensor_name + line)

                    f.close()
                    
                except:
                    client.send("ignore")
            else:
                client.send("ignore")      

except:    
    print("Closing socket")
    client.close()
    s.close()