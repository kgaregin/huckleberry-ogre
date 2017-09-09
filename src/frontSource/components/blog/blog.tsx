import * as React from "react";
import {withRouter} from 'react-router-dom';
import {get} from 'lodash';
import {MODE} from "./Enums";
import {Form, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';

interface IBlog {
    match:{
        params: {
            mode: string
        }
    }
}

@withRouter
class Blog extends React.Component<IBlog> {

    renderPostEdit = () =>
        <Form>
            <FormGroup controlId="article-body">
                <ControlLabel>Textarea</ControlLabel>
                <FormControl componentClass="textarea" placeholder="Please, enter a few rows of what you thinking..." />
            </FormGroup>
        </Form>;

    render() {
        const mode = get(this.props, 'match.params.mode', MODE.READ);

        if (mode === MODE.CREATE) {
            return this.renderPostEdit();
        }
        return <div>

        </div>;
    }
}


export {Blog};