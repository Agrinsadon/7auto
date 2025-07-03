import "./removebutton.css";
import { FaX } from "react-icons/fa6";

interface RemoveButtonProps {
    onClick: () => void;
    onText?: string;
}

export default function RemoveButton({ onClick, onText }: RemoveButtonProps) {

  return (
    <div className="remove-button-container">
        <p>{onText}</p>
        <button className="remove-button" onClick={onClick}>
            <FaX className="remove-icon" />
        </button>
    </div>
  );
}