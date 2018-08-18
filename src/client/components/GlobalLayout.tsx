import React from 'react';
import {MuiThemeProvider, Grid, Paper, WithStyles} from '@material-ui/core';
import {theme} from '../Theme';
import {styles} from '../styles/components/GlobalLayout';
import {preventDefaultDragNDropEvents} from '../modules/dropZone/Utils';
import {DropZone} from '../modules/dropZone/DropZone';
import {HOC} from '../core/utils/HOC';
import {IAppState} from '../core/reduxStore';
import {DropZoneActions} from '../modules/dropZone/Actions';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import {EBlogViewMode} from '../modules/blog/Enums';
import RouteParser from 'route-parser';
import {Location, Action as HistoryAction} from 'history';
import {BlogActions} from '../modules/blog/Actions';
import {RouteComponentProps} from 'react-router-dom';

/**
 * @prop {JSX.Element} children React children not provided by default.
 */
interface IProps extends TStyleProps, TDispatchProps, TRouteProps{
    children: JSX.Element;
}

/**
 * First layer component.
 */
class GlobalLayoutComponent extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
        const {history} = this.props;
        this.handleLocationChange(history.location, history.action);
        history.listen((location, action) => this.handleLocationChange(location, action));
    }

    handleLocationChange = (location: Location, __: HistoryAction) => {
        const {blogActions, dropZoneActions} = this.props;
        const blogPageRoute = new RouteParser('/blog(/:mode)(/:postID)');
        const blogPageRouteMatch = blogPageRoute.match(location.pathname);
        let isDropZoneEnabled = false;

        if (blogPageRouteMatch){
            blogActions.requestBlogPosts().then(() => {
                if (blogPageRouteMatch.mode === EBlogViewMode.EDIT && blogPageRouteMatch.postID) {
                    blogActions.fillPostEditForm(+blogPageRouteMatch.postID);
                }
            });
            if (blogPageRouteMatch.mode === EBlogViewMode.EDIT || blogPageRouteMatch.mode === EBlogViewMode.CREATE) {
                isDropZoneEnabled = true;
            }
        }

        isDropZoneEnabled ? dropZoneActions.enable() : dropZoneActions.disable();
    };

    componentWillMount() {
        preventDefaultDragNDropEvents();
    }

    render() {
        const {classes, children, dropZoneActions} = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <DropZone/>
                    <Grid container onDragEnter={dropZoneActions.handleDragEnter}>
                        <Paper className={classes.mainPaper} square>
                            {children}
                        </Paper>
                    </Grid>
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => {
    return {
        blogActions: new BlogActions(dispatch),
        dropZoneActions: new DropZoneActions(dispatch)
    };
};

type TRouteProps = RouteComponentProps<{ mode: EBlogViewMode, postID: string }>;
type TDispatchProps = { blogActions: BlogActions, dropZoneActions: DropZoneActions }
type TStyleProps = WithStyles<typeof styles>;

export const GlobalLayout = HOC<{}, TDispatchProps, TStyleProps, TRouteProps>(
    GlobalLayoutComponent,
    {
        mapStateToProps: null,
        mapDispatchToProps,
        styles,
        isWithRouter: true
    }
);