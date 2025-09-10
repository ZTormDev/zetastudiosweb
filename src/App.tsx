import { Suspense } from "react";
import { AppRouter } from "./routes/AppRouter";
import { LoadingSpinner } from "./shared/components";

// Import global styles
import "./shared/styles/globals.scss";

function App() {
  return (
    <div className="app">
      <Suspense
        fallback={
          <div className="app__loading">
            <LoadingSpinner size="large" />
            <p>Loading...</p>
          </div>
        }
      >
        <AppRouter />
      </Suspense>
    </div>
  );
}

export default App;
