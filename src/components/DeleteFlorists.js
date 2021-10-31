import React from "react";
import axios from "axios";

export default class DeleteFlorists extends React.Component {

    // Deployment URL
    url = 'https://ywy-project2-fmp-express-app.herokuapp.com'

    // Testing URL
    //url = 'https://3000-tan-nightingale-xhc8uhmi.ws-us18.gitpod.io'

    state = {
        'floristIdToDelete': this.props.florist_id,
        'floristEmailToDelete': this.props.florist_email,
        'floristConfirmEmail': "",
        'data': [

        ]
    }

    fetchData = async () => {
        let response = await axios.get(this.url + "/listings")

        // Sort by descending date (Default)                                         
        let array = response.data

        let filteredArray = array.filter(each => each.florist.florist_id == this.state.floristIdToDelete);

        this.setState({
            'data': filteredArray
        })
    }

    componentDidMount() {
        this.fetchData()
    }

    updateFormField = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    deleteProfile = async () => {
        if (this.state.floristEmailToDelete == this.state.floristConfirmEmail) {
            // Delete listings under the florists first
            this.state.data.map(each => axios.delete(this.url + "/listings/" + each._id,
                {
                    data:
                    {
                        "login_email": this.state.floristConfirmEmail,
                        "florist_id": this.state.floristIdToDelete
                    }
                })
            )

            // Delete florist profile
            await axios.delete(this.url + "/florists/" + this.state.floristIdToDelete)

            alert("Profile successfully deleted.")

            this.props.afterDeleteProfile()
        } else {
            alert("The email address you have entered does not match.")
        }
    }


    render() {
        return <React.Fragment>
            <div className="container">
                <div>Please confirm if you want to delete your profile by enter your email below.</div>
                <div>Please note that all your listings under your profile will be deleted.</div>

                <div>
                    <label className="form-label mt-3">Email Address: </label>
                    <input type="text"
                        className="form-control"
                        name="floristConfirmEmail"
                        value={this.state.floristConfirmEmail}
                        onChange={this.updateFormField} />
                </div>
                <div><button className="btn btn-danger mt-3"
                    onClick={() => this.deleteProfile()}>Confirm Delete Profile</button></div>
            </div>
        </React.Fragment>
    }
}