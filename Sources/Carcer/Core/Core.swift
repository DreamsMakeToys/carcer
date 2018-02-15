import Cocoa
import ReSwift

typealias Color = NSColor
typealias Layer = NSRect

struct CoreState: StateType {
  var base = Color.black
}

enum CoreAction: Action {
  case setBase(Color)
}

func appReducer(action: Action, state: CoreState?) -> CoreState {
  let coreAction = action as! CoreAction
  var newState = state ?? CoreState()

  switch coreAction {
    case .setBase(let color):
      newState.base = color
  }
  
  return newState
}

func createCore() -> Store<CoreState> {
  return Store<CoreState>(
    reducer: appReducer,
    state: CoreState())
}
