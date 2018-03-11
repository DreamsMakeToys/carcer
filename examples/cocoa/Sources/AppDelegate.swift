import Cocoa

let servicePort = CommandLine.arguments[1]

class AppDelegate: NSObject, NSApplicationDelegate {
  let server = Server(port: servicePort)
}
