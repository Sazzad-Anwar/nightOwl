import { USER_DETAILS, USER_LOGIN, USER_LOGOUT } from "../Constants/UserConstants";

const userReducer = (state, action) => {
    switch (action.type) {
        case USER_DETAILS:
            return action.payload
        case USER_LOGIN:
            return action.payload
        case USER_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
            }
        default:
            return state;
    }
}

export default userReducer;