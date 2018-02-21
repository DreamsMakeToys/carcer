import Foundation
import JavaScriptCore
import Cocoa

class AppDelegate: NSObject, NSApplicationDelegate {
  let window = NSWindow()
  let cliWorker = DispatchQueue(label: "cli-worker")
  let context: JSContext
  let cliService: CommandService
  
  override init() {
    let jsVM = JSVirtualMachine()
    let jsContext = JSContext(virtualMachine: jsVM)!
    jsContext.exceptionHandler = { print($1!) }
    
    print(Bundle.main.resourcePath)
    let bundleUrl = Bundle.main.url(forResource: "carcer", withExtension: "js")!
    let bundleScript = try! String(contentsOf: bundleUrl, encoding: String.Encoding.utf8)
    jsContext.evaluateScript(bundleScript)
    
    context = jsContext
    cliService = CommandService(context: jsContext)
  }
  
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
    
    cliWorker.async() {
      while true {
        let userInput = readLine()!

        DispatchQueue.main.async {
          self.cliService.post(message: userInput)
        }
      }
    }
  }
  
  func applicationWillTerminate(_ aNotification: Notification) {
    // Insert code here to tear down your application
  }
}


