from rembg import remove
from PIL import Image
import os

INPUT = "card_images_raw"
OUTPUT = "card_images_clean"

os.makedirs(OUTPUT, exist_ok=True)

for file in os.listdir(INPUT):

    if file.lower().endswith((".png",".jpg",".jpeg",".webp")):

        input_path = os.path.join(INPUT,file)
        output_path = os.path.join(OUTPUT,file)

        img = Image.open(input_path)

        result = remove(img)

        result.save(output_path)

        print("cleaned",file)

print("done")