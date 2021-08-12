import React from "react";
import Tile from "../tile";
import GridCell from "../../classes/grid-cell";
import "./grid.css";

export default class Grid extends React.Component {
    state: { grid: (GridCell | null)[][] }

    constructor(props: { grid: (GridCell | null)[][] }) {
        super(props);
        this.state = { grid: props.grid ?? [[]] };
    }

    render() {
        const tiles = [];

        for (let i = 0; i < this.state.grid.length; i += 1) {
            for (let j = 0; j < this.state.grid[i].length; j += 1) {
                if (!this.state.grid[i][j]) {
                    continue;
                }

                const gridCell = this.state.grid[i][j];
                const key = `${i},${j}`;
                tiles.push(
                    <Tile color={gridCell?.color} alt={(i + j) % 2 === 0}
                        row={i} col={j} key={key} />
                );
            }
        }

        return (
            <div className="tile-grid">{ tiles }</div>
        );
    }
}
