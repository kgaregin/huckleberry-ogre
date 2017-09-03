import * as React from "react";
import {Grid, Row, Col} from 'react-bootstrap';

class GlobalLayout extends React.Component<{}, {}> {
    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={12}>
                        {this.props.children}
                    </Col>
                </Row>
            </Grid>);
    }
}

export {GlobalLayout};