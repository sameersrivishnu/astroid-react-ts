import React from "react";
import { BrowserRouter } from "react-router-dom";
import BaseContainer from "./Container/BaseContainer";
import { APP_PATH } from "./Helpers/Constants";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={APP_PATH}>
        <BaseContainer />
      </BrowserRouter>
    );
  }
}

export default App;



// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
