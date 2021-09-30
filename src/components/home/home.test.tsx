import { render, act, screen, fireEvent, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "../app";

async function renderApp(): Promise<HTMLElement> {

    let container: (HTMLElement | undefined);
    await act(async () => {
        ({ container } = render(<App skipPreLoad />));
    });

    if (!container) {
        throw new Error("App container does not exist.");
    }

    return container;
}

function goBackToHomePage(): void {
    document.location.href = "http://localhost/";
}

describe("Home", () => {
    afterEach(cleanup);
    afterEach(goBackToHomePage);

    test("play link goes to game page", async () => {

        // Render the app
        const container = await renderApp();

        // Press Play button
        const playBtn = await screen.findByText("Play");
        expect(playBtn).toBeInTheDocument();

        await act(async () => {
            fireEvent.click(playBtn);
        });

        // Should be one the game page
        const game = container.querySelector(".game");
        expect(game).toBeDefined();
        expect(game).toBeInTheDocument();
    });

    test("level select link goes to level select page", async () => {

        // Render the app
        const container = await renderApp();

        // Press Level Select button
        const lvlSelBtn = await screen.findByText("Level Select");
        expect(lvlSelBtn).toBeInTheDocument();

        await act(async () => {
            fireEvent.click(lvlSelBtn);
        });

        // Should be on the level select page
        const lvlSelect = container.querySelector(".level-select");
        expect(lvlSelect).toBeDefined();
        expect(lvlSelect).toBeInTheDocument();
    });

    test("how to play link goes to the instructions; closing instructions returns you home",
        async () => {

        // Render the app
        const container = await renderApp();

        // Press How to Play button
        await screen.findAllByText("How to Play");
        const howToBtn = container.querySelector(".home-nav-btn-3");
        const homeContainer = container.querySelector(".home-container");

        if (!howToBtn) {
            throw new Error("How to Play button does not exist.")
        }

        expect(homeContainer).toBeDefined();
        expect(homeContainer).toBeInTheDocument();
        expect(homeContainer).toBeVisible();
        expect(howToBtn).toBeDefined();
        expect(howToBtn).toBeInTheDocument();

        await act(async () => {
            fireEvent.click(howToBtn);
        });

        // How to Play page should be visible
        const openedHowToContainer = container.querySelector(".instructions.instructions-enabled");
        expect(openedHowToContainer).toBeDefined();
        expect(openedHowToContainer).toBeInTheDocument();
        expect(homeContainer).not.toBeVisible();

        // Hide How to Play page
        const howToBackBtn = container.querySelector(".instructions .back-btn");
        expect(howToBackBtn).toBeDefined();
        expect(howToBackBtn).toBeInTheDocument();

        if (!howToBackBtn) {
            throw new Error("Back button on How to Play page does not exist.")
        }

        await act(async () => {
            fireEvent.click(howToBackBtn);
        });
    });

    test("settings link goes to the settings; closing settings returns you home", async () => {

        // Render the app
        const container = await renderApp();

        // Press Settings button
        await screen.findAllByText("Settings");
        const settingsBtn = container.querySelector(".home-nav-btn-4");
        const homeContainer = container.querySelector(".home-container");

        if (!settingsBtn) {
            throw new Error("Settings button does not exist.")
        }

        expect(homeContainer).toBeDefined();
        expect(homeContainer).toBeInTheDocument();
        expect(homeContainer).toBeVisible();
        expect(settingsBtn).toBeDefined();
        expect(settingsBtn).toBeInTheDocument();

        await act(async () => {
            fireEvent.click(settingsBtn);
        });

        // Settings page should be visible
        const openedSettingsContainer = container.querySelector(".settings.settings-enabled");
        expect(openedSettingsContainer).toBeDefined();
        expect(openedSettingsContainer).toBeInTheDocument();
        expect(homeContainer).not.toBeVisible();

        // Hide Settings page
        const settingsBackBtn = container.querySelector(".settings .back-btn");
        expect(settingsBackBtn).toBeDefined();
        expect(settingsBackBtn).toBeInTheDocument();

        if (!settingsBackBtn) {
            throw new Error("Back button on Settings page does not exist.")
        }

        await act(async () => {
            fireEvent.click(settingsBackBtn);
        });

        expect(homeContainer).toBeVisible();
    });
});
