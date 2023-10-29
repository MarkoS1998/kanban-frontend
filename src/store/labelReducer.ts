import { createAction, createReducer } from "@reduxjs/toolkit";
import { Collection, SingleLabel } from "../types";

export const setLabelsAction = createAction<SingleLabel[]>(
    "label/setLabelss",
);

const initialState: Collection<SingleLabel> = {};

export const labelReducer = createReducer<Collection<SingleLabel>>(
    initialState,
    (builder) => {
        builder
            .addCase(setLabelsAction, (state, action) => {
                return action.payload.reduce<Collection<SingleLabel>>(
                    (prev, next) => {
                        prev[next.id] = next;
                        return prev;
                    },
                    {},
                );;
            })
    }
)