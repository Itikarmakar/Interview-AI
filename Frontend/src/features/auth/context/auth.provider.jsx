import { useState, useEffect } from "react"
import AuthContext from "./auth.context"
import { getMe } from "../services/auth.api"

export const AuthProvider = ({ children }) => { 

    //if user is logged in then user will be an object otherwise null
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

        useEffect(() => {

        const getAndSetUser = async () => {
            try {

                const data = await getMe()
                setUser(data.user)
            } catch (err) {
                console.log(err)
             } finally {
                setLoading(false)
            }
        }

        getAndSetUser()

    },[])


    return (
        <AuthContext.Provider value={{user,setUser,loading,setLoading}} >
            {children}
        </AuthContext.Provider>
    )
   
}