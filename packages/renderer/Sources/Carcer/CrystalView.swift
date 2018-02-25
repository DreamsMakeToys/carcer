import Cocoa

class CrystalView: NSView {
  override func draw(_ dirtyRect: NSRect) {
    let context = NSGraphicsContext.current!.cgContext
    
    context.fill(dirtyRect)
  }
}




