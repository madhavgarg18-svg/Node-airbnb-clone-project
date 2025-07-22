# 🏡 Airbnb Clone

A full-stack Node.js project that replicates the core functionality of Airbnb — including listings, user authentication, location-based mapping, and more.

---


## 🔧 Tech Stack

- **Frontend**: EJS, HTML, CSS, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: Passport.js, express-session
- **Geolocation**: OpenStreetMap + Nominatim API
- **Image Upload**: Cloudinary
- **Others**: dotenv, method-override, connect-flash

---

## 🚀 How to Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/airbnb-clone.git
cd airbnb-clone

Install dependencies

Create a .env file in the root folder and copy contents from .env.example.
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET_KEY=your_cloudinary_secret
SECRET=your_express_session_secret_key

Start the app
node server.js
http://localhost:8080/listings

✨ Features
✅ User signup/login/logout

🧭 Add and view listings by location

🗺️ Geocoding using OpenStreetMap

📸 Upload photos with Cloudinary

🔒 Auth middleware for protected routes

📝 Flash messages for alerts

🧼 Form validations

✨ Responsive UI


airbnb-clone/
│
├── Routes/              → All express routes
├── controller/          → Route handler functions
├── views/               → EJS templates
├── utils/               → Utility functions (like getCoordinates)
├── public/              → Static assets
├── screenshots/         → Screenshots of web pages
├── .env.example         → Sample env file
├── server.js            → App entry point
└── README.md

Made by Madhav Garg — feel free to connect!
Linkedin-www.linkedin.com/in/gargmadhav