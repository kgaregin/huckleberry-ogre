import React, {Component} from 'react';
import {EBlogViewMode, ETabIndex} from './Enums';
import {RouteComponentProps} from 'react-router-dom';
import {
    Button,
    Divider,
    Grid,
    IconButton,
    Paper,
    Tab,
    Tabs,
    TextField,
    Typography,
    WithStyles,
} from '@material-ui/core';
import {styles} from '../../styles/modules/Blog';
import ModeEditIcon from '@material-ui/icons/ModeEdit';
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import {BlogActions} from './Actions';
import {Action} from 'redux';
import {IAppState, navigateTo} from '../../core/reduxStore';
import {ERole, IPost} from '../../../server/db/models';
import sortBy from 'lodash/sortBy';
import {ERequestStatus} from '../../core/enums';
import classNames from 'classnames';
import {parser} from '../../core/utils/BBCodeParser';
import {ThunkDispatch} from 'redux-thunk';
import {HOC} from '../../core/utils/HOC';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CameraIcon from '@material-ui/icons/Camera';
import {DropZoneActions} from '../dropZone/Actions';
import LinearProgress from '@material-ui/core/LinearProgress';
import {ILoginStateProps} from '../login/Login';

/**
 * Form fields set.
 *
 * @prop {string} title Post title.
 * @prop {string} message Post message.
 */
export interface IBlogFormField {
    title: string;
    message: string;
}

/**
 * Blog own props.
 *
 * {IPost[]} posts Array of posts from server.
 * {IForm} form Form fields set.
 * {ERequestStatus} submitStatus Post submit status.
 * {ERequestStatus} requestPostsStatus Posts request status.
 */
export interface IBlogStateProps {
    posts: IPost[],
    form: IBlogFormField
    submitStatus: ERequestStatus;
    requestPostsStatus: ERequestStatus;
}

/**
 * Blog props.
 */
type TProps = IBlogStateProps & ILoginStateProps & TRouteProps & TStyleProps & TDispatchProps;

/**
 * Blog state.
 *
 * @prop {number} tabIndex Tab index.
 */
interface IState {
    tabIndex: number;
}

class BlogComponent extends Component<TProps, IState> {

    state: IState = {
        tabIndex: 0
    };

    /**
     * Submit button handler.
     */
    handleSubmit = () => {
        const {mode, postID} = this.props.match.params;
        this.props.blogActions.submitBlogPost(+postID, mode);
    };

    /**
     * Create post button click handler.
     */
    handleCreatePostButtonClick = () => {
        this.props.blogActions.clearPostEditForm();
        navigateTo('/blog/create');
    };

    /**
     * Remove post button click handler.
     *
     * @param {number} postID Identifier of post being removed.
     */
    handlePostRemove = (postID: number) => {
        this.props.blogActions.removePostByID(postID);
    };

    /**
     * Edit post button click handler.
     *
     * @param {number} postID Post identifier.
     */
    handlePostEdit = (postID: number) => {
        this.props.blogActions.fillPostEditForm(postID);
        navigateTo(`/blog/edit/${postID}`);
    };

    /**
     * Tab change handler.
     *
     * @param {ChangeEvent} __ Event.
     * @param {number} tabIndex New tab index.
     */
    handleTabChange = (__: React.ChangeEvent, tabIndex: number) => {
        this.setState({tabIndex});
    };

