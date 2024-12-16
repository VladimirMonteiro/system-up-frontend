import { authContext } from "../context/authProvider/AuthContext";
import { useContext } from "react";

const Protected = ({ children }) => {
    const auth = useContext(authContext);

    if (!auth.token) {
        
        return <h1>Acesso Negado</h1>;
    } else {
        return <>{children}</>;
    }
};

export default Protected;