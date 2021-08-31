import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import "./settings.scss";

import type { MouseEvent } from "react";

interface SettingsProps {
    visible: boolean,
    onEraseData?: () => void,
    onGoBack: () => void
};

export default function Settings(props: SettingsProps) {
    const [ showEraseConfirm, setShowEraseConfirm ] = useState(false);

    let className = "settings";
    className += props.visible ? " settings-enabled" : "";

    const backOnClick = (event: MouseEvent) => {
        event.preventDefault();
        setShowEraseConfirm(false);
        props.onGoBack();
    }

    const onEraseConfirm = (event: MouseEvent) => {
        event.preventDefault();
        props.onEraseData && props.onEraseData();
        setShowEraseConfirm(false);
    };

    const toggleEraseConfirm = (show: boolean, event: MouseEvent) => {
        event.preventDefault();
        setShowEraseConfirm(show);
    };

    let eraseElement = null;
    if (props.onEraseData) {
        let eraseConfirm = null;
        if (showEraseConfirm) {
            eraseConfirm = (
                <div>
                    <p>
                        {"Are you sure you want to continue. If yes, your save data will be "}
                        <strong>permanently</strong> erased.
                    </p>
                    <button className="erase-confirm-btn erase-continue" onClick={onEraseConfirm}>
                        Continue
                    </button>
                    <button className="erase-confirm-btn erase-cancel"
                        onClick={toggleEraseConfirm.bind(null, false)}>
                        Cancel
                    </button>
                </div>
            );
        }

        eraseElement = (
            <div className="settings-erase">
                <h2>Save Data</h2>
                <button onClick={toggleEraseConfirm.bind(null, true)}>Erase save data?</button>
                {eraseConfirm}
            </div>
        );
    }

    return (
        <div className={className}>
            <header className="top-bar settings-top-bar">
                <button className="top-bar-text back-btn" aria-label="Go back"
                    onClick={backOnClick}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <div className="level-select-title">
                    <h1 className="top-bar-text">Settings</h1>
                </div>
                <div className="clearfix"></div>
            </header>

            <main className="settings-main">
                <section className="settings-section">
                    {eraseElement}
                </section>
            </main>
        </div>
    );
}
