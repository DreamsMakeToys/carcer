import Foundation
import Dispatch

class Service {
  let server: Carcer_Proto_CarcerServer
  
  init(on port: Int) {
    let provider = CarcerProvider()
    server = Carcer_Proto_CarcerServer(
      address: "0.0.0.0:\(port)",
      provider: provider)
    server.start()
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
