import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebaseConfig";

export const AuthContext = createContext({})

function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(true)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user?.uid,
                    name: user?.displayName,
                    email: user?.email
                })
                setLoadingAuth(false)
            } else {
                setUser(null)
                setLoadingAuth(false)
            }
        })

        return () => {
            unsub();
        }
    }, [])

    function handleInfoUser({ name, email, uid }) {
        setUser({
            name,
            email,
            uid
        })
    }

    return (
        <AuthContext.Provider
            value={{
                handleInfoUser,
                user,
                loadingAuth,
                signed: !!user
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider