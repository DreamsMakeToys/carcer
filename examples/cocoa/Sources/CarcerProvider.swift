import Foundation
import Dispatch

class Server {
  let _server: Carcer_Proto_CarcerServer
  
  init(port: Int) {
    let provider = CarcerProvider()
    self._server = Carcer_Proto_CarcerServer(
      address: "0.0.0.0:\(port)",
      provider: provider)
    self._server.start()
  }
}

let interface =
"""
{
  "palette": {
    "hello": {
      "fields": {
        "name": "STRING"
      }
    }
  }
}
"""

class CarcerProvider: Carcer_Proto_CarcerProvider {
  func setup(request: CarcerProto_BrainRequest, session: Carcer_Proto_CarcersetupSession) throws -> CarcerProto_ServiceResponse {
    return try! CarcerProto_ServiceResponse(jsonString: interface)
  }
  
  func createsocket(session: Carcer_Proto_CarcercreateSocketSession) throws {
    var count = 0
    while true {
      let request = try session.receive()
      print(request.command.payload["name"]!.value)
      var response = CarcerProto_ServiceMessage()
      count += 1
      response.value = "Service: \(count)"
      let sem = DispatchSemaphore(value: 0)
      try! session.send(response) {
        sem.signal()
      }
      _ = sem.wait(timeout: DispatchTime.distantFuture)
    }
  }
}
