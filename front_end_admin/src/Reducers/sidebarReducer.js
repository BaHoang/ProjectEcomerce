import { ACTIVE_SIDEBAR, HIDDEN_SIDEBAR } from "../Constants/sidebarConstant"

export const displaySidebarReducer = (state = 'none', action) => {

    switch (action.type) {

        case ACTIVE_SIDEBAR:
            return 'block'
        case HIDDEN_SIDEBAR:
            return 'none'
        default:
            return state
    }

}