import React, { Component } from 'react';

export class EditButtons extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.isEditing) {
            return (
                <div className="row">
                    <div className="col-md-12">
                        <button className="btn btn-sm btn-default" name="year" type="button" onClick={this.props.onCancelClick}>Cancel</button>
                        &nbsp;&nbsp;
                        <button className="btn btn-sm btn-primary" name="year" type="submit">Save</button>
                    </div>
                </div>
            );
        }
        return (
            <div className="row">
                <div className="col-md-12">
                    <button className="btn btn-sm btn-info" name="year" type="button" onClick={this.props.onEditClick}>Edit</button>
                </div>
            </div>
        );
    }
}