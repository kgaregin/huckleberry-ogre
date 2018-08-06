import {Reducer} from 'redux';
import {
    DROP_ZONE_SHOW,
    DROP_ZONE_HIDE,
    DROP_ZONE_ENABLE,
    DROP_ZONE_DISABLE,
} from './Actions';
import {IDropZoneStateProps} from './DropZone';

/**
 * Initial DropZone state.
 */
export const initDropZoneState: IDropZoneStateProps = {
    isDropZoneActive: false,
    isDropZoneEnabled: false,
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
        default:
            return state;
    }
};