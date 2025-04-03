import Hero from './HeroSection';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div>
      <Hero text="Project Overview" />

      <div className="container pt-5">
        <p className="lead text-center mb-5">
          Welcome to <strong>AyeChanMDB.com</strong> — a sleek, responsive movie browser, a personal project where I combined my love for movies with my journey into full-stack development.
        </p>

        <h2 className="text-center mb-4">🎬 What This Website Offers</h2>
        <ul className="mb-5">
          <li className="mb-2"><strong>Top Rated & Trending</strong> - Explore the most acclaimed and popular movies with up-to-date ratings from TMDb.</li>
          <li className="mb-2"><strong>Detailed Movie Pages</strong> - Get cast, trailers, IMDb links, streaming platforms, and more.</li>
          <li className="mb-2"><strong>Live Search</strong> - Search-as-you-type suggestions with a full search view.</li>
          <li className="mb-2"><strong>Genre Browsing</strong> - Discover new titles through a clean genre filter system.</li>
          <li><strong>User Reviews</strong> - Logged-in users can post and view reviews per movie.</li>
        </ul>

        <h2 className="text-center mb-4">🧠 Tech Behind the Scenes</h2>
        <ul className="mb-5">
          <li className="mb-2">✅ Movie data fetched from the <strong>TMDb API</strong>.</li>
          <li className="mb-2">✅ Frontend built in <strong>React</strong> using reusable components and responsive Bootstrap layout.</li>
          <li className="mb-2">✅ Backend powered by <strong>AWS Lambda (Node.js)</strong> and <strong>API Gateway</strong> to handle user reviews.</li>
          <li className="mb-2">✅ User reviews stored in <strong>Amazon DynamoDB</strong>.</li>
          <li className="mb-2">✅ Authentication via <strong>Amazon Cognito</strong> for secure login and account management.</li>
          <li className="mb-2">✅ A functional contact form that sends emails via <strong>AWS SES</strong>.</li>
          <li className="mb-2">✅ Deployed using <strong>AWS Amplify</strong> with CI/CD from GitHub, including caching via <strong>CloudFront</strong>.</li>
          <li>✅ DNS managed with <strong>Route 53</strong> and HTTPS secured using SSL certificates.</li>
        </ul>

        <h2 className="text-center mb-4">💡 Why I Built This</h2>
        <p className="mb-5">
          I built this project to challenge myself as a self-taught developer and put everything I've learned into practice — from frontend design to backend APIs and cloud deployment. Since I also enjoy movies, it was the perfect subject to keep me motivated.
        </p>

        <h2 className="text-center mb-4">🙋‍♂️ Built Solo</h2>
        <p className="mb-5">
          This project is built entirely by me — Aye Chan, also known as Ethan — as a personal passion project to combine my love for movies and full-stack development.
        </p>

        <h2 className="text-center mb-4">📬 Let's Connect</h2>
        <p className="text-center">
          Feel free to <Link to="/Contact">reach out here</Link> if you have any feedback or questions.
        </p>

        <p className="mt-5 text-center"><strong>Thanks for stopping by — happy browsing!</strong></p>
      </div>
    </div>
  );
};

export default About;
