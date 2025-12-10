
# import re
# import os
# import sys
# from datetime import datetime
# import google.generativeai as genai


# # --------------------- INSERT YOUR API KEY HERE --------------------- #
# GEMINI_API_KEY = "AIzaSyBTAiVpphYjNVbM5PoFGTWWBVlqkh7aUdg"   # ← replace this with your actual key
# # -------------------------------------------------------------------- #


# def extract_code(text: str) -> str:
#     """Extract code inside triple backticks."""
#     match = re.search(r"```[\w+\-]*\n([\s\S]*?)```", text)
#     return match.group(1).strip() if match else text.strip()


# def choose_extension(language: str) -> str:
#     return {"c": ".c", "cpp": ".cpp", "java": ".java"}.get(language.lower(), ".txt")


# def build_prompt(problem: str, language: str) -> str:
#     lang_name = {"c": "C", "cpp": "C++", "java": "Java"}.get(language, language)

#     return f"""
# Generate a complete, working {lang_name} program.

# REQUIREMENTS:
# - Output ONLY code inside a ``` fenced code block.
# - Program must read input from STDIN and print to STDOUT.
# - No explanation, ONLY code.

# Problem:
# {problem}

# Language: {lang_name}
# """


# def save_code(code: str, language: str, out_dir="generated"):
#     os.makedirs(out_dir, exist_ok=True)
#     ts = datetime.utcnow().strftime("%Y%m%dT%H%M%SZ")
#     filename = f"solution_{language}_{ts}{choose_extension(language)}"
#     filepath = os.path.join(out_dir, filename)

#     with open(filepath, "w", encoding="utf-8") as f:
#         f.write(code)

#     return filepath


# def main():
#     # Configure Gemini with API key
#     if GEMINI_API_KEY == "YOUR_API_KEY_HERE":
#         print("ERROR: Please replace YOUR_API_KEY_HERE with your actual Gemini API key.")
#         sys.exit(1)

#     genai.configure(api_key=GEMINI_API_KEY)

#     print("=== Gemini Code Generator (C / C++ / Java) ===")
#     print("Enter your problem (end with blank line):")

#     lines = []
#     while True:
#         line = input()
#         if not line.strip() and lines:
#             break
#         lines.append(line)

#     problem = "\n".join(lines).strip()

#     language = ""
#     while language not in ("python", "cpp", "java"):
#         language = input("Choose language (python / cpp / java): ").strip().lower()

#     prompt = build_prompt(problem, language)

#     print("\nGenerating code using Gemini...\n")

#     model = genai.GenerativeModel("gemini-2.5-pro")
#     response = model.generate_content(prompt)

#     raw_output = response.text
#     code = extract_code(raw_output)

#     filepath = save_code(code, language)

#     print(f"✔ Code saved to: {filepath}\n")
#     print("------- Generated Code Preview -------\n")
#     print(code)
#     print("\n--------------------------------------")


# if __name__ == "__main__":
#     main()


# backend/app.py
import os
import re
from datetime import datetime
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
import google.generativeai as genai

# ---------------------------------------------------------
#  YOUR API KEY DECLARED DIRECTLY HERE (unsafe for production)
# ---------------------------------------------------------
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY is not set in environment")

GEMINI_MODEL = "gemini-2.5-flash"   # or gemini-2.5-pro
# ---------------------------------------------------------

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)

app = Flask(__name__)
CORS(app)

# In-memory cache
CACHE = {}

def strip_comments(code: str) -> str:
    code = re.sub(r'/\*[\s\S]*?\*/', '', code)   # remove block comments
    code = re.sub(r'//.*', '', code)             # remove line comments
    # remove consecutive blank lines
    code = re.sub(r'\n\s*\n+', '\n\n', code)
    return code.strip()

def extract_code(text: str) -> str:
    """Extract code inside ``` blocks."""
    if not text:
        return ""
    match = re.search(r"```[\w+\-_.]*\n([\s\S]*?)```", text)
    result=strip_comments(match.group(1).strip() if match else text.strip())
    return result

def build_prompt(question, language):
    lang_full = {"python":"Python", "java":"Java", "cpp":"C++", "c":"C"}.get(language, language)
    return f"""
Generate a complete working {lang_full} program.

REQUIREMENTS:
- Output ONLY code inside a single ``` fenced block (no explanations).
- Read input from STDIN and print output to STDOUT.
- No extra text.

Problem:
{question}

Language: {lang_full}
"""

import traceback

@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json(force=True)
    question = data.get("question", "").strip()
    language = data.get("language", "").lower().strip()

    if not question:
        return jsonify({"error": "Missing question"}), 400

    if language not in ("python", "java", "cpp", "c"):
        return jsonify({"error": "Unsupported language"}), 400

    cache_key = f"{language}::{question}"
    if cache_key in CACHE:
        return jsonify({
            "answer": CACHE[cache_key],
            "cached": True
        })

    prompt = build_prompt(question, language)

    try:
        model = genai.GenerativeModel(GEMINI_MODEL)
        response = model.generate_content(prompt)
        raw_text = response.text
        code = extract_code(raw_text)
        final_answer = code if code else raw_text

        CACHE[cache_key] = final_answer

        return jsonify({
            "answer": final_answer,
            "cached": False
        })
    except Exception as e:
        print("ERROR in /generate:", e)
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    print("Flask backend running on http://localhost:5000")
    app.run(host="0.0.0.0", port=5000, debug=True)
