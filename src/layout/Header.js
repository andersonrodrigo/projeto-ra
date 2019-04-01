import React  from 'react'
import { Link } from 'react-router-dom'
const Header = props => {
	return (
        <div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>
            <div className="wrapper-header">
                <div className="row">
                    <div className="col-xs-12 col-md-8">
                    <Link to="/"> <i className="material-icons">home</i> </Link>
                    <Link to="/banco">  <i className="material-icons">work</i>  </Link>
                    <i className="material-icons">watch_later</i>  
                    </div>
                </div>
            </div>
		 </div>
	)
}
export default Header