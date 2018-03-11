import Foundation
import Dispatch

class Server {
  let _server: Carcer_Proto_CarcerServer
  
  init() {
    let provider = CarcerProvider()
    self._server = Carcer_Proto_CarcerServer(
      address: "0.0.0.0:3000",
      provider: provider)
    self._server.start()
  }
}

class CarcerProvider: Carcer_Proto_CarcerProvider {
  func setup(request: CarcerProto_BrainRequest, session: Carcer_Proto_CarcersetupSession) throws -> CarcerProto_ServiceResponse {
    print("setup")
    var response = CarcerProto_ServiceResponse()
    var commandDescription = CarcerProto_CommandDescription()
    commandDescription.fields = ["name": CarcerProto_InputType.string]
    response.palette = ["hello": commandDescription]
    return response
  }
  
  func createsocket(session: Carcer_Proto_CarcercreateSocketSession) throws {
    print("createsocket")
    var count = 0
    while true {
      do {
        let request = try session.receive()
        print(request)
        var response = CarcerProto_ServiceMessage()
        response.value = "Service: \(count += 1)"
        let sem = DispatchSemaphore(value: 0)
        try session.send(response) {sem.signal()}
        _ = sem.wait(timeout: DispatchTime.distantFuture)
      } catch Carcer_Proto_CarcerServerError.endOfStream {
        break
      } catch (let error) {
        print("\(error)")
      }
    }
    try session.close()
  }
}
