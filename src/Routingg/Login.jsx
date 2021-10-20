import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

function Login() {

    const history = useHistory();

    const [input, setInput] = useState({
        name: "",
        email: "",
        password: ""

    })

    function handleChange(event) {
        setInput({
            ...input, [event.target.name]: event.target.value
        })
    }

    function login() {

        axios.post("https://ancient-bastion-78867.herokuapp.com/api/login", input).then((response) => {
            console.log(response)
        if(response.data.login){
            localStorage.setItem("token","LoggedIn")
            history.push("/profile")
        }
        else{
            alert("Wrong Username Or Password") 
        }

        }).catch((error) => {
            console.log(error);
        })
    }



    return (
        <div class="container text-light myLogin py-3">
            <h1 class="text-warning mt-3 text-center">Login Page</h1>
            <form class="col-md-6 offset-3" >
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Name</label>
                    <input onChange={handleChange} name="name" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input onChange={handleChange} name="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input onChange={handleChange} name="password" type="password" class="form-control" id="exampleInputPassword1" />
                </div>

                <button onClick={login} type="button" class="btn btn-outline-warning">Login</button>
            </form>
        </div>
    )
}

export default Login
