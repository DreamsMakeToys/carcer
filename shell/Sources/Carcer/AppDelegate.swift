import Foundation
import Cocoa

class AppDelegate: NSObject, NSApplicationDelegate {
  let window = NSWindow()
//  let core = createCore()
//  let cliWorker = DispatchQueue(label: "cli-worker")
  
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
    
//    cliWorker.async() {
//      while true {
//        let userInput = readLine()
//
//        let newBase = NSColor.red
//        let action = CoreAction.setBase(newBase)
//
//        DispatchQueue.main.async
//          { self.core.dispatch(action) }
//      }
//    }
  }
  
  func applicationWillTerminate(_ aNotification: Notification) {
    // Insert code here to tear down your application
  }
}


