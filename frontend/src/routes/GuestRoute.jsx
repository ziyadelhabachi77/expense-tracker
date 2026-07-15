import { Navigate, Outlet } from "react-router-dom"
import {useIsAuthenticated } from "../hooks"
import { Loading } from "../components";



function GuestRoute() {
  const {isAuthenticated,isLoading} = useIsAuthenticated();
  
  if(isLoading) return <Loading />

  if(isAuthenticated) {
    return <Navigate to={"/dashboard"} replace/>
  }

  return (
    <div className="h-screen bg-color-main flex items-center justify-center">
        <Outlet />
    </div>
  )
}

export default GuestRoute