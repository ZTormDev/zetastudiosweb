import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getYouTubeEmbedUrl } from "../../core/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalRef}
          className={`modal-backdrop ${className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose}>
              <FaTimes />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface MediaItem {
  type: "image" | "video";
  src: string;
  alt?: string;
  poster?: string;
  isYoutube?: boolean;
  youtubeId?: string | null;
}

interface MediaGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: MediaItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export const MediaGalleryModal: React.FC<MediaGalleryModalProps> = ({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNavigate,
}) => {
  const currentItem = items[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowLeft":
          if (currentIndex > 0) {
            onNavigate(currentIndex - 1);
          }
          break;
        case "ArrowRight":
          if (currentIndex < items.length - 1) {
            onNavigate(currentIndex + 1);
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, items.length, onNavigate]);

  if (!currentItem) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="media-gallery-modal">
      <div className="media-gallery-container">
        {/* Navigation arrows */}
        {items.length > 1 && (
          <>
            <button
              className="gallery-nav gallery-nav--prev"
              onClick={() => onNavigate(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
            >
              <FaChevronLeft />
            </button>
            <button
              className="gallery-nav gallery-nav--next"
              onClick={() =>
                onNavigate(Math.min(items.length - 1, currentIndex + 1))
              }
              disabled={currentIndex === items.length - 1}
            >
              <FaChevronRight />
            </button>
          </>
        )}

        {/* Media content */}
        <div className="media-gallery-content">
          <div className="gallery-media-container">
            {currentItem.type === "image" ? (
              <img
                src={currentItem.src}
                alt={currentItem.alt || `Media ${currentIndex + 1}`}
                className="gallery-media gallery-image"
              />
            ) : currentItem.isYoutube && currentItem.youtubeId ? (
              // YouTube video
              <iframe
                src={getYouTubeEmbedUrl(currentItem.youtubeId)}
                title={currentItem.alt || `Video ${currentIndex + 1}`}
                className="gallery-media gallery-video youtube-iframe"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  width: "100%",
                  height: "100%",
                  aspectRatio: "16/9",
                }}
              />
            ) : (
              // Local video file
              <video
                ref={(video) => {
                  if (video) {
                    video.volume = 0.25; // Set default volume to 25%
                  }
                }}
                src={currentItem.src}
                controls
                className="gallery-media gallery-video"
                poster={currentItem.poster}
                autoPlay
              />
            )}
          </div>
        </div>

        {/* Counter */}
        {items.length > 1 && (
          <div className="gallery-counter">
            {currentIndex + 1} / {items.length}
          </div>
        )}

        {/* Thumbnails */}
        {items.length > 1 && (
          <div className="gallery-thumbnails">
            {items.map((item, index) => (
              <button
                key={index}
                className={`gallery-thumbnail ${
                  index === currentIndex ? "gallery-thumbnail--active" : ""
                }`}
                onClick={() => onNavigate(index)}
              >
                {item.type === "image" ? (
                  <img
                    src={item.src}
                    alt={`Thumbnail ${index + 1}`}
                    className="thumbnail-image"
                  />
                ) : (
                  <div className="thumbnail-video">
                    <img
                      src={
                        item.poster || "/assets/img/voxeland/cube-world.webp"
                      }
                      alt={`Video thumbnail ${index + 1}`}
                      className="thumbnail-image"
                    />
                    <div className="video-indicator">▶</div>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};
