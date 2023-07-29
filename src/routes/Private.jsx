import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
    const { signed, loadingAuth } = useContext(AuthContext)

    if (loadingAuth) {
        return <div></div>
    }

    if (!signed) {
        return <Navigate to="/login" />
    }

    return children
}