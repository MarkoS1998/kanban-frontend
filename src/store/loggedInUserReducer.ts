import { createAction, createReducer } from "@reduxjs/toolkit";
import { Collection, SingleUser } from "../types";

export const setLoggenInUserAction = createAction<SingleUser>(
    "loggenInUser/setUsers",
);

const initialState: SingleUser = {
    id: -1,
    name: "",
    avatar_url: ""
};

export const loggedInUserReducer = createReducer<SingleUser>(
    initialState,
    (builder) => {
        builder
            .addCase(setLoggenInUserAction, (state, action) => {
                return action.payload;
            })
    }
)