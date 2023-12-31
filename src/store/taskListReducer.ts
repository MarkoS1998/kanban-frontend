import { createAction, createReducer } from "@reduxjs/toolkit";
import { Collection, SingleTaskList } from "../types";

export const setTaskListAction = createAction<SingleTaskList[]>(
  "taskList/setTaskList",
);

export const addTaskListAction = createAction<SingleTaskList>(
  "taskList/addTaskList",
);

export const updateTaskListAction = createAction<Partial<SingleTaskList>>(
  "taskList/updateTaskList",
);

export const completeTaskListAction = createAction<number>(
  "taskLists/completeTaskList",
);

/*const initialState = data.task_lists.reduce<Collection<SingleTaskList>>(
  (prev, next) => {
    prev[next.id] = next;
    return prev;
  },
  {},
);*/

const initialState: Collection<SingleTaskList> = {};

export const taskListReducer = createReducer<Collection<SingleTaskList>>(
  initialState,
  (builder) => {
    builder
      .addCase(setTaskListAction, (state, action) => {
        return action.payload.reduce<Collection<SingleTaskList>>(
          (prev, next) => {
            prev[next.id] = next;
            return prev;
          },
          {}
        );
      })
      .addCase(addTaskListAction, (state, action) => {
        return {
          ...state,
          [action.payload.id]: action.payload,
        };
      })
      .addCase(updateTaskListAction, (state, action) => {
        if (action.payload.id && state[action.payload.id]) {
          return {
            ...state,
            [action.payload.id]: {
              ...state[action.payload.id],
              ...action.payload,
            },
          };
        }
        return state;
      })
      .addCase(completeTaskListAction, (state, action) => {
        if (state[action.payload]) {
          state = {
            ...state,
            [action.payload]: {
              ...state[action.payload],
              is_completed: true,
            },
          };
        }
        return state;
      });
  },
);
