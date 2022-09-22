import React from 'react';

const Home = () => {

  function logout() {
    localStorage.removeItem("token");
  }

  return (
    <section>
      <p>Essa é a home</p>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={logout}>
        Logout
      </button>
    </section>
  );
};

export default Home;
