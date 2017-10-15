import * as React from "react";
import {Component} from "react";
import {MODE} from "./Enums";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {TextField, Button, Paper, Typography, Divider, Grid, IconButton} from "material-ui";
import withStyles from "material-ui/styles/withStyles";
import {styles} from "../../styles/components/blog/Blog";
import ModeEditIcon from "material-ui-icons/ModeEdit";
import DeleteIcon from "material-ui-icons/Delete";
import BorderColorIcon from "material-ui-icons/BorderColor";
import {
    requestBlogPosts,
    handleFormInput,
    submitBlogPost,
    removePostByID,
    prefillPostEditForm,
    clearPostEditForm
} from './Actions';
import {connect} from "react-redux";
import {IBlog, IBlogProps} from "./Models";
import {Dispatch, bindActionCreators} from "redux";
import {mergeProps} from "../../core/utils/Utils";
import {IReduxStore} from "../../core/store/reduxStore";
import {FETCH_STATUS} from "../../core/utils/ServiceUtils";
import {IPost} from "../../../server/db/models/blog/post";
import {sortBy} from "lodash";
import {ContentEditableField} from "../../components/ContentEditableField";
import {FormEventWithTargetValue} from "../../core/Interfaces";
import * as DropZone from "dropzone";
import {handleLocationChange} from "../../core/store/Actions";

@withRouter
class BlogComponent extends Component<IBlogProps> {
    //ToDo: configure dropZone, connect it with form state and handle on server side
    dropZoneContainer: HTMLElement;

    componentWillMount() {
        const mode = this.props.match.params.mode || MODE.READ;
        if (mode === MODE.READ) this.props.actions.requestBlogPosts();
    }

    componentDidMount() {
        const mode = this.props.match.params.mode || MODE.READ;
        if (mode === MODE.CREATE || mode === MODE.EDIT) {
            new DropZone(this.dropZoneContainer, {url: `/blog/${mode}`})
        }
    }

    private handleSubmit = () => {
        const {
            form: {title, message},
            actions: {submitBlogPost},
            match: {
                params:
                    {
                        mode,
                        postID: id
                    }
            }
        } = this.props;
        submitBlogPost(title, message, id, mode);
    };

    private handleCreatePostButtonClick = () => {
        this.props.actions.handleLocationChange('/blog/CREATE');
    };

    private handlePostRemove = (postID: string) => {
        this.props.actions.removePostByID(postID);
    };

    private handlePostEdit = (post: IPost) => {
        const {prefillPostEditForm, handleLocationChange} = this.props.actions;
        prefillPostEditForm(post);
        handleLocationChange(`/blog/EDIT/${post.id}`);
    };

    private handleDropZoneRef = (dropZoneContainer: HTMLFormElement) => {
        this.dropZoneContainer = dropZoneContainer;
    };

    renderPostEdit = () => {
        const {classes, fetchStatus} = this.props;
        const {title, message} = this.props.form;
        const {handleFormInput} = this.props.actions;
        const isFetchInProgress = fetchStatus === FETCH_STATUS.PENDING;

        return (
            <form ref={this.handleDropZoneRef} className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="title"
                    label="Title"
                    className={classes.textField}
                    value={title}
                    onChange={
                        (event: FormEventWithTargetValue<HTMLDivElement, string>) =>
                            handleFormInput('title', event.target.value)
                    }
                    margin="normal"
                    fullWidth
                />
                <ContentEditableField
                    id="message"
                    label="Message"
                    className={classes.textField}
                    multiline
                    fullWidth
                    rows={"24"}
                    value={message}
                    onInput={
                        (event: FormEventWithTargetValue<HTMLDivElement, string>) =>
                            handleFormInput('message', event.target.value)
                    }
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

        if (mode === MODE.CREATE || mode === MODE.EDIT) {
            return this.renderPostEdit();
        }

        return (
            <div>
                {posts && sortBy(posts, 'id').map((post, key) =>
                    post.title && post.message &&
                    <Paper className={classes.postPaper} elevation={10} key={key}>
                        <Grid container>
                            <Grid item xl={11} lg={11} md={11} sm={12} xs={12}>
                                <Typography type="title" gutterBottom align={'center'}>
                                    {post.title}
                                </Typography>
                                <Divider className={classes.postDivider}/>
                                <Typography type="body1" gutterBottom align={'left'}>
                                    {post.message}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xl={1} lg={1} md={1} sm={12} xs={12}
                                className={classes.postActions}>
                                <IconButton
                                    onClick={() => post.id && this.handlePostRemove(post.id.toString())}
                                    aria-label="Remove post"
                                >
                                    <DeleteIcon className={classes.postActionButtonIcon}/>
                                </IconButton>
                                <IconButton
                                    onClick={() => post.id && this.handlePostEdit(post)}
                                    aria-label="Remove post"
                                >
                                    <BorderColorIcon className={classes.postActionButtonIcon}/>
                                </IconButton>
                            </Grid>
                        </Grid>
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
    return {
        actions: bindActionCreators({
            requestBlogPosts,
            handleFormInput,
            submitBlogPost,
            removePostByID,
            prefillPostEditForm,
            clearPostEditForm,
            handleLocationChange
        }, dispatch)
    }
};

const Blog = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps, mergeProps)(BlogComponent));

export {Blog};
