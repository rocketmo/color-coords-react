import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import LevelSelectTopBar from "../level-select-top-bar";
import LevelSelectGrid from "../level-select-grid";
import Grid from "../../classes/grid";
import LEVELS from "../../services/levels";
import "./level-select.scss";

import type { MouseEvent } from "react";

export default function LevelSelect() {
    const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
    const [isSelected, setIsSelected] = useState<boolean>(false);

    // Buttons and button container
    const levelBtns = createButtons();
    const btnContainerRef = useRef<HTMLElement>(null);
    const onBtnContainerClick = function (event: MouseEvent) {
        if (event.target === btnContainerRef.current) {
            setIsSelected(false);
        }
    };

    // Preview selected level
    const mainClassName = isSelected ? "level-select-main level-selected" : "level-select-main";
    const previewElement = createPreview();

    return (
        <div className="level-select">
            <LevelSelectTopBar />
            <main className={mainClassName} onClick={onBtnContainerClick}>
                <section className="level-btn-container" ref={btnContainerRef}>
                    {levelBtns}
                </section>
                {previewElement}
            </main>
        </div>
    );

    // Returns buttons for each level
    function createButtons() {
        const toggleSelected = (levelNum: number, event: MouseEvent) => {
            event.preventDefault();

            if (selectedLevel === levelNum) {
                setIsSelected(!isSelected);
            } else {
                setIsSelected(true);
                setSelectedLevel(levelNum);
            }
        }

        return LEVELS.map((level, idx) => {
            let btnClass = "level-select-btn";
            if (isSelected && (selectedLevel === idx + 1)) {
                btnClass += " btn-highlight";
            }

            return (
                <button className={btnClass} key={`level-btn-${level.id}`}
                    onClick={toggleSelected.bind(null, idx + 1)}>
                    {idx + 1}
                </button>
            );
        });
    }

    // Returns the level preview
    function createPreview() {
        if (selectedLevel !== null && LEVELS[selectedLevel - 1]) {
            const level = LEVELS[selectedLevel - 1];
            const grid = new Grid(level.gridConfig);

            return (
                <section className="level-preview">
                    <LevelSelectGrid grid={grid} />
                    <h2>{selectedLevel}. {level.levelName}</h2>
                    {level.description}
                    <Link to={`/game/${selectedLevel}`} className="play-btn">
                        <FontAwesomeIcon icon={faPlay} /> Play
                    </Link>
                </section>
            );
        }

        return <section className="level-preview"></section>;
    }
}
