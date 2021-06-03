import React from 'react'
// import {Dropdown,Menu} from 'semantic-ui-react'
import Login_Img from "./img/profile-icon.png";
import Menu_Img from "./img/hamburger-icon.png";
import Modal from './Modal';
import { Link } from 'react-router-dom';
import "./Sign2.js.css";

class DropdownSign2 extends React.Component{
    constructor(){
        super();
        this.state = {
            //whether show the menu popup window
            showMenu: false,
            showLogin: false,
            showWindow: false,
            //the target className we clicked
            formerClickedTarget: "",
            //Decide sign up window
            showSignUp: false,
        }

        this.showMenu = this.showMenu.bind(this);
        this.showWindow = this.showWindow.bind(this);
        this.closeWindow = this.closeWindow.bind(this);

        
    }
    //for logIn and menu buttons on the top right
    /*
    When click on one button, its popup window appears
    Click on one button, not close its window, then click on another one, close the first opened window and open the window of the clicked button
    Click on one button and close its window, then click on another one, open the clicked button's window
    */
    showMenu = (event) => {
        //The current className that you click
        const currClassName = event.currentTarget.className;
        //the element's className that you clicked before this click
        const formerClickedClassName = this.state.formerClickedTarget;
        let showMenu = this.state.showMenu;
        
        if((formerClickedClassName == "")||(formerClickedClassName != "" && currClassName == formerClickedClassName)||(formerClickedClassName != "" && currClassName != formerClickedClassName && showMenu == false)){
            showMenu = !showMenu;
        }
        this.setState({
            showMenu : showMenu,
            formerClickedTarget: currClassName,
        }); 
 
        //stop the action bubble up to document
        event.nativeEvent.stopImmediatePropagation()
        console.log(this.state.showLogin);
        //add eventlistener so that when click other place except the popup menu, the menu will close
        document
        .addEventListener("click",() => {
            this.setState({
                showMenu: false,
                //showSignUp: false
            })
        })
    }
    //when click secondary menu of login button
    showSignUp = (e) => {
        this.setState({
            showMenu: false,
            showSignUp: true
        })
        e.nativeEvent.stopImmediatePropagation()
    }
    //Take the false value from Modal.js component(child component) and set to state
    closeSignUp = (value) => {
        this.setState({
            showSignUp: value
        })
    }
    showWindow(event){
        event.preventDefault();
        this.setState({
            showWindow : true,
        });
    }
    closeWindow(event){
        event.preventDefault();
        this.setState({
            showWindow : false,
        });
        
    }

    

    render() {
        let popUpWindow;

        //avoid memory leak
        document
        .removeEventListener("click",() => {
            this.setState({
                showMenu: false,
                //showSignUp: false
            })
        })


        //if click login tag, shows the logIn popUp window, vice versa
        if(this.state.formerClickedTarget == "loginImg"){
            popUpWindow = (<div className={this.state.showMenu? "popUp logInPopUp": "popUp logInPopUp popUpHide"}>
                                {/* when click show sign up window */}
                                <div className = "popUpLogIn1" onClick = {this.showSignUp}>Log In</div>
                                <hr className = "popUpLine"color="#D95457" ></hr>
                                <div className = "popUpLogIn2">Sign Up</div>
                                <hr></hr>
                                
                            </div>);
        }else{
            popUpWindow =  (<div className={this.state.showMenu? "popUp menuPopUp": "popUp menuPopUp popUpHide"}>
                                <div className = "popUpLogIn1">About</div>
                                <hr className = "popUpLine"color="#D95457" ></hr>
                                <div className = "popUpLogIn2">Blog</div>
                                <hr className = "popUpLine"color="#D95457" ></hr>
                                <div className = "popUpLogIn2">FAQs</div>
                                <hr className = "popUpLine"color="#D95457" ></hr>
                                <div className = "popUpLogIn2">Contact</div>
                                <hr className = "popUpLine"color="#D95457" ></hr>
                                <div className = "popUpLogIn2">Terms</div>
                                <hr className = "popUpLine"color="#D95457" ></hr>
                                <div className = "popUpLogIn2">Privacy</div>
                                <hr className = "popUpLine"color="#D95457" ></hr>
                                <div className = "popUpLogIn2">Copyright</div>
                            </div>);
        }

        return(
                <div className="logindiv" >
                    <a className="login">
                        <img className="loginImg" src={Login_Img} alt="loginbutton" onClick={this.showMenu}></img>
                    </a>
                    
                                
                                {/* <div className = {this.state.showMenu? "logInPopUpSqure": "logInPopUp logInPopUpSqureHide"}> */}
                                    {/* <button onClick={this.showWindow} >Sign in</button><br />
                                    {
                                        this.state.showWindow
                                            ? (
                                                <Modal onClose={this.closeWindow}
                                                    show={!this.showWindow} />
                                            ) : (null)
                                    }
                                    <button>Sign up</button> */}
                                {/* </div> */}
                                
                            
                    
                    <a className="menu">
                        <img className="menuImg" src={Menu_Img} onClick={this.showMenu}></img>
                    </a>
                    {
                        popUpWindow
                    }
                    {/* Send showSignUp as a attribute to the Modal.js component and using the button in this component to close signUp window*/}
                    <Modal className = "###" closeSignUp = {this.closeSignUp} show = {this.state.showSignUp}></Modal>
                    
                </div>
    )
    }
}

export default DropdownSign2
