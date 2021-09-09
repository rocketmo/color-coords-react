import LEVELS from "../../services/levels";
import "./level-select-buttons.scss";
import type { MouseEvent } from "react";

interface LevelSelectButtonsProps {
    selectedLevel: number | null, // 1-indexed
    isSelected: boolean,
    setSelectedLevel: React.Dispatch<React.SetStateAction<number | null>>,
    setIsSelected: React.Dispatch<React.SetStateAction<boolean>>,
    containerRef: React.RefObject<HTMLElement>,
    starsScoredOnLevel: (levelNum: number) => number
};

export default function LevelSelectButtons(props: LevelSelectButtonsProps) {
    const toggleSelected = (levelNum: number, event: MouseEvent) => {
        event.preventDefault();

        if (props.selectedLevel === levelNum) {
            props.setIsSelected(!props.isSelected);
        } else {
            props.setIsSelected(true);
            props.setSelectedLevel(levelNum);
        }
    }

    const buttons = LEVELS.map((level, idx) => {
        let btnClass = "level-select-btn";
        const levelNum = idx + 1;
        const starsScored = props.starsScoredOnLevel(levelNum);

        // Button is currently being previewed
        if (props.isSelected && (props.selectedLevel === levelNum)) {
            btnClass += " btn-highlight";
        }

        // Gotten 3 stars on this level
        else if (starsScored >= 3) {
            btnClass += " btn-star-3";
        }

        // Gotten 1 or 2 stars on this level
        else if (starsScored > 0) {
            btnClass += " btn-star-1";
        }

        // Level not unlocked yet
        else if (starsScored < 0) {
            btnClass += " btn-locked";
        }

        return (
            <button className={btnClass} key={`level-btn-${level.id}`}
                onClick={toggleSelected.bind(null, levelNum)}
                aria-label={`Toggle preview of level ${levelNum}`}>
                {levelNum}
            </button>
        );
    });

    return (
        <section className="level-btn-container" ref={props.containerRef}>
            {buttons}
        </section>
    );
}
