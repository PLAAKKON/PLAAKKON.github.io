# Local mock LxP API for testing the Flow without server changes
# Run: python dev_mock.py (http://127.0.0.1:5601)
# Use with Flow: &lxpBase=http://127.0.0.1:5601

from flask import Flask, request, Response, jsonify
import re

app = Flask(__name__)

ALLOWED_ORIGIN = "http://localhost:5500"

def add_cors(resp: Response) -> Response:
    resp.headers["Access-Control-Allow-Origin"] = ALLOWED_ORIGIN
    resp.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return resp

@app.route("/api/analyze", methods=["POST", "OPTIONS"])
def analyze():
    if request.method == "OPTIONS":
        return add_cors(Response(status=204))
    body = request.get_json(silent=True) or {}
    text = (body.get("text") or "").lower()
    # Tiny heuristic to mimic LxP classification
    mapping = [
        ("mechanical|mekaniikka|cad|fea|ansys|solidworks|rotor|flywheel|kinetic energy|amb|levitation|vacuum|commissioning|failure analysis|root cause|r&d", "MECHANICAL_RND"),
        ("energy storage|grid|ancillary|bio-based|carbon fiber|epoxy|distributed energy|electric mobility|teraloop|flywheel", "ENERGY_STORAGE"),
        ("developer|software|react|node|java|.net|c#", "IT_SOFTWARE"),
        ("logistiikka|warehouse|forklift|varasto|kuljetus", "LOGISTICS"),
        ("nurse|sairaanhoitaja|lähihoitaja", "HEALTHCARE"),
        ("rakennus|kirvesmies|maalari|sähköasentaja|putkiasentaja|lvi", "CONSTRUCTION"),
        ("siivous|cleaner|hygienia", "CLEANING"),
        ("toimisto|assistentti|accounting|kirjanpito", "OFFICE"),
    ]
    lxp = None
    for pat, key in mapping:
        if re.search(pat, text):
            lxp = key
            break
    lxp = lxp or "GEN"
    labels = [f"Detected domain: {lxp}"]
    resp = jsonify({"lxpKey": lxp, "labels": labels})
    return add_cors(resp)

@app.route("/api/analyze-candidates", methods=["POST", "OPTIONS"])
def analyze_candidates():
    if request.method == "OPTIONS":
        return add_cors(Response(status=204))
    body = request.get_json(silent=True) or {}
    candidates = body.get("candidates") or []
    lxp_key = body.get("lxpKey") or "GEN"
    out = []
    for idx, c in enumerate(candidates):
        cid = str(c.get("id"))
        rank = "A" if idx < 10 else "B" if idx < 20 else "C" if idx < 30 else "D"
        code = f"{lxp_key}-{rank}"
        reasons = [f"Job LxP={lxp_key}", f"Rank={rank} by heuristic"]
        out.append({"id": cid, "code": code, "reasons": reasons})
    resp = jsonify({"codes": out})
    return add_cors(resp)

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5601)
