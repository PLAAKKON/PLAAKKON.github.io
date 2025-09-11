# Local CORS proxy for lxp.yoro.fi
# Usage: python dev_proxy.py (runs on http://localhost:5600)
# Then open Flow with: &lxpBase=http://localhost:5600

from flask import Flask, request, Response
import urllib.request
import urllib.error

UPSTREAM = "https://lxp.yoro.fi"
ALLOWED_ORIGIN = "http://localhost:5500"

app = Flask(__name__)


def add_cors(resp: Response) -> Response:
    resp.headers["Access-Control-Allow-Origin"] = ALLOWED_ORIGIN
    resp.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return resp


def forward_json(path: str):
    try:
        raw = request.get_data() or b"{}"
        req = urllib.request.Request(
            url=UPSTREAM + path,
            data=raw,
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        with urllib.request.urlopen(req) as r:  # nosec - dev only
            body = r.read()
            ct = r.headers.get("Content-Type", "application/json")
            status = r.getcode()
        resp = Response(response=body, status=status, content_type=ct)
        return add_cors(resp)
    except urllib.error.HTTPError as e:
        body = e.read() if hasattr(e, 'read') else (str(e).encode())
        resp = Response(response=body, status=e.code, content_type=e.headers.get("Content-Type", "application/json"))
        return add_cors(resp)
    except Exception as e:
        resp = Response(response=str(e), status=502, content_type="text/plain")
        return add_cors(resp)


@app.route("/api/analyze", methods=["POST", "OPTIONS"])
def analyze():
    if request.method == "OPTIONS":
        return add_cors(Response(status=204))
    return forward_json("/api/analyze")


@app.route("/api/analyze-candidates", methods=["POST", "OPTIONS"])
def analyze_candidates():
    if request.method == "OPTIONS":
        return add_cors(Response(status=204))
    return forward_json("/api/analyze-candidates")


if __name__ == "__main__":
    # Debug server for local dev only
    app.run(host="127.0.0.1", port=5600)
