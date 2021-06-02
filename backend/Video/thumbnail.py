import subprocess
import av
from PIL import Image

# Tune these settings...
IMAGE_PER_ROW = 2
IMAGE_ROWS = 2
PADDING = 0
IMAGE_WIDTH = 512
BACKGROUND_COLOR = "#fff"
TEXT_COLOR = "#000"
TIMESTAMP_COLOR = "#fff"


def get_time_display(time):
    return "%02d:%02d:%02d" % (time // 3600, time % 3600 // 60, time % 60)

def create_thumbnail(filename):
    print('Processing:', filename)

    try:
        container = av.open(filename)
    except UnicodeDecodeError:
        print('Metadata decode error. Try removing all the metadata...')
        subprocess.run(["ffmpeg", "-i", filename, "-map_metadata", "-1", "-c:v", "copy", "-c:a", "copy",
                        filename], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        container = av.open(filename)

    start = min(container.duration // (IMAGE_PER_ROW * IMAGE_ROWS), 5 * 1000000)
    end = container.duration - start
    time_marks = []
    for i in range(IMAGE_ROWS * IMAGE_PER_ROW):
        time_marks.append(start + (end - start) // (IMAGE_ROWS * IMAGE_PER_ROW - 1) * i)

    images = []
    for idx, mark in enumerate(time_marks):
        container.seek(mark)
        for frame in container.decode(video=0):
            images.append((frame.to_image(), mark // 1000000))
            break

    width, height = images[0][0].width, images[0][0].height

    img = Image.new("RGB", (IMAGE_WIDTH, IMAGE_WIDTH), BACKGROUND_COLOR)
    image_width_per_img = int(round((IMAGE_WIDTH - PADDING) / IMAGE_PER_ROW)) - PADDING
    image_height_per_img = int(round(image_width_per_img / width * height))
    image_start_y = PADDING * 2

    img = Image.new("RGB", (IMAGE_WIDTH, image_start_y + (PADDING + image_height_per_img) * IMAGE_ROWS), BACKGROUND_COLOR)

    for idx, snippet in enumerate(images):
        y = idx // IMAGE_PER_ROW
        x = idx % IMAGE_PER_ROW
        new_img, timestamp = snippet
        new_img = new_img.resize((image_width_per_img, image_height_per_img), resample=Image.BILINEAR)
        x = PADDING + (PADDING + image_width_per_img) * x
        y = image_start_y + (PADDING + image_height_per_img) * y
        img.paste(new_img, box=(x, y))

    print('OK!')
    return img


if __name__ == "__main__":
    file = input("Input the path you want to process: ")
    create_thumbnail(file)