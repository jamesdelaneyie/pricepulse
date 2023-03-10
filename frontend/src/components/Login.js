import { useState } from 'react';
import axios from "axios";

function Login(props) {

    const [loginForm, setloginForm] = useState({
      email: "",
      password: ""
    })

    function logMeIn(event) {
      axios({
        method: "POST",
        url:"/token",
        data:{
          email: loginForm.email,
          password: loginForm.password
         }
      })
      .then((response) => {
        props.setToken(response.data.access_token)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })

      setloginForm(({
        email: "",
        password: ""}))

      event.preventDefault()
    }

    function handleChange(event) { 
      const {value, name} = event.target
      setloginForm(prevNote => ({
          ...prevNote, [name]: value})
      )}

    return (
      <article className="mb-auto p-6 sm:w-full md:w-2/6 lg:w-1/6 border rounded">
        <div>
          <h1 className='text-2xl font-bold mb-4'>Login</h1>
          <form className="login">
            <input 
                  className="w-full border border-stone-200 rounded p-2 mb-2"
                  onChange={handleChange} 
                  type="email"
                  text={loginForm.email} 
                  name="email" 
                  placeholder="Email" 
                  value={loginForm.email} />
            <input 
                  className="w-full border border-stone-200 rounded p-2 mb-2"
                  onChange={handleChange} 
                  type="password"
                  text={loginForm.password} 
                  name="password" 
                  placeholder="Password" 
                  value={loginForm.password} />

          <button className="text-white py-2 px-4 rounded mr-3 bg-blue-600 hover:bg-blue-700" onClick={logMeIn}>Submit</button>
        </form>
        </div>
      </article>
    );
}

export default Login;