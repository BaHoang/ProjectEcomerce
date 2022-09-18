import { ACTIVE_SIDEBAR, HIDDEN_SIDEBAR } from "../Constants/sidebarConstant"

export const activeSidebar = () => async (dispatch) => {
    dispatch({ type: ACTIVE_SIDEBAR })
}

export const hiddenSidebar = () => async (dispatch) => {
    dispatch({ type: HIDDEN_SIDEBAR })
}
