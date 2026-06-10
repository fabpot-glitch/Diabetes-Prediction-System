import pickle
import numpy as np

# Load model and scaler
model = pickle.load(open('models/diabetes_model.pkl', 'rb'))
scaler = pickle.load(open('models/scaler.pkl', 'rb'))

# Sample input
input_data = (5,166,72,19,175,25.8,0.587,51)

# Convert to numpy array
input_array = np.asarray(input_data)

# Reshape
input_array = input_array.reshape(1,-1)

# Scale data
scaled_data = scaler.transform(input_array)

# Predict
prediction = model.predict(scaled_data)

if prediction[0] == 0:
    print("The person is not diabetic")
else:
    print("The person is diabetic")