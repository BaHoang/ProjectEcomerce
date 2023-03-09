import { Navigate, Outlet } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

const useAuth = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    var { userInfor } = user
    if (userInfor && Object.keys(userInfor).length !== 0) {
        // phan quyen
        return userInfor.isAdmin
    }
    return false
}

const PrivateRoutes = () => {
    const isAuth = useAuth()
    return isAuth ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoutes