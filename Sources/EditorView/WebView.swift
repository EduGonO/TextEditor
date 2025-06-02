import SwiftUI
import WebKit

public struct EditorWebView: UIViewRepresentable {
    public init() {}

    public func makeUIView(context: Context) -> WKWebView {
        let webView = WKWebView()
        webView.scrollView.bounces = false
        webView.scrollView.isScrollEnabled = true
        return webView
    }

    public func updateUIView(_ webView: WKWebView, context: Context) {
        guard
            let htmlURL = Bundle.module.url(forResource: "index", withExtension: "html")
        else { return }

        webView.loadFileURL(htmlURL, allowingReadAccessTo: htmlURL.deletingLastPathComponent())
    }
}