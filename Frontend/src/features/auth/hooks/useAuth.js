import { useContext } from "react";
import  AuthContext  from "../context/auth.context";
import {
  loginUser,
  registerUser,
  logoutUser,
} from "../services/auth.api";



export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context


    const handleLogin = async ({ email, password }) => {
        setLoading(true);

        try {
            const data = await loginUser({ email, password });

            setUser(data.user);

            return data.user;   // return the user on success

        } catch (err) {

            console.error(err);

            throw err;          // rethrow so Login.jsx knows it failed

        } finally {

            setLoading(false);

        }
    };

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);

        try {

            const data = await registerUser({
                username,
                email,
                password,
            });
            console.log("Register response:", data);

            setUser(data.user);

            return data.user;

        } catch (err) {

            console.error(err);

            return null;

        } finally {

            setLoading(false);

        }
    };

    const handleLogout = async () => {
        setLoading(true)
        try {
            await logoutUser()
            setUser(null)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    return { user, loading, handleRegister, handleLogin, handleLogout }
}