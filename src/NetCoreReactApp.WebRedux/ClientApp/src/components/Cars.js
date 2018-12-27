import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CarsTable } from './CarsTable';

export class Cars extends Component {
    displayName = Cars.name;

    constructor(props) {
        super(props);

        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.loadCars = this.loadCars.bind(this);

        this.state = {
            cars: [],
            visibleCarsOnly: true,
            loading: true
        };

        this.loadCars(this.state.visibleCarsOnly);
    }

    loadCars(visibleCarsOnly) {
        fetch('api/Cars/Inventory/' + visibleCarsOnly)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    cars: data,
                    loading: false
                });
            });
    }

    handleVisibleChange(event) {
        var val = !this.state.visibleCarsOnly;
        this.setState({
            visibleCarsOnly: val,
            loading: true
        });
        this.loadCars(val);
    }

    render() {
        let tableContents = this.state.loading
            ? <p><em>Loading...</em></p>
            : <CarsTable cars={this.state.cars} />;

        return (
            <div>
                <h1>Cars</h1>
                <div className="row">
                    <div className="col-md-3">
                        <label htmlFor="visibleCarsOnly">Visible Cars Only</label>
                        &nbsp;
                        <input type="checkbox" name="visibleCarsOnly" onChange={this.handleVisibleChange} checked={this.state.visibleCarsOnly} />
                    </div>
                </div>
                {tableContents}
                <hr />
                <Link className="btn btn-sm btn-primary" to={`/caredit/0`}>
                    Add
                </Link>
            </div>
        );
    }
}
