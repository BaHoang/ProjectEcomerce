import {
    REVENUE_MONTH_REQUEST,
    REVENUE_MONTH_SUCCESS,
    REVENUE_MONTH_FAIL,
} from '../Constants/statisticConstant'

export const revenueMonthReducer = (state = { revenue: {} }, action) => {

    switch (action.type) {
        case REVENUE_MONTH_REQUEST:
            return { loading: true }
        case REVENUE_MONTH_SUCCESS:
            return { loading: false, revenue: action.payload }
        case REVENUE_MONTH_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}