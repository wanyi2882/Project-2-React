import React from 'react'
import axios from 'axios'

export default class AddFlorists extends React.Component {

    url = 'https://ywy-project2-fmp-express-app.herokuapp.com'

    state = {
        'newUserName': "",
        'newLoginEmail': "",
        'newFloristName': "",
        'newContactCategory': [],
        'newInstagramURL': "",
        'newFacebookURL': "",
        'newContactNumber': ""
    }

    sendData = async () => {
        await axios.post(this.url + "/florists",
            {
                "username": this.state.newUserName,
                "login_email": this.state.newLoginEmail,
                "name": this.state.newFloristName,
                "contact_method": this.state.newContactCategory,
                "number": this.state.newContactNumber,
                "instagram": this.state.newInstagramURL,
                "facebook": this.state.newFacebookURL
            })
    }


    updateFormField = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

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
                    'newContactNumber': ""
                })
            }
            if (!cloned.includes("instagram")) {
                this.setState({
                    'newInstagramURL': ""
                })
            }
            if (!cloned.includes("facebook")) {
                this.setState({
                    'newFacebookURL': ""
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
                    'newContactNumber': ""
                })
            }
            if (!cloned.includes("instagram")) {
                this.setState({
                    'newInstagramURL': ""
                })
            }
            if (!cloned.includes("facebook")) {
                this.setState({
                    'newFacebookURL': ""
                })
            }
        }
    }

    createAccount = () => {
        let error = ""
        if (this.state.newUserName.length < 8) {
            error = error + "Please enter a username with at least 8 characters." + "\n"
        }

        if (!this.state.newLoginEmail.includes("@") || !this.state.newLoginEmail.includes(".")) {
            error = error + "Please enter a valid email address." + "\n"
        }

        if (this.state.newFloristName.length < 1) {
            error = error + "Please enter a Florist name." + "\n"
        }

        if (this.state.newContactCategory.length < 1) {
            error = error + "Please choose at least one way for buyers to contact you." + "\n"
        }

        if (this.state.newContactCategory.includes("whatsapp")) {
            if (this.state.newContactNumber.length < 8) {
                error = error + "Please enter contact number more than 8 digits" + "\n"
            }
        }

        if (this.state.newContactCategory.includes("instagram")) {
            if (!this.state.newInstagramURL.includes("instagram.com")) {
                error = error + "Please enter a valid Instagram URL" + "\n"
            }
        }

        if (this.state.newContactCategory.includes("facebook")) {
            if (!this.state.newFacebookURL.includes("facebook.com")) {
                error = error + "Please enter a valid FaceBook URL"
            }
        }

        if (error == "") {
            this.sendData()
            alert("Account Succesfully Created!")

            this.props.onAfterAddFlorist()

        } else {
            alert(error)
        }

    }

    cancelAccount = () => {
        this.props.onAfterAddFlorist()
    }

    render() {
        return <React.Fragment>
            <h1>Create Account</h1>

            <div>
                <h3>Login Information</h3>
                <div>
                    <label className="form-label">User Name:</label>
                    <input type="text"
                        className="form-control"
                        name="newUserName"
                        value={this.state.newUserName}
                        onChange={this.updateFormField} />
                </div>
                <div>
                    <label className="form-label">Login Email:</label>
                    <input type="text"
                        className="form-control"
                        name="newLoginEmail"
                        value={this.state.newLoginEmail}
                        onChange={this.updateFormField} />
                </div>
            </div>

            <div>
                <h3>More About You (Profile to Public)</h3>
                <div>
                    <label className="form-label">Name of Florist:</label>
                    <input type="text"
                        className="form-control"
                        name="newFloristName"
                        value={this.state.newFloristName}
                        onChange={this.updateFormField} />
                </div>
                <div>
                    <div><label className="form-label">Ways you want to be contacted thru: </label></div>
                    <div className="form-check-inline">
                        <input className="form-check-input"
                            type="checkbox"
                            value="whatsapp"
                            name="newContactCategory"
                            checked={this.state.newContactCategory.includes('whatsapp')}
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
                            name="newContactCategory"
                            checked={this.state.newContactCategory.includes('facebook')}
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
                            name="newContactCategory"
                            checked={this.state.newContactCategory.includes('instagram')}
                            onChange={this.updateCategoryCheckboxes} />
                        <label className="form-check-label" for="category-instagram">
                            Instagram
                        </label>
                    </div>
                </div>

                <div>
                    <label className="form-label">Contact Number (Please fill this field if you have ticked 'Whatsapp' above):</label>
                    <input disabled={!this.state.newContactCategory.includes('whatsapp')}
                        type="text"
                        className="form-control"
                        name="newContactNumber"
                        value={this.state.newContactNumber}
                        onChange={this.updateFormField} />
                </div>
                <div>
                    <label className="form-label">Instagram URL (Please fill this field if you have ticked 'Instagram' above):</label>
                    <input disabled={!this.state.newContactCategory.includes('instagram')}
                        type="text"
                        className="form-control"
                        name="newInstagramURL"
                        value={this.state.newInstagramURL}
                        onChange={this.updateFormField} />
                </div>
                <div>
                    <label className="form-label">Facebook URL (Please fill this field if you have ticked 'Facebook' above):</label>
                    <input disabled={!this.state.newContactCategory.includes('facebook')}
                        type="text"
                        className="form-control"
                        name="newFacebookURL"
                        value={this.state.newFacebookURL}
                        onChange={this.updateFormField} />
                </div>
            </div>

            <button className="btn btn-primary"
                onClick={() => this.createAccount()}>Create New Account</button>

            <button className="btn btn-danger"
                onClick={() => this.cancelAccount()}>Cancel</button>
        </React.Fragment>
    }
}