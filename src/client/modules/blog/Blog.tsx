import * as React from 'react';
import {Component} from 'react';
import {EBlogViewMode} from './Enums';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {
    TextField,
    Button,
    Paper,
    Typography,
    Divider,
    Grid,
    IconButton,
    WithStyles,
    withStyles
} from '@material-ui/core';
import {styles} from '../../styles/modules/blog/Blog';
import ModeEditIcon from '@material-ui/icons/ModeEdit';
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import {
    requestBlogPosts,
    handleFormInput,
    submitBlogPost,
    removePostByID,
    prefillPostEditForm,
    clearPostEditForm,
    IBlogActions
} from './Actions';
import {connect} from 'react-redux';
import {Dispatch, bindActionCreators} from 'redux';
import {IReduxStore} from '../../core/reduxStore';
import {IPost} from '../../../server/db/models/blog/post';
import {sortBy} from 'lodash';
import {FormEventWithTargetValue} from '../../core/Interfaces';
import {handleLocationChange} from '../../core/utils/Utils';
import {FETCH_CONTEXT, FETCH_STATUS} from '../../core/enums';
import * as classNames from 'classnames';
// import DropZone from 'react-dropzone';

// const Dropzone = require('react-dropzone').default;
// import * as Dropzone from 'react-dropzone';

/**
 * Blog own props.
 */
export interface IBlogOwnProps {
    posts: IPost[],
    form: {
        title: string;
        message: string;
    },
    fetchStatus: FETCH_STATUS,
    fetchContext: FETCH_CONTEXT,
    locationPathname: string
}

/**
 * Blog props.
 */
interface IProps extends IBlogOwnProps, RouteComponentProps<{ mode: EBlogViewMode, postID: number }>, WithStyles<typeof styles> {
    actions: IBlogActions;
}

class BlogComponent extends Component<IProps> {

    componentWillMount() {
        this.props.actions.requestBlogPosts();
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
        handleLocationChange('/blog/CREATE');
    };

    private handlePostRemove = (postID: string) => {
        this.props.actions.removePostByID(postID);
    };

    private handlePostEdit = (post: IPost) => {
        const {prefillPostEditForm} = this.props.actions;
        prefillPostEditForm(post);
        handleLocationChange(`/blog/EDIT/${post.id}`);
    };

    renderPostEdit = () => {
        const {
            classes,
            fetchStatus,
            form: {title, message},
            actions: {handleFormInput}
        } = this.props;
        const isFetchInProgress = fetchStatus === FETCH_STATUS.PENDING;

        return (
            <form className={classes.container} noValidate>
                <TextField
                    placeholder="Got something new?"
                    id="title"
                    label="Title"
                    className={classes.textField}
                    value={title}
                    onChange={
                        (event: FormEventWithTargetValue<HTMLInputElement, string>) =>
                            handleFormInput('title', event.target.value)
                    }
                    margin="normal"
                    fullWidth
                />
                <TextField
                    placeholder="Go on and share it with friends!"
                    id="message"
                    label="Message"
                    className={classes.textField}
                    multiline
                    fullWidth
                    rows={'24'}
                    value={message}
                    onInput={
                        (event: FormEventWithTargetValue<HTMLDivElement, string>) =>
                            handleFormInput('message', event.target.value)
                    }
                    margin="normal"
                    type={'text'}
                />
                <Button
                    onClick={this.handleSubmit}
                    variant="raised"
                    color="primary"
                    className={classes.button}
                    disabled={isFetchInProgress}
                >
                    {'Submit'}
                </Button>
                <Button
                    variant="raised"
                    color="primary"
                    className={classes.button}
                >
                    {'Add images'}
                </Button>
            </form>
        );
    };

    render() {
        const mode = this.props.match.params.mode || EBlogViewMode.READ;
        const {classes, posts} = this.props;

        if (mode === EBlogViewMode.CREATE || mode === EBlogViewMode.EDIT) {
            return this.renderPostEdit();
        }

        return (
            <div>
                {sortBy(posts, 'id').map(post =>
                    post.title && post.message &&
                    <Paper className={classes.postPaper} key={post.id}>
                        <Grid container>
                            <Grid item md={11} xs={12}>
                                <Typography variant="title" gutterBottom align={'center'}>
                                    {post.title}
                                </Typography>
                                <Divider className={classes.postDivider}/>
                                <Typography variant="body1" gutterBottom align={'left'}>
                                    {post.message}
                                </Typography>
                            </Grid>
                            <Divider className={classNames(classes.postDivider, 'display-none-md-up')}/>
                            <Grid item md={1} xs={12} className={classes.postActions}>
                                <IconButton
                                    onClick={() => post.id && this.handlePostRemove(post.id.toString())}
                                    aria-label="Remove post"
                                >
                                    <DeleteIcon className={classes.postActionButtonIcon}/>
                                </IconButton>
                                <IconButton
                                    onClick={() => post.id && this.handlePostEdit(post)}
                                    aria-label="Edit post"
                                >
                                    <BorderColorIcon className={classes.postActionButtonIcon}/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Paper>)
                }
                <Button
                    variant="fab"
                    color="primary"
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

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        actions: bindActionCreators({
            requestBlogPosts,
            handleFormInput,
            submitBlogPost,
            removePostByID,
            prefillPostEditForm,
            clearPostEditForm
        }, dispatch)
    };
};

const BlogStyledConnectedWithRouter = withStyles(styles)(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(BlogComponent)));

export {BlogStyledConnectedWithRouter as Blog};