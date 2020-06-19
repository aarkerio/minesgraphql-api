export declare enum CellValue {
    none  = 0,
    one   = 1,
    two   = 2,
    three = 3,
    four  = 4,
    five  = 5,
    six   = 6,
    seven = 7,
    eight = 8,
    bomb  = 9
}
export declare enum CellState {
    open    = 0,
    visible = 1,
    flagged = 2
}
export declare type Cell = {
    value: CellValue;
    state: CellState;
    red?: boolean;
};
export declare enum Face {
    smile = "\uD83D\uDE01",
    oh = "\uD83D\uDE2E",
    lost = "\uD83D\uDE35",
    won = "\uD83D\uDE0E"
}
