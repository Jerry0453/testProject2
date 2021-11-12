import { LOGGEDIN, BOOKMARKSTATE, ADDALLITEMS,ADDITEMTOBOOKMARK, REMOVEFROMBOOKMARK, LOGGEDOUT } from "./actionType"
export const LoggedIn = () => ({
    type: LOGGEDIN,
})

export const Loggedout = () => ({
    type: LOGGEDOUT,
})

export const addAllItem = (params) => ({ 
    type: ADDALLITEMS, 
    data: params 
});

export const addItemTobookmark = (params) => ({
    type: ADDITEMTOBOOKMARK,
    payload: params,
})

export const removeFromBookmark = (params) => ({
    type: REMOVEFROMBOOKMARK,
    payload: params,
})
