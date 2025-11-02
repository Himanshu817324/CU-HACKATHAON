import os
import re
import json
import requests
import zipfile
import tempfile
from fastapi import FastAPI, Form, File, UploadFile
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from rich.console import Console
from rich.progress import track

console = Console()
app = FastAPI(title="🌿 Sustainable JS Analyzer (GPT-5 Nano)")

# -------------------- CONFIG --------------------
API_URL = "https://lightning.ai/api/v1/chat/completions"
API_KEY = "96fe4786-d82e-49ed-ac5a-62b2fd95add1/anutri03/vision-model"
MODEL = "openai/gpt-5-nano"

os.makedirs("reports", exist_ok=True)

# -------------------- IGNORE LIST --------------------
IGNORE_FILE_PATH = "ignore_list.txt"

# Create default ignore list if missing
if not os.path.exists(IGNORE_FILE_PATH):
    with open(IGNORE_FILE_PATH, "w") as f:
        f.write(
            "\n".join([
                "vite.config.js",
                "vite.config.ts",
                "next.config.js",
                "next.config.ts",
                "webpack.config.js",
                "tailwind.config.ts",
                "tailwind.config.js",
                "vite-env.d.ts",
                "vite-env.d.js",
                "postcss.config.js",
                "eslint.config.js",
                "babel.config.js",
                "jest.config.js",
                "rollup.config.js",
                "nuxt.config.js",
                "astro.config.js",
                "server.js",
                "setupTests.js"
            ])
        )

def load_ignore_list():
    with open(IGNORE_FILE_PATH, "r") as f:
        return [line.strip() for line in f if line.strip()]

IGNORE_LIST = load_ignore_list()

# -------------------- CORS --------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- LLM CALL --------------------
def gpt5nano(prompt: str):
    try:
        response = requests.post(
            url=API_URL,
            headers={
                "Authorization": f"Bearer {API_KEY}",
                "Content-Type": "application/json",
            },
            data=json.dumps({
                "model": MODEL,
                "messages": [{"role": "user", "content": [{"type": "text", "text": prompt}]}],
            }),
        )
        if response.status_code == 200:
            return response.json()["choices"][0]["message"]["content"]
        else:
            return f"❌ API Error {response.status_code}: {response.text}"
    except Exception as e:
        return f"❌ Exception: {str(e)}"

# -------------------- UTILITIES --------------------
def extract_js_from_zip(zip_path):
    js_files = []
    ignore_list = load_ignore_list()
    ignored_count = 0

    with zipfile.ZipFile(zip_path, "r") as z:
        temp_dir = tempfile.mkdtemp()
        z.extractall(temp_dir)
        for root, _, files in os.walk(temp_dir):
            for f in files:
                if f.endswith((".js", ".mjs", ".jsx", ".ts", ".tsx")):
                    file_path = os.path.join(root, f)
                    file_lower = f.lower()

                    # Improved ignore matching (case-insensitive + substring)
                    if any(
                        file_lower == pattern.lower()
                        or file_lower.endswith(pattern.lower())
                        or pattern.lower() in file_lower
                        for pattern in ignore_list
                    ):
                        console.print(f"⏭️ Skipping ignored file: [yellow]{f}[/yellow]")
                        ignored_count += 1
                        continue

                    js_files.append(file_path)

    console.print(f"\n[green]✅ JS files collected:[/green] {len(js_files)} | [red]Ignored:[/red] {ignored_count}\n")
    return js_files


def get_default_branch(user, repo):
    api_url = f"https://api.github.com/repos/{user}/{repo}"
    try:
        response = requests.get(api_url, timeout=10)
        if response.status_code == 200:
            data = response.json()
            return data.get("default_branch", "main")
    except Exception:
        pass
    return "main"


def download_github_repo(repo_url):
    console.rule("[bold green]🐙 Downloading GitHub Repository")

    if not repo_url.startswith("https://github.com/"):
        return None, "❌ Invalid GitHub URL format."

    try:
        path_parts = repo_url.replace("https://github.com/", "").split("/")
        user, repo = path_parts[0], path_parts[1].replace(".git", "")
    except Exception:
        return None, "❌ Could not parse GitHub URL."

    default_branch = get_default_branch(user, repo)
    branches = [b for b in [default_branch, "main", "master", "develop", "dev"] if b]

    for branch in branches:
        zip_url = f"https://github.com/{user}/{repo}/archive/refs/heads/{branch}.zip"
        try:
            r = requests.get(zip_url, timeout=20)
            if r.status_code == 200:
                tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".zip")
                tmp.write(r.content)
                tmp.close()
                return tmp.name, repo
        except Exception:
            continue

    return None, "❌ Repo download failed."


