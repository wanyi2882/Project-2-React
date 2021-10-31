import React from "react";
import axios from "axios";
import "../components-css/EditListing.css"
import previewImage from '../components-css/preview-image.jpeg'
import brokenImage from '../components-css/broken-image.jpeg'

export default class EditListing extends React.Component {

    // Deployment URL
    url = 'https://ywy-project2-fmp-express-app.herokuapp.com'

    // Testing URL
    //url = 'https://3000-tan-nightingale-xhc8uhmi.ws-us18.gitpod.io'

    sendData = async () => {
        await axios.put(this.url + "/listings/" + this.state.listingIdToBeEdited,
            {
                "name": this.state.listingNameToBeEdited,
                "description": this.state.listingDescriptionToBeEdited,
                "flower_type": this.state.listingFlowerTypeToBeEdited,
                "price": parseFloat(this.state.listingPriceToBeEdited),
                "occasion": this.state.listingOccasionToBeEdited,
                "quantity": parseInt(this.state.listingQuantityToBeEdited),
                "image": this.state.listingImageToBeEdited,
                "florist_id": this.state.listingToBeEdited.florist.florist_id,
                "florist_name": this.state.listingToBeEdited.florist.florist_name,
                "contact_method": this.state.listingToBeEdited.florist.contact_method,
                "number": this.state.listingToBeEdited.florist.contact.number,
                "instagram": this.state.listingToBeEdited.florist.contact.instagram,
                "facebook": this.state.listingToBeEdited.florist.contact.facebook
            })

            this.setState({
                'listingToBeEdited': "",
                'listingIdToBeEdited': "",
                'listingNameToBeEdited': "",
                'listingDescriptionToBeEdited': "",
                'listingFlowerTypeToBeEdited': "",
                'listingPriceToBeEdited': "",
                'listingOccasionToBeEdited': "",
                'listingQuantityToBeEdited': "",
                'listingImageToBeEdited': ""
            })
    }

    state = {
        'listingToBeEdited': this.props.listingToBeEdited,
        'listingIdToBeEdited': this.props.listingIdToBeEdited,
        'listingNameToBeEdited': this.props.listingNameToBeEdited,
        'listingDescriptionToBeEdited': this.props.listingDescriptionToBeEdited,
        'listingFlowerTypeToBeEdited': this.props.listingFlowerTypeToBeEdited,
        'listingPriceToBeEdited': this.props.listingPriceToBeEdited,
        'listingOccasionToBeEdited': this.props.listingOccasionToBeEdited,
        'listingQuantityToBeEdited': this.props.listingQuantityToBeEdited,
        'listingImageToBeEdited': this.props.listingImageToBeEdited,
        'error': {
            'listingNameToBeEdited': "Please enter a name for your listing.",
            'listingDescriptionToBeEdited': "Please provide a short description for your listing.",
            'listingFlowerTypeToBeEdited': "Please pick at list one flower type.",
            'listingPriceToBeEdited': "Price of listing should be more than 0.",
            'listingQuantityToBeEdited': "Quantity should be more than 0.",
            'listingOccasionToBeEdited': "Please pick at list one occasion.",
            'listingImageToBeEdited': "Please choose image in jpeg/jpg/png format."
        }
    }

