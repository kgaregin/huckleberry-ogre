import * as React from 'react';
import {Component} from 'react';
import {EBlogViewMode, ETabIndex} from './Enums';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {
    Tabs,
    Tab,
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
import parser from 'bbcode-to-react';

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
 *
 * @prop {IBlogActions} actions Actions.
 */
interface IProps extends IBlogOwnProps, RouteComponentProps<{ mode: EBlogViewMode, postID: string }>, WithStyles<typeof styles> {
    actions: IBlogActions;
}

/**
 * Blog state.
 *
 * @prop {number} tabIndex Tab index.
 */
interface IState {
    tabIndex: number;
}

class BlogComponent extends Component<IProps, IState> {

    state: IState = {
        tabIndex: 0
    };

    componentWillMount() {
        this.props.actions.requestBlogPosts(undefined, this.props.match.params);
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
                        postID
                    }
            }
        } = this.props;
        submitBlogPost(+postID, mode);
    };

    /**
     * Create post button click handler.
     */
    private handleCreatePostButtonClick = () => {
        this.props.actions.clearPostEditForm();
        handleLocationChange('/blog/create');
    };

    /**
     * Remove post button click handler.
     *
     * @param {number} postID Identifier of post being removed.
     */
    private handlePostRemove = (postID: number) => {
        this.props.actions.removePostByID(postID);
    };

    /**
     * Edit post button click handler.
     *
     * @param {number} postID Post identifier.
     */
    private handlePostEdit = (postID: number) => {
        const {fillPostEditForm} = this.props.actions;
        fillPostEditForm(postID);
        handleLocationChange(`/blog/edit/${postID}`);
    };

    /**
     * Tab change handler.
     *
     * @param {React.ChangeEvent<{}>} __ Event.
     * @param {number} tabIndex New tab index.
     */
    private handleTabChange = (__: React.ChangeEvent<{}>, tabIndex: number) => {
        this.setState({tabIndex});
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
                                    value={message}
                                    rows={'28'}
                                    onChange={event => handleFormInput('message', event.currentTarget.value)}
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

    render() {
        const mode = this.props.match.params.mode || EBlogViewMode.READ;
        const {classes, posts} = this.props;

        if (mode === EBlogViewMode.CREATE || mode === EBlogViewMode.EDIT) {
            return this.renderPostEdit();
        }

        return (
            <div>
                {sortBy(posts, 'id').map(post =>
                    post.message &&
                    <Paper className={classes.postPaper} key={post.id}>
                        <Grid container>
                            <Grid item md={11} xs={12}>
                                {post.title &&
                                <Typography variant="title" gutterBottom align={'center'}>
                                    {post.title}
                                </Typography>}
                                {post.title && <Divider className={classes.postDivider}/>}
                                <Typography variant="body1" gutterBottom align={'left'}>
                                    {parser.toReact(post.message)}
                                </Typography>
                            </Grid>
                            <Divider className={classNames(classes.postDivider, 'display-none-md-up')}/>
                            <Grid item md={1} xs={12} className={classes.postActions}>
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

type TRouterProps = RouteComponentProps<{ mode: EBlogViewMode, postID: string }>;
type TStyleProps = WithStyles<typeof styles>;

type TDispatchProps = { actions: IBlogActions }

const Connected: React.ComponentClass<TStyleProps & TRouterProps> = connect<IBlogOwnProps, TDispatchProps, TStyleProps & TRouterProps>(mapStateToProps, mapDispatchToProps)((props: IProps) =>
    <BlogComponent {...props}/>);
const WithRouterConnected: React.ComponentClass<TStyleProps> = withRouter((props: TStyleProps & TRouterProps) =>
    <Connected {...props}/>);
const WithRouterConnectedStyled: React.ComponentType<StyledComponentProps> = withStyles(styles)((props: TStyleProps) =>
    <WithRouterConnected {...props}/>);

export {WithRouterConnectedStyled as Blog};