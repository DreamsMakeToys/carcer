import Cocoa

class CrystalView: NSView {
  override func draw(_ dirtyRect: NSRect) {
    let context = NSGraphicsContext.current!.cgContext
    
//    context.setFillColor(self.state.base.cgColor)
    context.fill(dirtyRect)
  }
  
//  required init?(coder decoder: NSCoder) {
//    fatalError("init(coder:) has not been implemented")
//  }
}




