import React, {Component} from 'react';
import './App.css';


import {BrowserRouter} from 'react-router-dom';
import Main from './components/Main'
// import OwnerLogin from './components/Login/OwnerLogin'
// import OwnerSignUp from './components/SignUp/OwnerSignUp'
// import Home from './components/Home/Home'



class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    {/* App Component Has a Child Component called Main*/}
                    {/*<OwnerLogin/>*/}
                    {/*<PropertyDetails/>*/}
                    <Main/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
