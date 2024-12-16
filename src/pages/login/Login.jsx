import axios from 'axios'
import styles from './Login.module.css'

import { useContext, useState } from 'react' 
import { authContext } from '../../context/authProvider/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])

    const auth = useContext(authContext)
    const navigate = useNavigate()


    const handleSubmit = async(e) => {
        e.preventDefault()

        const data = await auth.authenticate({login, password})
        console.log(data)

        
        if (data) {
            setErrors(data)
          
        }else {
            setLogin("")
            setPassword("")
            navigate("/admin")
        }
    }


    return (
        <section className={styles.container}>
            
            <h1>Up Locações</h1>
            <div className={styles.containerForm}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="login">usename</label>
                        <input type="text" name="login" id="login"onChange={e => setLogin(e.target.value)} value={login} />
                    </div>
                    <div  className={styles.inputContainer}>
                        <label htmlFor="password">password</label>
                        <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} value={password} />
                    </div>
                    <input type="submit" value="Entrar" />
                </form>
            </div>

        </section>
    )
}


export default Login