    // Hide Editing Modal Box and display all listings under the Florist
    hideModalBox = () => {
        this.props.displayViewAllListings()
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
        } else {
            // clone the array
            let cloned = [...arrayToModify, event.target.value];
            this.setState({
                [event.target.name]: cloned
            })
        }
    }

    // Confirm Edit Button
    // If edits meet criteria then it will be submitted to server 
    // and go back to florists listing page
    // else it will alert the florists to check through all the fields again
    // If try to edit florist details inside inspect components will also cause errors
    confirmEditBtn = () => {

        if (!this.state.listingNameToBeEdited.length < 1 &&
            !this.state.listingDescriptionToBeEdited.length < 1 &&
            !this.state.listingFlowerTypeToBeEdited.length < 1 &&
            !parseFloat(this.state.listingPriceToBeEdited) <= 0 &&
            parseFloat(this.state.listingPriceToBeEdited) &&
            !parseInt(this.state.listingQuantityToBeEdited) <= 0 &&
            parseInt(this.state.listingQuantityToBeEdited) &&
            !this.state.listingOccasionToBeEdited < 1 &&
            (this.state.listingImageToBeEdited.endsWith(".jpg") ||
                this.state.listingImageToBeEdited.endsWith(".png") ||
                this.state.listingImageToBeEdited.endsWith(".jpeg")) &&
                !this.state.listingToBeEdited.florist.florist_id == "" &&
                !this.state.listingToBeEdited.florist.florist_name.length < 1 &&
                !this.state.listingToBeEdited.florist.contact_method.length < 1 &&
                (this.state.listingToBeEdited.florist.contact_method.includes("whatsapp") ? 
                    this.state.listingToBeEdited.florist.contact.number.length == 8 : true) &&
                (this.state.listingToBeEdited.florist.contact_method.includes("instagram") ? 
                    this.state.listingToBeEdited.florist.contact.instagram.includes("instagram.com"): true) &&
                (this.state.listingToBeEdited.florist.contact_method.includes("facebook") ? 
                    this.state.listingToBeEdited.florist.contact.facebook.includes("facebook.com"): true) &&
                (this.state.listingToBeEdited.florist.contact.number ? 
                    this.state.listingToBeEdited.florist.contact_method.includes("whatsapp"): true) &&
                (this.state.listingToBeEdited.florist.contact.instagram ? 
                    this.state.listingToBeEdited.florist.contact_method.includes("instagram"): true) &&
                (this.state.listingToBeEdited.florist.contact.facebook ? 
                    this.state.listingToBeEdited.florist.contact_method.includes("facebook"): true) 
        ) {
            this.sendData()
            alert("Editting Successful.")

            this.props.displayViewAllListings()
        }
        else {
            alert("Please check through all the fields.")
        }
    }

    // Render Editing Modal Box
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
                            <h4 className="modal-title">Edit listing</h4>
                            <button type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={this.hideModalBox}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <div>
                                <label className="form-label">Name of listing:</label>
                                <input type="text"
                                    className="form-control"
                                    name="listingNameToBeEdited"
                                    required
                                    value={this.state.listingNameToBeEdited}
                                    onChange={this.updateFormField} />
                                <div>{this.state.listingNameToBeEdited.length < 1 &&
                                    <span className='error'>{this.state.error.listingNameToBeEdited}</span>}
                                </div>
                            </div>
                            <div>
                                <label className="form-label">Short Description: </label>
                                <textarea className="form-control"
                                    name="listingDescriptionToBeEdited"
                                    value={this.state.listingDescriptionToBeEdited}
                                    onChange={this.updateFormField} />
                                <div>{this.state.listingDescriptionToBeEdited.length < 1 &&
                                    <span className='error'>{this.state.error.listingDescriptionToBeEdited}</span>}
                                </div>
                            </div>
                            <div>
                                <div><label className="form-label">Flower Categories: </label></div>
                                <div className="form-check-inline">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        value="roses"
                                        name="listingFlowerTypeToBeEdited"
                                        checked={this.state.listingFlowerTypeToBeEdited.includes('roses')}
                                        onChange={this.updateCategoryCheckboxes} />
                                    <label className="form-check-label" for="category-roses">
                                        Roses
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        value="sunflower"
                                        name="listingFlowerTypeToBeEdited"
                                        checked={this.state.listingFlowerTypeToBeEdited.includes('sunflower')}
                                        onChange={this.updateCategoryCheckboxes} />
                                    <label className="form-check-label" for="category-sunflower">
                                        Sunflower
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        value="gerbera"
                                        name="listingFlowerTypeToBeEdited"
                                        checked={this.state.listingFlowerTypeToBeEdited.includes('gerbera')}
                                        onChange={this.updateCategoryCheckboxes} />
                                    <label className="form-check-label" for="category-gerbera">
                                        Gerbera
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        value="baby breath"
                                        name="listingFlowerTypeToBeEdited"
                                        checked={this.state.listingFlowerTypeToBeEdited.includes('baby breath')}
                                        onChange={this.updateCategoryCheckboxes} />
                                    <label className="form-check-label" for="category-baby breath">
                                        Baby Breath
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        value="tulips"
                                        name="listingFlowerTypeToBeEdited"
                                        checked={this.state.listingFlowerTypeToBeEdited.includes('tulips')}
                                        onChange={this.updateCategoryCheckboxes} />
                                    <label className="form-check-label" for="category-tulips">
                                        Tulips
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        value="hydrangea"
                                        name="listingFlowerTypeToBeEdited"
                                        checked={this.state.listingFlowerTypeToBeEdited.includes('hydrangea')}
                                        onChange={this.updateCategoryCheckboxes} />
                                    <label className="form-check-label" for="category-hydrangea">
                                        Hydrangea
                                    </label>
                                </div>
                            </div>
                            <div>{this.state.listingFlowerTypeToBeEdited.length < 1 &&
                                <span className='error'>{this.state.error.listingFlowerTypeToBeEdited}</span>}
                            </div>

                            <div>
                                <div><label className="form-label">Occasion:</label></div>
                                <div className="form-check-inline">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        value="anniversary"
                                        name="listingOccasionToBeEdited"
                                        onChange={this.updateCategoryCheckboxes}
                                        checked={this.state.listingOccasionToBeEdited.includes('anniversary')} />
                                    <label className="form-check-label" htmlFor="occasion-anniversary">
                                        Anniversary
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        value="birthday"
                                        name="listingOccasionToBeEdited"
                                        onChange={this.updateCategoryCheckboxes}
                                        checked={this.state.listingOccasionToBeEdited.includes('birthday')} />
                                    <label className="form-check-label" htmlFor="occasion-birthday">
                                        Birthday
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        value="date"
                                        name="listingOccasionToBeEdited"
                                        onChange={this.updateCategoryCheckboxes}
                                        checked={this.state.listingOccasionToBeEdited.includes('date')} />
                                    <label className="form-check-label" htmlFor="occasion-date">
                                        Date
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        value="graduation"
                                        name="listingOccasionToBeEdited"
                                        onChange={this.updateCategoryCheckboxes}
                                        checked={this.state.listingOccasionToBeEdited.includes('graduation')} />
                                    <label className="form-check-label" htmlFor="occasion-graduation">
                                        Graduation
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        value="wedding"
                                        name="listingOccasionToBeEdited"
                                        onChange={this.updateCategoryCheckboxes}
                                        checked={this.state.listingOccasionToBeEdited.includes('wedding')} />
                                    <label className="form-check-label" htmlFor="occasion-wedding">
                                        Wedding
                                    </label>
                                </div>
                            </div>
                            <div>{this.state.listingOccasionToBeEdited.length < 1 &&
                                <span className='error'>{this.state.error.listingOccasionToBeEdited}</span>}
                            </div>

                            <div>
                                <label className="form-label">Price (SGD): </label>
                                <input type="number"
                                    name="listingPriceToBeEdited"
                                    value={this.state.listingPriceToBeEdited}
                                    onChange={this.updateFormField} />
                                <div>{(parseFloat(this.state.listingPriceToBeEdited) <= 0 ||
                                    !parseFloat(this.state.listingPriceToBeEdited)) &&
                                    <span className='error'>{this.state.error.listingPriceToBeEdited}</span>}
                                </div>
                            </div>
                            <div>
                                <label className="form-label">Quantity Available: </label>
                                <input type="number"
                                    name="listingQuantityToBeEdited"
                                    value={this.state.listingQuantityToBeEdited}
                                    onChange={this.updateFormField} />
                                <div>{(parseInt(this.state.listingQuantityToBeEdited) <= 0 ||
                                    !parseInt(this.state.listingQuantityToBeEdited)) &&
                                    <span className='error'>{this.state.error.listingQuantityToBeEdited}</span>}
                                </div>
                            </div>
                            <div>
                                <label className="form-label">URL of bouquet image:</label>
                                <input type="text"
                                    className="form-control"
                                    name="listingImageToBeEdited"
                                    value={this.state.listingImageToBeEdited}
                                    onChange={this.updateFormField} />
                                <div>{(!this.state.listingImageToBeEdited.endsWith(".jpg") &&
                                    !this.state.listingImageToBeEdited.endsWith(".png") &&
                                    !this.state.listingImageToBeEdited.endsWith(".jpeg")) &&
                                    <span className='error'>{this.state.error.listingImageToBeEdited}</span>}
                                </div>
                                <div>
                                    <div>Preview Image: </div>

                                    <div></div>
                                    <img src={this.state.listingImageToBeEdited == "" ? previewImage : this.state.listingImageToBeEdited} 
                                    className="editPreviewImage" 
                                    alt="Preview Image"
                                    onError={(event) => event.target.src = brokenImage} />
                                </div>
                            </div>

                        </div>
                        <div>

                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                className="btn btn-primary"
                                onClick={() => this.confirmEditBtn()}>Confirm Edit</button>
                            <button type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={this.hideModalBox}>Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    }
}