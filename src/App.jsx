import "./App.scss";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <div className="App">
    <div className="app-header">
     <Header/>
    </div>
     <div className="app-contents"> 
     <Outlet/>
     </div>

     <hr className="border-primary custom-hr my-4"/>

     <div className="app-footer">
       <Footer/>
     </div>
    </div>
    
  );
 
}

export default App;
