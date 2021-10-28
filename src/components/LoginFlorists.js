import React from 'react'
import axios from 'axios'
import EditFlorists from './EditFlorists'
import FloristViewListings from './FloristViewListings'
import AddListing from './AddListing'
import DeleteFlorists from './DeleteFlorists'

export default class LoginFlorists extends React.Component {

    url = 'https://3000-tan-nightingale-xhc8uhmi.ws-us18.gitpod.io'

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
        'floristViewListingsId': "",
        'addListing': false,
        'deleteFlorist': false
    }

    fetchData = async () => {
        let response = await axios.get(this.url + "/florists"
            + "?username=" + this.state.loginUserName
            + "&"
            + "login_email=" + this.state.loginEmail)

        this.setState({
            'data': response.data,
            'floristViewListingsId': response.data[0]._id
        })
    }

    componentDidMount() {
        this.fetchData()
    }

    // After clicking the see profile button, if async function promise is successful, 
    // it will alert succesful login and display the profile of florist. 
    // Else, it will alert user to check their login in details, page remains at login.

    seeProfileBtn = () => {
        this.fetchData().then(
            this.action1, this.action2
        )
    }

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

    // Update form fields 2 way binding

    updateFormField = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // Create a new florist profile button.
    // Renders AddFlorists.js from Florists.js via props.

    createProfileBtn = () => {
        this.props.onGoToCreateProfile()
    }


    // Displays the login form

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

    // Sets the states for when edit button is clicked, to be sent to EditFlorists.js.
    // Edit florist information form.
    // Only 'displayEdit' is true. Other pages to be false.

    editForm = (each) => {
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
            'floristViewListings': false,
            'addListing': false,
            'deleteFlorist': false
        })
    }

    // EditFlorists.js editing confirmation, bring florist to login page again.
    // Set all states for under EditFlorists to be empty.
    // 'displayLogin' as true, all other pages false.

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

    // sets the states for the when the delete profile button is clicked, 
    // to be sent to DeleteFlorists.js.

    deleteForm = () => {
        this.setState({
            'deleteFlorist': true,
            'addListing': false,
            'floristViewListings': false,
            'displayEdit': false
        })
    }

    // Florists can view all the listing under them
    // Only 'floristViewListings' is true, the other pages to be false.

    floristViewListings = () => {
        this.setState({
            'floristViewListings': true,
            'displayEdit': false,
            'addListing': false,
            'deleteFlorist': false
        })
    }

    // Florist add new listing, addListingForm sets 'addListing' page to true.
    // Other pages to be false.

    addListingForm = () => {
        console.log(this.state.data[0])
        this.setState({
            'addListing': true,
            'floristViewListings': false,
            'displayEdit': false,
            'deleteFlorist': false
        })
    }

    // After deleting florist profile, go back to main login page.

    onAfterDeleteFlorist = () => {
        this.setState({
            'displayLogin': true,
            'deleteFlorist': false,
            'displayProfile': false,
            'floristViewListingsId': "",
            'loginUserName': "",
            'loginEmail': ""
        })
    }


    // Render different forms 

    displayForms = () => {
        if (this.state.displayEdit == true) {
            // Displays EditFlorists.js Form
            return < EditFlorists
                modifiedUsername={this.state.editUsername}
                modifiedLoginEmail={this.state.editLoginEmail}
                modifiedFloristName={this.state.editFloristName}
                modifiedContactCategory={this.state.editContactCategory}
                modifiedInstagramURL={this.state.editInstagramURL}
                modifiedFacebookURL={this.state.editFacebookURL}
                modifiedContactNumber={this.state.editContactNumber}
                modifiedFloristId={this.state.editFloristId}
                updateFormField={this.updateFormField}
                afterConfirmEditFlorist={this.afterConfirmEditFlorist} />

        } else if (this.state.floristViewListings == true) {
            // Displays FloristsViewListings.js page
            return < FloristViewListings
                floristProfile={this.state.data} />

        } else if (this.state.addListing == true) {
            // Displays AddListing.js Form
            return <AddListing
                florist_id={this.state.data[0]._id}
                florist_name={this.state.data[0].name}
                number={this.state.data[0].contact.number}
                instagram={this.state.data[0].contact.instagram}
                facebook={this.state.data[0].contact.facebook}
                contact_method={this.state.data[0].contact_method}
                onAfterAddListing={this.floristViewListings} />

        } else if (this.state.deleteFlorist == true) {
            // Display DeleteFlorists.js
            return <DeleteFlorists
                florist_id={this.state.data[0]._id}
                florist_email={this.state.data[0].login_email}
                afterDeleteProfile={this.onAfterDeleteFlorist} />
        }
    }

    // After successful login, display profile of florists and the various actions
    // that florist can do. (Eg. Edit profile, add/edit/delete listings, delete profile)
    showProfile = () => {
        if (this.state.displayProfile) {
            return <React.Fragment>
                <div>{this.state.data.map(each =>
                    <div key={each._id}>
                        <h1>Welcome Back {each.name} !</h1>
                        <button onClick={() => this.editForm(each)}>Edit Your Profile</button>
                        <button onClick={() => this.addListingForm()}>Add New Listing</button>
                        <button onClick={() => this.floristViewListings()}>View Your Listings</button>
                        <button onClick={() => this.deleteForm(each)}>Delete Your Profile</button>
                    </div>)}
                </div>
                {this.displayForms()}
            </React.Fragment>
        }
    }

    // Render the various pages according to the states
    render() {
        return <React.Fragment>
            {this.displayLogin()}
            {this.showProfile()}
        </React.Fragment>
    }
}