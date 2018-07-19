import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function mapStateToProps(state){
    return {
     login: state.hasil_login
    };
}

class Login extends Component {
  state = {
      statusRedirect: false,
      statusLogin: ''
  }
  
  fungsiLogin = (e) => {
     var self = this
    axios.post(`http://localhost:8002/login`, {
        username: e.username.value,
        password: e.password.value
    }).then((kepastian) => {
        self.setState({hasil_kepastian:kepastian.data})
        if(kepastian.data === 'oke'){
            self.setState({
                statusRedirect: true
            });
        } else {
            self.setState({
                statusLogin: 'Login gagal, username atau password salah'
            })
        }  
    });
    self.props.dispatch({type:'Login', kirim:this.state.hasil_kepastian})
  }
  fungsiRedirect = () => {
    if(this.state.statusRedirect){
        return <Redirect to="/ListProduk"/>
      }  
  }
  render() {
    return (
      <div className="container">
      {this.fungsiRedirect()}
        <form className="form-horizontal">
                <fieldset>
                    <legend>Login</legend>
                    <div className="form-group">
                        <label className="col-lg-2 control-label">Username</label>
                        <div className="col-lg-10">
                            <input ref="username" type="text" className="form-control" placeholder="Masukan username anda ..." />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-lg-2 control-label">Password</label>
                        <div className="col-lg-10">
                            <input ref="password" type="text" className="form-control"   placeholder="Isi dengan password anda ..." />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-lg-10 col-lg-offset-2">
                            <button type="button" onClick={() => this.fungsiLogin(this.refs)} className="btn btn-primary"><i className="fa fa-paper-plane"></i> Login</button>
                        </div>
                    </div>

                </fieldset>
            </form>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Login)