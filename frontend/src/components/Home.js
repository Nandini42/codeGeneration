// import React from 'react';
// import navImg from '../navImg.jpg'; // adjust path if needed
// import { HomeIcon } from '@heroicons/react/solid';
// import qimg from '../qImg.jpg';
// import {Link} from 'react-router-dom';
// // 
// const Home = () => {
//   return (
   
//      <div
//       className="  mx-auto mt-12 max-w-3xl flex items-center justify-center"
//       // style={{ backgroundImage: `url(${navImg})` }}  from-cyan-600 to-cyan-900
//     > 
//       <div className="text-center text-white py-20 bg-opacity-75 flex flex-col items-center justify-center "
//       // className="text-center text-white p-20 bg-opacity-75 rounded-lg shadow-lg" style={{ backgroundImage: `url(${navImg})` }}>
//         >
//         <h1 className="text-5xl font-bold tracking-tighter mb-4">Test Your Knowledge Instantly With Our{'  '}
//            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-purple-300 to-blue-400"> Quiz App </span>
// </h1>
//         <p className="text-lg text-muted-foreground max-w-prose text-center ">
//         Type in any topic you're curious about, and dive into a quiz instantly. Quick, fun, and a great way to learn something new. Ready to attempt? Jump into your first quiz now!
//         </p>
//         <button className="mt-6 px-8 py-2 bg-gradient-to-r text-gray-900 from-teal-100 via-purple-200 to-blue-300 hover:bg-sky-950 rounded-full  font-semibold transition duration-300">
//         <Link  to="/quiz">
//           {/* <BookOpenIcon className="h-4 w-6 mr-0" /> */}
//           Get Started
//         </Link>
          
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Home;




// src/components/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../App.css"; // or a separate Home.css if you want

function Home() {
  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <h2>AI Code Generator</h2>
        </div>

        <div className="nav-right">
          <Link to="/login">
            <button className="nav-btn">Login</button>
          </Link>
          <Link to="/signup">
            <button className="nav-btn">Signup</button>
          </Link>
        </div>
      </nav>

      {/* Hero section */}
      <main className="hero">
        <h1>Welcome to AI Code Generator</h1>
        <p>
          Generate clean, optimized code in Python, Java, C++ or C from your problem statement.
        </p>
        <Link to="/login">
          <button className="primary-btn">Get Started</button>
        </Link>
      </main>
    </div>
  );
}

export default Home;
