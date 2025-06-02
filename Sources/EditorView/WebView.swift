import SwiftUI
import WebKit

public struct EditorWebView: UIViewRepresentable {
    public init() {}

    public func makeUIView(context: Context) -> WKWebView {
        let webView = WKWebView()
        webView.scrollView.bounces = false
        webView.scrollView.isScrollEnabled = true
        webView.navigationDelegate = context.coordinator
        return webView
    } 

    public func makeCoordinator() -> Coordinator {
        Coordinator()
    }
    
    public class Coordinator: NSObject, WKNavigationDelegate {
        public func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            print("✅ WebView finished loading.")
            webView.evaluateJavaScript("document.body.innerHTML") { result, error in
                if let html = result as? String {
                    print("📄 HTML loaded:\n\(html.prefix(300))")
                } else if let error = error {
                    print("❌ JS error: \(error)")
                }
            }
        }
    }
    public func updateUIView(_ webView: WKWebView, context: Context) {
        guard
          let bundle = Bundle(identifier: "org.swift.swift-playground"),
          let htmlURL = bundle.url(forResource: "index", withExtension: "html")
        else { return }

        webView.loadFileURL(htmlURL, allowingReadAccessTo: htmlURL.deletingLastPathComponent())
    }
}
