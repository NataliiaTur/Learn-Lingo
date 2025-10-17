import { Link } from "react-router-dom";
import css from "./NotFound.module.css";

function NotFound() {
  return (
    <section className={css.notFoundSection}>
      <div className={css.notFoundContainer}>
        <div className={css.notFoundContent}>
          <h1 className={css.errorCode}>404</h1>
          <h2 className={css.errorTitle}>Page Not Found</h2>
          <p className={css.errorText}>
            Oops! The page you are looking for doesn't exist or has been moved.
          </p>
          <div className={css.buttonGroup}>
            <Link to="/" className={css.homeButton}>
              Go to Home
            </Link>
            <Link to="/teachers" className={css.teachersButton}>
              Browse Teachers
            </Link>
          </div>
        </div>

        <div className={css.illustration}>
          <svg viewBox="0 0 400 300" className={css.illustrationSvg}>
            <rect
              x="150"
              y="120"
              width="100"
              height="120"
              fill="#f4c550"
              rx="5"
            />
            <rect
              x="155"
              y="125"
              width="90"
              height="110"
              fill="#fbe9ba"
              rx="3"
            />
            <line
              x1="200"
              y1="125"
              x2="200"
              y2="235"
              stroke="#f4c550"
              strokeWidth="2"
            />

            <circle
              cx="180"
              cy="80"
              r="20"
              fill="none"
              stroke="#121417"
              strokeWidth="3"
            />
            <circle
              cx="220"
              cy="80"
              r="20"
              fill="none"
              stroke="#121417"
              strokeWidth="3"
            />
            <line
              x1="200"
              y1="80"
              x2="180"
              y2="80"
              stroke="#121417"
              strokeWidth="3"
            />

            <text
              x="195"
              y="190"
              fontSize="40"
              fill="#121417"
              fontWeight="bold"
            >
              ?
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
