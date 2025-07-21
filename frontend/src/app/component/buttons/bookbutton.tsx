"use client";
import "./bookbutton.css";

interface BookButtonProps {
  onClick: () => void;
  onText?: string;
  variant?: "light" | "dark" | "light-stay" | "dark-stay";
  size?: "small" | "large";
}

export default function BookButton({
  onClick,
  onText,
  variant = "dark",
  size,
}: BookButtonProps) {
  const sizeClass = size ? size : "";

  return (
    <button className={`book-button ${variant} ${sizeClass}`} onClick={onClick}>
      <span className="button-text">{onText}</span>
    </button>
  );
}
