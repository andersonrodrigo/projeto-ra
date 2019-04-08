import React from 'react'
import './nav.css'
import { Link} from 'react-router-dom'
 
export default props =>
 <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
               <i className="fa fa-home"></i>&nbsp;Home
            </Link>
            <Link to="/bancos">
               <i className="fa fa-users"></i>&nbsp;Bancos
            </Link>
            <Link to="/bancosgrid">
               <i className="fa fa-align-justify"></i>&nbsp;Grid de Bancos
            </Link>
            <Link to="/empenho">
               <i className="fa fa-android"></i>&nbsp;Empenho
            </Link>
        </nav>
 </aside>