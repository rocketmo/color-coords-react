import { render, act, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";
import { usePrevious } from "../hooks";

function UsePrevComponent() {
    const [ num, setNum ] = useState(0);
    const prev = usePrevious(num);

    const increment = () => {
        setNum(num + 1);
    }

    return (
        <div>
            <span data-testid="curr-num">{num}</span>
            <span data-testid="prev-num">{prev}</span>
            <button onClick={increment}>Increment</button>
        </div>
    );
}

describe("Custom Hooks", () => {
    describe("usePrevious", () => {
        test("returns previous state after state is updated", async () => {
            render(<UsePrevComponent />);

            const currNum = screen.getByTestId("curr-num");
            const prevNum = screen.getByTestId("prev-num");

            expect(currNum?.textContent).toEqual("0");
            expect(prevNum?.textContent).toEqual("");

            // Increment
            const incBtn = screen.getByText("Increment");

            await act(async () => {
                fireEvent.click(incBtn);
            });

            expect(currNum?.textContent).toEqual("1");
            expect(prevNum?.textContent).toEqual("0");
        });
    });
});
