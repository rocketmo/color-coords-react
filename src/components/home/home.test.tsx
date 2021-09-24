import { render, act, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "../app";

async function goBackToHomePage(): Promise<void> {
    await act(async () => {
        document.location.href = "http://localhost/";
    });
}

test("Navigation buttons redirect to correct places", async () => {

    // Render the app
    let container: (HTMLElement | undefined);
    await act(async () => {
        ({ container } = render(<App skipPreLoad />));
    });

    if (!container) {
        throw new Error("App container does not exist.");
    }

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

    // Go back to home page
    await goBackToHomePage();

    // Press Level Select button
    const lvlSelBtn = await screen.findByText("Level Select");
    expect(lvlSelBtn).toBeInTheDocument();

    await act(async () => {
        fireEvent.click(lvlSelBtn);
    });

    // Get the level select title
    const lvlSelect = container.querySelector(".level-select");
    expect(lvlSelect).toBeDefined();
    expect(lvlSelect).toBeInTheDocument();


    // Go back to home page
    await goBackToHomePage();

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


    // Press Settings button
    await screen.findAllByText("Settings");
    const settingsBtn = container.querySelector(".home-nav-btn-4");

    if (!settingsBtn) {
        throw new Error("Settings button does not exist.")
    }

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

    // Hide How to Play page
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
