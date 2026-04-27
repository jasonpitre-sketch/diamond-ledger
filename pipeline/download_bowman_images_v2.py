import os
import pandas as pd
import requests
from serpapi import GoogleSearch
from dotenv import load_dotenv
from PIL import Image
from io import BytesIO
from tqdm import tqdm

# -------------------------
# CONFIG
# -------------------------

MIN_HEIGHT = 700
TARGET_SIZE = (700,1000)

SEARCH_VARIATIONS = [

"{name} Bowman 1st Auto PSA 10",
"{name} Bowman Chrome Draft Auto PSA 10",
"{name} Bowman 1st Chrome Auto PSA 10 slab",
"{name} Bowman Draft 1st Auto PSA 10",

# fallback
"{name} Bowman 1st Auto",
"{name} Bowman Chrome Draft Auto",
"{name} Bowman 1st Chrome Auto"
]

# -------------------------
# SETUP
# -------------------------

load_dotenv()
SERPAPI_KEY = os.getenv("SERPAPI_KEY")

players = pd.read_csv("pipeline/players_2025_draft.csv")

RAW_DIR = "pipeline/output/raw"
CLEAN_DIR = "pipeline/output/clean"

os.makedirs(RAW_DIR, exist_ok=True)
os.makedirs(CLEAN_DIR, exist_ok=True)

results_log = []

# -------------------------
# HELPER
# -------------------------

def make_filename(name):

    return (
        name
        .lower()
        .replace(" ", "_")
        .replace(".", "")
        .replace("'", "")
        + ".png"
    )

# -------------------------
# IMAGE SEARCH
# -------------------------

def search_images(query):

    params = {
        "engine": "google_images",
        "q": query,
        "api_key": SERPAPI_KEY
    }

    search = GoogleSearch(params)
    results = search.get_dict()

    return results.get("images_results", [])

# -------------------------
# FILTER IMAGE
# -------------------------

def image_is_valid(img):

    width = img.get("original_width",0)
    height = img.get("original_height",0)

    if height < MIN_HEIGHT:
        return False

    if height <= width:
        return False

    return True

# -------------------------
# DOWNLOAD
# -------------------------

def download_image(url, raw_path):

    try:

        r = requests.get(url, timeout=15)

        img = Image.open(BytesIO(r.content)).convert("RGB")

        img.save(raw_path)

        return True

    except:
        return False

# -------------------------
# CLEAN IMAGE
# -------------------------

def clean_image(raw_path, clean_path):

    img = Image.open(raw_path)

    img = img.resize(TARGET_SIZE)

    img.save(clean_path)

# -------------------------
# PROCESS PLAYER
# -------------------------

def process_player(player):

    name = player["name"]

    filename = make_filename(name)

    for query_template in SEARCH_VARIATIONS:

        query = query_template.format(name=name)

        images = search_images(query)

        for img in images:

            if not image_is_valid(img):
                continue

            url = img["original"]

            raw_path = f"{RAW_DIR}/{filename}"

            success = download_image(url, raw_path)

            if success:

                clean_path = f"{CLEAN_DIR}/{filename}"

                clean_image(raw_path, clean_path)

                return {
                    "player": name,
                    "status": "success",
                    "query_used": query
                }

    return {
        "player": name,
        "status": "missing",
        "query_used": None
    }

# -------------------------
# RUN PIPELINE
# -------------------------

print("\nStarting image pipeline...\n")

for _, player in tqdm(players.iterrows(), total=len(players)):

    result = process_player(player)

    results_log.append(result)

# -------------------------
# SAVE REPORT
# -------------------------

report = pd.DataFrame(results_log)

report.to_csv("pipeline/image_report.csv", index=False)

print("\nDone.\n")

print(report["status"].value_counts())