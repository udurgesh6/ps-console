import { Form } from "@/types";

export const sampleFormTemplates: Form[] = [
  {
    id: "1",
    name: "Contact Form",
    description: "Basic contact form with name, email, and message fields",
    category: "contact",
    htmlTemplate: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Contact Form</title>
    <style>
      .form-container {
        max-width: 500px;
        margin: 0 auto;
        padding: 20px;
        font-family: Arial, sans-serif;
      }
      .form-group {
        margin-bottom: 15px;
      }
      label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
      }
      input, textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
      button {
        background-color: #007bff;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <div class="form-container">
      <h2>Contact Us</h2>
      <form>
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required>
        </div>
        <div class="form-group">
          <label for="message">Message:</label>
          <textarea id="message" name="message" rows="5" required></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  </body>
</html>`,
  },
  {
    id: "2",
    name: "Registration Form",
    description: "User registration form with validation",
    category: "registration",
    htmlTemplate: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Registration Form</title>
    <style>
      .form-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 30px;
        background-color: #f8f9fa;
        border-radius: 8px;
        font-family: 'Segoe UI', sans-serif;
      }
      .form-row {
        display: flex;
        gap: 15px;
        margin-bottom: 15px;
      }
      .form-group {
        flex: 1;
        margin-bottom: 15px;
      }
      label {
        display: block;
        margin-bottom: 5px;
        font-weight: 600;
        color: #333;
      }
      input, select {
        width: 100%;
        padding: 12px;
        border: 2px solid #e9ecef;
        border-radius: 6px;
        font-size: 14px;
      }
      input:focus, select:focus {
        outline: none;
        border-color: #007bff;
      }
      .submit-btn {
        background: linear-gradient(135deg, #007bff, #0056b3);
        color: white;
        padding: 12px 30px;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        width: 100%;
      }
    </style>
  </head>
  <body>
    <div class="form-container">
      <h2 style="text-align: center; color: #333; margin-bottom: 30px;">Create Account</h2>
      <form>
        <div class="form-row">
          <div class="form-group">
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" required>
          </div>
          <div class="form-group">
            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" required>
          </div>
        </div>
        <div class="form-group">
          <label for="email">Email Address:</label>
          <input type="email" id="email" name="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required>
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" required>
        </div>
        <div class="form-group">
          <label for="country">Country:</label>
          <select id="country" name="country" required>
            <option value="">Select Country</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
            <option value="au">Australia</option>
          </select>
        </div>
        <button type="submit" class="submit-btn">Create Account</button>
      </form>
    </div>
  </body>
</html>`,
  },
  {
    id: "3",
    name: "Survey Form",
    description: "Customer feedback survey form",
    category: "survey",
    htmlTemplate: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Customer Survey</title>
    <style>
      .survey-container {
        max-width: 700px;
        margin: 0 auto;
        padding: 40px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        font-family: 'Arial', sans-serif;
      }
      .survey-form {
        background: white;
        color: #333;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      }
      .question-group {
        margin-bottom: 25px;
      }
      .question-title {
        font-weight: bold;
        margin-bottom: 10px;
        font-size: 16px;
      }
      .radio-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .radio-item {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      input[type="radio"] {
        margin: 0;
      }
      textarea {
        width: 100%;
        padding: 12px;
        border: 2px solid #e9ecef;
        border-radius: 6px;
        resize: vertical;
        min-height: 100px;
      }
      .submit-btn {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 40px;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        display: block;
        margin: 20px auto 0;
      }
    </style>
  </head>
  <body>
    <div class="survey-container">
      <h1 style="text-align: center; margin-bottom: 30px;">📊 Customer Feedback Survey</h1>
      <div class="survey-form">
        <form>
          <div class="question-group">
            <div class="question-title">1. How satisfied are you with our service?</div>
            <div class="radio-group">
              <div class="radio-item">
                <input type="radio" id="very-satisfied" name="satisfaction" value="very-satisfied">
                <label for="very-satisfied">Very Satisfied</label>
              </div>
              <div class="radio-item">
                <input type="radio" id="satisfied" name="satisfaction" value="satisfied">
                <label for="satisfied">Satisfied</label>
              </div>
              <div class="radio-item">
                <input type="radio" id="neutral" name="satisfaction" value="neutral">
                <label for="neutral">Neutral</label>
              </div>
              <div class="radio-item">
                <input type="radio" id="dissatisfied" name="satisfaction" value="dissatisfied">
                <label for="dissatisfied">Dissatisfied</label>
              </div>
            </div>
          </div>
          
          <div class="question-group">
            <div class="question-title">2. Would you recommend us to others?</div>
            <div class="radio-group">
              <div class="radio-item">
                <input type="radio" id="definitely" name="recommend" value="definitely">
                <label for="definitely">Definitely</label>
              </div>
              <div class="radio-item">
                <input type="radio" id="probably" name="recommend" value="probably">
                <label for="probably">Probably</label>
              </div>
              <div class="radio-item">
                <input type="radio" id="not-sure" name="recommend" value="not-sure">
                <label for="not-sure">Not Sure</label>
              </div>
              <div class="radio-item">
                <input type="radio" id="probably-not" name="recommend" value="probably-not">
                <label for="probably-not">Probably Not</label>
              </div>
            </div>
          </div>
          
          <div class="question-group">
            <div class="question-title">3. Additional Comments:</div>
            <textarea name="comments" placeholder="Please share any additional feedback..."></textarea>
          </div>
          
          <button type="submit" class="submit-btn">Submit Survey</button>
        </form>
      </div>
    </div>
  </body>
</html>`,
  },
  {
    id: "4",
    name: "Newsletter Signup",
    description: "Simple newsletter subscription form",
    category: "newsletter",
    htmlTemplate: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Newsletter Signup</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
        font-family: 'Helvetica Neue', sans-serif;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .signup-container {
        background: white;
        padding: 50px;
        border-radius: 20px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        text-align: center;
        max-width: 400px;
        width: 100%;
      }
      .icon {
        font-size: 60px;
        margin-bottom: 20px;
      }
      h2 {
        color: #333;
        margin-bottom: 10px;
        font-size: 28px;
      }
      .subtitle {
        color: #666;
        margin-bottom: 30px;
        font-size: 16px;
      }
      .input-group {
        margin-bottom: 20px;
        text-align: left;
      }
      label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: #333;
      }
      input[type="email"], input[type="text"] {
        width: 100%;
        padding: 15px;
        border: 2px solid #f0f0f0;
        border-radius: 10px;
        font-size: 16px;
        transition: border-color 0.3s;
      }
      input[type="email"]:focus, input[type="text"]:focus {
        outline: none;
        border-color: #4ecdc4;
      }
      .checkbox-group {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 25px;
        text-align: left;
      }
      .subscribe-btn {
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
        color: white;
        padding: 15px 40px;
        border: none;
        border-radius: 25px;
        font-size: 18px;
        font-weight: 600;
        cursor: pointer;
        width: 100%;
        transition: transform 0.2s;
      }
      .subscribe-btn:hover {
        transform: translateY(-2px);
      }
    </style>
  </head>
  <body>
    <div class="signup-container">
      <div class="icon">📧</div>
      <h2>Stay Updated!</h2>
      <p class="subtitle">Get the latest news and updates delivered to your inbox.</p>
      
      <form>
        <div class="input-group">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required>
        </div>
        
        <div class="input-group">
          <label for="email">Email Address:</label>
          <input type="email" id="email" name="email" required>
        </div>
        
        <div class="checkbox-group">
          <input type="checkbox" id="agree" name="agree" required>
          <label for="agree">I agree to receive marketing emails</label>
        </div>
        
        <button type="submit" class="subscribe-btn">Subscribe Now</button>
      </form>
    </div>
  </body>
</html>`,
  },
];
