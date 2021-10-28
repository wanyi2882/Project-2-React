import React from 'react'
import axios from 'axios'
import '../components-css/AddListing.css'
import previewImage from '../components-css/preview-image.jpeg'
import brokenImage from '../components-css/broken-image.jpeg'

//Create form for Florists to add in new listings

export default class Admin extends React.Component {

    url = 'https://ywy-project2-fmp-express-app.herokuapp.com'


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
        'newListingImagePreview': previewImage,
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

    onSubmitForm = () => {
        if (!this.state.newListingName.length < 1 &&
            !this.state.newListingDescription.length < 1 &&
            !this.state.newListingCategory.length < 1 &&
            !parseFloat(this.state.newListingPrice) <= 0 &&
            !parseInt(this.state.newListingQuantity) <= 0 &&
            !this.state.newListingOccasion < 1 &&
            (this.state.newListingImage.endsWith(".jpg") ||
                this.state.newListingImage.endsWith(".png") ||
                this.state.newListingImage.endsWith(".jpeg"))
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
        } else {
            // clone the array
            let cloned = [...arrayToModify, event.target.value];
            this.setState({
                [event.target.name]: cloned
            })
        }
    }

    updateFormFieldImage = (event) => {
        this.setState({
            newListingImage: event.target.value,
            newListingImagePreview: event.target.value
        })
    }

    render() {
        return <React.Fragment>
            <h1>Add a new listing</h1>
            <div>
                <label className="form-label">Name of listing:</label>
                <input type="text"
                    className="form-control"
                    name="newListingName"
                    required
                    value={this.state.newListingName}
                    onChange={this.updateFormField} />
                <div>{this.state.newListingName.length < 1 &&
                    <span className='error'>{this.state.error.newListingName}</span>}
                </div>
            </div>
            <div>
                <label className="form-label">Short Description: </label>
                <textarea className="form-control"
                    name="newListingDescription"
                    value={this.state.newListingDescription}
                    onChange={this.updateFormField} />
                <div>{this.state.newListingDescription.length < 1 &&
                    <span className='error'>{this.state.error.newListingDescription}</span>}
                </div>
            </div>
            <div>
                <div><label className="form-label">Flower Categories: </label></div>
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
            </div>
            <div>{this.state.newListingCategory.length < 1 &&
                <span className='error'>{this.state.error.newListingCategory}</span>}
            </div>

            <div>
                <div><label className="form-label">Occasion:</label></div>
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
            </div>
            <div>{this.state.newListingOccasion.length < 1 &&
                <span className='error'>{this.state.error.newListingOccasion}</span>}
            </div>

            <div>
                <label className="form-label">Price (SGD): </label>
                <input type="number"
                    name="newListingPrice"
                    value={this.state.newListingPrice}
                    onChange={this.updateFormField} />
                <div>{(parseFloat(this.state.newListingPrice) <= 0 ||
                    !parseFloat(this.state.newListingPrice)) &&
                    <span className='error'>{this.state.error.newListingPrice}</span>}
                </div>
            </div>

            <div>
                <label className="form-label">Quantity Available: </label>
                <input type="number"
                    name="newListingQuantity"
                    value={this.state.newListingQuantity}
                    onChange={this.updateFormField} />
                <div>{(parseInt(this.state.newListingQuantity) <= 0 ||
                    !parseInt(this.state.newListingQuantity)) &&
                    <span className='error'>{this.state.error.newListingQuantity}</span>}
                </div>
            </div>

            <div>
                <label className="form-label">URL of bouquet image:</label>
                <input type="text"
                    className="form-control"
                    name="newListingImage"
                    value={this.state.newListingImage}
                    onChange={this.updateFormFieldImage} />
                <div>{(!this.state.newListingImage.endsWith(".jpg") &&
                    !this.state.newListingImage.endsWith(".png") &&
                    !this.state.newListingImage.endsWith(".jpeg")) &&
                    <span className='error'>{this.state.error.newListingImage}</span>}
                </div>
                <div>
                    <div>Preview Image: </div>

                    <div></div>
                    <img src={this.state.newListingImagePreview} width="300" alt="Preview Image" 
                    onError={(event) => event.target.src = brokenImage}/>
                </div>
            </div>

            <button className="btn btn-primary"
                type="submit"
                onClick={() => this.onSubmitForm()}>Post your listing</button>

        </React.Fragment>
    }
}