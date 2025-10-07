import os
import shutil
import numpy as np
import matplotlib.pyplot as plt
from tensorflow.keras.datasets import cifar10
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
from tensorflow.keras.utils import to_categorical
from PIL import Image

# Class names for CIFAR-10
class_names = [
    "airplane", "automobile", "bird", "cat", "deer",
    "dog", "frog", "horse", "ship", "truck"
]

# 1. Load the CIFAR-10 dataset (50,000 training, 10,000 test images)
(x_train, y_train), (x_test, y_test) = cifar10.load_data()

# Normalize the data (pixel values between 0 and 1)
x_train = x_train.astype("float32") / 255.0
x_test = x_test.astype("float32") / 255.0

# One-hot encode the labels
y_train_cat = to_categorical(y_train, 10)
y_test_cat = to_categorical(y_test, 10)

# 2. Build a simple CNN model
model = Sequential([
    Conv2D(32, (3, 3), activation="relu", input_shape=(32, 32, 3)),
    MaxPooling2D((2, 2)),
    Conv2D(64, (3, 3), activation="relu"),
    MaxPooling2D((2, 2)),
    Flatten(),
    Dense(64, activation="relu"),
    Dense(10, activation="softmax")  # 10 classes
])

# 3. Compile the model
model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])

# 4. Train the model (just 3 epochs to keep it quick)
model.fit(x_train, y_train_cat, epochs=3, validation_split=0.2)

# 5. Predict on test data
predictions = model.predict(x_test)

# 6. Create output directories for each class
output_dir = "sorted_images"
if os.path.exists(output_dir):
    shutil.rmtree(output_dir)
os.makedirs(output_dir)

for class_name in class_names:
    os.makedirs(os.path.join(output_dir, class_name))

# 7. Save first 100 images into their predicted folders
for i in range(100):
    img_array = x_test[i]
    prediction = np.argmax(predictions[i])
    predicted_class = class_names[prediction]

    # Convert from array to image and scale back to 0-255
    img = Image.fromarray((img_array * 255).astype("uint8"))
    img_path = os.path.join(output_dir, predicted_class, f"img_{i}.png")
    img.save(img_path)

print("✅ Done! Images saved in 'sorted_images/' folder.")

