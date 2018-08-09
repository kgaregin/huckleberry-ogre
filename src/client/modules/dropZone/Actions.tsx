import React from 'react';
import {Action} from 'redux';
import {IAppState} from '../../core/reduxStore';
import {ThunkDispatch} from 'redux-thunk';
import forEach from 'lodash/forEach';
import {post} from '../../core/utils/ServiceUtils';

/**
 * Action types.
 */
export const DROP_ZONE_SHOW = 'DROP_ZONE_SHOW';
export const DROP_ZONE_HIDE = 'DROP_ZONE_HIDE';
export const DROP_ZONE_ENABLE = 'DROP_ZONE_ENABLE';
export const DROP_ZONE_DISABLE = 'DROP_ZONE_DISABLE';

/**
 * Blog actions.
 */
export class DropZoneActions {
    constructor(private dispatch: ThunkDispatch<IAppState, void, Action>) {
    }

    /**
     * Show DropZone.
     */
    show = () => this.dispatch((dispatch, getState) => {
            const {isDropZoneActive, isDropZoneEnabled} = getState().dropZoneState;
            !isDropZoneActive && isDropZoneEnabled && dispatch({type: DROP_ZONE_SHOW});
        }
    );

    /**
     * Hide DropZone.
     */
    hide = () => this.dispatch((dispatch, getState) => (
            getState().dropZoneState.isDropZoneActive && dispatch({type: DROP_ZONE_HIDE})
        )
    );

    /**
     * Enable DropZone.
     */
    enable = () => this.dispatch((dispatch, getState) => (
            !getState().dropZoneState.isDropZoneEnabled && dispatch({type: DROP_ZONE_ENABLE})
        )
    );

    /**
     * Disable DropZone.
     */
    disable = () => this.dispatch((dispatch, getState) => {
            if (getState().dropZoneState.isDropZoneEnabled) {
                dispatch({type: DROP_ZONE_DISABLE});
            }
            this.hide();
        }
    );

    uploadFiles = (files: FileList) => this.dispatch(() => {
        forEach(files, file => {
            const formData = new FormData();
            formData.append('file', file, file.name);
            post('file/save', formData, {noWrap: true})
        })
    });

    /**
     * Drag enter handler.
     */
    handleDragEnter = (__: React.DragEvent<HTMLDivElement>) => {
        this.show();
    };

    /**
     * Drag leave handler.
     */
    handleDragLeave = () => {
        this.hide();
    };

}
