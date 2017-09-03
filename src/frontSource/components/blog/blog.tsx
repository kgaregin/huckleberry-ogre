import * as React from "react";
import {withRouter} from 'react-router-dom';
import {RouteComponentProps} from "react-router";
import {get} from 'lodash';
import {MODE} from "./Enums";
import {Form, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import {FieldGroup} from "../../core/components/FieldGroup";

interface IBlog extends RouteComponentProps<any> {

}

@withRouter
class Blog extends React.Component<IBlog, {}> {

    renderPostEdit = () =>
        <Form>
            <FieldGroup
                id="article-title"
                type="text"
                label="Title"
                placeholder="Enter article title"
            />
            <FormGroup controlId="article-body">
                <ControlLabel>Textarea</ControlLabel>
                <FormControl componentClass="textarea" placeholder="Please, enter a few rows of what you thinking..." />
            </FormGroup>
        </Form>;

    render() {
        const mode = get(this.props.match.params, 'mode', MODE.READ);

        if (mode === MODE.CREATE) {
            return this.renderPostEdit();
        }
        return <div>

        </div>;
    }
}


export {Blog};