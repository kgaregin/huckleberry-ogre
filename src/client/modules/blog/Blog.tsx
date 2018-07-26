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
    withStyles,
    StyledComponentProps
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
    fillPostEditForm,
    clearPostEditForm,
    IBlogActions
} from './Actions';
import {connect} from 'react-redux';
import {Dispatch, bindActionCreators} from 'redux';
import {handleLocationChange, IAppState} from '../../core/reduxStore';
import {IPost} from '../../../server/db/models/blog/post';
import sortBy from 'lodash/sortBy';
import {ERequestStatus} from '../../core/enums';
import * as classNames from 'classnames';
// import DropZone from 'react-dropzone';

// const Dropzone = require('react-dropzone').default;
// import * as Dropzone from 'react-dropzone';

/**
 * Form fields set.
 *
 * @prop {string} title Post title.
 * @prop {string} message Post message.
 */
interface IForm {
    title: string;
    message: string;
}

/**
 * Blog own props.
 *
 * {IPost[]} posts Array of posts from server.
 * {IForm} form Form fields set.
 * {ERequestStatus} submitStatus Post submit status.
 */
export interface IBlogOwnProps {
    posts: IPost[],
    form: IForm
    submitStatus: ERequestStatus;
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

    /**
     * Submit button handler.
     */
    private handleSubmit = () => {
        const {
            actions: {submitBlogPost},
            match: {
                params:
                    {
                        mode,
                        postID: id
                    }
            }
        } = this.props;
        submitBlogPost(id, mode);
    };

    /**
     * Create post button click handler.
     */
    private handleCreatePostButtonClick = () => {
        this.props.actions.clearPostEditForm();
        handleLocationChange('/blog/CREATE');
    };

    /**
     * Remove post button click handler.
     *
     * @param {string} postID Identifier of post being removed.
     */
    private handlePostRemove = (postID: string) => {
        this.props.actions.removePostByID(postID);
    };

    /**
     * Edit post button click handler.
     *
     * @param {IPost} post Post to edit.
     */
    private handlePostEdit = (post: IPost) => {
        const {fillPostEditForm} = this.props.actions;
        fillPostEditForm(post);
        handleLocationChange(`/blog/EDIT/${post.id}`);
    };

    /**
     * Edit view mode render method.
     */
    renderPostEdit = () => {
        const {
            classes,
            form: {title, message},
            actions: {handleFormInput},
            submitStatus
        } = this.props;

        return (
            <form className={classes.container} noValidate>
                <TextField
                    placeholder="Got something new?"
                    id="title"
                    label="Title"
                    className={classes.textField}
                    value={title}
                    onChange={event => handleFormInput('title', event.currentTarget.value)}
                    margin="normal"
                    fullWidth
                    autoComplete="off"
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
                    onChange={event => handleFormInput('message', event.currentTarget.value)}
                    margin="normal"
                    type={'text'}
                />
                <Button
                    onClick={this.handleSubmit}
                    variant="raised"
                    color="primary"
                    className={classes.button}
                    disabled={submitStatus === ERequestStatus.PENDING}
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

const mapStateToProps = (state: IAppState) => state.blogReducer;

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        actions: bindActionCreators({
            requestBlogPosts,
            handleFormInput,
            submitBlogPost,
            removePostByID,
            fillPostEditForm,
            clearPostEditForm
        }, dispatch)
    };
};

type TRouterProps = RouteComponentProps<{ mode: EBlogViewMode, postID: number }>;
type TStyleProps = WithStyles<typeof styles>;

type TDispatchProps = { actions: IBlogActions }

const Connected: React.ComponentClass<TStyleProps & TRouterProps> = connect<IBlogOwnProps, TDispatchProps, TStyleProps & TRouterProps>(mapStateToProps, mapDispatchToProps)((props: IProps) => <BlogComponent {...props}/>);
const WithRouterConnected: React.ComponentClass<TStyleProps> = withRouter((props: TStyleProps & TRouterProps) => <Connected {...props}/>);
const WithRouterConnectedStyled: React.ComponentType<StyledComponentProps> = withStyles(styles)((props: TStyleProps) => <WithRouterConnected {...props}/>);

export {WithRouterConnectedStyled as Blog};
