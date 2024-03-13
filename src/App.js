// import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './Login.jsx'
import Admin from './Admin.jsx'
import Index from "./Index.jsx"
import './App.css'
// import Nav from 'react-bootstrap/Nav'
function App() {
    return (
        <div className="App">
            <div className="logo">
                <div><p className="fs-4"><strong className="box-pizza">Box Pizza</strong></p></div>
            </div>
            <div className="sidebar">
                <div className="sidebar-menu">
                    <i className="bi bi-search"></i>
                    <a href="#">Search</a>
                </div>
                {/* <div className="sidebar-content">
                    <div className="search-bar">
                        <input type="text" placeholder="Search..." />
                        <i className="bi bi-search icon"></i>
                    </div>
                </div> */}
                <div className="sidebar-menu">
                    <i className="bi bi-house-door-fill"></i>
                    <a href="/index">Home</a>
                </div>
                <div className="sidebar-menu">
                    <i className="bi bi-heart-fill"></i>
                    <a href="#">Favs</a>
                </div>
                {/* <div className="sidebar-menu">
                <i class="bi bi-person-circle"></i>
                    <a href="/login">Register</a>
                </div> */}
                <div className="sidebar-menu">
                    <i class="bi bi-person-add"></i>
                    <a href="/login">Login</a>
                </div>
                <div className="sidebar-menu">
                    <i className="bi bi-gear"></i>
                    <a href="#">Settings</a>
                </div>
            </div>
            <BrowserRouter>
                <Routes>
                    <Route path="/index" element={<Index />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/admin" element={<Admin />}></Route>
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;
