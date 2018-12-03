import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Makes extends Component {

    static renderMakes(makes) {
        return (
            <table className='table table-condensed'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Make</th>
                    </tr>
                </thead>
                <tbody>
                    {makes.map(make =>
                        <tr key={make.makeId}>
                            <td>
                                <Link className="btn btn-xs btn-info" to={`/makeedit/${make.makeId}`}>
                                    View
                                </Link>
                            </td>
                            <td>{make.makeName}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    displayName = Makes.name;

    constructor(props) {
        super(props);
        this.state = {
            makes: [],
            loading: true
        };

        fetch('api/Makes/GetMakes')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    makes: data,
                    loading: false
                });
            })
            .catch((e) => {
                alert(e);
            });
    }

    render() {
        let tableContents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Makes.renderMakes(this.state.makes);

        return (
            <div>
                <h1>Makes</h1>
                {tableContents}
                <hr />
                <Link className="btn btn-sm btn-primary" to={`/makeedit/0`}>
                    Add
                </Link>
            </div>
        );
    }
}
