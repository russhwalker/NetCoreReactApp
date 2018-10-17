import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Cars extends Component {

    static renderCars(cars) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Year</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map(car =>
                        <tr key={car.carId}>
                            <td>
                                <Link className="btn btn-sm btn-info" to={`/caredit/${car.carId}`}>
                                    {car.carId}
                                </Link>
                            </td>
                            <td>{car.year}</td>
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
        this.state = { cars: [], loading: true };

        fetch('api/Cars/Inventory')
            .then(response => response.json())
            .then(data => {
                this.setState({ cars: data, loading: false });
            });
    }

    render() {
        let tableContents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Cars.renderCars(this.state.cars);

        return (
            <div>
                <h1>Cars</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {tableContents}
            </div>
        );
    }
}