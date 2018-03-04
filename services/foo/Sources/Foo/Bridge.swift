import Foundation
import SocketIO

class Bridge {
  let manager: SocketManager
  let socket: SocketIOClient
  
  init() {
    let address = "http://localhost:3000"
    manager = SocketManager(
      socketURL: URL(string: address)!,
      config: [.log(true), .compress])
    socket = manager.defaultSocket
    socket.on(clientEvent: .connect) { _, _ in
      let connectedMessage: SocketData = [
        "type": "CONNECTED",
        "payload": [String: String]()
      ]
      self.socket.emit("message", connectedMessage)
    }
    socket.on("message") { data, _ in
      let message = data[0] as! [String: Any]
      let messageType = message["type"] as! String      
      switch (messageType) {
        default:
          print("Unrecognized message received from brain")
      }
    }
    socket.connect()
  }
}