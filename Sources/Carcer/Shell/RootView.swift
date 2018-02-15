import Cocoa
import ReSwift

class RootView: NSView, StoreSubscriber {
  var state: CoreState
  
  override func draw(_ dirtyRect: NSRect) {
    let context = NSGraphicsContext.current!.cgContext
    
    context.setFillColor(self.state.base.cgColor)
    context.fill(dirtyRect)
  }
  
  func newState(state: CoreState) {
    self.state = state
    self.needsDisplay = true
  }
  
  init(core: Store<CoreState>) {
    self.state = core.state
    super.init(frame: NSRect())
    
    core.subscribe(self)
  }
  
  required init?(coder decoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
}


