import Cocoa

let app = NSApplication.shared
app.delegate = AppDelegate()
NSApp.setActivationPolicy(NSApplication.ActivationPolicy.regular)
NSApp.activate(ignoringOtherApps: true)
NSApp.run()
