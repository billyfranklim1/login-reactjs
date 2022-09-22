import '../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Erros from '../components/Erros';
import { NavLink, Navigate } from 'react-router-dom';

import Loader from '../components/Loader';
import { flowService } from "../helpers/flow";


const Login = () => {

  const [isAuth, setIsAuth] = useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [erros, setErros] = React.useState([]);
  const [loading, setLoading] = React.useState(false);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
    }
  }, []);


  function withErro(name){
    var border = 'border-gray-400 focus:border-blue-400'
    if(name === 'name')
      border = 'border-red-400 focus:border-red-400 border-2';
    return border;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }


  function singIn(event) {
    event.preventDefault();
    setErros([]);
    setLoading(true);

    var url = 'http://192.168.1.53:8080/api/auth/signin';
    var data = {
      email: email,
      password: password
    };

    axios.post(url, data).then(function (response) {
      localStorage.setItem("token", response.data.token);
      // navigate('/home');
      flowService.goTo('/home');
    }).catch(function (error) {
      setErros([error.response.data.message]);
    }).finally(() => {
      setInterval(() => {
        setLoading(false);
      }, 3000);
    })

  }

  // return (
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={<Home />} />
  //       <Route path="sobre" element={<Sobre />} />
  //       <Route path="contato" element={<Contato />} />
  //     </Routes>
  //   </BrowserRouter>
  // );

  return (
    <>
      {isAuth ? (<Navigate to="/home" />) : (
        <>
          <Loader show={loading} />
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300 p-5">
            <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md max-w-md w-full">
              <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Login To Your Account</div>
              {/* <button className="relative mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-sky-50">
          <span className="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-blue-500"><i className="fab fa-facebook-f"></i></span>
          <span>Login with Facebook</span>
        </button>
        <div className="relative mt-10 h-px bg-gray-300">
          <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
            <span className="bg-white px-4 text-xs text-gray-500 uppercase">Or Login With Email</span>
          </div>
        </div> */}
              {/* if erros.lenght */}
              {/* Erros */}
              <Erros erros={erros} />

              <div className="mt-5">
                <div>
                  <div className="flex flex-col mb-6">
                    <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail Address:</label>
                    <div className="relative">
                      <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                        <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      </div>

                      <input id="email" type="email" name="email" className={`text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border  w-full py-2 focus:outline-none  ${withErro('name')} ` }  placeholder="E-Mail Address" value={email} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="flex flex-col mb-6">
                    <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
                    <div className="relative">
                      <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                        <span>
                          <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </span>
                      </div>

                      <input id="password" type="password" name="password" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Password" value={password} onChange={handleChange} />

                    </div>
                  </div>
                  <div className="flex items-center mb-6 -mt-4">
                    <div className="flex ml-auto">
                      <a href="#" className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700">Forgot Your Password?</a>
                    </div>
                  </div>
                  <div className="flex w-full">
                    <button type="button" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in" onClick={singIn}>
                      <span className="mr-2 uppercase">Login</span>
                      <span>
                        <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center mt-6">
                <NavLink to="/register" className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
                  <span>
                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </span>
                  <span className="ml-2">You don't have an account?</span>
                </NavLink>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Login;

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// }