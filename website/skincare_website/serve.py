#!/usr/bin/env python3
"""
Simple HTTP Server for BeautySmart Dashboard
Run this to view the dashboard locally with proper MIME types
"""
import http.server
import socketserver
import webbrowser
import os

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

def main():
    # Change to the directory containing index.html
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    Handler = MyHTTPRequestHandler
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("=" * 60)
        print("🌟 BeautySmart Dashboard Server")
        print("=" * 60)
        print(f"\n✅ Server running at: http://localhost:{PORT}")
        print(f"📂 Serving from: {os.getcwd()}")
        print("\n💡 Opening dashboard in your browser...")
        print("\n⌨️  Press Ctrl+C to stop the server\n")
        print("=" * 60)
        
        # Open browser automatically
        webbrowser.open(f'http://localhost:{PORT}')
        
        # Start server
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n👋 Server stopped. Thank you for using BeautySmart!")
            print("=" * 60)

if __name__ == "__main__":
    main()
