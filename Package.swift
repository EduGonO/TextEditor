// swift-tools-version:5.7
import PackageDescription

let package = Package(
    name: "TextEditor",
    platforms: [.iOS(.v15)],
    products: [
        .library(name: "EditorView", targets: ["EditorView"])
    ],
    targets: [
        .target(
            name: "EditorView",
            resources: [
                .copy("Resources/index.html"),
                .copy("Resources/bundle.js")
            ]
        )
    ]
)