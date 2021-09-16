import { useContext } from "react";
import { GridOffsetContext, TileSizeContext } from "../../services/context";
import { Color } from "../../services/constants";
import "./tile.scss";

interface TileProps {
    row: number,
    col: number,
    color?: Color,
    ice?: boolean,
    solution?: Color,
    alt?: boolean,
    showSolution?: boolean,
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
    const tileSize = useContext(TileSizeContext);
    const color = props.color ?? Color.DEFAULT;
    let colorClass = `tile-front bg-${color} ${props.alt ? "alt" : ""}`;

    const solutionColor = props.solution ?? Color.DEFAULT;
    const solutionClass = `tile-solution bg-${solutionColor} ${props.alt ? "alt" : ""}`;
    const solutionStyle = { opacity: props.showSolution ? "1" : "0" };

    const tileStyle = {
        height: `${tileSize}px`,
        left: `${(props.col * tileSize) + offset.x}px`,
        top: `${(props.row * tileSize) + offset.y}px`,
        width: `${tileSize}px`
    };

    // Hover tile, if the user hovers over a tile in the same row or column as the player
    let hoverTile = null;
    if (isSameRowOrColumn(props.row, props.col, props.playerRow, props.playerCol) &&
        props.onTilePress) {

        const hoverClass = `tile-hover hover-${color}`;
        const onTileClick = () => {
            props.onTilePress && props.onTilePress(props.row, props.col);
        }

        const hoverStyle = {
            borderWidth: `${Math.ceil(tileSize / 12)}px`
        };

        hoverTile = <div className={hoverClass} onClick={onTileClick} style={hoverStyle}></div>;
    }

    // Ice layer
    let iceTile = props.ice ? (
        <div className="tile-ice"></div>
    ) : null;

    const tileBackStyle = {
        borderRadius: `${Math.ceil(tileSize / 12)}px`
    };

    return (
        <div className="tile" style={tileStyle}>
            {hoverTile}
            {iceTile}
            <div className={solutionClass} style={solutionStyle}></div>
            <div className={colorClass}></div>
            <div className="tile-back" style={tileBackStyle}></div>
        </div>
    );
}
