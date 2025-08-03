from flask import Flask, request, jsonify
from flask_cors import CORS  # Add this import
import joblib
import pandas as pd
import numpy as np
from flask import render_template

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model
model = joblib.load('gold_pp.pkl')

@app.route('/')
def home(): 
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from request
        data = request.get_json()
        
        # Convert dictionary values to array in correct order
        features = [
            float(data['gold_open']),
            float(data['gold_high']),
            float(data['gold_low']),
            float(data['gold_volume']),
            float(data['usd_chf']),
            float(data['eur_usd']),
            # float(data['oil_close']),
            # float(data['silver_close']),
            float(data['sp500_close']),
            float(data['gold_close_lag_1']),
            float(data['gold_close_lag_2']),
            float(data['gold_close_lag_3']),
            # float(data['gold_close_lag_7']),
            # float(data['gold_oil_ratio']),
            # float(data['usd_strength']),
            float(data['gold_7d_avg'])
        ]
        
        features_array = np.array(features).reshape(1, -1)
        prediction = model.predict(features_array)[0]
        
        return jsonify({'prediction': float(prediction)})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)