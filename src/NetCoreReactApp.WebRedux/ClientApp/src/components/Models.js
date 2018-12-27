import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Models extends Component {

    static renderModels(models) {
        return (
            <table className='table table-condensed'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Make</th>
                        <th>Model</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map(model =>
                        <tr key={model.modelId}>
                            <td>
                                <Link className="btn btn-xs btn-info" to={`/modeledit/${model.modelId}`}>
                                    View
                                </Link>
                            </td>
                            <td>{model.makeName}</td>
                            <td>{model.modelName}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    displayName = Models.name;

    constructor(props) {
        super(props);
        this.state = {
            models: [],
            loading: true
        };

        fetch('api/Models/GetModelRows')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    models: data,
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
            : Models.renderModels(this.state.models);

        return (
            <div>
                <h1>Models</h1>
                {tableContents}
                <hr />
                <Link className="btn btn-sm btn-primary" to={`/modeledit/0`}>
                    Add
                </Link>
            </div>
        );
    }
}
