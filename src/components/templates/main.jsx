import React from 'react'
import './main.css'
import Header from './header'

export default props =>
 <React.Fragment>
     <Header {...props}/>
     <main className="content">
        <div className="">
            {props.children}
        </div>
     </main>
 </React.Fragment>