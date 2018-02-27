import Foundation
import Cocoa
import SocketIO

class AppDelegate: NSObject, NSApplicationDelegate {
  let window = NSWindow()
  let clientService = ClientService()
  let view = CrystalView()
  
  func applicationDidFinishLaunching(_ aNotification: Notification) {
    window.contentView = view
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
    clientService.onUpdate = {
      crystal in
      self.view.maybeState = crystal
      self.view.needsDisplay = true
    }
  }
}

class ClientService {
  var onUpdate: UpdateHandler!
  let manager: SocketManager
  let socket: SocketIOClient
  
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
      let message = data[0] as! [String: Any]
      let messageType = message["type"] as! String
      
      switch (messageType) {
        case "CRYSTAL_UPDATED":
          let messagePayload = message["payload"] as! [String: Any]
          let messageBase = messagePayload["base"] as! [String: Double]
          let color = Color(
            hue: messageBase["hue"]!,
            saturation: messageBase["saturation"]!,
            lightness: messageBase["lightness"]!)
          let newCrystal = Crystal(base: color)
          self.onUpdate(newCrystal)
        default:
          print("Unrecognized message received from client")
      }
    }
    socket.connect()
  }
}

typealias UpdateHandler = (Crystal) -> Void

struct Crystal {
  var base: Color
}

struct Color {
  var hue: Double
  var saturation: Double
  var lightness: Double
}

extension Color {
  var cgColor: CGColor {
    return NSColor(
      hue: CGFloat(hue),
      saturation: CGFloat(saturation),
      brightness: CGFloat(lightness),
      alpha: 1).cgColor
  }
}




