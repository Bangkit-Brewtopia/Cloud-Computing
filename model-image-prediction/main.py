from flask import Flask, request
import numpy as np
from tensorflow.keras.preprocessing import image
from io import BytesIO
import tensorflow as tf
from PIL import Image

app = Flask(__name__)


@app.route('/predict', methods=['POST'])
def predict():
    image_binary = BytesIO(request.get_data())

    img = Image.open(image_binary)

    model = tf.keras.models.load_model("model_keras_4.h5", compile=False)
    img = image.img_to_array(img.resize((200, 200)))
    x = np.expand_dims(img, axis=0)
    images = np.vstack([x])
    classes = model.predict(images)[0]

    if classes > 0.9:
        result = 'normal'
    else:
        result = 'defect'

    return result


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
