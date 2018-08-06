import * as React from 'react';
import {MapStateToPropsParam, MapDispatchToPropsParam} from 'react-redux';
import {IAppState} from '../reduxStore';
import {StyleRulesCallback, StyleRules, withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

/**
 * HOC function settings.
 *
 * @param {MapStateToPropsParam | null} settings.mapStateToProps State props.
 * @param {MapDispatchToPropsParam | null} settings.mapDispatchToProps Dispatch props.
 * @param {StyleRulesCallback | StyleRules} [settings.styles] If provided, wuthStyles hoc added.
 * @param {boolean} [settings.isWithRouter] Should router be connected flag.
 */
interface IHOCSettings<TStateProps, TDispatchProps, TStyleProps, TRouteProps> {
    mapStateToProps: MapStateToPropsParam<TStateProps, TStyleProps & TRouteProps, IAppState> | null,
    mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TStyleProps & TRouteProps> | null,
    styles?: StyleRulesCallback | StyleRules,
    isWithRouter?: boolean
}

/**
 * Higher order component creator function.
 * Can apply following HOCs (according to settings passed):
 * connect - react-redux
 * withRouter - react-router-dom
 * withStyles - material-ui
 *
 * @param {typeof React.Component} Component The Component to be augmented.
 * @param {IHOCSettings} [settings] Settings.
 */
export function HOC<TStateProps, TDispatchProps, TStyleProps, TRouteProps>(
    Component: typeof React.Component,
    settings: IHOCSettings<TStateProps, TDispatchProps, TStyleProps, TRouteProps>
) {
    let ConnectedComponent: typeof React.Component;

    if (settings.mapStateToProps && settings.mapDispatchToProps) {
        ConnectedComponent = connect<TStateProps, TDispatchProps, TStyleProps & TRouteProps, IAppState>(
            settings.mapStateToProps,
            settings.mapDispatchToProps
        )(
            (props: TStateProps & TDispatchProps & TStyleProps & TRouteProps) => <Component {...props}/>
        );
    } else if (settings.mapStateToProps) {
        ConnectedComponent = connect<TStateProps, {}, TStyleProps & TRouteProps, IAppState>(
            settings.mapStateToProps
        )(
            (props: TStateProps & TStyleProps & TRouteProps) => <Component {...props}/>
        );
    } else if (settings.mapDispatchToProps) {
        ConnectedComponent = connect<{}, TDispatchProps, TStyleProps & TRouteProps, IAppState>(
            null,
            settings.mapDispatchToProps
        )(
            (props: TDispatchProps & TStyleProps & TRouteProps) => <Component {...props}/>
        );
    } else {
        ConnectedComponent = Component;
    }

    const WithRouterConnectedComponent = settings.isWithRouter ? withRouter(
        (props) =>
            <ConnectedComponent {...props}/>
    ) : ConnectedComponent;

    return settings.styles ? withStyles(settings.styles)(
        (props) =>
            <WithRouterConnectedComponent {...props}/>
    ) : WithRouterConnectedComponent;
}