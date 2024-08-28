# Copyright (c) 2024 iiPython

# Modules
import os
import sys
import subprocess
from pathlib import Path

import requests

# Initialization
CF_API_KEY, CF_ZONE_ID = sys.argv[1], sys.argv[2]

# Fetch modified files
output = subprocess.check_output([
    "git", "diff-tree", "--no-commit-id", "--name-only", "-r", os.environ["GITHUB_SHA"]
])
modified_files = [Path(file) for file in output.decode().split("\n") if file.strip()]

# Calculate required purges
source, required_purge = Path("src"), []
for item in modified_files:
    if item.suffix == ".jinja2":
        required_purge.append(item.with_suffix("").relative_to(source))
        if item.is_relative_to(source / "pages"):
            required_purge.append((item.relative_to(source / "pages")).with_suffix(""))

    if item.is_relative_to(source / "static"):
        required_purge.append(item.relative_to(source))

if not required_purge:
    print("No changed files need to be purged.")
    exit(0)

print("Files requiring purging:", required_purge)

# Send off to cloudflare
response = requests.post(
    f"https://api.cloudflare.com/client/v4/zones/{CF_ZONE_ID}/purge_cache",
    headers = {
        "Authorization": f"Bearer {CF_API_KEY}"
    },
    json = {
        "files": [f"https://iipython.dev/{file}" for file in required_purge]
    }
).json()
if response["success"]:
    print("Cloudflare reported success on cache purge.")
