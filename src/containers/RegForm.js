import React from 'react';
import Nav from './../components/Nav';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

export default class RegForm extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      login: '',
      password: '',
      passwordAgain: '',
      error: '',
      auth: ''
    }
  }

  authSubmit(e){
    e.preventDefault();

    axios.post('http://localhost:3000/reg', {
      login: this.state.login,
      password: this.state.password,
      secondPassword: this.state.passwordAgain
    })
    .then((res) => {
      if(res.data.error){
        this.setState({error: res.data.error});
      } else if(res.data.reg) {
          this.setState({error: ''});
          this.setState({reg: true});
      }
    })
  }

  changeValue(e){
    const type = e.target.getAttribute('name');
    const value = e.target.value;
    this.setState({[type]: value});
  }

  render(){
    const redirect = this.state.reg ? <Redirect push to="/authForm"/> : '';
    return(
      <div>
        {redirect}
        <Nav/>
        <h1 className="text-center">Регистрация</h1>
        <form onSubmit={(e) => this.authSubmit(e)} className="form">
          <div className="form-group">
            <input onChange={(e) => this.changeValue(e)} value={this.state.login} className="form-control" type="text" name="login" placeholder="Логин"/>
          </div>
          <div className="form-group">
            <input onChange={(e) => this.changeValue(e)} value={this.state.password} className="form-control" type="password" name="password" placeholder="Пароль"/>
          </div>
          <div className="form-group">
            <input onChange={(e) => this.changeValue(e)} value={this.state.passwordAgain} className="form-control" type="password" name="passwordAgain" placeholder="Введите пароль еще раз"/>
          </div>
          <span className="error">{this.state.error}</span>
          <div className="form-group">
            <button type="submit" className="btn btn-primary mb-2">Регистрация</button>
          </div>
        </form>
      </div>
    )
  }
}
