import React from "react";

class Signin extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('https://evening-gorge-15360.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }else{
                alert('Wrong email or Password');
            }
        })
        
    }
    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba dark-gray b--black-10 w-90 w-60-m mw8 mv2 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                onChange={this.onEmailChange}
                                className="pa2 input-reset ba w-100" type="email"
                                name="email-address"
                                id="email-address"
                                required />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                onChange={this.onPasswordChange}
                                className="b pa2 input-reset ba w-100"
                                type="password"
                                name="password"
                                id="password"
                                required />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                            className="b ph3 pv2 input-reset ba b--black grow pointer f6 dib"
                            type="submit"
                            value="Sign in"
                            onClick={this.onSubmitSignIn} />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')} href="#0" className="f6 link dim black db pointer">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Signin;