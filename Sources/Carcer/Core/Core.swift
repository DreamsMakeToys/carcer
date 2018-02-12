import Cocoa
import ReSwift

struct CoreState: StateType {
  var color: NSColor = NSColor.black
}

struct RandomColor: Action {}

func appReducer(action: Action, state: CoreState?) -> CoreState {
  var state = state ?? CoreState()
  
  switch action {
    case _ as RandomColor:
      state.color = NSColor(white: CGFloat(Float(arc4random()) / Float(UINT32_MAX)), alpha: 1)
    
    default: break
  }
  
  return state
}

func createCore() -> Store<CoreState> {
  return Store<CoreState>(
    reducer: appReducer,
    state: CoreState())
}
