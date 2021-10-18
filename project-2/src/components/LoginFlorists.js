import React from 'react'
import axios from 'axios'

export default class LoginFlorists extends React.Component {

    url = 'https://3000-tan-nightingale-xhc8uhmi.ws-us17.gitpod.io'


    state = {
        'data': [

        ],
        'loginUserName': "",
        'loginEmail': "",
        'displayProfile': false,
        'displayLogin': true
    }

    fetchData = async () => {
        let response = await axios.get(this.url + "/florists"
            + "?username=" + this.state.loginUserName
            + "&"
            + "login_email=" + this.state.loginEmail)

        if (response.status == 200) {
            this.setState({
                'data': response.data,
                'displayProfile': true,
                'displayLogin': false
            })
        } else if (response.status == 400){
        }

        console.log(response)
        console.log(response.data)
    }

    componentDidMount() {
        this.fetchData()
    }

    updateFormField = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    displayLogin = () => {
        if (this.state.displayLogin) {
            return <React.Fragment>
                <div>
                    <h3>View your profile</h3>
                    <div>
                        <label className="form-label">User Name:</label>
                        <input type="text"
                            className="form-control"
                            name="loginUserName"
                            value={this.state.loginUserName}
                            onChange={this.updateFormField} />
                    </div>
                    <div>
                        <label className="form-label">Login Email:</label>
                        <input type="text"
                            className="form-control"
                            name="loginEmail"
                            value={this.state.loginEmail}
                            onChange={this.updateFormField} />
                    </div>
                    <div>
                        <button className="btn btn-primary"
                            onClick={() => this.fetchData()}>See your profile</button>
                    </div>
                </div>
            </React.Fragment>
        }
    }


    showProfile = () => {
        if (this.state.displayProfile) {
            return <React.Fragment>
                <div>{this.state.data.map(each =>
                    <div>{each.name}</div>)}</div>
            </React.Fragment>
        }
    }


    render() {
        return <React.Fragment>
            {this.displayLogin()}
            {this.showProfile()}
        </React.Fragment>
    }


}