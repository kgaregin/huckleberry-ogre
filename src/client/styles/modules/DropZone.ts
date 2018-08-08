import {StyleRulesCallback, Theme, createStyles} from '@material-ui/core';
import {StyleRules} from '@material-ui/core/styles';

export const styles: StyleRulesCallback = (theme: Theme) => createStyles({
    paper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate3d(-50%, -50%, 0)',
        width: '55%',
        minHeight: '60vh',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        zIndex: 2000,
        borderRadius: '5px'
    },
    modalContent: {
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        padding: '66px 16px 16px',
        boxSizing: 'border-box',

    },
    card: {
        width: '200px',
        display: 'inline-block',
        margin: '8px 8px',
    },
    cardMedia: {
        paddingTop: '52%',
        backgroundSize: 'contain',
        backgroundColor: theme.palette.grey[50],
        borderBottom: `1px solid ${theme.palette.grey[400]}`
    },
    urlInput: {
        margin: theme.spacing.unit,
    },
    modalAppBar: {
        borderTopRightRadius: '5px',
        borderTopLeftRadius: '5px',
    },
    dropZone: {
        display: 'flex',
        flexGrow: 1,
        borderRadius: 5,
        border: `2px dashed ${theme.palette.primary.main}`,

        '&.active': {
            borderColor: theme.palette.secondary.main,
            borderStyle: 'solid',

            '& *': {
                pointerEvents: 'none'
            }
        }
    },
    uploadTab: {
        display: 'flex',
        minHeight: '100%',
        flexDirection: 'column',
    },
    dropZoneDescription: {
        margin: 'auto'
    },
    filesInput: {
        display: 'none'
    }
} as StyleRules);