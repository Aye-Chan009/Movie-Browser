# 🎬 AyeChanMDB

A sleek, full-stack movie browser built with React and AWS — combining my love for movies with my journey into full-stack development.

---

## 🚀 Live Demo

👉 [https://www.ayechanmdb.com](https://www.ayechanmdb.com)

---

## 🧠 What This App Offers

- 🔍 **Live Search** — Type-as-you-go suggestions powered by TMDb API
- ⭐ **Top Rated & Trending** — Browse current and all-time greats
- 🎞 **Movie Details** — Cast, trailers, streaming platforms, IMDb links
- 🎭 **Genre Browsing** — Filter movies by genre in a clean layout
- 🗣 **User Reviews** — Anyone can view reviews but only authenticated users can submit reviews
- 📬 **Contact Form** — Anyone can send a message securely via backend

---

## 🛠️ Tech Stack

### 🖥 Frontend
- React + Vite
- React Router for routing
- Bootstrap 5 for layout
- `react-oidc-context` for Cognito login
- Hosted on AWS Amplify (with CI/CD)

### ☁️ Backend
- **AWS Lambda (Node.js)** — Handles review submission and contact form
- **Amazon API Gateway** — REST endpoints for frontend
- **Amazon DynamoDB** — Stores user-submitted reviews
- **Amazon Cognito** — User authentication
- **Amazon SES** — Sends contact emails
- **Amazon Route 53** — DNS + SSL
- **Amazon CloudFront** — CDN & caching

---

## 🔒 Security Practices

- Frontend uses Amplify **environment variables** (not hardcoded secrets)
- Contact and Review APIs are **serverless and CORS-protected**
- Input is validated server-side before sending/storing
- Authentication is enforced via Cognito on the review flow

---

## 📂 Folder Structure

```
src/ 
│ 
├── assets/ 
│ └── genres.js 
├── About.jsx
├── App.css
├── App.jsx 
├── Carousel.jsx 
├── Contact.jsx 
├── Footer.jsx 
├── GenreMovieCard.css 
├── GenreMovieCard.jsx 
├── HeroSection.jsx 
├── Home.jsx 
├── HomeHeroSection.jsx 
├── main.jsx 
├── MovieCards.jsx 
├── MovieDetails.jsx 
├── MovieNotFound.jsx 
├── NavBar.jsx 
├── PopularCurrently.jsx 
├── SearchBarMovieCards.jsx 
└── SearchView.jsx

```

---

## 🧪 Running Locally

```bash
# 1. Clone the repo
git clone https://github.com/Aye-Chan009/Movie-Browser
cd movie-browser

# 2. Install dependencies
npm install

# 3. Add environment variables
touch .env
```

`.env`:

```env

VITE_ACCESS_KEY=your TMDb bearer token
VITE_API_KEY=your TMDb API

VITE_REVIEW_API_URL=your API endpoint for submitting/retrieving reviews (DynamoDB)
VITE_CONTACT_API_URL=your API endpoint for sending contact form emails (SES via Lambda)

VITE_COGNITO_DOMAIN=your Amazon Cognito hosted domain
VITE_COGNITO_CLIENT_ID=your Cognito app client ID
VITE_COGNITO_POOL_REGION=your AWS region (e.g. ap-southeast-2)

VITE_COGNITO_REDIRECT_URI=http://localhost:5173 or your live app login redirect URL
VITE_COGNITO_LOGOUT_URI=http://localhost:5173 or your live app logout redirect URL

```

```bash
# 4. Start development server
npm run dev
```

---

## 🙋 About Me

I'm Aye Chan (Ethan), a self-taught developer exploring full-stack and cloud technologies. This is my second project, fully built from scratch to apply what I've learned — from frontend design to backend integration and secure cloud deployment.

---

## 📬 Contact

Have feedback or questions?  
→ [ayechanmdb.com/contact](https://www.ayechanmdb.com/contact)

---

## 📃 License

MIT — free to use, modify, and share.
