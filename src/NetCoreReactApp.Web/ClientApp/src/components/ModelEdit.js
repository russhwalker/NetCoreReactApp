import React, { Component } from 'react';
import { EditButtons } from './EditButtons';

export class ModelEdit extends Component {

    displayName = ModelEdit.name

    constructor(props) {
        super(props);
        var modelId = parseInt(props.match.params.modelId, 10);
        var isNew = modelId === 0;
        this.state = {
            isNew: isNew,
            makes: [],
            makeId: 0,
            modelId: modelId,
            modelName: '',
            editing: isNew,
            loading: true
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        fetch('api/Models/ModelEdit/' + modelId)
            .then(response => response.json())
            .then(data => {
                this.setState(
                    {
                        makes: data.makes,
                        makeId: data.model.makeId,
                        modelId: data.model.modelId,
                        modelName: data.model.modelName,
                        loading: false
                    });
            })
            .catch(() => {
                alert('ERROR!');
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
            modelId: this.state.modelId,
            makeId: this.state.makeId,
            modelName: this.state.modelName
        };

        fetch('api/Models/Save', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            response.json();
        })
            .then(() => {
                this.props.history.push('/models');
            })
            .catch(() => {
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
                <h1>Edit Model</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="hidden" value={this.state.modelId} onChange={this.handleInputChange} />
                    <div className="row">
                        <div className="col-md-2">
                            <label>Make</label>
                            <select className="form-control" name="makeId" value={this.state.makeId} onChange={this.handleInputChange} disabled={!this.state.editing}>
                                <option value="0">--</option>
                                {this.state.makes.map(function (m) {
                                    return <option value={m.makeId}>{m.makeName}</option>;
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            <label>Model</label>
                            <input className="form-control" name="modelName" type="text" value={this.state.modelName} onChange={this.handleInputChange} disabled={!this.state.editing} />
                        </div>
                    </div>
                    <EditButtons onEditClick={this.handleEdit} onCancelClick={this.handleCancel} isEditing={this.state.editing} isNew={this.state.isNew} isNewCancelRedirect="/models" />
                </form>
            </div>
        );
    }
}