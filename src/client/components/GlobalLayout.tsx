import * as React from 'react';
import {MuiThemeProvider, withStyles, Grid, Paper, WithStyles} from '@material-ui/core';
import {theme} from '../Theme';
import {styles} from '../styles/components/GlobalLayout';
import * as classNames from 'classnames';
import {history} from '../core/reduxStore';
import {EBlogViewMode} from '../modules/blog/Enums';

/**
 * @prop {JSX.Element} children React children not provided by default.
 */
interface IProps {
    children: JSX.Element;
}

/**
 * Blog state.
 *
 * @prop {boolean} isDropZoneActive Becomes true on drag start.
 * @prop {boolean} isDropZoneEnabled Enabled only on predefined paths.
 */
interface IState {
    isDropZoneActive: boolean;
    isDropZoneEnabled: boolean;
}

/**
 * First render layer component.
 */
class GlobalLayoutComponent extends React.Component<IProps & WithStyles, IState> {

    state: IState = {
        isDropZoneActive: false,
        isDropZoneEnabled: false
    };

    componentWillMount() {
        // prevent files open on drop
        const dragAndDropEvents = ['dragenter', 'dragstart', 'dragend', 'dragleave', 'dragover', 'drag', 'drop'];
        dragAndDropEvents.forEach(eventType => {
            document.addEventListener(eventType, event => event.preventDefault());
        });
        history.listen(event => {
            const dragAndDropPaths = [`/blog/${EBlogViewMode.CREATE}`, `/blog/${EBlogViewMode.EDIT}`];
            this.setState({isDropZoneEnabled: dragAndDropPaths.some(path => event.pathname.indexOf(path) !== -1)});
        });
    }

    /**
     * Drag enter handler.
     */
    private handleDragEnter = () => {
        this.setState({isDropZoneActive: true});
    };

    /**
     * Drag leave handler.
     */
    private handleDragLeave = () => {
        this.setState({isDropZoneActive: false});
    };

    /**
     * Handles drop event.
     *
     * @param {DragEvent<HTMLDivElement>} event Event.
     */
    private handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        this.setState({isDropZoneActive: false});
        console.log(event.dataTransfer.files);
    };

    render() {
        const {classes, children} = this.props;
        const {isDropZoneActive, isDropZoneEnabled} = this.state;

        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    {isDropZoneEnabled &&
                    <div
                        onDragLeave={this.handleDragLeave}
                        onDrop={this.handleDrop}
                        className={classNames(classes.dropZone, {active: isDropZoneActive})}
                    >
                    </div>}
                    <Grid container onDragEnter={this.handleDragEnter}>
                        <Paper className={classes.mainPaper} square>
                            {children}
                        </Paper>
                    </Grid>
                </div>
            </MuiThemeProvider>
        );
    }
}

export const GlobalLayout = withStyles(styles)(GlobalLayoutComponent);