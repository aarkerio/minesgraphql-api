import React from "react";
import { CellState, CellValue } from "../../types";
import "./Button.scss";
interface ButtonProps {
    col: number;
    onClick(rowParam: number, colParam: number): (...args: any[]) => void;
    onContext(rowParam: number, colParam: number): (...args: any[]) => void;
    red?: boolean;
    row: number;
    state: CellState;
    value: CellValue;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