def analyze_js_content(js_code, filename):
    prompt = f"""
You are a senior JavaScript sustainability auditor.

Analyze the following code for:
1. Carbon Emission Impact
2. Performance & Energy Efficiency
3. Eco-Friendly Best Practices
4. Summary

Code:
{js_code[:4000]}

Return valid JSON array of issues:
[
  {{
    "problem": "...",
    "problem_description": "...",
    "problem_snippet": "...",
    "optimization_description": "...",
    "optimization_code": "..."
  }}
]
"""
    report_text = gpt5nano(prompt)
    try:
        parsed = json.loads(report_text)
    except Exception:
        parsed = [{
            "problem": "Invalid JSON format",
            "problem_description": report_text[:300],
            "problem_snippet": "",
            "optimization_description": "",
            "optimization_code": ""
        }]

    formatted_output = []
    for issue in parsed:
        formatted_output.append({
            "fileName": os.path.basename(filename),
            "problem": issue.get("problem", ""),
            "problemDescription": issue.get("problem_description", ""),
            "problematicCode": issue.get("problem_snippet", ""),
            "optimization": issue.get("optimization_description", ""),
            "optimizedCode": issue.get("optimization_code", "")
        })

    return formatted_output


# -------------------- ROUTES --------------------
@app.get("/", response_class=HTMLResponse)
def home():
    return """
    <html>
      <head><title>🌿 JS Sustainability Analyzer</title></head>
      <body style="font-family: sans-serif; padding: 2rem;">
        <h2>🌱 Analyze JavaScript Sustainability (GPT-5 Nano)</h2>
        <form action="/analyze_repo" method="post">
          <input name="repo_url" type="text" size="60" placeholder="https://github.com/user/repo" required>
          <button type="submit">Analyze Repo</button>
        </form>
        <br><hr><br>
        <form action="/analyze_upload" enctype="multipart/form-data" method="post">
          <label>Upload ZIP File:</label><br><br>
          <input type="file" name="file" accept=".zip" required>
          <br><br>
          <button type="submit">Analyze Uploaded File</button>
        </form>
      </body>
    </html>
    """


@app.post("/analyze_repo")
def analyze_repo(repo_url: str = Form(...)):
    zip_path, repo_name = download_github_repo(repo_url)
    if not zip_path:
        return JSONResponse({"error": repo_name}, status_code=400)

    js_files = extract_js_from_zip(zip_path)
    if not js_files:
        return JSONResponse({"error": "No JS/TS files found"}, status_code=404)

    all_reports = []
    for js in track(js_files[:5], description=f"Analyzing {repo_name} JS files..."):
        with open(js, "r", encoding="utf-8", errors="ignore") as f:
            js_content = f.read()
        all_reports.extend(analyze_js_content(js_content, js))

    report_path = os.path.join("reports", f"{repo_name}_report.json")
    with open(report_path, "w") as f:
        json.dump(all_reports, f, indent=2)

    return JSONResponse({
        "repo": repo_name,
        "file_count": len(js_files),
        "report_path": report_path,
        "analysis": all_reports
    })


@app.post("/analyze_upload")
def analyze_upload(file: UploadFile = File(...)):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".zip") as tmp:
        tmp.write(file.file.read())
        tmp_path = tmp.name

    js_files = extract_js_from_zip(tmp_path)
    if not js_files:
        return JSONResponse({"error": "No JS/TS files found"}, status_code=404)

    all_reports = []
    for js in track(js_files[:5], description=f"Analyzing uploaded ZIP..."):
        with open(js, "r", encoding="utf-8", errors="ignore") as f:
            js_content = f.read()
        all_reports.extend(analyze_js_content(js_content, js))

    report_path = os.path.join("reports", f"{file.filename}_report.json")
    with open(report_path, "w") as f:
        json.dump(all_reports, f, indent=2)

    return JSONResponse({
        "uploaded_file": file.filename,
        "file_count": len(js_files),
        "report_path": report_path,
        "analysis": all_reports
    })


# -------------------- RUN SERVER --------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
