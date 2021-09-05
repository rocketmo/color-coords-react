import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faSearchMinus } from '@fortawesome/free-solid-svg-icons';
import "./solution-adjust-menu.scss";

import type { MouseEvent } from "react";

interface SolutionAdjustMenuProps {
    canZoomIn: boolean,
    canZoomOut: boolean,
    zoomInHandler: () => void,
    zoomOutHandler: () => void
}

function preventDefaultAndHandle(fn: () => void, event: MouseEvent) {
    event.preventDefault();
    fn();
}

export default function SolutionAdjustMenu(props: SolutionAdjustMenuProps) {
    const onZoomInClick = preventDefaultAndHandle.bind(null, props.zoomInHandler);
    const onZoomOutClick = preventDefaultAndHandle.bind(null, props.zoomOutHandler);
    const zoomInClass = `adjust-btn ${!props.canZoomIn ? " adjust-disabled" : ""}`;
    const zoomOutClass = `adjust-btn ${!props.canZoomOut ? " adjust-disabled" : ""}`;

    return (
        <div className="adjust-menu solution-adjust-menu">
            <div className={zoomInClass}>
                <button tabIndex={0} onClick={onZoomInClick} aria-label="Zoom in">
                    <FontAwesomeIcon icon={faSearchPlus} />
                </button>

                <div className="adjust-tooltip">Zoom In</div>
            </div>

            <div className={zoomOutClass}>
                <button tabIndex={0} onClick={onZoomOutClick} aria-label="Zoom out">
                    <FontAwesomeIcon icon={faSearchMinus} />
                </button>

                <div className="adjust-tooltip">Zoom Out</div>
            </div>
        </div>
    );
}
