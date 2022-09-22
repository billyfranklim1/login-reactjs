import React from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import Erros from '../../components/Erros';
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [erros, setErros] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
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

    if (confirmPassword === '') {
      validations.push('Confirmação de senha obrigatória');
      isErros = true;
    }

    if (password !== confirmPassword) {
      validations.push('Senhas não conferem');
      isErros = true;
    }

    if (isErros) {
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
      if (errosResponse.length) {
        for (let erro in errosResponse) {
          errosValidator.push(errosResponse[erro].message);
        }
        setErros(errosValidator);
      } else {
        setErros([error.response.data.message]);
      }

    }).finally(() => {
        setLoading(false);
    });

  }


  return (
    <>
      <Loader show={loading} />
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign up with
                  </h6>
                </div>
                {/* <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("../../assets/img/github.svg")}
                    />
                    Github
                  </button>
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("../../assets/img/google.svg")}
                    />
                    Google
                  </button>
                </div> 
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                */}
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {/* <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign up with credentials</small>
                </div> */}
                <Erros erros={erros} />

                <form>
                  <div className="relative w-full mb-3 mt-5">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Name
                    </label>
                    <input
                      id="name" type="text" name="name"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Name"
                      value={name} onChange={handleChange}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      id="email" type="email" name="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      value={email} onChange={handleChange}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      id="password" type="password" name="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      autoComplete="on"
                      value={password} onChange={handleChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword" type="password" name="confirmPassword"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      autoComplete="on"
                      value={confirmPassword} onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        I agree with the{" "}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-sky-500	 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={singUp}
                    >
                      Create Account
                    </button>
                  </div>
                  <div className="flex justify-center items-center mt-6">
                    <NavLink to="/auth/login" className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
                      <span className="ml-2">Back to Login</span>
                    </NavLink>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
