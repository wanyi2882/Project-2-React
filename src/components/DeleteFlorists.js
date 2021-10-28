import React from "react";
import axios from "axios";

export default class DeleteFlorists extends React.Component {

    url = 'https://ywy-project2-fmp-express-app.herokuapp.com/'

    state = {
        'floristIdToDelete': this.props.florist_id,
        'floristEmailToDelete': this.props.florist_email,
        'floristConfirmEmail': ""
    }

    updateFormField = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    deleteProfile = async () => {

        if (this.state.floristEmailToDelete == this.state.floristConfirmEmail){
            await axios.delete(this.url + "/florists/" + this.state.floristIdToDelete)

            alert("Profile successfully deleted.")

            this.props.afterDeleteProfile()


        } else {
            alert("The email address you have entered does not match.")
        }

    }


    render() {
        return <React.Fragment>
            <div>Please confirm if you want to delete your profile by enter your email below.</div>
            <div>Please note that all your listings under your profile will be deleted.</div>

            <div>
                <label className="form-label">Email Address: </label>
                <input type="text"
                    className="form-control"
                    name="floristConfirmEmail"
                    value={this.state.floristConfirmEmail}
                    onChange={this.updateFormField} />
            </div>
            <div><button className="btn btn-danger"
                onClick={() => this.deleteProfile()}>Confirm Delete Profile</button></div>
        </React.Fragment>
    }
}