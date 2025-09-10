import React from "react";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  className = "",
}) => {
  return (
    <div className={`loading-spinner loading-spinner--${size} ${className}`}>
      <div className="loading-spinner__circle"></div>
    </div>
  );
};

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = "",
  placeholder,
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div className={`lazy-image ${className}`}>
      {!isLoaded && !hasError && (
        <div className="lazy-image__placeholder">
          {placeholder ? (
            <img
              src={placeholder}
              alt=""
              className="lazy-image__placeholder-img"
            />
          ) : (
            <LoadingSpinner size="small" />
          )}
        </div>
      )}
      {!hasError && (
        <img
          src={src}
          alt={alt}
          className={`lazy-image__img ${
            isLoaded ? "lazy-image__img--loaded" : ""
          }`}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
      {hasError && (
        <div className="lazy-image__error">
          <span>Failed to load image</span>
        </div>
      )}
    </div>
  );
};
