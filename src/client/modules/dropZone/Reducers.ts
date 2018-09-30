import {Reducer} from 'redux';
import {
    DROP_ZONE_SHOW,
    DROP_ZONE_HIDE,
    DROP_ZONE_ENABLE,
    DROP_ZONE_DISABLE,
    DROP_ZONE_MODAL_TAB_CHANGE,
    DROP_ZONE_GET_ALL_FILES,
} from './Actions';
import {IDropZoneStateProps} from './DropZone';

/**
 * Tab index of modal window.
 */
export enum EModalTabIndex {
    UPLOAD,
    GALLERY
}

/**
 * Initial DropZone state.
 */
export const initDropZoneState: IDropZoneStateProps = {
    isDropZoneActive: false,
    isDropZoneEnabled: false,
    tabIndex: EModalTabIndex.UPLOAD,
    files: []
};

/**
 * Blog reducer.
 */
export const dropZoneState: Reducer<IDropZoneStateProps> = (state: IDropZoneStateProps = initDropZoneState, action) => {
    switch (action.type) {
        case DROP_ZONE_SHOW:
            return {
                ...state,
                isDropZoneActive: true
            };
        case DROP_ZONE_HIDE:
            return {
                ...state,
                isDropZoneActive: false
            };
        case DROP_ZONE_ENABLE:
            return {
                ...state,
                isDropZoneEnabled: true
            };
        case DROP_ZONE_DISABLE:
            return {
                ...state,
                isDropZoneEnabled: false
            };
        case DROP_ZONE_MODAL_TAB_CHANGE:
            return {
                ...state,
                tabIndex: action.payload
            };
        case DROP_ZONE_GET_ALL_FILES:
            return {
                ...state,
                files: action.payload
            };
        default:
            return state;
    }
};