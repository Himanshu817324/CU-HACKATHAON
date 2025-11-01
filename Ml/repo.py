import os
import re
import json
import requests
import zipfile
import tempfile
from rich.console import Console
from rich.progress import track

console = Console()

# -------------------- CONFIG --------------------
API_URL = "https://lightning.ai/api/v1/chat/completions"
API_KEY = "96fe4786-d82e-49ed-ac5a-62b2fd95add1/anutri03/vision-model"
MODEL = "openai/gpt-5-nano"

os.makedirs("reports", exist_ok=True)

# -------------------- LLM CALL --------------------
def gpt5nano(prompt: str):
    """Send prompt to GPT-5 Nano"""
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

# -------------------- LOCAL FILE HANDLER --------------------
def extract_js_from_zip(zip_path):
    console.rule("[bold blue]🗂 Extracting JS/TS files from ZIP")
    js_files = []
    with zipfile.ZipFile(zip_path, "r") as z:
        temp_dir = tempfile.mkdtemp()
        z.extractall(temp_dir)
        for root, _, files in os.walk(temp_dir):
            for f in files:
                if f.endswith((".js", ".mjs", ".jsx", ".ts", ".tsx")):
                    full_path = os.path.join(root, f)
                    js_files.append(full_path)
    if js_files:
        console.print(f"✅ Extracted {len(js_files)} JS/TS files", style="bold green")
    else:
        console.print("⚠️ No JavaScript-related files found in the ZIP", style="yellow")
    return js_files

# -------------------- GITHUB HANDLER --------------------
def get_default_branch(user, repo):
    api_url = f"https://api.github.com/repos/{user}/{repo}"
    try:
        response = requests.get(api_url, timeout=10)
        if response.status_code == 200:
            data = response.json()
            default_branch = data.get("default_branch")
            if default_branch:
                console.print(f"🔍 Detected default branch: {default_branch}", style="cyan")
                return default_branch
    except Exception:
        pass
    return None

def download_github_repo(repo_url):
    console.rule("[bold green]🐙 Downloading GitHub Repository")

    if not repo_url.startswith("https://github.com/"):
        console.print("❌ Invalid GitHub URL format.", style="bold red")
        return None

    try:
        path_parts = repo_url.replace("https://github.com/", "").split("/")
        user, repo = path_parts[0], path_parts[1].replace(".git", "")
    except Exception:
        console.print("❌ Could not parse GitHub URL.", style="bold red")
        return None

    default_branch = get_default_branch(user, repo)
    branches = [b for b in [default_branch, "main", "master", "develop", "dev"] if b]

    for branch in branches:
        zip_url = f"https://github.com/{user}/{repo}/archive/refs/heads/{branch}.zip"
        console.print(f"⬇️ Trying branch: {branch}", style="yellow")
        try:
            r = requests.get(zip_url, timeout=20)
            if r.status_code == 200:
                tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".zip")
                tmp.write(r.content)
                tmp.close()
                console.print(f"✅ Repo downloaded from branch '{branch}'", style="bold green")
                return tmp.name
        except Exception as e:
            console.print(f"⚠️ Error downloading branch {branch}: {e}", style="red")

    console.print("❌ Failed to download repo. It may be private or unavailable.", style="bold red")
    return None

# -------------------- ANALYSIS --------------------
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
        console.print("⚠️ Model returned invalid JSON; saving raw output.", style="red")
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

    safe_filename = re.sub(r'[^a-zA-Z0-9]', '_', filename)
    report_path = f"reports/{safe_filename}.json"
    with open(report_path, "w") as f:
        json.dump(formatted_output, f, indent=2)

    console.print_json(json.dumps(formatted_output, indent=2))
    console.rule("[bold magenta]---------------------------------------------")
    return formatted_output

# -------------------- MAIN --------------------
def main():
    console.rule("[bold green]🌿 Sustainable JavaScript Analyzer (GitHub Only - GPT-5 Nano)")
    repo_url = input("Enter GitHub repo URL: ").strip()
    zip_path = download_github_repo(repo_url)

    if not zip_path:
        console.print("❌ Could not process repository.", style="red")
        return

    js_files = extract_js_from_zip(zip_path)
    all_reports = []

    for js in track(js_files, description="Analyzing JS files from repo..."):
        with open(js, "r", encoding="utf-8", errors="ignore") as f:
            js_content = f.read()
        all_reports.extend(analyze_js_content(js_content, js))

    frontend_path = "reports/frontend_ready.json"
    with open(frontend_path, "w") as f:
        json.dump(all_reports, f, indent=2)

    console.rule("[bold yellow]🌍 Frontend-Ready JSON Output")
    console.print_json(json.dumps(all_reports, indent=2))
    console.print(f"\n✅ Saved frontend-ready output to {frontend_path}", style="bold green")


if __name__ == "__main__":
    main()
