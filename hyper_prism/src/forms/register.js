import React from 'react'
import axios from 'axios'
import {NavLink} from 'react-router-dom'
import '../styles/forms/register.css'


export default class Register extends React.Component{
    constructor(){
        super()
        this.state = {
            username: '',
            email: '',
            password: ''

        }
    }

    changeHandler = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault()
        
        axios.post(process.env.REACT_APP_REGISTER, this.state)
            .then(response => {
                this.setState({
                    username: '',
                    email: '',
                    password: ''                   
                })
                this.props.history.push('/login')
                console.log(response)
            })
            .catch(error => {
                console.log("There was an error registering your account", error)
            })
    }
    
    render(){
        return(
            <div>
                <div>
                    <h1 className="header">Hyper Prism</h1>                
                    <hr style={{width:'100%', borderBottomColor: 'green', boxShadow: "1px 2px 2px 1px green", marginBottom: '0px'}} /> 
                </div>
                <div className='grand-container'>
                <div className='menu-container'>
                    <h3>Create an account</h3>
                <form>
                    <input placeholder='Username' 
                           name='username' 
                           value={this.state.username} 
                           onChange={this.changeHandler}
                           type='text'
                    />
                    <br/>
                    <input placeholder='Email'
                           name='email'
                           type='text'
                           onChange={this.changeHandler}
                           value={this.state.email}
                    />
                    <br/>
                    <input name='password'
                           type='password'
                           placeholder='Password'
                           value={this.state.password}
                           onChange={this.changeHandler}
                    />
                    <div  className='submit-button' onClick={this.submitHandler}>Submit</div>
                    <br/>
                    <p style={{color: 'white', fontWeight: '800', fontSize: '12px'}}>Already have an account?<NavLink to='Login' style={{paddingLeft: '5px'}}>Sign In Here</NavLink></p>
                </form>
                </div>
                </div>
                <div className='controls-container'> 
                    <div className="numbers"> 
                        <div>
                            <h1 className="choice1 button1">I</h1>
                        </div> 
                        <div> 
                            <h1 className="choice1 button2" >II</h1>
                        </div> 
                        <div> 
                            <h1 className="choice1 button3">III</h1>
                        </div> 
                    </div>  
                    <div className="controls">
                        <div onClick={this.restartHandler} className="restart">Restart</div>
                        <div type='submit'><NavLink style={{textDecoration: "none", fontWeight: "800", color: "white"}} to='/'>Return</NavLink></div>
                    </div>
                </div>   
            </div> 
        )
    }
}