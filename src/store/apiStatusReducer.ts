import { createAction, createReducer } from "@reduxjs/toolkit";
import { ApiStatus } from "../types";

export const setApiStatusAction = createAction<ApiStatus>(
    "apiStatus/setUsers",
);

const initialState: ApiStatus = {
    loading: false,
    success: true,
    message: ""
};

export const apiStatusReducer = createReducer<ApiStatus>(
    initialState,
    (builder) => {
        builder
            .addCase(setApiStatusAction, (state, action) => {
                return action.payload;
            })
    }
)