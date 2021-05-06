import React,{useState,useRef,useEffect} from 'react'
import './SignUp.css'
const SignUp = () => {
    const [errors,setErrors] = useState('')
    const [form,setForm] = useState({name:"",email:'',password:'',confirmPassword:''})
    const [passwordAlert,setPasswordAlert] = useState(false)
    const [userCreatedAlert,setUserCreatedAlert] = useState(false)

    const handleChange = e =>{
        setUserCreatedAlert('')
        setForm({...form,[e.target.name]:e.target.value})
        
    }
    const confirmPassRef = useRef(null)
    
    useEffect(() =>{        
        if(document.activeElement === confirmPassRef.current){
            if(form.password !== form.confirmPassword){
                   setPasswordAlert(true)
               }
               else{
                   setPasswordAlert(false)
               }
        }
       },[form])


    const handleSubmit = e =>{
        e.preventDefault()
        fetch('https://word-race-backend.herokuapp.com/api/user/register',{
            method:"POST",
            body:JSON.stringify({
                name:form.name,
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
        .then(userId =>{
            setErrors("")
            setUserCreatedAlert(true)
            setForm({name:"",email:'',password:'',confirmPassword:''})

        })
        .catch(err =>{ 
            err.then(err => setErrors(err.message))
        })        
    }

    return (
        <div className="sign-up">
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input required onChange={handleChange} value={form.name} type="text" name="name" id="name"/>
                <label htmlFor="email">Email</label>
                <input required onChange={handleChange} value={form.email} type="text" name="email" id="email"/>
                <label htmlFor="password" name="password">Password</label>
                <input required onChange={handleChange} value={form.password} type="password" name="password" id="password"/>
                <label htmlFor="confirm-password">Confirm Password</label>
                <input required onChange={handleChange} value={form.confirmPassword} type="password" ref={confirmPassRef} name="confirmPassword" id="confirm-password"/>
                {
                    passwordAlert && <span className="confirm-alert" >Passwords do not match</span>
                }
                <button type="submit">Sign Up</button>
            </form>
            {errors && <div className="errors">{errors}</div>}
            {userCreatedAlert && <div className="user-created-success">User Created Successfully. Please go to the Login Page and continue</div>}
        </div>
    )
}

export default React.memo(SignUp)