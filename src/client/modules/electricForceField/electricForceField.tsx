import React from 'react';
import {HOC} from '../../core/utils/HOC';
import {styles} from '../../styles/modules/electricForceField';
import {WithStyles} from '@material-ui/core';
import * as d3 from 'd3';
import {Selection} from 'd3';
import last from 'lodash/last';
import {getNextPoint} from './Utils';

export const CHARGE_CIRCLE_RADIUS = 10;
export const START_DELTA = 5;
export const LINE_INCREMENT = 3;
export const RAY_COUNT = 14;
export const CHARGE_VALUE = 1;

export enum EAxis {
    X = 'x',
    Y = 'y'
}

export interface IPoint {
    x: number,
    y: number
}

export interface IChargeData extends IPoint {
}

export type TPoint = [number, number];

class ElectricForceFieldComponent extends React.Component<TStyleProps> {

    rootSVG: Selection<SVGSVGElement, any[], HTMLElement, any[]>;
    rootSVG_X: number;
    rootSVG_Y: number;
    group: Selection<SVGGElement, any[], HTMLElement, any[]>;
    charges: Selection<SVGCircleElement, IChargeData, SVGGElement, any[]>;

    componentDidMount() {
        this.rootSVG = d3.select('#electro');
        const {left, top} = this.rootSVG.node().getBoundingClientRect();
        this.rootSVG_X = left;
        this.rootSVG_Y = top;
        this.group = this.rootSVG.append<SVGGElement>('g').call(
            d3.zoom<SVGGElement, any[]>()
                .scaleExtent([1 / 2, 8])
                .on('zoom', () => {
                    this.group.attr('transform', d3.event.transform);
                })
        );
    }

    handleClick = (event: React.MouseEvent) => {
        if (event.target === this.rootSVG.node()) {
            const innerX = event.clientX - this.rootSVG_X;
            const innerY = event.clientY - this.rootSVG_Y;

            this.group.append<SVGCircleElement>('circle')
                .attr('cx', innerX)
                .attr('cy', innerY)
                .attr('r', CHARGE_CIRCLE_RADIUS)
                .attr('fill', 'red')
                .data<IChargeData>([{x: innerX, y: innerY}])
                .call(d3.drag().on('drag', this.dragged));

            this.charges = this.group.selectAll<SVGCircleElement, IChargeData>('circle');
            this.drawForceLines();
        }
    };

    dragged(_, __, element) {
        d3.select(element[0]).attr('cx', d3.event.x).attr('cy', d3.event.y);
    };

    drawForceLines = () => {


        this.rootSVG.selectAll<SVGPathElement, {}>('path').remove();

        if (this.charges.size() > 1) {
            this.charges.data().forEach((charge: IChargeData) => {
                const {x: rootChargeNode_X, y: rootChargeNode_Y} = charge;

                for (let rayNumber = 0; rayNumber < RAY_COUNT; rayNumber++) {
                    const startPoint_X = rootChargeNode_X + START_DELTA * Math.cos(rayNumber * 2 * Math.PI / RAY_COUNT);
                    const startPoint_Y = rootChargeNode_Y + START_DELTA * Math.sin(rayNumber * 2 * Math.PI / RAY_COUNT);
                    const forceLinePoints: TPoint[] = [[startPoint_X, startPoint_Y]];
                    let i = 0;

                    do {
                        i++;
                        const [x, y] = last(forceLinePoints);
                        const currentPoint = {x, y};
                        const next_X = getNextPoint(currentPoint, this.charges.data(), EAxis.X);
                        const next_Y = getNextPoint(currentPoint, this.charges.data(), EAxis.Y);
                        forceLinePoints.push([next_X, next_Y]);
                    }
                    while (
                        i < 1000
                        /* current position exceed rootSVG or within minimal range near any other charge */
                        );
                    this.drawLine(forceLinePoints);
                }
            });
        }
    };

    drawLine = (points: TPoint[]) => {
        this.rootSVG.append('path')
            .attr('stroke', 'red')
            .attr('fill', 'none')
            .attr('d', d3.line()(points));
    };

    render() {
        return (
            <svg id="electro" className={this.props.classes.field} onClick={this.handleClick}/>
        );
    }
}

type TStyleProps = WithStyles<typeof styles>;

export const ElectricForceField = HOC<{}, {}, TStyleProps, {}>(
    ElectricForceFieldComponent,
    {
        mapStateToProps: null,
        mapDispatchToProps: null,
        styles
    }
);
