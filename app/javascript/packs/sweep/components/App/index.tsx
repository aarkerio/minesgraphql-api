import React, { useEffect, useState, } from "react";
import { shallowEqual, useDispatch, useSelector  } from "react-redux";

import Button from "../Button";
import NumberDisplay from "../NumberDisplay";
import { generateCells, openMultipleCells } from "../../utils";
import { Cell, CellState, CellValue, Face } from "../../types";
import { MAX_COLS, MAX_ROWS } from "../../constants";

import { RootRState } from "../../redux/";
import * as ActionConsults from '../../actions/consults';

import "./App.scss";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [cells, setCells]             = useState<Cell[][]>(generateCells());
  const [face, setFace]               = useState<Face>(Face.smile);
  const [records, setRecords]         = useState<any>([]);
  const [player, setPlayer]           = useState<string>("Anonymous");
  const [time, setTime]               = useState<number>(0);
  const [live, setLive]               = useState<boolean>(false);
  const [bombCounter, setBombCounter] = useState<number>(10);
  const [hasLost, setHasLost]         = useState<boolean>(false);
  const [hasWon, setHasWon]           = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(ActionConsults.loadRecords());
    };

    fetchData();
  }, []);
  let RecordsArray = useSelector((state: RootRState) => (state as any).rootReducer.api_rdcr.RecordsArray);

  useEffect(() => {
    const handleMouseDown = (): void => {
      setFace(Face.oh);
    };

    const handleMouseUp = (): void => {
      setFace(Face.smile);
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);  // release memery
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (live && time < 999) {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [live, time]);

  useEffect(() => {
    if (hasLost) {
      setLive(false);
      setFace(Face.lost);
    }
  }, [hasLost]);

  useEffect(() => {
    if (hasWon) {
      setLive(false);
      setFace(Face.won);
    }
  }, [hasWon]);

  const handleCellClick = (rowParam: number, colParam: number) => (): void => {
    let newCells = [...cells];

    // start the game
    if (!live) {
      let isABomb = newCells[rowParam][colParam].value === CellValue.bomb;
      while (isABomb) {
        newCells = generateCells();
        if (newCells[rowParam][colParam].value !== CellValue.bomb) {
          isABomb = false;
          break;
        }
      }
      setLive(true);
    }

    const currentCell = newCells[rowParam][colParam];
    if ([CellState.flagged, CellState.visible].includes(currentCell.state)) {
      return;
    }

    if (currentCell.value === CellValue.bomb) {
      setHasLost(true);
      newCells[rowParam][colParam].red = true;
      newCells = showAllBombs();
      setCells(newCells);
      return;
    } else if (currentCell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam, colParam);
    } else {
      newCells[rowParam][colParam].state = CellState.visible;
    }

    // Check to see if you have won
    let safeOpenCellsExists = false;
    for (let row = 0; row < MAX_ROWS; row++) {
      for (let col = 0; col < MAX_COLS; col++) {
        const currentCell = newCells[row][col];

        if (currentCell.value !== CellValue.bomb && currentCell.state === CellState.open) {
          safeOpenCellsExists = true;
          break;
        }
      }
    }

    if ( !safeOpenCellsExists ) {  // you won!!
      updateRecords();
      newCells = newCells.map(row =>
        row.map(cell => {
          if (cell.value === CellValue.bomb) {
            return {
              ...cell,
              state: CellState.flagged
            };
          }
          return cell;
        })
      );
      setHasWon(true);
    }

    setCells(newCells);
  };

  const updateRecords = (): void => {
    const saveRecord = async () => {
      const data = await dispatch(ActionConsults.saveRecord(player, time));

      console.log("  ############  ** updateRecords data ** :  >>>> ", JSON.stringify(data));
      // setRecords(records.push(data));
    };
    saveRecord();

    RecordsArray = useSelector((state: RootRState) => (state as any).rootReducer.api_rdcr.OneSavedGame, shallowEqual);
  };

  const deleteRecord = (id: number): void => {
    const removeRecord = async () => {
      const data = await dispatch(ActionConsults.deleteRecord(id));

      console.log("  ############  ** updateRecords data ** :  >>>> ", JSON.stringify(data));
      // setRecords(records.push(data));
    };
    removeRecord();

    RecordsArray = useSelector((state: RootRState) => (state as any).rootReducer.api_rdcr.OneSavedGame, shallowEqual);
  };

  const handleCellContext = (rowParam: number, colParam: number) => (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    e.preventDefault();

    if (!live) {
      return;
    }

    const currentCells = [...cells];
    const currentCell  = cells[rowParam][colParam];

    if (currentCell.state === CellState.visible) {
      return;
    } else if (currentCell.state === CellState.open) {
      currentCells[rowParam][colParam].state = CellState.flagged;
      setCells(currentCells);
      setBombCounter(bombCounter - 1);
    } else if (currentCell.state === CellState.flagged) {
      currentCells[rowParam][colParam].state = CellState.open;
      setCells(currentCells);
      setBombCounter(bombCounter + 1);
    }
  };

  const handleFaceClick = (): void => {
    setLive(false);
    setTime(0);
    setCells(generateCells());
    setHasLost(false);
    setHasWon(false);
  };

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Button
          col={colIndex}
          key={`${rowIndex}-${colIndex}`}
          onClick={handleCellClick}
          onContext={handleCellContext}
          red={cell.red}
          row={rowIndex}
          state={cell.state}
          value={cell.value}
        />
      ))
    );
  };

  const showAllBombs = (): Cell[][] => {
    const currentCells = [...cells];
    return currentCells.map(row =>
      row.map(cell => {
        if (cell.value === CellValue.bomb) {
          return {
            ...cell,
            state: CellState.visible
          };
        }
        return cell;
      })
    );
  };
  const formatDate = (date: any) => {
    const newDate = new Date(date);
    return newDate.toLocaleString();
  };

  return (
    <div>
      <div>
        <label>Set your name:
          <input type="text" name="player" onChange={e => setPlayer(e.target.value) } maxLength={10} />
        </label>
        <h2>{player}</h2>
      </div>
      <div className="App">
        <div className="Header">
          <NumberDisplay value={bombCounter} />
          <div className="Face" onClick={handleFaceClick}>
            <span role="img" aria-label="face">
              {face}
            </span>
          </div>
          <NumberDisplay value={time} />
        </div>
        <div className="Body">{renderCells()}</div>
      </div>
      <div className="records">
        <h2>Best Records</h2>
        <table>
          <thead>
            <tr><td>Time</td><td>Name</td><td>Done at</td><td>Delete</td></tr>
          </thead>
          <tbody>
            {RecordsArray?.map((rcd: any, index: number) => {
              return <tr key={ index }><td>{rcd.time}</td><td>{rcd.name}</td><td><img src="/icon_clock.png" alt={formatDate(rcd.createdAt)} title={formatDate(rcd.createdAt)} /></td>
                <td><a href="#" onClick={() => window.confirm("Are you sure you wish to delete this record?") && deleteRecord(rcd.id)}>
                  <img src="/icon_delete.png" alt="Delete" title="Delete" />
                </a></td></tr>;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
