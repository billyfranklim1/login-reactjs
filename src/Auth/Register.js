import '../App.css';
import React from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import { NavLink,useNavigate } from 'react-router-dom';
import Erros from '../components/Erros';
const Register = () => {
  const navigate = useNavigate();

  // name, email, password and confirmPassword are the state variables
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [erros, setErros] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  function handleChange(event) {
    const {name, value} = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  }

  function singUp(event) {
    event.preventDefault();

    setErros([]);
    setLoading(true);

    var isErros = false;
    var validations = [];

    if (name === '') {
      validations.push('Nome é obrigatório');
      isErros = true;
    }

    if (email === '') {
      validations.push('Email é obrigatório');
      isErros = true;
    }

    if (password === '') {
      validations.push('Senha obrigatória');
      isErros = true;
    }

    if (password === '') {
      validations.push('Senha obrigatória');
      isErros = true;
    }

    if (password !== confirmPassword) {
      validations.push('Senhas não conferem');
      isErros = true;
    }

    if(isErros) {
      setErros(validations);
      setLoading(false);
      return;
    }

    var url = 'http://192.168.1.53:8080/api/auth/signup';
    var data = {
      name: name,
      email: email,
      password: password
    };
    
    axios.post(url, data).then(function (response) {
      console.log(response.data);

      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      window.localStorage.setItem('token', response.data.token);
      navigate('/home');
      
    }).catch(function (error) {

        var errosValidator = [];
        var errosResponse = error.response.data.message.errors || [];
        if(errosResponse){
          for (let erro in errosResponse){
            errosValidator.push(errosResponse[erro].message);
          }
          setErros(errosValidator);
        }else{
          setErros([error.response.data.message]);
        }
      
    }).finally(() => {
      setInterval(() => {
        setLoading(false);
      }, 3000);
    });

  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300 p-5">
      <Loader show={loading} />
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md max-w-md w-full">
        <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Create Your Account</div>
        {/* <button className="relative mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-sky-50">
          <span className="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-blue-500"><i className="fab fa-facebook-f"></i></span>
          <span>Login with Facebook</span>
        </button>
        <div className="relative mt-10 h-px bg-gray-300">
          <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
            <span className="bg-white px-4 text-xs text-gray-500 uppercase">Or Login With Email</span>
          </div>
        </div> */}
        <Erros erros={erros} />
        <div className="mt-5">
          <div>
            <div className="flex flex-col mb-6">
              <label htmlFor="name" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Name:</label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  {/* <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg> */}
                  <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h1.75a2 2 0 012 1.99l.16 1.03a2 2 0 001.664 1.11l.812-1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  </svg>
                </div>

                <input id="name" type="text" name="name" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Name" value={name} onChange={handleChange} />
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail Address:</label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>

                <input id="email" type="email" name="email" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="E-Mail Address"  value={email} onChange={handleChange} />
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

                <input id="password" type="password" name="password" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Password"  value={password} onChange={handleChange} />

              </div>
            </div>

            <div className="flex flex-col mb-6">
              <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Confirm Password:</label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <span>
                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                </div>
                <input id="confirmPassword" type="password" name="confirmPassword" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Password" value={confirmPassword} onChange={handleChange} />
              </div>
            </div>
            <div className="flex w-full">
              <button type="button" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in" onClick={singUp}>
                <span className="mr-2 uppercase">
                  Create Account
                </span>
                <span>
                  <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>
            <div className="flex justify-center items-center mt-6">
              <NavLink to="/" className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
                <span className="ml-2">Back to Login</span>
                <span>
                  <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M19 9l-7 7-7-7" />
                  </svg>

                </span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
