import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class EditButtons extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isNew) {
            return (
                <div className="row">
                    <div className="col-md-12">
                        <Link className="btn btn-sm btn-default" to={this.props.isNewCancelRedirect}>
                            Cancel
                        </Link>
                        &nbsp;&nbsp;
                        <button className="btn btn-sm btn-primary" type="submit">Save</button>
                    </div>
                </div>
            );
        }
        if (this.props.isEditing) {
            return (
                <div className="row">
                    <div className="col-md-12">
                        <button className="btn btn-sm btn-default" type="button" onClick={this.props.onCancelClick}>Cancel</button>
                        &nbsp;&nbsp;
                        <button className="btn btn-sm btn-primary" type="submit">Save</button>
                    </div>
                </div>
            );
        }
        return (
            <div className="row">
                <div className="col-md-12">
                    <button className="btn btn-sm btn-info" type="button" onClick={this.props.onEditClick}>Edit</button>
                </div>
            </div>
        );
    }
}