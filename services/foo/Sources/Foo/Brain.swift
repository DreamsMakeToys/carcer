import Foundation
import SocketIO

class Brain {
  let manager: SocketManager
  let socket: SocketIOClient
  
  init(port: String) {
    let address = "http://localhost:\(port)"
    manager = SocketManager(
      socketURL: URL(string: address)!,
      config: [.log(true), .compress])
    socket = manager.defaultSocket
    socket.on(clientEvent: .connect) { _, _ in
      let connectedMessage: SocketData = [
        "type": "FOO_CONNECTED",
        "payload": [String: String]()
      ]
      self.socket.emit("message", connectedMessage)
    }
    socket.on("message") { data, _ in
      print(data[0])
    }
    socket.connect()
  }
}