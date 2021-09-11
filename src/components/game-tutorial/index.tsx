import { useState, useEffect } from "react";
import "./game-tutorial.scss";
import type { LevelInstruction } from "../../services/levels";

interface GameTutorialProps {
    levelInstructions: LevelInstruction[],
    onComplete: () => void
}

export default function GameTutorial(props: GameTutorialProps) {
    const [ currentInstruction, setCurrentInstruction ] = useState(0);

    useEffect(() => {
        if (currentInstruction >= props.levelInstructions.length) {
            props.onComplete();
        }
    }, [currentInstruction]); // eslint-disable-line react-hooks/exhaustive-deps

    const onNext = () => {
        setCurrentInstruction(currentInstruction + 1);
    };

    const onPrevious = () => {
        setCurrentInstruction(currentInstruction - 1);
    };

    const onSkip = () => {
        setCurrentInstruction(props.levelInstructions.length);
    };

    if (currentInstruction >= props.levelInstructions.length || currentInstruction < 0) {
        return null;
    }

    const child = props.levelInstructions[currentInstruction].element;
    const canGoPrevious = currentInstruction > 0;
    const canSkip = currentInstruction < props.levelInstructions.length - 1;

    const prevBtn = canGoPrevious ?
        (<button className="game-tutorial-btn left-btn" onClick={onPrevious}>Previous</button>) :
        null;
    const skipBtn = canSkip ?
        (<button className="game-tutorial-btn right-btn skip-btn" onClick={onSkip}>Skip</button>) :
        null;
    const nextText = currentInstruction < props.levelInstructions.length - 1 ? "Next" : "Finish";

    return (
        <div className="game-tutorial">
            {child}
            <div className="game-tutorial-btn-container">
                {prevBtn}
                {skipBtn}
                <button className="game-tutorial-btn right-btn" onClick={onNext}>{nextText}</button>
                <div className="clearfix"></div>
            </div>
        </div>
    );
}
