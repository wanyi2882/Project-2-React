import React from 'react'
import axios from 'axios'
import '../components-css/AddListing.css'
import previewImage from '../components-css/preview-image.jpeg'
import brokenImage from '../components-css/broken-image.jpeg'

//Create form for Florists to add in new listings

export default class Admin extends React.Component {

    // Deployment URL
    url = 'https://ywy-project2-fmp-express-app.herokuapp.com'

    // Testing URL
    //url = 'https://3000-tan-nightingale-xhc8uhmi.ws-us18.gitpod.io'


    sendData = async () => {
        await axios.post(this.url + "/listings",
            {
                "name": this.state.newListingName,
                "description": this.state.newListingDescription,
                "flower_type": this.state.newListingCategory,
                "price": parseFloat(this.state.newListingPrice),
                "occasion": this.state.newListingOccasion,
                "quantity": parseInt(this.state.newListingQuantity),
                "image": this.state.newListingImage,
                "florist_id": this.state.florist_id,
                "florist_name": this.state.florist_name,
                "number": this.state.number,
                "instagram": this.state.instagram,
                "facebook": this.state.facebook,
                "contact_method": this.state.contact_method
            })
    }

    state = {
        'newListingName': "",
        'newListingDescription': "",
        'newListingCategory': [],
        'newListingPrice': 0,
        'newListingQuantity': 0,
        'newListingOccasion': [],
        'newListingImage': "",
        'florist_id': this.props.florist_id,
        'florist_name': this.props.florist_name,
        'number': this.props.number,
        'instagram': this.props.instagram,
        'facebook': this.props.facebook,
        'contact_method': this.props.contact_method,
        'error': {
            'newListingName': "Please enter a name for your listing.",
            'newListingDescription': "Please provide a short description for your listing.",
            'newListingCategory': "Please pick at list one flower type.",
            'newListingPrice': "Price of listing should be more than 0.",
            'newListingQuantity': "Quantity should be more than 0.",
            'newListingOccasion': "Please pick at list one occasion.",
            'newListingImage': "Please choose image in jpeg/jpg/png format."
        }
    }

    // On submit form button and all criterias fulfilled, submit form to server
    onSubmitForm = () => {
        if (!this.state.newListingName.length < 1 &&
            !this.state.newListingDescription.length < 1 &&
            !this.state.newListingCategory.length < 1 &&
            !parseFloat(this.state.newListingPrice) <= 0 &&
            !parseInt(this.state.newListingQuantity) <= 0 &&
            !this.state.newListingOccasion.length < 1 &&
            (this.state.newListingImage.endsWith(".jpg") ||
                this.state.newListingImage.endsWith(".png") ||
                this.state.newListingImage.endsWith(".jpeg")) &&
            !this.state.florist_id == "" &&
            !this.state.florist_name.length < 1 &&
            !this.state.contact_method.length < 1 &&
            (this.state.contact_method.includes("whatsapp") ? this.state.number.length == 8 : true) &&
            (this.state.contact_method.includes("instagram") ? this.state.instagram.includes("instagram.com") : true) &&
            (this.state.contact_method.includes("facebook") ? this.state.facebook.includes("facebook.com") : true) &&
            (this.state.number ? this.state.contact_method.includes("whatsapp") : true) &&
            (this.state.instagram ? this.state.contact_method.includes("instagram") : true) &&
            (this.state.facebook ? this.state.contact_method.includes("facebook") : true)
        ) {
            this.sendData().then(
                alert("Successful submission")
            )
            this.props.onAfterAddListing()
        }
        else {
            alert("Please check through all the fields.")
        }
    }

    // Update Form Fields
    updateFormField = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // Update checkboxes form fields
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

