import React from 'react'
import axios from 'axios'
import '../components-css/EditFlorists.css'

export default class EditFlorists extends React.Component {

    // Deployment URL
    url = 'https://ywy-project2-fmp-express-app.herokuapp.com'

    // Testing URL
    //url = 'https://3000-tan-nightingale-xhc8uhmi.ws-us18.gitpod.io'

    state = {
        'modifiedUsername': this.props.modifiedUsername,
        'modifiedLoginEmail': this.props.modifiedLoginEmail,
        'modifiedFloristName': this.props.modifiedFloristName,
        'modifiedContactCategory': this.props.modifiedContactCategory,
        'modifiedInstagramURL': this.props.modifiedInstagramURL,
        'modifiedFacebookURL': this.props.modifiedFacebookURL,
        'modifiedContactNumber': this.props.modifiedContactNumber,
        'floristId': this.props.modifiedFloristId
    }

    sendData = async () => {
        await axios.put(this.url + "/florists/" + this.state.floristId,
            {
                "username": this.state.modifiedUsername,
                "login_email": this.state.modifiedLoginEmail,
                "name": this.state.modifiedFloristName,
                "contact_method": this.state.modifiedContactCategory,
                "number": this.state.modifiedContactNumber,
                "instagram": this.state.modifiedInstagramURL,
                "facebook": this.state.modifiedFacebookURL
            })
    }

    // Update Form Field
    updateFormField = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // Update Checkboxes Form Field
    updateCategoryCheckboxes = (event) => {
        // check if the value that the user has clicked already exists
        // 1. if exists, then the user is UNCHECKING the box
        // 2. if does not exists, then the user is CHECKING the box

        let arrayToModify = this.state[event.target.name];

        if (arrayToModify.includes(event.target.value)) {
            let indexToRemove = arrayToModify.indexOf(event.target.value);
            let cloned = [...arrayToModify.slice(0, indexToRemove),
            ...arrayToModify.slice(indexToRemove + 1)];
            this.setState({
                [event.target.name]: cloned
            })

            if (!cloned.includes("whatsapp")) {
                this.setState({
                    'modifiedContactNumber': ""
                })
            }
            if (!cloned.includes("instagram")) {
                this.setState({
                    'modifiedInstagramURL': ""
                })
            }
            if (!cloned.includes("facebook")) {
                this.setState({
                    'modifiedFacebookURL': ""
                })
            }

        } else {
            // clone the array
            let cloned = [...arrayToModify, event.target.value];
            this.setState({
                [event.target.name]: cloned
            })

            if (!cloned.includes("whatsapp")) {
                this.setState({
                    'modifiedContactNumber': ""
                })
            }
            if (!cloned.includes("instagram")) {
                this.setState({
                    'modifiedInstagramURL': ""
                })
            }
            if (!cloned.includes("facebook")) {
                this.setState({
                    'modifiedFacebookURL': ""
                })
            }
        }
    }

    // Browser Validation before sending edit to server
    confirmEditFlorist = () => {
        let error = ""
        if (this.state.modifiedUsername.length < 8) {
            error = error + "Please enter a username with at least 8 characters." + "\n"
        }

        if (!this.state.modifiedLoginEmail.includes("@") || !this.state.modifiedLoginEmail.includes(".")) {
            error = error + "Please enter a valid email address." + "\n"
        }

        if (this.state.modifiedFloristName.length < 1) {
            error = error + "Please enter a Florist name." + "\n"
        }

        if (this.state.modifiedContactCategory.length < 1) {
            error = error + "Please choose at least one way for buyers to contact you." + "\n"
        }

        if (this.state.modifiedContactCategory.includes("whatsapp")) {
            if (this.state.modifiedContactNumber.length < 8) {
                error = error + "Please enter contact number more than 8 digits" + "\n"
            }
        }

        if (this.state.modifiedContactCategory.includes("instagram")) {
            if (!this.state.modifiedInstagramURL.includes("instagram.com")) {
                error = error + "Please enter a valid Instagram URL" + "\n"
            }
        }

        if (this.state.modifiedContactCategory.includes("facebook")) {
            if (!this.state.modifiedFacebookURL.includes("facebook.com")) {
                error = error + "Please enter a valid FaceBook URL"
            }
        }

        if (error == "") {
            this.sendData()
            alert("Profile Succesfully Edited!")

            this.props.afterConfirmEditFlorist()
        } else {
            alert(error)
        }

    }

