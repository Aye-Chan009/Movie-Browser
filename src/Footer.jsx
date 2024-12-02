import './App.css';

const Footer = () => {
  return (
    <div className="bg-dark">
    <div className="footer container p-0">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        <div className="footer-links">
          <a href="/TopRatedMovies" className="footer-link">About</a>
          <a href="/privacy" className="footer-link">Privacy Policy</a>
          <a href="/terms" className="footer-link">Terms of Service</a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Footer;
