// script.js - Enhanced frontend functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const glucoseInput = document.getElementById('glucose');
    const glucoseHint = document.getElementById('glucoseHint');
    const bmiInput = document.getElementById('bmi');
    const bpInput = document.getElementById('bp');
    const ageInput = document.getElementById('age');
    const pregnanciesInput = document.getElementById('pregnancies');
    const dpfInput = document.getElementById('dpf');
    const form = document.getElementById('predictForm');
    const liveRecoBox = document.getElementById('liveRecoBox');

    // Update glucose feedback
    function updateGlucoseFeedback() {
        let val = parseFloat(glucoseInput.value);
        if (isNaN(val)) {
            glucoseHint.innerHTML = '📊 Normal range: 70-140 mg/dL';
            glucoseHint.style.color = '#7a8e9e';
            return;
        }
        if (val < 70 && val > 0) {
            glucoseHint.innerHTML = '⚠️ Low glucose (hypoglycemia risk)';
            glucoseHint.style.color = '#f97316';
        } else if (val >= 140 && val < 200) {
            glucoseHint.innerHTML = '🔶 Impaired glucose (pre-diabetes range)';
            glucoseHint.style.color = '#f97316';
        } else if (val >= 200) {
            glucoseHint.innerHTML = '🔴 Very high glucose → diabetic range alert!';
            glucoseHint.style.color = '#dc2626';
        } else if (val >= 70 && val <= 99) {
            glucoseHint.innerHTML = '✅ Normal fasting glucose';
            glucoseHint.style.color = '#16a34a';
        } else {
            glucoseHint.innerHTML = '📈 Glucose level recorded';
            glucoseHint.style.color = '#7a8e9e';
        }
    }

    // BMI visual feedback
    function updateBmiBorder() {
        let bmi = parseFloat(bmiInput.value);
        if (isNaN(bmi)) {
            bmiInput.style.borderColor = "#e2e8f0";
            return;
        }
        if (bmi >= 30) {
            bmiInput.style.borderColor = "#f97316";
        } else if (bmi >= 25) {
            bmiInput.style.borderColor = "#facc15";
        } else {
            bmiInput.style.borderColor = "#e2e8f0";
        }
    }

    // Blood pressure feedback
    function updateBpFeedback() {
        let bp = parseInt(bpInput.value);
        if (isNaN(bp)) {
            bpInput.style.borderColor = "#e2e8f0";
            return;
        }
        if (bp > 130) bpInput.style.borderColor = "#ef4444";
        else if (bp > 80 && bp <= 130) bpInput.style.borderColor = "#facc15";
        else bpInput.style.borderColor = "#cbd5e1";
    }

    // Dynamic risk preview
    function updateLiveRiskPreview() {
        const glucose = parseFloat(glucoseInput.value);
        const bmi = parseFloat(bmiInput.value);
        const age = parseFloat(ageInput.value);
        const pregnancies = parseFloat(pregnanciesInput.value) || 0;
        const dpf = parseFloat(dpfInput.value) || 0;
        const bp = parseFloat(bpInput.value) || 0;

        if (isNaN(glucose) && isNaN(bmi) && isNaN(age)) {
            if (liveRecoBox) {
                liveRecoBox.innerHTML = `<div class="rec-icon">💡</div><div class="rec-text"><strong>Live insight:</strong> Fill in your values to see risk preview</div>`;
            }
            return;
        }
        
        let riskScore = 0;
        if (!isNaN(glucose)) {
            if (glucose > 140) riskScore += 35;
            else if (glucose > 120) riskScore += 20;
            else if (glucose >= 100) riskScore += 8;
        }
        if (!isNaN(bmi)) {
            if (bmi > 30) riskScore += 30;
            else if (bmi > 25) riskScore += 18;
            else if (bmi > 22) riskScore += 5;
        }
        if (!isNaN(age)) {
            if (age > 50) riskScore += 22;
            else if (age > 40) riskScore += 14;
            else if (age > 30) riskScore += 6;
        }
        if (pregnancies > 5) riskScore += 12;
        else if (pregnancies > 3) riskScore += 6;
        if (dpf > 0.9) riskScore += 14;
        else if (dpf > 0.6) riskScore += 7;
        if (!isNaN(bp) && bp > 130) riskScore += 10;
        
        let adviceMsg = '';
        if (riskScore >= 60) {
            adviceMsg = '⚠️ High risk detected. Strongly recommend medical consultation.';
        } else if (riskScore >= 32) {
            adviceMsg = '📊 Moderate risk profile. Consider lifestyle improvements.';
        } else {
            adviceMsg = '✅ Low risk indicators. Maintain healthy habits.';
        }

        if (!isNaN(glucose) && glucose > 180) {
            adviceMsg = '🔴 Very high glucose! ' + adviceMsg;
        }

        if (liveRecoBox) {
            liveRecoBox.innerHTML = `<div class="rec-icon">💡</div><div class="rec-text"><strong>Live insight:</strong> ${adviceMsg}</div>`;
        }
    }

    // Add event listeners
    if (glucoseInput) glucoseInput.addEventListener('input', function() { 
        updateGlucoseFeedback(); 
        updateLiveRiskPreview(); 
    });
    if (bmiInput) bmiInput.addEventListener('input', function() { 
        updateBmiBorder(); 
        updateLiveRiskPreview(); 
    });
    if (bpInput) bpInput.addEventListener('input', function() { 
        updateBpFeedback(); 
        updateLiveRiskPreview(); 
    });
    if (ageInput) ageInput.addEventListener('input', updateLiveRiskPreview);
    if (pregnanciesInput) pregnanciesInput.addEventListener('input', updateLiveRiskPreview);
    if (dpfInput) dpfInput.addEventListener('input', updateLiveRiskPreview);
    
    // Initialize
    updateGlucoseFeedback();
    updateBmiBorder();
    updateBpFeedback();
    updateLiveRiskPreview();

    // Form validation
    if (form) {
        form.addEventListener('submit', function(e) {
            const glucoseVal = parseFloat(glucoseInput.value);
            const bmiVal = parseFloat(bmiInput.value);
            if (isNaN(glucoseVal) || glucoseVal <= 0) {
                e.preventDefault();
                alert('Please enter a valid glucose level (mg/dL).');
                return false;
            }
            if (isNaN(bmiVal) || bmiVal < 8 || bmiVal > 55) {
                e.preventDefault();
                alert('BMI must be a realistic number (8–55).');
                return false;
            }
            return true;
        });
    }
});