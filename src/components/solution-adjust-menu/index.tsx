import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faSearchMinus } from '@fortawesome/free-solid-svg-icons';
import "./solution-adjust-menu.scss";

interface SolutionAdjustMenuProps {
    canZoomIn: boolean,
    canZoomOut: boolean,
    zoomInHandler: () => void,
    zoomOutHandler: () => void
}

export default function SolutionAdjustMenu(props: SolutionAdjustMenuProps) {
    const zoomInClass = `adjust-btn ${!props.canZoomIn ? " adjust-disabled" : ""}`;
    const zoomOutClass = `adjust-btn ${!props.canZoomOut ? " adjust-disabled" : ""}`;

    return (
        <div id="solution-adjust-menu" className="adjust-menu solution-adjust-menu">
            <div className={zoomInClass}>
                <button tabIndex={0} onClick={props.zoomInHandler} aria-label="Zoom in">
                    <FontAwesomeIcon icon={faSearchPlus} />
                </button>

                <div className="adjust-tooltip">Zoom In</div>
            </div>

            <div className={zoomOutClass}>
                <button tabIndex={0} onClick={props.zoomOutHandler} aria-label="Zoom out">
                    <FontAwesomeIcon icon={faSearchMinus} />
                </button>

                <div className="adjust-tooltip">Zoom Out</div>
            </div>
        </div>
    );
}
