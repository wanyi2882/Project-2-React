import React from "react";

export default class EditListing extends React.Component {
    state = {
        'listingToBeEdited': this.props.listingToBeEdited,
        'listingIdToBeEdited': this.props.listingIdToBeEdited,
        'listingNameToBeEdited': this.props.listingNameToBeEdited,
        'listingDescriptionToBeEdited': this.props.listingDescriptionToBeEdited,
        'listingFlowerTypeToBeEdited': this.props.listingFlowerTypeToBeEdited,
        'listingPriceToBeEdited': this.props.listingPriceToBeEdited,
        'listingOccasionToBeEdited': this.props.listingOccasionToBeEdited,
        'listingQuantityToBeEdited': this.props.listingQuantityToBeEdited,
        'listingImageToBeEdited': this.props.listingImageToBeEdited
    }

    hideModalBox = () => {
        this.props.displayViewAllListings()
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
                            <h5 className="modal-title"></h5>
                            <button type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={this.hideModalBox}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <h1>Edit listing</h1>
                            <div>
                                <label className="form-label">Name of listing:</label>
                                <input type="text"
                                    className="form-control"
                                    name="listingNameToBeEdited"
                                    required
                                    value={this.state.listingNameToBeEdited}
                                    onChange={this.updateFormField} />
                            </div>
                            <div>
                                <label className="form-label">Short Description: </label>
                                <textarea className="form-control"
                                    name="listingDescriptionToBeEdited"
                                    value={this.state.listingDescriptionToBeEdited}
                                    onChange={this.updateFormField} />
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

                            <div>
                                <label className="form-label">Price (SGD): </label>
                                <input type="number"
                                    name="listingPriceToBeEdited"
                                    value={this.state.listingPriceToBeEdited}
                                    onChange={this.updateFormField} />
                            </div>
                            <div>
                                <label className="form-label">Quantity Available: </label>
                                <input type="number"
                                    name="listingQuantityToBeEdited"
                                    value={this.state.listingQuantityToBeEdited}
                                    onChange={this.updateFormField} />
                            </div>
                            <div>
                                <label className="form-label">URL of bouquet image:</label>
                                <input type="text"
                                    className="form-control"
                                    name="listingImageToBeEdited"
                                    value={this.state.listingImageToBeEdited}
                                    onChange={this.updateFormField} />
                            </div>


                        </div>
                        <div className="modal-footer">
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