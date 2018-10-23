import {StyleRulesCallback, Theme, createStyles} from '@material-ui/core';
import {StyleRules} from '@material-ui/core/styles';

export const styles: StyleRulesCallback = (__: Theme) => createStyles({
    field: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    }
} as StyleRules);
