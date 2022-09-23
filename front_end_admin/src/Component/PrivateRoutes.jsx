import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from 'react-redux'

const useAuth = () => {
    const user = useSelector(state => state.user)
    var { userInfor } = user
    if (userInfor && Object.keys(userInfor).length !== 0) {
        return true
    }
    return false
}

const PrivateRoutes = () => {
    const isAuth = useAuth()
    console.log("hihih")
    return isAuth ? <Outlet /> : <Navigate to="/admin/login" />
}

export default PrivateRoutes