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
        '.margin-left-1': {
            marginLeft: theme.spacing.unit
        }
    },
    mainPaper: {
        width: '100%',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    }
} as StyleRules);