export const labelRouts = Object.freeze({
    GET_ALL: 'label/get-all',
})

export const userRouts = Object.freeze({
    GET_ALL: 'user/get-all',
    LOGIN: 'user/login',
    GET_BY_ID: 'user/get/'
})

export const taskListRouts = Object.freeze({
    CREATE: 'task-list/create',
    GET_ALL: 'task-list/get-all',
    COMPLETE: 'task-list/complete',
    DELETE: 'task-list/delete/'
})

export const taskRouts = Object.freeze({
    CREATE: 'task/create',
    GET_ALL: 'task/get-all',
    UPDATE_POSITION: 'task/update-position',
    COMPLETE: 'task/complete',
    REOPEN: 'task/reopen',
    ADD_MEMBER: 'task/add-member',
    REMOVE_MEMER: 'task/remove-member',
    ADD_LABEL: 'task/add-label',
    REMOVE_LABEL: 'task/remove-label',
    EDIT_NAME: 'task/edit-name'
})