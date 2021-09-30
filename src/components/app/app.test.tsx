import { render, act, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from ".";

describe("App", () => {
    test("renders properly; defaults to the home screen", async () => {
        // Render the app
        await act(async () => {
            render(<App skipPreLoad />);
        });

        // Get the play button on home screen
        const playBtn = await screen.findByText("Play");
        expect(playBtn).toBeInTheDocument();
    });
});
