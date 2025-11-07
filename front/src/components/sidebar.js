import React from "react";
import './sidebar.css';

const Sidebar=() =>
{
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-title">Dual-Core Bug Research Center</div>
            </div>

            <div className="sidebar-content">
                <a href="#" className="sidebar-item explore-projects">
                    <i className="fa-solid fa-eye"></i>
                    Explore Projects
                </a>
                <a href="#" className="sidebar-item submit-projects">
                    <i className="fa-solid fa-upload"></i>
                    Upload Project
                </a>
                <div className="auth-buttons">
                    <button className="sidebar-item login-button">
                        <i className="fa-solid fa-right-to-bracket"></i>
                        Login
                    </button>
                    <button className="sidebar-item logout-button">
                        <i className="fa-solid fa-right-to-bracket"></i>
                        Logout
                    </button>
                </div>
            </div>
            <div className="sidebar-footer">
                <div className="build-info">
                    <i className="fa-solid fa-user"></i>Built by Team Dual-Core:
                    <p className="our-names">Covrig Eduard-Gabriel<br/>Constantin Arthur-Stefan</p>
                </div>
            </div>
        </div> 
    )
}
export default Sidebar;