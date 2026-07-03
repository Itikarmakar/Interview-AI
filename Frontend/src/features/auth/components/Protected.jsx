import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const Protected = ({children}) => {
    const { loading,user } = useAuth()


    if(loading){
        return (<main><h1>Loading...</h1></main>)
    }

    //this user comes from authProvider and if user is null then we will redirect to login page
    if(!user){
        return <Navigate to={'/login'} />
    }
    
    return children
}

export default Protected