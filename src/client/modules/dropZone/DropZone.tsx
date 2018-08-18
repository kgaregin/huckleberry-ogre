import React from 'react';
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
import classNames from 'classnames';
import {IFile} from '../../../server/db/models';

/**
 * DropZone state.
 *
 * @prop {boolean} isDropZoneActive Becomes true on drag start.
 * @prop {boolean} isDropZoneEnabled Enabled only on predefined paths.
 * @prop {EModalTabIndex} tabIndex Tab index.
 * @prop {IFile[]} files File list from db.
 */
export interface IDropZoneStateProps {
    isDropZoneActive: boolean;
    isDropZoneEnabled: boolean;
    tabIndex: EModalTabIndex;
    files: IFile[]
}

/**
 * State.
 *
 * @prop {EDragPosition} dragPosition Drag object position relative to dropZone.
 */
interface IState {
    dragPosition: EDragPosition;
}

enum EDragPosition {
    INSIDE,
    OUTSIDE
}

export enum EModalTabIndex {
    UPLOAD,
    GALLERY
}

/**
 * DropZone component.
 */
class DropZoneComponent extends React.Component<IDropZoneStateProps & TStyleProps & TDispatchProps, IState> {

    state: IState = {
        dragPosition: EDragPosition.OUTSIDE
    };

    dropZone: HTMLDivElement;
    filesInput: HTMLInputElement;

    // ToDo: jsDocs!
    handleUrlKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            // ToDo: add support for urls
            console.log('process url');
        }
    };

    handleModalKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Escape') {
            this.props.actions.hide();
        }
    };

    handleDragEnter = (event: React.DragEvent<Element>) => {
        if (isInsideElement(event, '#dropZone')) {
            this.setState({dragPosition: EDragPosition.INSIDE});
        }
    };

    handleDragLeave = () => {
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
        if (isInsideElement(event, '#dropZone')) {
            this.handleUploadFiles(event.dataTransfer.files);
        }
    };

    handleFilesInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.handleUploadFiles(event.target.files);
    };

    handleUploadFiles = (files: FileList) => {
        const {uploadFiles} = this.props.actions;

        uploadFiles(files);
    };

    handleFilesDelete = (files: number[]) => {
      this.props.actions.deleteFiles(files);
    };

    render() {
        const {isDropZoneActive, isDropZoneEnabled, actions, classes, tabIndex, files} = this.props;
        const {dragPosition} = this.state;

        return (
            isDropZoneEnabled ?
                (
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={isDropZoneActive}
                        onClose={actions.hide}
                        onDrop={this.handleDrop}
                        onKeyPress={this.handleModalKeyPress}
                        onDragEnter={actions.handleDragEnter}
                    >
                        <div className={classes.paper}>
                            <AppBar position="absolute" color="default" className={classes.modalAppBar}>
                                <Tabs
                                    value={tabIndex}
                                    onChange={actions.handleTabChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    fullWidth
                                >
                                    <Tab label="upload"/>
                                    <Tab label="gallery"/>
                                </Tabs>
                            </AppBar>
                            <div
                                className={classNames(
                                    classes.modalContent,
                                    {'gallery': tabIndex === EModalTabIndex.GALLERY})
                                }
                            >
                                {tabIndex === EModalTabIndex.UPLOAD && (
                                    <div className={classes.uploadTab}>
                                        <TextField
                                            id='urlInput'
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        {'Enter URL:'}
                                                    </InputAdornment>
                                                ),
                                            }}
                                            fullWidth
                                            onKeyPress={this.handleUrlKeyPress}
                                            className='margin-bottom-2'
                                        />
                                        <div
                                            id="dropZone"
                                            className={classNames(classes.dropZone, {active: dragPosition === EDragPosition.INSIDE})}
                                            onDragEnter={this.handleDragEnter}
                                            onDragLeave={this.handleDragLeave}
                                            ref={this.dropZoneRef}
                                        >
                                            <Typography
                                                className={classes.dropZoneDescription}
                                                color='primary'
                                                variant='subheading'
                                            >
                                                {'Drop files here or'}
                                                <Button
                                                    variant="contained"
                                                    size='small'
                                                    color="default"
                                                    className='margin-left-1'
                                                    onClick={() => this.filesInput.click()}
                                                >
                                                    {'upload'}
                                                    <CloudUploadIcon className='margin-left-1'/>
                                                </Button>
                                                <input
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
                                {tabIndex === EModalTabIndex.GALLERY &&
                                files.map(file => (
                                    <Card className={classes.card} key={file.id}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image={`http://localhost:3001/rest/file/${file.id}`}
                                        />
                                        <CardContent className={classes.cardContent}>
                                            <Typography
                                                component="p"
                                                className="text-ellipsis"
                                                title={file.name}
                                            >
                                                {file.name}
                                            </Typography>
                                        </CardContent>
                                        <CardActions className={classes.cardActions}>
                                            <Button
                                                size="small"
                                                color="primary"
                                                onClick={() => this.handleFilesDelete([file.id])}
                                            >
                                                Delete
                                            </Button>
                                            <Button size="small" color="primary">
                                                Add
                                            </Button>
                                        </CardActions>
                                    </Card>)
                                )}
                            </div>
                            {/* ToDo: add modal with fullscreen file preview */}
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
