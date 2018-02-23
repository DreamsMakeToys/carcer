import Foundation
import JavaScriptCore

class CommandService {
  let context: JSContext
  
  private
  let postToCoreFunc: JSValue
  
  private
  func postToHost(message: String) {
    print(message)
  }
  
  func post(message: String) {
    postToCoreFunc.call(withArguments: [message])
  }
  
  init(context: JSContext) {
    let postToCoreFunc = context.objectForKeyedSubscript("_postToCore")!
    
    self.context = context
    self.postToCoreFunc = postToCoreFunc
    
    let postToHost: CoreSender = { self.postToHost(message: $0) }
    let postToHostBlock = unsafeBitCast(postToHost, to: AnyObject.self)
    let postToHostSubscript = "postToHost" as (NSCopying & NSObjectProtocol)!
    context.setObject(postToHostBlock, forKeyedSubscript: postToHostSubscript)
    
    post(message: "WILL_MOUNT")
  }
}

typealias CoreSender = @convention(block) (String) -> Void
