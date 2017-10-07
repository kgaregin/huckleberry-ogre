import * as React from "react";
import {Component} from "react";
import {MODE} from "./Enums";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {FormEventWithTargetValue} from "../../core/Interfaces";
import {TextField, Button} from "material-ui";
import withStyles from "material-ui/styles/withStyles";
import {styles} from "../../styles/components/blog/Blog";
import ModeEditIcon from "material-ui-icons/ModeEdit";
import {requestBlogPosts, handleFormInput, submitBlogPost} from './Actions';
import {connect} from "react-redux";
import {IBlog, IBlogProps} from "./Models";
import {Dispatch, bindActionCreators} from "redux";
import {mergeProps} from "../../core/utils/Utils";
import {IReduxStore} from "../../core/reduxStore";

@withRouter
class BlogComponent extends Component<IBlogProps> {

    private handleCreatePostButtonClick = () => {
        // this.props.history.push('/blog/CREATE');
        this.props.actions.requestBlogPosts(16);
    };

    renderPostEdit = () => {
        const {classes, isFetchInProgress} = this.props;
        const {title, message} = this.props.form;
        const {submitBlogPost, handleFormInput} = this.props.actions;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="title"
                    label="Title"
                    className={classes.textField}
                    value={title}
                    onChange={(event: FormEventWithTargetValue<string>) => handleFormInput('title', event.target.value)}
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
                    value={message}
                    onChange={(event: FormEventWithTargetValue<string>) => handleFormInput('message', event.target.value)}
                    margin="normal"
                    placeholder="Put a few awesome lines of what you going to write about..."
                    type={'text'}
                />
                <Button
                    onClick={() => submitBlogPost(title, message)}
                    raised color="primary"
                    className={classes.button}
                    disabled={isFetchInProgress}
                >
                    Submit
                </Button>
            </form>
        );
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

const mapStateToProps = (state: IReduxStore) => state.blogReducer;

const mapDispatchToProps = (dispatch: Dispatch<IBlog>) => {
    return {actions: bindActionCreators({requestBlogPosts, handleFormInput, submitBlogPost}, dispatch)}
};

const Blog = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps, mergeProps)(BlogComponent));

export {Blog};
