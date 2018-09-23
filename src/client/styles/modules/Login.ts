import {StyleRulesCallback, Theme, createStyles} from '@material-ui/core';
import {StyleRules} from '@material-ui/core/styles';

export const styles: StyleRulesCallback = (__: Theme) => createStyles({
    loginContainer: {
        color: 'white',
        width: '300px',
        textAlign: 'right',
        lineHeight: '64px',

        '& .logoutIcon': {
            color: 'white'
        },
        '& .googleIcon': {
            width: '70%',
        },
        '& .accountCircleIcon': {
            transform: 'scale(1.4)'
        },
        '& .onHoverHide': {
            transition: 'opacity .3s ease',
        },
        '& .onHoverShow': {
            opacity: 0,
            transition: 'opacity .3s ease',
            visibility: 'hidden',
            pointerEvents: 'none',
            position: 'absolute',
            right: '-2000px',
        },
        '&:hover': {
            '& .onHoverHide': {
                opacity: 0,
                visibility: 'hidden',
                pointerEvents: 'none',
                position: 'absolute',
                right: '-2000px',
            },
            '& .onHoverShow': {
                opacity: 1,
                visibility: 'visible',
                pointerEvents: 'auto',
                position: 'relative',
                right: '0'
            }
        },
    }
} as StyleRules);
