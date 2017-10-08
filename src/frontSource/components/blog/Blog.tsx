import * as React from "react";
import {Component} from "react";
import {FETCH_CONTEXT, MODE} from "./Enums";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {FormEventWithTargetValue} from "../../core/Interfaces";
import {TextField, Button, Paper, Typography, Divider} from "material-ui";
import withStyles from "material-ui/styles/withStyles";
import {styles} from "../../styles/components/blog/Blog";
import ModeEditIcon from "material-ui-icons/ModeEdit";
import {requestBlogPosts, handleFormInput, submitBlogPost} from './Actions';
import {connect} from "react-redux";
import {IBlog, IBlogProps} from "./Models";
import {Dispatch, bindActionCreators} from "redux";
import {mergeProps} from "../../core/utils/Utils";
import {IReduxStore} from "../../core/reduxStore";
import {FETCH_STATUS} from "../../core/utils/ServiceUtils";

@withRouter
class BlogComponent extends Component<IBlogProps> {

    componentWillMount() {
        const mode = this.props.match.params.mode || MODE.READ;
        if (mode === MODE.READ) this.props.actions.requestBlogPosts();
    }

    componentWillReceiveProps(nextProps: IBlogProps) {
        const {fetchContext, fetchStatus, history: {push}, actions: {requestBlogPosts}} = nextProps;
        if (fetchContext === FETCH_CONTEXT.SUBMIT_POST &&
            fetchStatus === FETCH_STATUS.SUCCESS) {
            requestBlogPosts();
            push('/blog');
        }
    }

    private handleSubmit = () => {
        const {form: {title, message}, actions: {submitBlogPost}} = this.props;
        submitBlogPost(title, message);
    };

    private handleCreatePostButtonClick = () => {
        this.props.history.push('/blog/CREATE');
    };

    renderPostEdit = () => {
        const {classes, fetchStatus} = this.props;
        const {title, message} = this.props.form;
        const {handleFormInput} = this.props.actions;
        const isFetchInProgress = fetchStatus === FETCH_STATUS.PENDING;

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
                    onClick={this.handleSubmit}
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
        const {classes, posts} = this.props;

        if (mode === MODE.CREATE) {
            return this.renderPostEdit();
        }
        return (
            <div>
                {posts.map((post, key) =>
                    post.title && post.message &&
                    <Paper className={classes.postPaper} elevation={10} key={key}>
                        <Typography type="title" gutterBottom align={'center'}>
                            {post.title}
                        </Typography>
                        <Divider className={classes.postDivider}/>
                        <Typography type="body1" gutterBottom align={'left'}>
                            {post.message}
                        </Typography>
                    </Paper>)
                }
                <Button
                    fab
                    color="accent"
                    aria-label="edit"
                    className={classes.buttonCreate}
                    onClick={this.handleCreatePostButtonClick}
                >
                    <ModeEditIcon/>
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state: IReduxStore) => state.blogReducer;

const mapDispatchToProps = (dispatch: Dispatch<IBlog>) => {
    return {actions: bindActionCreators({requestBlogPosts, handleFormInput, submitBlogPost}, dispatch)}
};

const Blog = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps, mergeProps)(BlogComponent));

export {Blog};
