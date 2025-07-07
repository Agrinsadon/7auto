"use client";
import "./bookbutton.css";

interface BookButtonProps {
  onClick: () => void;
  onText ?: string;
}



export default function BookButton({ onClick, onText }: BookButtonProps) {
  return (
    <>
      <button className="book-button" onClick={onClick}>
        <span className="button-text">{onText}</span>
      </button>
    </>
  );
}
