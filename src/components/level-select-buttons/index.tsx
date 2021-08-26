import LEVELS from "../../services/levels";
import "./level-select-buttons.scss";
import type { MouseEvent } from "react";

interface LevelSelectButtonsProps {
    selectedLevel: number | null, // 1-indexed
    isSelected: boolean,
    setSelectedLevel: React.Dispatch<React.SetStateAction<number | null>>,
    setIsSelected: React.Dispatch<React.SetStateAction<boolean>>,
    containerRef: React.RefObject<HTMLElement>
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
        if (props.isSelected && (props.selectedLevel === idx + 1)) {
            btnClass += " btn-highlight";
        }

        return (
            <button className={btnClass} key={`level-btn-${level.id}`}
                onClick={toggleSelected.bind(null, idx + 1)}
                aria-label={`Toggle preview of level ${idx + 1}`}>
                {idx + 1}
            </button>
        );
    });

    return (
        <section className="level-btn-container" ref={props.containerRef}>
            {buttons}
        </section>
    );
}
