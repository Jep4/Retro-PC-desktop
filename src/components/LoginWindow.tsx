import React, { useEffect, useState } from 'react';
import "./MainWindow.css"
import axios from 'axios';

function LoginWindow() {

    const [logedIn, setLogin] = useState(false);
    const [wantRegister, setRegister] = useState(false);
    var userdata = "";

useEffect(()=>{
    getUser();
}, []);
    function goRegister() {
        setRegister(true);
    }

    function goLogin() {
        setRegister(false);
    }
    
    function goLogout() {
        setLogin(false);
    }

    const registerControl = async (e:any) => {
        e.preventDefault();

        let username = document.querySelector(".id-register-input") as HTMLInputElement;
        let password = document.querySelector(".pw-register-input") as HTMLInputElement;
        let confirmedPassword = document.querySelector(".confirm-input") as HTMLInputElement;

        try {
            if (confirmedPassword.value !== password.value) {
                
                alert("Password and confirm field does not match!");
                
                confirmedPassword.style.border = "2px sollid red";
            }
            else {
                await axios.post("http://localhost:8080/register", {
                    id: username.value,
                    password: password.value,
                    is_admin: false
                });
                
           alert("Successfully Registered!");
            await axios.post("http://localhost:8080/login", {
                id: username.value,
                password: password.value,
                is_admin: false
            });
            setLogin(true);
            getUser();
            
        
            }
        }
        catch (e) {
            window.alert("Regstration failed! " + e); 

        }
    }


    const loginTryControl = async (e:any) => {
        e.preventDefault();
        let username = document.querySelector(".id-input") as HTMLInputElement;
        let password = document.querySelector(".pw-input") as HTMLInputElement;
        try {
            axios.post("http://localhost:8080/login", {
                withCredentials:true, 
                credentials: 'include',
                
                id: username.value,
                password: password.value,
                is_admin: false
            });
            setLogin(true);
        alert("Successfully Logged in!");
        getUser();
        }
        catch (e:any) {
            window.alert("Login failed! Please check your username and password. " + e); 

        }
    }

    const getUser = async () => {
        try {
            const res = await axios.get("http://localhost:8080/getUser", {withCredentials:true});
            userdata = res.data.uid;
            return userdata;
        } catch (error) {
            console.error("Error fetching user:", error);
            return null;
        }
    }
    
    class Login extends React.Component {
        render() {
            return (<div className='login-wrapper' >
                <form className='login-form'  onSubmit={(e)=> loginTryControl(e)}>
                    <input type='text' className='id-input' autoComplete='true' placeholder='Enter your ID...' required>
                    </input>
                    <p></p>
                    <input type='password' className='pw-input' autoComplete='true' placeholder='Enter your password...' required>
                    </input>
                    <button className=' confirm-button btn' type='submit' > 
                    Submit</button>
                </form>
                <span>No account?</span>
                <button className='register-button btn' onClick={goRegister}>Register  &gt; &gt; </button>
            </div>)
        }
    }

    class Register extends React.Component {
        render() {
            return (<div>
                <form className='register-form' onSubmit={(e)=> registerControl(e)}>
                    <input type='text' name="id-register"  className='id-register-input' placeholder='Enter new id...' required></input>
                    <p id="none"></p>
                    <input type='password'  name="password-register" className='pw-register-input' placeholder='Enter your password...' required></input >

                    <button type='submit' className='confirm-button btn' >
                        Confirm
                    </button>
                    <input className="confirm-input"  name="password-confirm"  type='password' placeholder='Confirm  your password...' 
            
                    required></input>

                </form>


                Already have an accout?
                <button className='login-button btn' onClick={goLogin}>Login &gt; &gt; </button>

            </div>)
        }
    }

    interface LogoutState {
        username: string | null; 
    }

    class Logout extends React.Component<{}, LogoutState> {
        constructor(props:any) {
            super(props);
            this.state = {
                username: null,
            };
        }
    
        async componentDidMount() {
            try {
                const user = await getUser();
                this.setState({ username: user });
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }
    
        render() {
            const { username } = this.state;
    
            return (
                <div className='logout-wrapper'>
                    <p>Hello, {username}</p>
                    <button className='logout-btn btn' onClick={goLogout}>
                        LOGOUT
                    </button>
                </div>
            );
        }
    }
    

    function loginControl() {

        if (logedIn) {
            return <Logout></Logout>
        }
        else if (wantRegister) {
            return <Register></Register>
        }
        else {
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