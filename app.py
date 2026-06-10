from flask import Flask, render_template, request
import numpy as np
import pickle

app = Flask(__name__)

model = pickle.load(open('models/diabetes_model.pkl', 'rb'))
scaler = pickle.load(open('models/scaler.pkl', 'rb'))

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():

    values = [float(x) for x in request.form.values()]

    data = np.array(values).reshape(1, -1)

    data = scaler.transform(data)

    prediction = model.predict(data)

    if prediction[0] == 1:
        result = "⚠️ The person is Diabetic"
    else:
        result = "✅ The person is Not Diabetic"

    return render_template(
        'index.html',
        prediction_text=result
    )

if __name__ == '__main__':
    app.run(debug=True)