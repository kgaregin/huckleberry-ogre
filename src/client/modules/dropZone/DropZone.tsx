import * as React from 'react';
import {WithStyles, Modal} from '@material-ui/core';
import {styles} from '../../styles/modules/DropZone';
import {HOC} from '../../core/utils/HOC';
import {IAppState} from '../../core/reduxStore';
import {DropZoneActions} from './Actions';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';

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
 * First render layer component.
 */
class DropZoneComponent extends React.Component<IDropZoneStateProps & TStyleProps & TDispatchProps> {

    render() {
        const {classes} = this.props;
        const {isDropZoneActive, isDropZoneEnabled, actions} = this.props;

        return (
            isDropZoneEnabled ?
                (
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={isDropZoneActive}
                        onClose={actions.hide}
                        onDrop={actions.handleDrop}
                    >
                        <div id="dropZone" className={classes.paper}>
                            {'my text'}
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
