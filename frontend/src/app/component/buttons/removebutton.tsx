import "./removebutton.css";
import { FaX } from "react-icons/fa6";

export default function RemoveButton() {

  return (
    <div className="remove-button-container">
        <button className="remove-button">
            <FaX className="remove-icon" />
        </button>
    </div>
  );
}