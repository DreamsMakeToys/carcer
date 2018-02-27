import Foundation
import Cocoa
import SocketIO

class AppDelegate: NSObject, NSApplicationDelegate {
  let window = NSWindow()
  let clientService = ClientService()
  
  func applicationDidFinishLaunching(_ aNotification: Notification) {
    window.contentView = CrystalView()
    
    window.setContentSize(NSSize(width: 512, height: 512))
    window.contentAspectRatio = NSSize(width: 1, height: 1)
    window.minSize = NSSize(width: 256, height: 256)
    
    window.styleMask = NSWindow.StyleMask(rawValue:
      NSWindow.StyleMask.closable.rawValue |
      NSWindow.StyleMask.miniaturizable.rawValue |
      NSWindow.StyleMask.titled.rawValue |
      NSWindow.StyleMask.resizable.rawValue)
    
    window.title = ProcessInfo.processInfo.processName
    
    window.center()
    window.makeKeyAndOrderFront(nil)
  }
}

class ClientService {
  private let manager: SocketManager
  private let socket: SocketIOClient
  
  init() {
    manager = SocketManager(
      socketURL: URL(string: "http://localhost:3000")!,
      config: [.compress])
    
    socket = manager.defaultSocket
    
    socket.on(clientEvent: .connect) { _, _ in
      let connectedMessage: SocketData = [
        "type": "RENDERER_CONNECTED",
        "payload": [String: String]()
      ]
      
      self.socket.emit("message", connectedMessage)
    }
    
    socket.on("message") { data, _ in
      print(data)
    }
    
    socket.connect()
  }
}




