import * as React from "react";
import {withRouter} from 'react-router-dom';
import {MODE} from "../Enums";
import {RouteComponentProps} from "react-router-dom";
import {FormEvent} from "react";
import {IWithClasses, IWithTargetValue} from "../../core/Interfaces";
import {TextField, Grid, Button} from "material-ui";
import withStyles from "material-ui/styles/withStyles";
import {styles} from "../../styles/components/blog/Blog";
import ModeEditIcon from "material-ui-icons/ModeEdit";

interface IBlog {
    form: {
        title: string;
        message: string;
    }
}

type event = FormEvent<HTMLDivElement> & IWithTargetValue<string>;

@withRouter
class BlogComponent extends React.Component<IWithClasses & RouteComponentProps<{ mode: MODE }>, IBlog> {

    state = {
        form: {
            title: '',
            message: ''
        }
    };

    private handleFormFieldChange = (event: event, name: 'title' | 'message') => {
        const value = event.target.value;
        this.setState(prevState => ({
            ...prevState,
            form: {
                ...prevState.form,
                [name]: value
            }
        }));
    };

    private handleCreatePostButtonClick = () => {
        this.props.history.push('/blog/CREATE');
    };

    renderPostEdit = () => {
        const {classes} = this.props;
        return (
            <Grid container justify={'center'}>
                <Grid item xl={7} lg={9} md={11} sm={12} xs={12}>
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                            id="title"
                            label="Title"
                            className={classes.textField}
                            value={this.state.form.title}
                            onChange={(event: event) => this.handleFormFieldChange(event, 'title')}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            id="message"
                            label="Message"
                            className={classes.textField}
                            multiline
                            fullWidth
                            rows={"24"}
                            value={this.state.form.message}
                            onChange={(event: event) => this.handleFormFieldChange(event, 'message')}
                            margin="normal"
                            placeholder="Put a few awesome lines of what you going to write about..."
                            type={'text'}
                        />
                        <Button raised color="primary" className={classes.button}>
                            Submit
                        </Button>
                    </form>
                </Grid>
            </Grid>);
    };

    render() {
        const mode = this.props.match.params.mode || MODE.READ;
        const {classes} = this.props;

        if (mode === MODE.CREATE) {
            return this.renderPostEdit();
        }
        return (<div>All posts here!
            <Button
                fab
                color="accent"
                aria-label="edit"
                className={classes.buttonCreate}
                onClick={this.handleCreatePostButtonClick}
            >
                <ModeEditIcon/>
            </Button>
        </div>);
    }
}

const Blog = withStyles(styles)(BlogComponent);

export {Blog};