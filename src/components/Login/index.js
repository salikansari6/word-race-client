import React,{useState} from 'react'
import './Login.css'
import {useHistory} from 'react-router-dom'
const Login = ({setIsAuth,isAuth}) => {
    const history = useHistory()
    const [form,setForm] = useState({email:'',password:''})
    const [errors,setErrors] = useState('')
    const handleChange = e =>{
        setForm({...form,[e.target.name]:e.target.value})
        
    }
    
    const handleSubmit = e =>{
        e.preventDefault()
        fetch('https://word-race-backend.herokuapp.com/api/user/login',{
            method:"POST",
            body:JSON.stringify({
                email:form.email,
                password:form.password
            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res => {
            if(res.ok){
                return res.json()
            }
            else{
                throw res.json()
            }
        })
        .then((creds) =>{
            setIsAuth(true)
            localStorage.setItem("token",creds.token)
            localStorage.setItem("userId",creds.userId)
            history.push('/game')
        })
        .catch(err => {
            console.log(err)
            err.then(err => {
                setErrors(err.message)
            })
        })
    }

    return (
        <div className="log-in">
            <form onSubmit={handleSubmit}>
                
                <label htmlFor="email">Email</label>
                <input required onChange={handleChange} type="text" name="email" id="email"/>
                <label htmlFor="password" name="password">Password</label>
                <input required onChange={handleChange} type="password" name="password" id="password"/>
                <button type="submit">Log in</button>
            </form>
                {errors && <div className="errors">{errors}</div>}
        </div>
    )
}

export default Login
