import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import PageLoader from "next/dist/client/page-loader";

interface Position {
    x: number;
    y: number;
}

interface CursorState {
    position: Position;
    trailPositions: Position[];
    trailLength: number;
}

const initialState: CursorState = {
    position: {x:0, y:0},
    trailPositions: [],
    trailLength:20,
}

const cursorSlice = createSlice({
    name: "cursor",
    initialState,
    reducers: {
        updateCursorPosition(state, action: PayloadAction<Position>) {
            state.position = action.payload;
            state.trailPositions.push(action.payload);
            if(state.trailPositions.length > state.trailLength)
            {
                state.trailPositions.shift();
            }
        },
        setTrailLength(state, action:PayloadAction<number>)
        {
            state.trailLength = action.payload;
        },
    },
});

export const { updateCursorPosition, setTrailLength } = cursorSlice.actions;
export default cursorSlice.reducer;