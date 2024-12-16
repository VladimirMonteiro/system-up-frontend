import { createContext, useState, useEffect } from "react";
import { getUserLocalStorage, loginRequest, setUserLocalStorage } from "./utils";


const authContext = createContext()

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const userData = getUserLocalStorage();
       
    
        if (userData) {
          setUser(userData);
        }

        console.log(user)
    
        
      }, []);


      async function authenticate({login, password}) {
        const response = await loginRequest(login, password)
        if(response) {
            console.log(response.token)

            const payload = {
                token: response.token
            }
            setUser(payload)
            setUserLocalStorage(payload);

        }

           
        
      }


      async function logout() {
        setUser(null);
        setUserLocalStorage(null);
      }

    return(
        <authContext.Provider value={{...user, authenticate, logout}}>
            {children}
        </authContext.Provider>
    )
}

export { authContext, AuthProvider };
