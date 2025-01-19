import streamlit as st
import pandas as pd
import joblib
import numpy as np
from sklearn.preprocessing import LabelEncoder

# Define CustomLabelEncoder class
class CustomLabelEncoder(LabelEncoder):
    def __init__(self, unknown_value=-1):
        super().__init__()
        self.unknown_value = unknown_value

    def fit(self, y):
        y = np.append(y, ['Unknown'])
        super().fit(y)
        self.unknown_value = np.where(self.classes_ == 'Unknown')[0][0]
        return self

    def transform(self, y):
        labels = np.array([str(x) for x in y])
        encoded = np.array([self.transform_label(label) for label in labels])
        return encoded

    def transform_label(self, label):
        if label in self.classes_:
            return super().transform([label])[0]
        else:
            return self.unknown_value

    def inverse_transform(self, y):
        decoded = np.array([self.classes_[int(x)] if x >= 0 and x < len(self.classes_) else 'Unknown' for x in y])
        return decoded

# Load the saved model and label encoders
@st.cache_resource
def load_model():
    model = joblib.load("lgbm_model.joblib")
    label_encoders = joblib.load("label_encoder_info.joblib")
    return model, label_encoders

model, label_encoders = load_model()

# Load the original dataset to get the unique values for each feature
@st.cache_data
def load_data():
    return pd.read_csv("abroad  - Sheet1.csv")

df = load_data()

st.title("Study Abroad Fee Predictor")

# Create input fields for user
country = st.selectbox("Select Country", df['COUNTRY'].unique())
course_type = st.selectbox("Select Course Type", df['COURSE TYPE'].unique())
specialization = st.selectbox("Select Specialization", df['COURSE (SPECIALIZATION)'].unique())

if st.button("Predict Fees"):
    # Encode the input values
    country_encoded = label_encoders['COUNTRY'].transform([country])[0]
    course_type_encoded = label_encoders['COURSE TYPE'].transform([course_type])[0]
    specialization_encoded = label_encoders['COURSE (SPECIALIZATION)'].transform([specialization])[0]
    
    # Create a DataFrame with the encoded values
    input_data = pd.DataFrame({
        'COUNTRY': [country_encoded],
        'COURSE TYPE': [course_type_encoded],
        'COURSE (SPECIALIZATION)': [specialization_encoded]
    })
    
    # Make prediction
    prediction = model.predict(input_data)[0]
    
    st.success(f"Predicted Fees: ${prediction:.2f}")

    # Display warning for unknown categories
    if country_encoded == -1 or course_type_encoded == -1 or specialization_encoded == -1:
        st.warning("One or more selected options were not present in the training data. The prediction may be less accurate.")

st.sidebar.header("About")
st.sidebar.info("This app predicts study abroad fees based on the country, course type, and specialization.")
st.sidebar.warning("Please note that this is a predictive model and actual fees may vary.")
