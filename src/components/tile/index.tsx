import { useContext } from "react";
import { GridOffsetContext } from "../../services/context";
import { TILE_SIZE, SOLUTION_TILE_SIZE, Color } from "../../services/constants";
import "./tile.scss";

import type { MouseEvent } from "react";

interface TileProps {
    row: number,
    col: number,
    color?: Color,
    solution?: Color,
    alt?: boolean,
    showSolution?: boolean,
    isSolutionTile?: boolean,
    playerRow?: number,
    playerCol?: number,
    onTilePress?: (row: number, col: number) => void
}

function isSameRowOrColumn(row: number, col: number, pRow?: number, pCol?: number): boolean {
    if (pRow === undefined || pCol === undefined) {
        return false;
    }

    // Returns true if cell is in the same column or row as the player, but not in the exact
    // same position as the player
    return (row === pRow && col !== pCol) || (row !== pRow && col === pCol);
}

export default function Tile(props: TileProps) {
    const offset = useContext(GridOffsetContext);
    const color = props.color ?? Color.DEFAULT;
    let colorClass = `tile-front bg-${color} ${props.alt ? "alt" : ""}`;

    const solutionColor = props.solution ?? Color.DEFAULT;
    const solutionClass = `tile-solution bg-${solutionColor} ${props.alt ? "alt" : ""}`;
    const solutionStyle = { opacity: props.showSolution ? "1" : "0" };

    const tileSize = props.isSolutionTile ? SOLUTION_TILE_SIZE : TILE_SIZE;
    const tilePositionStyle = {
        left: `${(props.col * tileSize) + offset.x}px`,
        top: `${(props.row * tileSize) + offset.y}px`,
    };

    // Hover tile, if the user hovers over a tile in the same row or column as the player
    let hoverTile = null;
    if (isSameRowOrColumn(props.row, props.col, props.playerRow, props.playerCol) &&
        props.onTilePress) {

        const onTileClick = (event: MouseEvent) => {
            event.preventDefault();
            props.onTilePress && props.onTilePress(props.row, props.col);
        }

        hoverTile = <div className="tile-hover" onClick={onTileClick}></div>;
    }

    return (
        <div className="tile" style={tilePositionStyle}>
            {hoverTile}
            <div className={solutionClass} style={solutionStyle}></div>
            <div className={colorClass}></div>
            <div className="tile-back"></div>
        </div>
    );
}