    render() {
        return <React.Fragment>
            <div className="container">
                <h1>Add a new listing</h1>
                <div className="eachFormField">
                    <label className="form-label add-listing-labels">Name of listing:</label>
                    <input type="text"
                        className="form-control"
                        name="newListingName"
                        required
                        value={this.state.newListingName}
                        onChange={this.updateFormField}/>

                    {/* error message */}
                    {this.state.newListingName.length < 1 ?
                        <span className='error'>{this.state.error.newListingName}</span>
                        : null}
                </div>
                <div className="eachFormField">
                    <label className="form-label add-listing-labels">Short Description: </label>
                    <textarea className="form-control"
                        name="newListingDescription"
                        value={this.state.newListingDescription}
                        onChange={this.updateFormField} />

                    {/* error message */}
                    {this.state.newListingDescription.length < 1 ?
                        <span className='error'>{this.state.error.newListingDescription}</span>
                        : null}
                </div>
                <div className="eachFormField">
                    <div><label className="form-label add-listing-labels">Flower Categories: </label></div>
                    <div className="form-check-inline">
                        <input className="form-check-input"
                            type="checkbox"
                            value="roses"
                            name="newListingCategory"
                            checked={this.state.newListingCategory.includes('roses')}
                            onChange={this.updateCategoryCheckboxes} />
                        <label className="form-check-label" for="category-roses">
                            Roses
                        </label>
                    </div>
                    <div className="form-check-inline">
                        <input className="form-check-input"
                            type="checkbox"
                            value="sunflower"
                            name="newListingCategory"
                            checked={this.state.newListingCategory.includes('sunflower')}
                            onChange={this.updateCategoryCheckboxes} />
                        <label className="form-check-label" for="category-sunflower">
                            Sunflower
                        </label>
                    </div>
                    <div className="form-check-inline">
                        <input className="form-check-input"
                            type="checkbox"
                            value="gerbera"
                            name="newListingCategory"
                            checked={this.state.newListingCategory.includes('gerbera')}
                            onChange={this.updateCategoryCheckboxes} />
                        <label className="form-check-label" for="category-gerbera">
                            Gerbera
                        </label>
                    </div>
                    <div className="form-check-inline">
                        <input className="form-check-input"
                            type="checkbox"
                            value="baby breath"
                            name="newListingCategory"
                            checked={this.state.newListingCategory.includes('baby breath')}
                            onChange={this.updateCategoryCheckboxes} />
                        <label className="form-check-label" for="category-baby breath">
                            Baby Breath
                        </label>
                    </div>
                    <div className="form-check-inline">
                        <input className="form-check-input"
                            type="checkbox"
                            value="tulips"
                            name="newListingCategory"
                            checked={this.state.newListingCategory.includes('tulips')}
                            onChange={this.updateCategoryCheckboxes} />
                        <label className="form-check-label" for="category-tulips">
                            Tulips
                        </label>
                    </div>
                    <div className="form-check-inline">
                        <input className="form-check-input"
                            type="checkbox"
                            value="hydrangea"
                            name="newListingCategory"
                            checked={this.state.newListingCategory.includes('hydrangea')}
                            onChange={this.updateCategoryCheckboxes} />
                        <label className="form-check-label" for="category-hydrangea">
                            Hydrangea
                        </label>
                    </div>

                    {/* error message */}
                    {this.state.newListingCategory.length < 1 ?
                        <div>
                            <span className='error'>{this.state.error.newListingCategory}</span>
                        </div>
                        : null}
                </div>

                <div className="eachFormField">
                    <div><label className="form-label add-listing-labels">Occasion:</label></div>
                    <div className="form-check-inline">
                        <input className="form-check-input"
                            type="checkbox"
                            value="anniversary"
                            name="newListingOccasion"
                            onChange={this.updateCategoryCheckboxes}
                            checked={this.state.newListingOccasion.includes('anniversary')} />
                        <label className="form-check-label" htmlFor="occasion-anniversary">
                            Anniversary
                        </label>
                    </div>
                    <div className="form-check-inline">
                        <input className="form-check-input"
                            type="checkbox"
                            value="birthday"
                            name="newListingOccasion"
                            onChange={this.updateCategoryCheckboxes}
                            checked={this.state.newListingOccasion.includes('birthday')} />
                        <label className="form-check-label" htmlFor="occasion-birthday">
                            Birthday
                        </label>
                    </div>
                    <div className="form-check-inline">
                        <input className="form-check-input"
                            type="checkbox"
                            value="date"
                            name="newListingOccasion"
                            onChange={this.updateCategoryCheckboxes}
                            checked={this.state.newListingOccasion.includes('date')} />
                        <label className="form-check-label" htmlFor="occasion-date">
                            Date
                        </label>
                    </div>
                    <div className="form-check-inline">
                        <input className="form-check-input"
                            type="checkbox"
                            value="graduation"
                            name="newListingOccasion"
                            onChange={this.updateCategoryCheckboxes}
                            checked={this.state.newListingOccasion.includes('graduation')} />
                        <label className="form-check-label" htmlFor="occasion-graduation">
                            Graduation
                        </label>
                    </div>
                    <div className="form-check-inline">
                        <input className="form-check-input"
                            type="checkbox"
                            value="wedding"
                            name="newListingOccasion"
                            onChange={this.updateCategoryCheckboxes}
                            checked={this.state.newListingOccasion.includes('wedding')} />
                        <label className="form-check-label" htmlFor="occasion-wedding">
                            Wedding
                        </label>
                    </div>

                    {/* error message */}
                    {this.state.newListingOccasion.length < 1 ?
                        <div>
                            <span className='error'>{this.state.error.newListingOccasion}</span>
                        </div>
                        : null}
                </div>

                <div className="eachFormField">
                    <label className="form-label add-listing-labels">Price (SGD): </label>
                    <input type="number"
                        name="newListingPrice"
                        value={this.state.newListingPrice}
                        onChange={this.updateFormField} />

                    {/* error message */}
                    {(parseFloat(this.state.newListingPrice) <= 0 ||
                        !parseFloat(this.state.newListingPrice)) ?
                        <div>
                            <span className='error'>{this.state.error.newListingPrice}</span>
                        </div>
                        : null}
                </div>

                <div className="eachFormField">
                    <label className="form-label add-listing-labels">Quantity Available: </label>
                    <input type="number"
                        name="newListingQuantity"
                        value={this.state.newListingQuantity}
                        onChange={this.updateFormField} />

                    {/* error message */}
                    {(parseInt(this.state.newListingQuantity) <= 0 ||
                        !parseInt(this.state.newListingQuantity)) ?
                        <div>
                            <span className='error'>{this.state.error.newListingQuantity}</span>
                        </div>
                        : null}
                </div>

                <div className="eachFormField">
                    <label className="form-label add-listing-labels">URL of bouquet image:</label>
                    <input type="text"
                        className="form-control"
                        name="newListingImage"
                        value={this.state.newListingImage}
                        onChange={this.updateFormField} />

                    {/* error message */}
                    {(!this.state.newListingImage.endsWith(".jpg") &&
                        !this.state.newListingImage.endsWith(".png") &&
                        !this.state.newListingImage.endsWith(".jpeg")) ?
                        <div>
                            <span className='error'>{this.state.error.newListingImage}</span>
                        </div>
                        : null}
                </div>
                <div className="eachFormField">
                    <div className="add-listing-labels">Preview Image: </div>

                    <img src={this.state.newListingImage == "" ? previewImage : this.state.newListingImage}
                        className="addPreviewImage"
                        alt="Preview Image"
                        onError={(event) => event.target.src = brokenImage} />
                </div>

                <button className="btn btn-primary mb-3"
                    type="submit"
                    onClick={() => this.onSubmitForm()}>Post your listing</button>
            </div>

        </React.Fragment>
    }
}