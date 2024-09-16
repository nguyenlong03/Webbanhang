import "./App.scss";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";
function App() {
  return (
    <div className="App">
    <div className="app-header">
    <Home/>
    </div>
     <div className="app-contents"> nội dung</div>

     <hr className="border-primary custom-hr my-4"/>

     <div className="app-footer">
       <Footer/>
     </div>
    </div>
    
  );
 
}

export default App;
