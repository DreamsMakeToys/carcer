import PackageDescription
let package = Package (
    name: "Foo",
    dependencies: [
        .Package(url: "https://github.com/grpc/grpc-swift.git", Version(0,3,3)),
        .Package(url: "https://github.com/apple/swift-protobuf.git", Version(1,0,2)),
    ]
)

