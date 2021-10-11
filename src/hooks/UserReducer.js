import { EmptyUser } from "../context/UserContext";

export const UserReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN": {
            localStorage.setItem("user", JSON.stringify(action.payload));
            return action.payload;
        }
        case "LOGOUT": {
            localStorage.removeItem("user");
            return EmptyUser;
        }
        default: return state;
    }
}
