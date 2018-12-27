import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class CarsTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
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
                    {this.props.cars.map(car =>
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
}