import { LandingPage } from "@/types";

export const landingPages: LandingPage[] = [
  {
    id: "1",
    name: "Product Launch",
    description: "Modern product launch landing page",
    category: "product",
    htmlTemplate: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Product Launch</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Arial', sans-serif; line-height: 1.6; }
    .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 100px 20px; text-align: center; }
    .hero h1 { font-size: 3rem; margin-bottom: 20px; }
    .hero p { font-size: 1.2rem; margin-bottom: 30px; }
    .cta-btn { background: #ff6b6b; color: white; padding: 15px 40px; border: none; border-radius: 50px; font-size: 18px; cursor: pointer; }
    .features { padding: 80px 20px; max-width: 1200px; margin: 0 auto; }
    .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; }
    .feature { text-align: center; padding: 30px; }
    .feature-icon { font-size: 3rem; margin-bottom: 20px; }
  </style>
</head>
<body>
  <section class="hero">
    <h1>🚀 Revolutionary Product</h1>
    <p>Transform your workflow with our cutting-edge solution</p>
    <button class="cta-btn">Get Started Today</button>
  </section>
  <section class="features">
    <div class="feature-grid">
      <div class="feature">
        <div class="feature-icon">⚡</div>
        <h3>Lightning Fast</h3>
        <p>Experience unprecedented speed and performance</p>
      </div>
      <div class="feature">
        <div class="feature-icon">🔒</div>
        <h3>Secure</h3>
        <p>Enterprise-grade security for your peace of mind</p>
      </div>
      <div class="feature">
        <div class="feature-icon">📱</div>
        <h3>Mobile Ready</h3>
        <p>Works seamlessly across all devices</p>
      </div>
    </div>
  </section>
</body>
</html>`,
  },
  {
    id: "2",
    name: "SaaS Startup",
    description: "Clean SaaS startup landing page",
    category: "saas",
    htmlTemplate: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SaaS Startup</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; }
    .navbar { background: white; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .nav-content { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 24px; font-weight: bold; color: #333; }
    .nav-btn { background: #4f46e5; color: white; padding: 10px 20px; border: none; border-radius: 6px; }
    .hero { padding: 100px 20px; text-align: center; background: #f8fafc; }
    .hero h1 { font-size: 3.5rem; color: #1a202c; margin-bottom: 20px; }
    .hero p { font-size: 1.3rem; color: #4a5568; margin-bottom: 40px; }
    .hero-btn { background: #4f46e5; color: white; padding: 18px 40px; border: none; border-radius: 8px; font-size: 18px; }
  </style>
</head>
<body>
  <nav class="navbar">
    <div class="nav-content">
      <div class="logo">💼 SaaSify</div>
      <button class="nav-btn">Sign Up</button>
    </div>
  </nav>
  <section class="hero">
    <h1>Scale Your Business</h1>
    <p>The all-in-one platform for modern teams</p>
    <button class="hero-btn">Start Free Trial</button>
  </section>
</body>
</html>`,
  },
  {
    id: "3",
    name: "Event Registration",
    description: "Event registration landing page",
    category: "event",
    htmlTemplate: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tech Conference 2024</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Arial', sans-serif; }
    .hero { background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600"><rect fill="%23667eea" width="1000" height="600"/></svg>'); background-size: cover; color: white; padding: 120px 20px; text-align: center; }
    .hero h1 { font-size: 4rem; margin-bottom: 20px; }
    .event-details { background: rgba(255,255,255,0.1); padding: 30px; border-radius: 10px; margin: 40px auto; max-width: 600px; }
    .detail-item { display: flex; align-items: center; margin-bottom: 15px; font-size: 1.2rem; }
    .detail-icon { margin-right: 15px; font-size: 1.5rem; }
    .register-btn { background: #ff6b6b; color: white; padding: 20px 50px; border: none; border-radius: 50px; font-size: 20px; font-weight: bold; margin-top: 30px; }
  </style>
</head>
<body>
  <section class="hero">
    <h1>🎯 Tech Conference 2024</h1>
    <p style="font-size: 1.5rem; margin-bottom: 30px;">Join industry leaders for 3 days of innovation</p>
    <div class="event-details">
      <div class="detail-item">
        <span class="detail-icon">📅</span>
        <span>March 15-17, 2024</span>
      </div>
      <div class="detail-item">
        <span class="detail-icon">📍</span>
        <span>San Francisco Convention Center</span>
      </div>
      <div class="detail-item">
        <span class="detail-icon">🎤</span>
        <span>50+ Expert Speakers</span>
      </div>
    </div>
    <button class="register-btn">Register Now - $299</button>
  </section>
</body>
</html>`,
  },
  {
    id: "4",
    name: "Portfolio Showcase",
    description: "Creative portfolio landing page",
    category: "portfolio",
    htmlTemplate: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creative Portfolio</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Helvetica Neue', sans-serif; background: #0a0a0a; color: white; }
    .hero { height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; background: radial-gradient(circle, #1a1a2e 0%, #0a0a0a 100%); }
    .hero-content h1 { font-size: 5rem; margin-bottom: 20px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .hero-content p { font-size: 1.5rem; margin-bottom: 40px; color: #ccc; }
    .portfolio-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; padding: 80px 20px; max-width: 1200px; margin: 0 auto; }
    .portfolio-item { background: #1a1a1a; border-radius: 10px; overflow: hidden; transition: transform 0.3s; }
    .portfolio-item:hover { transform: translateY(-10px); }
    .portfolio-content { padding: 30px; }
    .contact-btn { background: linear-gradient(45deg, #ff6b6b, #4ecdc4); color: white; padding: 15px 30px; border: none; border-radius: 25px; font-size: 16px; }
  </style>
</head>
<body>
  <section class="hero">
    <div class="hero-content">
      <h1>🎨 Creative Studio</h1>
      <p>Bringing ideas to life through design</p>
      <button class="contact-btn">View My Work</button>
    </div>
  </section>
  <section class="portfolio-grid">
    <div class="portfolio-item">
      <div class="portfolio-content">
        <h3>Brand Identity</h3>
        <p>Complete brand redesign for tech startup</p>
      </div>
    </div>
    <div class="portfolio-item">
      <div class="portfolio-content">
        <h3>Web Design</h3>
        <p>Modern e-commerce platform design</p>
      </div>
    </div>
    <div class="portfolio-item">
      <div class="portfolio-content">
        <h3>Mobile App</h3>
        <p>iOS app design for fitness tracking</p>
      </div>
    </div>
  </section>
</body>
</html>`,
  },
];