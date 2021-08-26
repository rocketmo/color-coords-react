import React, { useState, useRef } from "react";
import LevelSelectTopBar from "../level-select-top-bar";
import LevelPreview from "../level-preview";
import LevelSelectButtons from "../level-select-buttons";
import "./level-select.scss";

import type { MouseEvent } from "react";

interface LevelSelectProps {
    starCount: number
};

export default function LevelSelect(props: LevelSelectProps) {
    const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
    const [isSelected, setIsSelected] = useState<boolean>(false);

    // Handler to close the level preview if user clicks outside
    const btnContainerRef = useRef<HTMLElement>(null);
    const onBtnContainerClick = function (event: MouseEvent) {
        event.preventDefault();
        if (event.target === btnContainerRef.current) {
            setIsSelected(false);
        }
    };

    const mainClassName = isSelected ? "level-select-main level-selected" : "level-select-main";
    return (
        <div className="level-select">
            <LevelSelectTopBar starCount={props.starCount} />
            <main className={mainClassName} onClick={onBtnContainerClick}>
                <LevelSelectButtons selectedLevel={selectedLevel} isSelected={isSelected}
                    setSelectedLevel={setSelectedLevel} setIsSelected={setIsSelected}
                    containerRef={btnContainerRef} />
                <LevelPreview selectedLevel={selectedLevel} />
            </main>
        </div>
    );
}
