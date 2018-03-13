import Cocoa

let port = Int(CommandLine.arguments[1])!

class AppDelegate: NSObject, NSApplicationDelegate {
  let service = Service(on: port, with: PALETTE)
}
