import React from "react";
import Tile from "../tile";
import { Color } from "../../constants";
import "./grid.css";

export default class Grid extends React.Component {
    render() {
        return (
            <div className="tile-grid">
                <Tile color={Color.BLUE} row={0} col={0} />
                <Tile color={Color.BLUE} alt={true} row={0} col={1} />
                <Tile color={Color.GREEN} alt={true} row={1} col={0} />
                <Tile color={Color.GREEN} row={1} col={1} />
                <Tile row={2} col={0} />
                <Tile alt={true} row={2} col={1} />
                <Tile color={Color.RED} alt={true} row={3} col={0} />
                <Tile color={Color.RED} row={3} col={1} />
                <Tile color={Color.ORANGE} row={4} col={0} />
                <Tile color={Color.ORANGE} alt={true} row={4} col={1} />
                <Tile color={Color.PURPLE} alt={true} row={5} col={0} />
                <Tile color={Color.PURPLE} row={5} col={1} />
                <Tile color={Color.YELLOW} row={6} col={0} />
                <Tile color={Color.YELLOW} alt={true} row={6} col={1} />
            </div>
        );
    }
}
