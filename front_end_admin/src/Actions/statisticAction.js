import {
    REVENUE_MONTH_REQUEST,
    REVENUE_MONTH_SUCCESS,
    REVENUE_MONTH_FAIL,
} from '../Constants/statisticConstant'

import axios from 'axios'

export const getRevenueMonth = (year, userInfor) => async (dispatch) => {
    try {
        
        dispatch({
            type: REVENUE_MONTH_REQUEST
        })

        const config = {
            headers: {
                'Authorization': `Bear ${userInfor.token}`,
            }
        }

        const { data } = await axios.get(`http://localhost:5000/api/statistic/revenueMonth?year=${year}`, config)

        dispatch({
            type: REVENUE_MONTH_SUCCESS,
            payload: data,
        })

    } catch (error) {

        dispatch({
            type: REVENUE_MONTH_FAIL,
            payload: error.response.status ? error.response.status : 'Error',
        })
    }
}