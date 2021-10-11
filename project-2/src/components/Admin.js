import React from 'react'

//Create form for Florists to add in new listings

export default class Admin extends React.Component{
    state = {
        'newListingName': "",
        'newListingDescription': "",
        'newListingCategory': []

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
            <h1>Add a new listing</h1>
            <div>
                <label className="form-label">Name of listing:</label>
                <input type="text"
                       className="form-control"
                       name="newListingName" 
                       value={this.state.newListingName} 
                       onChange={this.updateFormField}/>
            </div>
            <div>
                <label className="form-label">Short Description: </label>
                <textarea className="form-control"
                       name="newListingDescription" 
                       value={this.state.newListingDescription} 
                       onChange={this.updateFormField}/>
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
                           value="babyBreath" 
                           name="newListingCategory"
                           checked={this.state.newListingCategory.includes('babyBreath')} 
                           onChange={this.updateCategoryCheckboxes} />
                    <label className="form-check-label" for="category-babyBreath">
                        Baby Breath
                    </label>
                </div>
            </div>
        </React.Fragment>
    }
}