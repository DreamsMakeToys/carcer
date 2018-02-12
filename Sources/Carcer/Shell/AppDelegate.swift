import Cocoa
import ReSwift

class AppDelegate: NSObject, NSApplicationDelegate {
  let window = NSWindow()
  let core = createCore()
  let cliWorker = DispatchQueue(label: "cli-worker")
  
  func applicationDidFinishLaunching(_ aNotification: Notification) {
    self.window.contentView = RootView(core: self.core)
    
    self.window.setContentSize(NSSize(width: 512, height: 512))
    self.window.contentAspectRatio = NSSize(width: 1, height: 1)
    self.window.minSize = NSSize(width: 256, height: 256)
    
    self.window.styleMask = NSWindow.StyleMask(rawValue:
      NSWindow.StyleMask.closable.rawValue |
      NSWindow.StyleMask.miniaturizable.rawValue |
      NSWindow.StyleMask.titled.rawValue |
      NSWindow.StyleMask.resizable.rawValue)
    
    self.window.title = ProcessInfo.processInfo.processName
    
    self.window.center()
    self.window.makeKeyAndOrderFront(nil)
    
    self.cliWorker.async() {
      while true {
        _ = readLine()
        
        DispatchQueue.main.async
          { self.core.dispatch(RandomColor()) }
      }
    }
  }
  
  func applicationWillTerminate(_ aNotification: Notification) {
    // Insert code here to tear down your application
  }
}


