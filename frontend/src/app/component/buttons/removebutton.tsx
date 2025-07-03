import "./removebutton.css";
import { FaX } from "react-icons/fa6";

interface RemoveButtonProps {
  onClick: () => void;
}

export default function RemoveButton({ onClick }: RemoveButtonProps) {

  return (
    <div className="remove-button-container">
        <p>Moikka</p>
        <button className="remove-button" onClick={onClick}>
            <FaX className="remove-icon" />
        </button>
    </div>
  );
}