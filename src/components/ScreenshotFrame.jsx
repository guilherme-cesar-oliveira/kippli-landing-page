import './ScreenshotFrame.css';

export default function ScreenshotFrame({ src, alt, variant = 'light', className = '' }) {
  return (
    <div className={`shot shot--${variant} ${className}`}>
      <div className="shot__topbar">
        <span className="shot__dot" />
        <span className="shot__dot" />
        <span className="shot__dot" />
      </div>
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
}
