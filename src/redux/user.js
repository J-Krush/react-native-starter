
export const USER_INIT_FROM_DB_SUCCESS = 'USER_INIT_FROM_DB_SUCCESS';


// Reducer
export const INITIAL_STATE = {
    id: null,
    firstName: null,
    lastName: null,
};


export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case USER_INIT_FROM_DB_SUCCESS: {
            return {
                ...state,
                ...action.payload,
            };
        }

        default:
            return state;
    }
}
