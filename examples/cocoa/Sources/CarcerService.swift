import Foundation
import Dispatch

class Service {
  let server: Carcer_Proto_CarcerServer
  
  init(on port: Int, with palette: String) {
    let provider = CarcerProvider(with: palette)
    server = Carcer_Proto_CarcerServer(
      address: "0.0.0.0:\(port)",
      provider: provider)
    server.start()
  }
}

class CarcerProvider: Carcer_Proto_CarcerProvider {
  let palette: String
  
  func setup(request: CarcerProto_BrainRequest, session: Carcer_Proto_CarcersetupSession) throws -> CarcerProto_ServiceResponse {
    let interface = "{ \"palette\": \(self.palette) }"
    return try! CarcerProto_ServiceResponse(jsonString: interface)
  }
  
  func createsocket(session: Carcer_Proto_CarcercreateSocketSession) throws {
    while true {
      let request = try session.receive()
      var response = CarcerProto_ServiceMessage()
      response.value = "good"
      let sem = DispatchSemaphore(value: 0)
      try! session.send(response) {
        sem.signal()
      }
      _ = sem.wait(timeout: DispatchTime.distantFuture)
    }
  }
  
  init(with palette: String) {
    self.palette = palette
  }
}
