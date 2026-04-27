from PIL import Image
import os
import numpy as np

INPUT_DIR = "pipeline/output/clean"
OUTPUT_DIR = "pipeline/output/processed"

os.makedirs(OUTPUT_DIR, exist_ok=True)

def crop_card(img):

    img = img.convert("RGB")
    np_img = np.array(img)

    # detect background (very light pixels)
    gray = np.mean(np_img, axis=2)

    mask = gray < 245

    coords = np.column_stack(np.where(mask))

    if coords.size == 0:
        return img

    y0, x0 = coords.min(axis=0)
    y1, x1 = coords.max(axis=0)

    crop = img.crop((x0, y0, x1, y1))

    padding = 40

    new_img = Image.new(
        "RGBA",
        (crop.width + padding*2, crop.height + padding*2),
        (0,0,0,0)
    )

    new_img.paste(crop, (padding, padding))

    return new_img


count = 0

for file in os.listdir(INPUT_DIR):

    if not file.lower().endswith((".png",".jpg",".jpeg")):
        continue

    path = os.path.join(INPUT_DIR, file)

    img = Image.open(path)

    cropped = crop_card(img)

    output_path = os.path.join(
        OUTPUT_DIR,
        file.replace(".jpg",".png")
    )

    cropped.save(output_path)

    count += 1

print(f"processed {count} images")