import React from 'react'
import axios from 'axios'
import EditFlorists from './EditFlorists'
import FloristViewListings from './FloristViewListings'

export default class LoginFlorists extends React.Component {

    url = 'https://3000-tan-nightingale-xhc8uhmi.ws-us17.gitpod.io'

    state = {
        'data': [

        ],
        'loginUserName': "",
        'loginEmail': "",
        'displayProfile': false,
        'displayLogin': true,
        'displayEdit': false,
        'profileBeingEdited': {},
        'editFloristId': "",
        'editUsername': "",
        'editLoginEmail': "",
        'editFloristName': "",
        'editContactCategory': [],
        'editInstagramURL': "",
        'editFacebookURL': "",
        'editContactNumber': "",
        'floristViewListings': false,
        'floristViewListingsId': ""
    }

    fetchData = async () => {
        let response = await axios.get(this.url + "/florists"
            + "?username=" + this.state.loginUserName
            + "&"
            + "login_email=" + this.state.loginEmail)

        this.setState({
            'data': response.data,
        })
    }

    componentDidMount() {
        this.fetchData()
    }

    seeProfileBtn = () => {
        this.fetchData().then(
            this.action1,this.action2
        )}


    action1 = () => {
        this.setState({
            'displayProfile': true,
            'displayLogin': false
        })
        alert("Successful")        
    }

    action2 = () => {
        alert("Check Again")
    }

    updateFormField = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    createProfileBtn = () =>{
        this.props.onGoToCreateProfile()
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
                                onClick={() => this.seeProfileBtn()}>See your profile</button>
                        <button className="btn btn-danger"
                                onClick={() => this.createProfileBtn()}>New? Create A New Profile</button>
                    </div>
                </div>
            </React.Fragment>
        }
    }

    EditForm = (each) => {
        this.setState({
            'displayEdit': true,
            'profileBeingEdited': each,
            'editFloristId': each._id,
            'editUsername': each.username,
            'editLoginEmail': each.login_email,
            'editFloristName': each.name,
            'editContactCategory': each.contact_method,
            'editInstagramURL': each.contact.instagram,
            'editFacebookURL': each.contact.facebook,
            'editContactNumber': each.contact.number,
        })
    }

    FloristViewListings = (each) =>{

        this.setState({
            'floristViewListings': true,
            'displayEdit': false,
            'floristViewListingsId': each._id
        })

        console.log(this.state.floristViewListingsId)

    }

    afterConfirmEditFlorist = () => {
        this.setState({
            'displayEdit': false,
            'displayLogin': true,
            'displayProfile': false,
            'loginUserName': "",
            'loginEmail': "",        
            'profileBeingEdited': {},
            'editFloristId': "",
            'editUsername': "",
            'editLoginEmail': "",
            'editFloristName': "",
            'editContactCategory': [],
            'editInstagramURL': "",
            'editFacebookURL': "",
            'editContactNumber': ""
        })

    }

    displayForms = () => {
        if (this.state.displayEdit == true){
            return < EditFlorists 
                    modifiedUsername = {this.state.editUsername}
                    modifiedLoginEmail = {this.state.editLoginEmail}
                    modifiedFloristName = {this.state.editFloristName}
                    modifiedContactCategory = {this.state.editContactCategory}
                    modifiedInstagramURL = {this.state.editInstagramURL}
                    modifiedFacebookURL = {this.state.editFacebookURL}
                    modifiedContactNumber = {this.state.editContactNumber}
                    modifiedFloristId = {this.state.editFloristId}
                    updateFormField = {this.updateFormField}
                    afterConfirmEditFlorist = {this.afterConfirmEditFlorist}/>
        } else if (this.state.floristViewListings == true){
            return < FloristViewListings 
                    floristViewListingsId = {this.state.floristViewListingsId}/>
        }
    }

    showProfile = () => {
        if (this.state.displayProfile) {
            return <React.Fragment>
                <div>{this.state.data.map(each =>
                    <div key={each._id}>
                        <h1>Welcome Back {each.name} !</h1>
                        <button onClick={() => this.EditForm(each)}>Edit Your Profile</button>
                        <button onClick={() => this.FloristViewListings(each)}>View Your Listings</button>
                        <button>Delete Your Profile</button>
                    </div>)}
                </div>
                {this.displayForms()}
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