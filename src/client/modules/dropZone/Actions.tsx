import React from 'react';
import {Action} from 'redux';
import {IAppState} from '../../core/reduxStore';
import {ThunkDispatch} from 'redux-thunk';
import forEach from 'lodash/forEach';
import {post, get, remove} from '../../core/utils/ServiceUtils';
import {EModalTabIndex} from "./DropZone";
import {IFile} from "../../../server/db/models";
import {ENotificationVariant} from "../notification/Notification";
import {NotificationActions} from "../notification/Actions";

/**
 * Action types.
 */
export const DROP_ZONE_SHOW = 'DROP_ZONE_SHOW';
export const DROP_ZONE_HIDE = 'DROP_ZONE_HIDE';
export const DROP_ZONE_ENABLE = 'DROP_ZONE_ENABLE';
export const DROP_ZONE_DISABLE = 'DROP_ZONE_DISABLE';
export const DROP_ZONE_GET_ALL_FILES = 'DROP_ZONE_GET_ALL_FILES';
export const DROP_ZONE_MODAL_TAB_CHANGE = 'DROP_ZONE_MODAL_TAB_CHANGE';

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

    /**
     * Upload files handler.
     *
     * @param {FileList} files File list to upload.
     */
    uploadFiles = (files: FileList) => this.dispatch(() => {
        const notificationActions = new NotificationActions(this.dispatch);
        let promises = [];
        forEach(files, file => {
            const formData = new FormData();
            formData.append('file', file, file.name);
            promises.push(post('file/save', formData, {noWrap: true}));
        });
        Promise.all(promises)
            .then(() => {
                this.handleTabChange(null, EModalTabIndex.GALLERY);
                notificationActions.show({
                    message: 'File(s) uploaded',
                    variant: ENotificationVariant.SUCCESS
                });
            })
            .catch(() => {
                notificationActions.show({
                    message: 'File(s) upload error',
                    variant: ENotificationVariant.ERROR
                });
            })
    });

    /**
     * Delete files handler.
     *
     * @param {number[]} identifiers Identifiers of deleting files.
     */
    deleteFiles = (identifiers: number[]) => this.dispatch(() => {
        const notificationActions = new NotificationActions(this.dispatch);
        let promises = [];
        forEach(identifiers, id => {
            promises.push(remove(`file/${id}`));
        });
        Promise.all(promises)
            .then(() => {
                this.getAllFiles();
                notificationActions.show({
                    message: 'File(s) deleted',
                    variant: ENotificationVariant.SUCCESS
                });
            })
            .catch(() => {
                notificationActions.show({
                    message: 'Deleting file(s) error',
                    variant: ENotificationVariant.ERROR
                });
            })
    });

    /**
     * Drag enter handler.
     */
    handleDragEnter = (__: React.DragEvent<HTMLDivElement>) => {
        this.handleTabChange(null, EModalTabIndex.UPLOAD);
        this.show();
    };

    /**
     * Modal tab change handler.
     *
     * @param {React.ChangeEvent} __ Change event.
     * @param {EModalTabIndex} tabIndex Tab index.
     */
    handleTabChange = (__: React.ChangeEvent, tabIndex: EModalTabIndex) => {
        if (tabIndex === EModalTabIndex.GALLERY) this.getAllFiles();
        this.dispatch({
            type: DROP_ZONE_MODAL_TAB_CHANGE,
            payload: tabIndex
        })
    };

    /**
     * Files list loading handler.
     */
    getAllFiles = () => {
        get<IFile[]>('db/files/all')
            .then(files => {
                this.dispatch({
                    type: DROP_ZONE_GET_ALL_FILES,
                    payload: files.reverse()
                })
            })
            .catch(() => {
                const notificationActions = new NotificationActions(this.dispatch);
                notificationActions.show({
                    message: 'Failed loading files list',
                    variant: ENotificationVariant.ERROR
                });
            });
    };
}
