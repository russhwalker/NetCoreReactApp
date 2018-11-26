import React, { Component } from 'react';
import { EditButtons } from './EditButtons';

export class CarEdit extends Component {

    displayName = CarEdit.name

    constructor(props) {
        super(props);
        this.state = {
            carId: 0,
            year: 0,
            price: 0,
            notes: '',
            editing: false,
            loading: true
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        fetch('api/Cars/Car/1')
            .then(response => response.json())
            .then(data => {
                this.setState(
                    {
                        carId: data.carId,
                        year: data.year,
                        price: data.price,
                        notes: data.notes,
                        loading: false
                    });
            });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleCancel(event) {
        this.setState({
            editing: false
        });
        event.preventDefault();
    }

    handleEdit(event) {
        this.setState({
            editing: true
        });
        event.preventDefault();
    }

    handleSubmit(event) {
        this.setState({
            editing: false
        });
        var data = {
            carId: this.state.carId,
            year: this.state.year,
            price: this.state.price,
            notes: this.state.notes
        };

        fetch('api/Cars/Save', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            var car = response.json();
        }).catch(response => {
            this.setState({
                editing: true
            });
            alert('ERROR');
        });

        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1>Edit Car</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="hidden" value={this.state.carId} name="carId" onChange={this.handleInputChange} />
                    <div className="row">
                        <div className="col-md-2">
                            <label>Year</label>
                            <input className="form-control" name="year" type="text" value={this.state.year} onChange={this.handleInputChange} disabled={!this.state.editing} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            <label>Price</label>
                            <input className="form-control" name="price" type="text" value={this.state.price} onChange={this.handleInputChange} disabled={!this.state.editing} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Notes</label>
                            <textarea className="form-control" name="notes" value={this.state.notes} onChange={this.handleInputChange} disabled={!this.state.editing} />
                        </div>
                    </div>
                    <EditButtons onEditClick={this.handleEdit} onCancelClick={this.handleCancel} isEditing={this.state.editing} />
                </form>
            </div>
        );
    }
}