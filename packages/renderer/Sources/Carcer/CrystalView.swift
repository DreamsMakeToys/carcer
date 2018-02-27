import Cocoa

class CrystalView: NSView {
  var maybeState: Crystal?
  
  override func draw(_ dirtyRect: NSRect) {
    if let state = maybeState {
      let context = NSGraphicsContext.current!.cgContext
      context.setFillColor(state.base.cgColor)
      context.fill(dirtyRect)
    }
  }
}




