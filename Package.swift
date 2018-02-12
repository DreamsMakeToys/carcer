// swift-tools-version:4.0
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
  name: "Carcer",
  dependencies: [
    .package(url: "https://github.com/ReSwift/ReSwift.git", from: "4.0.0"),
  ],
  targets: [
    .target(
      name: "Carcer",
      dependencies: ["ReSwift"]),
  ]
)
