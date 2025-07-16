"use client";
import "./bookbutton.css";

interface BookButtonProps {
  onClick: () => void;
  onText?: string;
  variant?: "light" | "dark";
  size?: "small" | "large"; // default is medium (no class needed)
}

export default function BookButton({
  onClick,
  onText,
  variant = "dark",
  size,
}: BookButtonProps) {
  const sizeClass = size ? size : ""; // only apply size class if set

  return (
    <button className={`book-button ${variant} ${sizeClass}`} onClick={onClick}>
      <span className="button-text">{onText}</span>
    </button>
  );
}
