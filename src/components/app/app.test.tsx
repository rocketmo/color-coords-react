import { render, act, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from ".";

test("App renders, defaults to the home screen", async () => {

    // Render the app
    await act(async () => {
        render(<App skipPreLoad />);
    });

    // Get the play button
    const playBtn = await waitFor(() => screen.getByText("Play"));
    expect(playBtn).toBeInTheDocument();
});
