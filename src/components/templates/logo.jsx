import React from 'react'
import './logo.css'
import logo from '../../assets/imgs/logo.svg'
import { Link} from 'react-router-dom'


export default props =>
<aside className="logoaside">
<Link to="/" className="logo">
    <img src={logo} alt="logo" className="imgLogo"/>
</Link>
</aside> 