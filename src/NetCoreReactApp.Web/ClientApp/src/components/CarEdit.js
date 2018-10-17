import React, { Component } from 'react';

export class CarEdit extends Component {
       
    displayName = CarEdit.name

    constructor(props) {
        super(props);
        this.state = { car: { carId: 0, year: 0, price: 0, notes: '' }, loading: true };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        fetch('api/Cars/Car/1')
            .then(response => response.json())
            .then(data => {
                this.setState({ car: data, loading: false });
            });
    }

    handleInputChange(event) {
        //console.log('Update Value: ' + event.target.value);

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        //console.log('handleSubmit');

        fetch('api/Cars/Save', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.car)
        }).then(response => response.json());

        event.preventDefault();
    }

    render() {

        return (
            <div>
                <h1>Edit Car</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-md-2">
                            <label>Year</label>
                            <input name="year" className="form-control" type="text" value={this.state.car.year} onChange={this.handleInputChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            <label>Price</label>
                            <input name="price" className="form-control" type="text" value={this.state.car.price} onChange={this.handleInputChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Notes</label>
                            <textarea name="notes" className="form-control" value={this.state.car.notes} onChange={this.handleInputChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <button className="btn btn-primary" type="submit">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}