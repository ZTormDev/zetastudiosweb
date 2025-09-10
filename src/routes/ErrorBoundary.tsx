import React from "react";
import { useRouteError, Link } from "react-router-dom";

export const ErrorBoundary: React.FC = () => {
  const error = useRouteError() as Error;

  return (
    <div className="error-boundary">
      <div className="container">
        <div className="error-boundary__content">
          <h1>Oops! Something went wrong</h1>
          <p>We're sorry, but something unexpected happened.</p>

          {error && (
            <details className="error-boundary__details">
              <summary>Error details</summary>
              <pre>{error.message}</pre>
            </details>
          )}

          <div className="error-boundary__actions">
            <Link to="/" className="btn btn--primary">
              Go Home
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="btn btn--secondary"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