    render() {
        return <React.Fragment>
            <div className="container">
                <h1>Edit Profile</h1>

                <div>
                    <h3>Login Information</h3>
                    <div className="edit-florists-div">
                        <label className="form-label edit-florists-label">User Name:</label>
                        <input type="text"
                            className="form-control"
                            name="modifiedUsername"
                            value={this.state.modifiedUsername}
                            onChange={this.updateFormField} />
                    </div>
                    <div className="edit-florists-div">
                        <label className="form-label edit-florists-label">Login Email:</label>
                        <input type="text"
                            className="form-control"
                            name="modifiedLoginEmail"
                            value={this.state.modifiedLoginEmail}
                            onChange={this.updateFormField} />
                    </div>
                </div>

                <div>
                    <h3>More About You (Profile to Public)</h3>
                    <div className="edit-florists-div">
                        <label className="form-label edit-florists-label">Name of Florist:</label>
                        <input type="text"
                            className="form-control"
                            name="modifiedFloristName"
                            value={this.state.modifiedFloristName}
                            onChange={this.updateFormField} />
                    </div>
                    <div className="edit-florists-div">
                        <div><label className="form-label edit-florists-label">Ways you want to be contacted thru: </label></div>
                        <div className="form-check-inline">
                            <input className="form-check-input"
                                type="checkbox"
                                value="whatsapp"
                                name="modifiedContactCategory"
                                checked={this.state.modifiedContactCategory.includes('whatsapp')}
                                onChange={this.updateCategoryCheckboxes}
                                onClick={this.checkContactMethod} />
                            <label className="form-check-label" for="category-whatsapp">
                                Whatsapp
                            </label>
                        </div>

                        <div className="form-check-inline">
                            <input className="form-check-input"
                                type="checkbox"
                                value="facebook"
                                name="modifiedContactCategory"
                                checked={this.state.modifiedContactCategory.includes('facebook')}
                                onChange={this.updateCategoryCheckboxes}
                                onClick={this.checkContactMethod} />
                            <label className="form-check-label" for="category-facebook">
                                Facebook
                            </label>
                        </div>

                        <div className="form-check-inline">
                            <input className="form-check-input"
                                type="checkbox"
                                value="instagram"
                                name="modifiedContactCategory"
                                checked={this.state.modifiedContactCategory.includes('instagram')}
                                onChange={this.updateCategoryCheckboxes} />
                            <label className="form-check-label" for="category-instagram">
                                Instagram
                            </label>
                        </div>
                    </div>

                    <div className="edit-florists-div">
                        <label className="form-label edit-florists-label">Contact Number (Please fill this field if you have ticked 'Whatsapp' above):</label>
                        <input disabled={!this.state.modifiedContactCategory.includes('whatsapp')}
                            type="text"
                            className="form-control"
                            name="modifiedContactNumber"
                            value={this.state.modifiedContactNumber}
                            onChange={this.updateFormField} />
                    </div>
                    <div className="edit-florists-div">
                        <label className="form-label edit-florists-label">Instagram URL (Please fill this field if you have ticked 'Instagram' above):</label>
                        <input disabled={!this.state.modifiedContactCategory.includes('instagram')}
                            type="text"
                            className="form-control"
                            name="modifiedInstagramURL"
                            value={this.state.modifiedInstagramURL}
                            onChange={this.updateFormField} />
                    </div>
                    <div className="edit-florists-div">
                        <label className="form-label edit-florists-label">Facebook URL (Please fill this field if you have ticked 'Facebook' above):</label>
                        <input disabled={!this.state.modifiedContactCategory.includes('facebook')}
                            type="text"
                            className="form-control"
                            name="modifiedFacebookURL"
                            value={this.state.modifiedFacebookURL}
                            onChange={this.updateFormField} />
                    </div>
                </div>

                <button className="btn btn-primary mb-3"
                    onClick={() => this.confirmEditFlorist()}>Confirm Edit Profile</button>
            </div>
        </React.Fragment>
    }
}