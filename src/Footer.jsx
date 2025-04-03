import './App.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-dark p-3">
      <div className="footer container p-0">
        <div className="footer-content">
          <p>Special thanks to 
            <a 
              href="https://developer.themoviedb.org/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{
                fontWeight: 'bold',
                color: '#ffcc00',        
                textDecoration: 'none',  
                padding: '0.2rem 0.4rem',      
              }}
            >
              TMDB
            </a> 
            for providing the APIs that power this site.
          </p>
          <div className="footer-links">
            <Link to="/About" className="footer-link">Project Info</Link>
            <Link to="/Contact" className="footer-link">Contact me</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
