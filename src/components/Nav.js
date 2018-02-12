import React from 'React';
import { Link } from 'react-router-dom'

export default class Nav extends React.Component{
  render(){
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">Чат</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="authForm" className="nav-link">Войти</Link>
            </li>
            <li className="nav-item">
              <Link to="regForm" className="nav-link">Регистрация</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
