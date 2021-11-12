import { LOGGEDIN, BOOKMARKSTATE, ADDALLITEMS,ADDITEMTOBOOKMARK, REMOVEFROMBOOKMARK, LOGGEDOUT } from "../action/actionType";
const initialState = {
    isloggedIn : false,
    allItems: [],
    bookmarkList: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGGEDIN:
            return {...state, isloggedIn: true};
        case LOGGEDOUT:
            return {...state, isloggedIn: false};
        case ADDALLITEMS:
            return {...state, allItems: action.data};
        case ADDITEMTOBOOKMARK:
            return { ...state, bookmarkList: [...state.bookmarkList, action.payload] };
        case REMOVEFROMBOOKMARK: 
            return {
                ...state,
                bookmarkList: state.bookmarkList.filter(item => item.id !== action.payload.id)
            };
        default:
            return state;
    }
}

export default reducer;