import pandas as pd
import pickle

from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score

# Load dataset
df = pd.read_csv('data/diabetes.csv', encoding='utf-16')

# Split features and target
X = df.drop('Outcome', axis=1)
Y = df['Outcome']

# Scale data
scaler = StandardScaler()
X = scaler.fit_transform(X)

# Train Test Split
X_train, X_test, Y_train, Y_test = train_test_split(
    X, Y,
    test_size=0.2,
    stratify=Y,
    random_state=2
)

# Train model
model = SVC(kernel='linear')
model.fit(X_train, Y_train)

# Accuracy
train_pred = model.predict(X_train)
test_pred = model.predict(X_test)

print("Training Accuracy:",
      accuracy_score(Y_train, train_pred))

print("Testing Accuracy:",
      accuracy_score(Y_test, test_pred))

# Save model
pickle.dump(model, open('models/diabetes_model.pkl', 'wb'))
pickle.dump(scaler, open('models/scaler.pkl', 'wb'))

print("Model Saved Successfully")