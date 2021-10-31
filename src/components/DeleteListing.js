import React from 'react'
import axios from 'axios'

export default class DeleteListing extends React.Component {

    // Deployment URL
    url = 'https://ywy-project2-fmp-express-app.herokuapp.com'

    // Testing URL
    //url = 'https://3000-tan-nightingale-xhc8uhmi.ws-us18.gitpod.io'

    state = {
        'deleteListingConfirmEmail': "",
        'listingIdToDelete': this.props.listingIdToBeDeleted,
        'floristProfile': this.props.floristProfile
    }

    hideModalBox = () => {
        this.props.displayViewAllListings()
    }

    updateFormField = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // Confirm to delete listing
    confirmDeleteListingBtn = async () => {

        if (this.state.floristProfile[0].login_email == this.state.deleteListingConfirmEmail) {
            await axios.delete(this.url + "/listings/" + this.state.listingIdToDelete,
                {
                    data:
                    {
                        "login_email": this.state.deleteListingConfirmEmail,
                        "florist_id": this.state.floristProfile[0]._id
                    }
                })

            alert("Listing successfully deleted.")

            this.props.displayViewAllListings()


        } else {
            alert("The email address you have entered does not match.")
        }
    }


    render() {
        return <React.Fragment>
            <div className="modal"
                tabIndex="-1"
                role="dialog"
                style={{
                    display: "block",
                    backgroundColor: "rgba(0.5, 0.5, 0.5, 0.5)"
                }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Delete listing</h5>
                            <button type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={this.hideModalBox}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div>Please confirm if you want to delete this listing by entering your email below.</div>

                            <div>
                                <label className="form-label">Email Address: </label>
                                <input type="text"
                                    className="form-control"
                                    name="deleteListingConfirmEmail"
                                    value={this.state.deleteListingConfirmEmail}
                                    onChange={this.updateFormField} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                                onClick={() => { this.confirmDeleteListingBtn() }}>
                                Confirm Delete Listing
                            </button>
                            <button type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={this.hideModalBox}>Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    }
}