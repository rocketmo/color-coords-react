import React from "react";
import Tile from "../tile";
import TileColor from "../tile/tile-colors";
import "./grid.css";

export default class Grid extends React.Component {
    render() {
        return (
            <div className="tile-grid">
                <Tile color={TileColor.BLUE} row={0} col={0} />
                <Tile color={TileColor.BLUE} alt={true} row={0} col={1} />
                <Tile color={TileColor.GREEN} alt={true} row={1} col={0} />
                <Tile color={TileColor.GREEN} row={1} col={1} />
                <Tile row={2} col={0} />
                <Tile alt={true} row={2} col={1} />
            </div>
        );
    }
}
