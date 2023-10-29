import { createAction, createReducer } from "@reduxjs/toolkit";
import { Collection, SingleUser } from "../types";

export const setUsersAction = createAction<SingleUser[]>(
    "user/setUsers",
);

const initialState: Collection<SingleUser> = {};

export const userReducer = createReducer<Collection<SingleUser>>(
    initialState,
    (builder) => {
        builder
            .addCase(setUsersAction, (state, action) => {
                return action.payload.reduce<Collection<SingleUser>>(
                    (prev, next) => {
                        prev[next.id] = next;
                        return prev;
                    },
                    {},
                );;
            })
    }
)