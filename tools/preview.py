"""Local-only static preview. No external dependencies; Ctrl+C stops it."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from functools import partial
import webbrowser
import sys

root = Path(__file__).resolve().parent.parent / 'site'
port = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
class PreviewHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

handler = partial(PreviewHandler, directory=str(root))
with ThreadingHTTPServer(('127.0.0.1', port), handler) as server:
    address = f'http://127.0.0.1:{port}/'
    print(f'Portfolio: {address}\nPress Ctrl+C to stop.', flush=True)
    if '--no-open' not in sys.argv:
        webbrowser.open(address)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
