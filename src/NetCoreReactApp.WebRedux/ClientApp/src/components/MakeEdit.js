import React, { Component } from 'react';
import { EditButtons } from './EditButtons';

export class MakeEdit extends Component {

    displayName = MakeEdit.name

    constructor(props) {
        super(props);
        var makeId = parseInt(props.match.params.makeId, 10);
        var isNew = makeId === 0;
        this.state = {
            isNew: isNew,
            makeId: makeId,
            makeName: '',
            editing: isNew,
            loading: !isNew
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        if (!isNew) {
            fetch('api/Makes/MakeEdit/' + makeId)
                .then(response => response.json())
                .then(data => {
                    this.setState(
                        {
                            makeId: data.makeId,
                            makeName: data.makeName,
                            loading: false
                        });
                })
                .catch(() => {
                    alert('ERROR!');
                });
        }
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
            makeId: this.state.makeId,
            makeName: this.state.makeName
        };

        fetch('api/Makes/Save', {
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
                this.props.history.push('/makes');
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
                <h1>Edit Make</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="hidden" value={this.state.makeId} onChange={this.handleInputChange} />
                    <div className="row">
                        <div className="col-md-2">
                            <label>Make</label>
                            <input className="form-control" name="makeName" type="text" value={this.state.makeName} onChange={this.handleInputChange} disabled={!this.state.editing} />
                        </div>
                    </div>
                    <EditButtons onEditClick={this.handleEdit} onCancelClick={this.handleCancel} isEditing={this.state.editing} isNew={this.state.isNew} isNewCancelRedirect="/makes" />
                </form>
            </div>
        );
    }
}