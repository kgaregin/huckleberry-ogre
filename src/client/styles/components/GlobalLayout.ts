import {StyleRulesCallback, Theme, createStyles} from '@material-ui/core';
import {StyleRules} from '@material-ui/core/styles';

export const styles: StyleRulesCallback = (theme: Theme) => createStyles({
    '@global': {
        a: {
            color: 'inherit',
            textDecoration: 'none'
        },
        '.text-center': {
            textAlign: 'center'
        },
        '.display-none-md-up': {
            [theme.breakpoints.up('md')]: {
                display: 'none'
            }
        },
        '.text-ellipsis': {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
        },
        '.margin-top-0': {
            marginTop: 0
        },
        '.margin-right-0': {
            marginRight: 0
        },
        '.margin-bottom-0': {
            marginBottom: 0
        },
        '.margin-left-0': {
            marginLeft: 0
        },
        '.margin-top-1': {
            marginTop: theme.spacing.unit
        },
        '.margin-right-1': {
            marginRight: theme.spacing.unit
        },
        '.margin-bottom-1': {
            marginBottom: theme.spacing.unit
        },
        '.margin-left-1': {
            marginLeft: theme.spacing.unit
        },
        '.margin-top-2': {
            marginTop: theme.spacing.unit * 2
        },
        '.margin-right-2': {
            marginRight: theme.spacing.unit * 2
        },
        '.margin-bottom-2': {
            marginBottom: theme.spacing.unit * 2
        },
        '.margin-left-2': {
            marginLeft: theme.spacing.unit * 2
        },
    },
    mainPaper: {
        width: '100%',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    }
} as StyleRules);