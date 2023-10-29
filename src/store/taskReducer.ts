import { createAction, createReducer } from "@reduxjs/toolkit";
import { Collection, SingleTask } from "../types";
import data from "../data.json";
import { completeTaskListAction } from "./taskListReducer";

export const setTasksAction = createAction<SingleTask[]>(
  "task/setTasks",
);

export const addTaskAction = createAction<SingleTask>("task/addTask");

export const updateTaskPositionAction = createAction<Collection<number[]>>(
  "task/updateTaskPosition",
);
export const deleteTaskAction = createAction<number>("task/deleteDask");

export const completeTaskAction = createAction<number>("task/completeTask");

export const reopenTaskAction = createAction<{
  id: number;
  task_list_id?: number;
}>("task/reopenTask");

export const setTaskAssigneeAction = createAction<{
  id: number;
  assignee: number[];
}>("task/setTaskAssignee");

export const setTaskLabelsAction = createAction<{
  id: number;
  labels: number[];
}>("task/setTaskLabels");

export const setTaskNameAction = createAction<{
  id: number;
  name: string;
}>("task/setTaskName");

/*const initialState = data.tasks.reduce<Collection<SingleTask>>((prev, next) => {
  prev[next.id] = next;
  return prev;
}, {});*/

const initialState: Collection<SingleTask> = {};

export const taskReducer = createReducer<Collection<SingleTask>>(
  initialState,
  (builder) => {
    builder
      .addCase(setTasksAction, (state, action) => {
        return action.payload.reduce<Collection<SingleTask>>(
          (prev, next) => {
            prev[next.id] = next;
            return prev;
          },
          {},
        );
      })
      .addCase(addTaskAction, (state, action) => {
        return {
          ...state,
          [action.payload.id]: action.payload,
        };
      })
      .addCase(deleteTaskAction, (state, action) => {
        const { [action.payload]: current, ...rest } = state;
        return rest;
      })
      .addCase(updateTaskPositionAction, (state, action) => {
        Object.keys(action.payload).forEach((listId) => {
          const taskListId = Number(listId);
          action.payload[listId].forEach((taskId, index) => {
            if (state[taskId]) {
              state[taskId] = {
                ...state[taskId],
                position: index,
                task_list_id: taskListId,
              };
            }
          });
        });
        return state;
      })
      .addCase(completeTaskListAction, (state, action) => {
        Object.values(state).forEach((t) => {
          if (t.task_list_id === action.payload) {
            state[t.id] = {
              ...state[t.id],
              is_completed: true,
              completed_on: new Date().toUTCString(),
            };
          }
        });
      })
      .addCase(completeTaskAction, (state, action) => {
        state[action.payload] = {
          ...state[action.payload],
          is_completed: true,
          completed_on: new Date().toUTCString(),
        };
        return state;
      })
      .addCase(reopenTaskAction, (state, action) => {
        if (state[action.payload.id]) {
          state[action.payload.id] = {
            ...state[action.payload.id],
            ...action.payload,
            is_completed: false,
            completed_on: null,
          };
        }
        return state;
      })
      .addCase(setTaskAssigneeAction, (state, action) => {
        if (state[action.payload.id]) {
          state[action.payload.id] = {
            ...state[action.payload.id],
            ...action.payload,
          };
        }
        return state;
      })
      .addCase(setTaskLabelsAction, (state, action) => {
        if (state[action.payload.id]) {
          state[action.payload.id] = {
            ...state[action.payload.id],
            ...action.payload,
          };
        }
        return state;
      })
      .addCase(setTaskNameAction, (state, action) => {
        if (state[action.payload.id]) {
          state[action.payload.id] = {
            ...state[action.payload.id],
            ...action.payload,
          };
        }
        return state;
      });
  },
);