    /**
     * Edit view mode render method.
     */
    renderPostEdit = () => {
        const {
            classes,
            form: {title, message},
            submitStatus,
            blogActions,
            dropZoneActions
        } = this.props;

        const {tabIndex} = this.state;

        return (
            <div className='text-center'>
                <Tabs value={tabIndex} onChange={this.handleTabChange}>
                    <Tab label="edit"/>
                    <Tab label="preview"/>
                </Tabs>
                <Paper className={classes.postPaper}>
                    <Grid container>
                        <Grid item xs={12}>
                            {tabIndex === ETabIndex.EDIT &&
                            <form className={classes.form} noValidate>
                                <TextField
                                    placeholder="Got something new?"
                                    label="Title"
                                    className={classes.textField}
                                    value={title}
                                    onChange={event => blogActions.handleFormInput('title', event.currentTarget.value)}
                                    margin="normal"
                                    fullWidth
                                    autoComplete="off"
                                    name="title"
                                />
                                <div className={classes.actionPanel}>
                                    <Button
                                        variant="text"
                                        component="span"
                                        onClick={dropZoneActions.show}
                                        size='small'
                                        className={classes.actionPanelButton}
                                    >
                                        {'Add image'}
                                        <AddAPhotoIcon className={classes.actionPanelIcon}/>
                                    </Button>
                                    <Button
                                        variant="text"
                                        component="span"
                                        onClick={dropZoneActions.show}
                                        size='small'
                                        className={classes.actionPanelButton}
                                    >
                                        {'Add video'}
                                        <CameraIcon className={classes.actionPanelIcon}/>
                                    </Button>
                                    <hr className='margin-top-0 margin-bottom-2'/>
                                </div>
                                <TextField
                                    placeholder="Go on and share it with friends!"
                                    label="Message"
                                    name="message"
                                    className='margin-top-0'
                                    multiline
                                    fullWidth
                                    value={message}
                                    rows={'25'}
                                    onChange={event => blogActions.handleFormInput('message', event.currentTarget.value)}
                                    margin="normal"
                                    type={'text'}
                                />
                            </form>}
                            {tabIndex === ETabIndex.PREVIEW &&
                            <div>
                                {title &&
                                <Typography variant="title" gutterBottom align={'center'}>
                                    {title}
                                </Typography>}
                                {title && <Divider className={classes.postDivider}/>}
                                <Typography variant="body1" gutterBottom align={'left'}>
                                    {parser.toReact(message)}
                                </Typography>
                            </div>
                            }
                        </Grid>
                    </Grid>
                </Paper>
                <Button
                    onClick={this.handleSubmit}
                    variant="raised"
                    color="primary"
                    className={classes.button}
                    disabled={submitStatus === ERequestStatus.PENDING}
                >
                    {'Submit'}
                </Button>
            </div>
        );
    };

    renderPostView = () => {
        const {classes, posts, requestPostsStatus} = this.props;
        const {user} = this.props;
        const isAdmin = user && user.role === ERole.ADMIN;

        return (
            <>
            <div
                className={classNames(classes.progress, {['active']: requestPostsStatus === ERequestStatus.PENDING})}
            >
                <LinearProgress/>
            </div>
            {sortBy(posts, 'id').map(post =>
                post.message &&
                <Paper className={classes.postPaper} key={post.id}>
                    <Grid container>
                        <Grid item md={isAdmin ? 11 : 12} xs={12}>
                            {post.title &&
                            <Typography variant="title" gutterBottom align={'center'}>
                                {post.title}
                            </Typography>}
                            {post.title && <Divider className={classes.postDivider}/>}
                            <Typography variant="body1" gutterBottom align={'left'}>
                                {parser.toReact(post.message)}
                            </Typography>
                        </Grid>
                        {isAdmin &&
                        <Divider className={classNames(classes.postDivider, 'display-none-md-up')}/>}
                        {isAdmin && <Grid item md={1} xs={12} className={classes.postActions}>
                            <IconButton
                                onClick={() => post.id && this.handlePostRemove(post.id)}
                                aria-label="Remove post"
                            >
                                <DeleteIcon className={classes.postActionButtonIcon}/>
                            </IconButton>
                            <IconButton
                                onClick={() => post.id && this.handlePostEdit(post.id)}
                                aria-label="Edit post"
                            >
                                <BorderColorIcon className={classes.postActionButtonIcon}/>
                            </IconButton>
                        </Grid>}
                    </Grid>
                </Paper>
            )}
            {isAdmin && (
                <Button
                    variant="fab"
                    color="primary"
                    aria-label="edit"
                    className={classes.buttonCreate}
                    onClick={this.handleCreatePostButtonClick}
                >
                    <ModeEditIcon/>
                </Button>
            )}
            </>
        );
    };

    render() {
        const mode = this.props.match.params.mode || EBlogViewMode.READ;
        const {user} = this.props;
        const isAdmin = user && user.role === ERole.ADMIN;
        let blogForm: JSX.Element;

        switch (mode) {
            case EBlogViewMode.CREATE:
            case EBlogViewMode.EDIT:
                blogForm = isAdmin ? this.renderPostEdit() : this.renderPostView();
                break;
            case EBlogViewMode.READ:
            default:
                blogForm = this.renderPostView();
        }

        return (
            <Grid container justify={'center'}>
                <Grid item xl={8} lg={10} md={11} sm={12} xs={12}>
                    {blogForm}
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state: IAppState) => ({
    ...state.blogState,
    ...state.loginState
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => {
    return {
        blogActions: new BlogActions(dispatch),
        dropZoneActions: new DropZoneActions(dispatch)
    };
};

type TDispatchProps = { blogActions: BlogActions, dropZoneActions: DropZoneActions }
type TRouteProps = RouteComponentProps<{ mode: EBlogViewMode, postID: string }>;
type TStyleProps = WithStyles<typeof styles>;

export const Blog = HOC<IBlogStateProps, TDispatchProps, TStyleProps, TRouteProps>(BlogComponent, {
    mapStateToProps,
    mapDispatchToProps,
    styles,
    isWithRouter: true
});
