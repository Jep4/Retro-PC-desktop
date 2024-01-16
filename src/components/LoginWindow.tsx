import React from 'react';
import "./MainWindow.css"

function LoginWindow() {

    const isLoggedIn = false;
    const wantRegister = false;

    class Login extends React.Component{
        render(){
            return (<div className='login-wrapper'>
                <form>
                    <input type='text' placeholder='Enter your ID...' required>
                    </input>
                    <input type='password' placeholder='Enter your password...' required>
                    </input>
                    <button className ='btn' type='submit'> Submit</button>
                </form>
                    No account?
                    <button className='register-button btn'>Register  &gt; &gt; </button>
            </div>)
        }
    }

    class Register extends React.Component{
        render(){
            return (<div>
                <form>
                    <input type='text' placeholder='Enter new id...' required></input>
                    <input type='password' placeholder='Enter your password...' required></input >
                    
                    <input type='password' placeholder='Confirm  your password...' required></input>
                    <button type='submit'>
                        Confirm
                    </button>
                </form>
                
                <p>Already have an accout?</p>
                    <button className='login-button btn'>Login &gt; &gt; </button>
                    
            </div>)
        }
    }

    class Logout extends React.Component{
        render(){
            return (
                <button>LOGOUT</button>
            )
        }
    }

    function loginControl(){

            if(isLoggedIn){
                return <Logout></Logout>
            }
            else if(wantRegister){
                return <Register></Register>
            }
            else{
                return <Login></Login>
            }
    }


    return (
        <div className='login-register-wrapper'>
            {loginControl()}
        </div>
    );
}

export default LoginWindow;