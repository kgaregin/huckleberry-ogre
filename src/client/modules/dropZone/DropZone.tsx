import * as React from 'react';
import {
    WithStyles,
    Modal,
    Tabs,
    Tab,
    AppBar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    TextField,
    InputAdornment
} from '@material-ui/core';
import {styles} from '../../styles/modules/DropZone';
import {HOC} from '../../core/utils/HOC';
import {IAppState} from '../../core/reduxStore';
import {DropZoneActions} from './Actions';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {isInsideElement} from './Utils';
import * as classNames from 'classnames';

/**
 * DropZone state.
 *
 * @prop {boolean} isDropZoneActive Becomes true on drag start.
 * @prop {boolean} isDropZoneEnabled Enabled only on predefined paths.
 */
export interface IDropZoneStateProps {
    isDropZoneActive: boolean;
    isDropZoneEnabled: boolean;
}

/**
 * State.
 *
 * @prop {EModalTabIndex} tabIndex Tab index.
 * @prop {EDragPosition} dragPosition Drag object position relative to dropZone.
 */
interface IState {
    tabIndex: EModalTabIndex;
    dragPosition: EDragPosition;
}

enum EDragPosition {
    INSIDE,
    OUTSIDE
}

enum EModalTabIndex {
    UPLOAD,
    GALLERY
}

/**
 * DropZone component.
 */
class DropZoneComponent extends React.Component<IDropZoneStateProps & TStyleProps & TDispatchProps, IState> {

    state: IState = {
        tabIndex: EModalTabIndex.UPLOAD,
        dragPosition: EDragPosition.OUTSIDE
    };

    dropZone: HTMLDivElement;
    filesInput: HTMLInputElement;

    /**
     * Tab change handler.
     *
     * @param {React.ChangeEvent<{}>} __ Event.
     * @param {EModalTabIndex} tabIndex New tab index.
     */
    handleTabChange = (__: React.ChangeEvent<{}>, tabIndex: EModalTabIndex) => {
        this.setState({tabIndex});
    };

    handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            console.log('process url');
        }
    };

    handleDragEnter = (event: React.DragEvent<Element>) => {
        if (isInsideElement(event, '#dropZone')) {
            this.setState({dragPosition: EDragPosition.INSIDE});
        }
    };

    handleDragLeave = (__: React.DragEvent<Element>) => {
        this.setState({dragPosition: EDragPosition.OUTSIDE});
    };

    dropZoneRef = (ref: HTMLDivElement) => {
        this.dropZone = ref;
    };

    filesInputRef = (ref: HTMLInputElement) => {
        this.filesInput = ref;
    };

    handleDrop = (event: React.DragEvent<Element>) => {
        this.setState({dragPosition: EDragPosition.OUTSIDE});
        this.props.actions.handleDrop(event);
    };

    handleFilesInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files);
    };

    render() {
        const {isDropZoneActive, isDropZoneEnabled, actions, classes} = this.props;
        const {tabIndex, dragPosition} = this.state;

        return (
            isDropZoneEnabled ?
                (
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={isDropZoneActive}
                        onClose={actions.hide}
                        onDrop={this.handleDrop}
                    >
                        <div className={classes.paper}>
                            <AppBar position="absolute" color="default" className={classes.modalAppBar}>
                                <Tabs
                                    value={tabIndex}
                                    onChange={this.handleTabChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    fullWidth
                                >
                                    <Tab label="upload"/>
                                    <Tab label="gallery"/>
                                </Tabs>
                            </AppBar>
                            <div className={classes.modalContent}>
                                {tabIndex === EModalTabIndex.UPLOAD && (
                                    <div className={classes.uploadTab}>
                                        <TextField
                                            id='urlInput'
                                            InputProps={{
                                                startAdornment: <InputAdornment
                                                    position="start">{'Enter URL:'}</InputAdornment>,
                                            }}
                                            fullWidth
                                            onKeyPress={this.handleKeyPress}
                                            className='margin-bottom-2'
                                        />
                                        <div
                                            id="dropZone"
                                            className={classNames(classes.dropZone, {active: dragPosition === EDragPosition.INSIDE})}
                                            onDragEnter={this.handleDragEnter}
                                            onDragLeave={this.handleDragLeave}
                                            ref={this.dropZoneRef}
                                        >
                                            <Typography className={classes.dropZoneDescription} color='primary'
                                                        variant='subheading'>
                                                {'Drop files here or'}
                                                <Button
                                                    variant="contained"
                                                    size='small'
                                                    color="default"
                                                    className='margin-left-1'
                                                    onClick={()=> this.filesInput.click()}
                                                >
                                                    {'upload'}
                                                    <CloudUploadIcon className='margin-left-1'/>
                                                </Button>
                                                <input
                                                    accept="image/*"
                                                    className={classes.filesInput}
                                                    id="filesInput"
                                                    multiple
                                                    type="file"
                                                    ref={this.filesInputRef}
                                                    onChange={this.handleFilesInputChange}
                                                />
                                            </Typography>
                                        </div>
                                    </div>
                                )}
                                {tabIndex === EModalTabIndex.GALLERY && (
                                    <Card className={classes.card}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image="http://localhost:3001/rest/blog/image"
                                            title="Samurai Jack"
                                        />
                                        <CardContent>
                                            <Typography component="p">
                                                filename
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" color="primary">
                                                Delete
                                            </Button>
                                            <Button size="small" color="primary">
                                                Add
                                            </Button>
                                        </CardActions>
                                    </Card>)}
                            </div>
                        </div>
                    </Modal>
                ) : null
        );
    }
}

const mapStateToProps = (state: IAppState) => state.dropZoneState;

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => {
    return {
        actions: new DropZoneActions(dispatch)
    };
};

type TDispatchProps = { actions: DropZoneActions };
type TStyleProps = WithStyles<typeof styles>;

export const DropZone = HOC<IDropZoneStateProps, TDispatchProps, TStyleProps, {}>(
    DropZoneComponent,
    {
        mapStateToProps,
        mapDispatchToProps,
        styles
    }
);
