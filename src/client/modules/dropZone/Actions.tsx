import * as React from 'react';
import {Action} from 'redux';
import {IAppState} from '../../core/reduxStore';
import {ThunkDispatch} from 'redux-thunk';

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
    show = () => this.dispatch({type: DROP_ZONE_SHOW});

    /**
     * Hide DropZone.
     */
    hide = () => this.dispatch({type: DROP_ZONE_HIDE});

    /**
     * Enable DropZone.
     */
    enable = () => this.dispatch({type: DROP_ZONE_ENABLE});

    /**
     * Disable DropZone.
     */
    disable = () => this.dispatch({type: DROP_ZONE_DISABLE});

    /**
     * Drop event handler.
     *
     * @param {DragEvent<HTMLDivElement>} event Event.
     */
    handleDrop = (event: React.DragEvent<HTMLDivElement>) => this.dispatch(() => {
        console.log(event.dataTransfer.files);
    });

    /**
     * Drag enter handler.
     */
    handleDragEnter = () => {
        this.show();
    };

    /**
     * Drag leave handler.
     */
    handleDragLeave = () => {
        this.hide();
    };

}
