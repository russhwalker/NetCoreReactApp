import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Cars extends Component {

    static renderCars(cars) {
        return (
            <table className='table table-condensed'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Year</th>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map(car =>
                        <tr key={car.carId}>
                            <td>
                                <Link className="btn btn-xs btn-info" to={`/caredit/${car.carId}`}>
                                    View
                                </Link>
                            </td>
                            <td>{car.year}</td>
                            <td>{car.makeName}</td>
                            <td>{car.modelName}</td>
                            <td>{car.priceFormatted}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    displayName = Cars.name;

    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            visibleCarsOnly: true,
            loading: true
        };

        this.loadCars();
    }

    loadCars() {
        fetch('api/Cars/Inventory/' + this.state.visibleCarsOnly)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    cars: data,
                    loading: false
                });
            });
    }

    render() {
        let tableContents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Cars.renderCars(this.state.cars);

        return (
            <div>
                <h1>Cars</h1>
                {tableContents}
                <hr />
                <Link className="btn btn-sm btn-primary" to={`/caredit/0`}>
                    Add
                </Link>
            </div>
        );
    }
}
