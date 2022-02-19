import { POST_CREATED, POST_DELETED, POST_UPDATED } from "../Constants/PostConstants";

const postReducer = (state, action) => {
    switch (action.type) {
        case POST_CREATED:
            return [...state, action.payload]
        case POST_UPDATED:
            return state.map(post => {
                if (post.id === action.payload.id) {
                    return action.payload;
                } else {
                    return post;
                }
            })
        case POST_DELETED:
            return state.filter(post => post.id !== action.payload.id)
        default:
            return state;
    }
}

export default postReducer;