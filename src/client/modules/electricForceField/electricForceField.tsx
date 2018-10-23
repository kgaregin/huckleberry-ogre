import React from 'react';
import {HOC} from '../../core/utils/HOC';
import {styles} from '../../styles/modules/electricForceField';
import {WithStyles} from '@material-ui/core';
import * as d3 from 'd3';
import {Selection} from 'd3';
import last from 'lodash/last';

const CHARGE_CIRCLE_RADIUS = 10;
const START_DELTA = 5;
const LINE_INCREMENT = 2;
const RAY_COUNT = 14;
const CHARGE_VALUE = 1;

enum EAxis {
    X = 'x',
    Y = 'y'
}

interface IPoint {
    x: number,
    y: number
}

interface IChargeData extends IPoint {
}

type TPoint = [number, number];

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
        const {x: rootChargeNode_X, y: rootChargeNode_Y} = this.charges.data()[0];

        if (this.charges.size() > 1) {

            console.log(`Charges: ${JSON.stringify(this.charges)}`);
            console.log(`Charges data: ${JSON.stringify(this.charges.data())}`);
            for (let rayNumber = 1; rayNumber < RAY_COUNT; rayNumber++) {
                const startPoint_X = rootChargeNode_X + START_DELTA * Math.cos(rayNumber * 2 * Math.PI / RAY_COUNT);
                const startPoint_Y = rootChargeNode_Y + START_DELTA * Math.sin(rayNumber * 2 * Math.PI / RAY_COUNT);
                const forceLinePoints: TPoint[] = [[startPoint_X, startPoint_Y]];
                console.log(`Start point: {x: ${startPoint_X}, y: ${startPoint_Y}}`);
                let i = 0;

                do {
                    i++;
                    const [x, y] = last(forceLinePoints);
                    const currentPoint = {x, y};
                    console.log(`Current point: ${JSON.stringify(currentPoint)}`);
                    const next_X = this.getNextPoint(currentPoint, this.charges.data(), EAxis.X);
                    const next_Y = this.getNextPoint(currentPoint, this.charges.data(), EAxis.Y);
                    forceLinePoints.push([next_X, next_Y]);
                }
                while (
                    i < 10
                    /* current position exceed rootSVG or within minimal range near any other charge */
                    );
                this.drawLine(forceLinePoints);
            }
        }
    };

    getNextPoint = (point: IPoint, chargeSet: IChargeData[], axis: EAxis) => {
        /* using Runge-Kutta method, see https://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods */
        console.log(`------------------------Runge-Kutta for axis ${axis}-----------------------------`);
        console.log('------------------------k1-----------------------------');
        const k1 = this.getElectricFieldValueForPoint(point, chargeSet, axis);
        console.log('------------------------k2-----------------------------');
        const k2 = this.getElectricFieldValueForPoint({
                ...point,
                [axis]: point[axis] + (LINE_INCREMENT / 2) * k1
            },
            chargeSet,
            axis
        );
        console.log('------------------------k3-----------------------------');
        const k3 = this.getElectricFieldValueForPoint({
                ...point,
                [axis]: point[axis] + (LINE_INCREMENT / 2) * k2
            },
            chargeSet,
            axis
        );
        console.log('------------------------k4-----------------------------');
        const k4 = this.getElectricFieldValueForPoint({
                ...point,
                [axis]: point[axis] + LINE_INCREMENT * k3
            },
            chargeSet,
            axis
        );

        console.log('------------------------Result-----------------------------');
        console.log(`${JSON.stringify({k1, k2, k3, k4})}`);
        console.log(`${axis} + d${axis} = ${point[axis]} + ${(LINE_INCREMENT / 6) * (k1 + 2 * k2 + 2 * k3 + k4)}`);

        return point[axis] + (LINE_INCREMENT / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
    };

    getElectricFieldValueForPoint = (point: IPoint, chargeSet: IChargeData[], axis: EAxis) => {
        const totalElectricField = chargeSet.reduce<number>(
            (fieldValue, charge) => {
                // console.log(`Distance between ${JSON.stringify(point)} and ${JSON.stringify(charge)}: ${this.getDistance(point, charge)}`);
                console.log(`Electric field increment: ${CHARGE_VALUE / this.getDistance(point, charge)}`);
                return fieldValue + CHARGE_VALUE / this.getDistance(point, charge);
            },
            0
        );
        console.log(`--> E: ${totalElectricField}`);
        const electricFieldAlongAxis = chargeSet.reduce<number>(
            (fieldValue, charge) => {
                // console.log(`Distance between ${JSON.stringify(point)} and ${JSON.stringify(charge)}: ${this.getDistance(point, charge)}`);
                // console.log(`Distance between ${JSON.stringify(point)} and ${JSON.stringify(charge)} along ${axis}: ${Math.abs(point[axis] - charge[axis])}`);
                const increment = CHARGE_VALUE / (this.getDistance(point, charge) * ( axis === EAxis.X ? point.x - charge.x : charge.y - point.y));
                console.log(`Electric field along ${axis} increment: ${increment}`);

                return fieldValue + increment;
            },
            0
        );
        console.log(`--> E_${axis}: ${electricFieldAlongAxis}`);
        const result = electricFieldAlongAxis / totalElectricField;
        console.log(`E_${axis}/E: ${Math.abs(result) > LINE_INCREMENT ? Math.sign(result)*LINE_INCREMENT : result}`);
        return Math.abs(result) > LINE_INCREMENT ? Math.sign(result)*LINE_INCREMENT : result;
    };

    getDistance = (chargeA: IChargeData, chargeB: IChargeData) => ((chargeA.x - chargeB.x) ** 2 + (chargeA.y - chargeB.y) ** 2) ** 0.5;


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
