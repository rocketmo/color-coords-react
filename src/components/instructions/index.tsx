import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import "./instructions.scss";

import type { MouseEvent } from "react";

interface InstructionsProps {
    visible: boolean,
    onGoBack: () => void
};

export default function Instructions(props: InstructionsProps) {
    const className = `instructions ${props.visible ? "instructions-enabled" : ""}`;

    const backOnClick = (event: MouseEvent) => {
        event.preventDefault();
        props.onGoBack();
    }

    // TODO: Make each section collapsible
    return (
        <div className={className}>
            <header className="top-bar instructions-top-bar">
                <button className="top-bar-text back-btn" aria-label="Go back"
                    onClick={backOnClick}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <div className="level-select-title">
                    <h1 className="top-bar-text">How to Play</h1>
                </div>
                <div className="clearfix"></div>
            </header>

            <main className="instructions-main">
                <section className="instructions-section">
                    <h2>Objective</h2>
                    <p>
                        The goal for any level in <em> Color Coords </em> is to color the puzzle
                        grid so that it matches the grid shown in the target window. In order to
                        color the puzzle grid, you must move of the
                        <em className="highlight"> player piece </em> across the grid. As you move
                        the player piece across the grid, you may land on tiles that contain an
                        <em className="highlight"> item</em>. Find the solution to each puzzle
                        by maneuvering the player piece and utilizing any items placed on the grid.
                    </p>

                    <h2>Gameplay</h2>

                    <h3>Player Piece</h3>
                    <p>
                        The <em> player piece </em> moves across the board, one tile at a time. It
                        can move either <em className="highlight"> up, down, left or right</em>.
                        At the start of the game, the piece starts in an
                        <em className="highlight"> uncolored state</em>. While in this state,
                        the player piece does not affect the puzzle grid in any way. With the help
                        of items, you can change the state of the player piece to color the grid.
                    </p>

                    <h3>Items</h3>
                    <p>Items are used to alter the puzzle grid and/or the player piece.</p>

                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Color Swatch</td>
                                    <td>
                                        This item changes the color of the player piece to the same
                                        color as the swatch. While the player piece is colored,
                                        <em className="highlight"> it will color any tile that it
                                        lands on</em>.
                                    </td>
                                </tr>
                                <tr>
                                    <td>Dark Swatch</td>
                                    <td>
                                        This item turns the player piece black. While the player piece
                                        is in this state, it will
                                        <em className="highlight"> erase color </em>
                                        from any grid tile it lands on.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3>Tiles</h3>
                    <p>
                        The puzzle grid is made up of <em> tiles</em>. There are several different
                        types of tiles, each with its own properties.
                    </p>

                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Default Tile</td>
                                    <td>
                                        Default tiles start off white and
                                        <em className="highlight"> can be colored </em> by the
                                        player piece if they happen to land on the tile while in a
                                        colored state.
                                    </td>
                                </tr>
                                <tr>
                                    <td>Dark Tile</td>
                                    <td>
                                        Dark tiles are black and <em className="highlight"> cannot
                                        be changed to a different color </em> even if the player
                                        piece lands on it while in a colored state.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h2>Stars</h2>
                    <p>
                        After completing a level, you will be rewarded with up to three stars. You
                        will earn at least one star for each level completed. To earn two or three
                        stars on a level, you must complete the level within a certain amount of
                        moves. <em className="highlight"> In general, the fewer moves you use to
                        complete a level, the more stars you will receive. </em> Check the
                        <em> level select </em> screen for the required number of moves required to
                        each additional stars for each level.
                    </p>

                    <h2>Controls</h2>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Action</th>
                                    <th>Keyboard</th>
                                    <th>Mouse</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Player Piece Movement</td>
                                    <td>Arrow keys</td>
                                    <td>Left click on tile</td>
                                </tr>
                                <tr>
                                    <td>Toggle Target</td>
                                    <td>Q</td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td>Undo</td>
                                    <td>Z</td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td>Redo</td>
                                    <td>Y</td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td>Restart</td>
                                    <td>R</td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td>Reposition Grid/Target</td>
                                    <td>-</td>
                                    <td>Left click (drag)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h2>Miscellaneous</h2>
                    <ul>
                        <li>
                            If you want to adjust the layout of the game, you can
                            <em className="highlight"> reposition </em> the puzzle grid and/or the
                            target window by dragging the screen with your cursor. For the target,
                            you can reposition both the target window, as well as the target grid
                            within the window. You can also
                            <em className="highlight"> zoom in or out </em> using the zoom buttons
                            in the quick menus. If we want to reset back to the default layout, go
                            into the game menu and select
                            <em className="highlight"> Reset Layout</em>.
                        </li>
                    </ul>
                </section>
            </main>
        </div>
    );
}
