import {isNaN} from 'lodash';
import {CHARGE_VALUE, EAxis, IChargeData, IPoint, LINE_INCREMENT} from './ElectricForceField';

/**
 * Calculate distance between two points. It can't be less then LINE_INCREMENT (to avoid edge cases).
 *
 * @param pointA First point.
 * @param pointB Second point.
 */
export const getDistance = (pointA: IPoint, pointB: IPoint) => {
    const result = Math.pow((Math.pow((pointA.x - pointB.x), 2) + Math.pow((pointA.y - pointB.y), 2)), 0.5);

    return result < LINE_INCREMENT ? LINE_INCREMENT : result;
};

/**
 * Calculate electric field value from single charge for target point.
 *
 * @param targetPoint Target point.
 * @param charge Charge.
 */
export const getElectricFieldFromSingleCharge = (targetPoint: IPoint, charge: IChargeData) => {
    const distance = getDistance(targetPoint, charge);

    return CHARGE_VALUE / Math.pow(distance, 2);
};

/**
 * Calculate cos(alpha) between Ox axis and line that goes through charge and target point.
 * If distance between them is 0 or less then axis projection distance, considering alpha is also 0 (and cos = 1).
 *
 *             .Target point
 *            /
 *           /
 *          / ) <- alpha
 * charge C ------------> Ox
 *
 * @param targetPoint Target point.
 * @param charge Single charge.
 */
export const getCosWithSingleCharge = (targetPoint: IPoint, charge: IChargeData) => {
    const distance = getDistance(targetPoint, charge);
    const distanceX = targetPoint.x - charge.x;
    let result = distanceX / distance;

    if (Math.abs(result) > 1 || (distanceX === 0 && targetPoint.y === charge.y)) {
        result = 1;
    }

    return result;
};

/**
 * Calculate sin(alpha) between Ox axis and line that goes through charge and target point.
 * If distance between them is 0 or less then axis projection distance, considering alpha is also 0 (and sin = 0).
 *
 *             .Target point
 *            /
 *           /
 *          / ) <- alpha
 * charge C ------------> Ox
 *
 * @param targetPoint Target point.
 * @param charge Single charge.
 */
export const getSinWithSingleCharge = (targetPoint: IPoint, charge: IChargeData) => {
    const distance = getDistance(targetPoint, charge);
    const distanceY = targetPoint.y - charge.y;
    let result = distanceY / distance;

    if (Math.abs(result) > 1 || (distanceY === 0 && targetPoint.x === charge.x)) {
        result = 0;
    }

    return result;
};

/**
 * Calculates total electric field from all nearby charges for given point.
 *
 * @param targetPoint Target point on which electric field is calculated.
 * @param charges All nearby charges.
 */
export const totalElectricField = (targetPoint: IPoint, charges: IChargeData[]) => charges.reduce(
    (total, charge) => total + getElectricFieldFromSingleCharge(targetPoint, charge),
    0
);

/**
 * Calculates total electric field from all nearby charges for given point along Ox.
 *
 * @param targetPoint Target point on which electric field is calculated.
 * @param charges All nearby charges.
 */
export const totalElectricFieldX = (targetPoint: IPoint, charges: IChargeData[]) => {
    let result = charges.reduce(
        (total, charge) => total + getElectricFieldFromSingleCharge(targetPoint, charge) * getCosWithSingleCharge(targetPoint, charge),
        0
    );

    return isNaN(result) ? 1 : result;
};

/**
 * Calculates total electric field from all nearby charges for given point along Oy.
 *
 * @param targetPoint Target point on which electric field is calculated.
 * @param charges All nearby charges.
 */
export const totalElectricFieldY = (targetPoint: IPoint, charges: IChargeData[]) => {
    let result = charges.reduce(
        (total, charge) => total + getElectricFieldFromSingleCharge(targetPoint, charge) * getSinWithSingleCharge(targetPoint, charge),
        0
    );

    return isNaN(result) ? 0 : result;
};

/**
 * Calculate cos(alpha) between Ox axis and accumulative force field vector.
 * If accumulative force field vector length equals 0 or less then it's projection length,
 * considering alpha equals 0 (and cos = 1).
 *
 * @param targetPoint Target point on which electric field is calculated.
 * @param charges All nearby charges.
 */
export const getCosWithAllCharges = (targetPoint: IPoint, charges: IChargeData[]) => {
    const result = totalElectricFieldX(targetPoint, charges) / totalElectricField(targetPoint, charges);

    return Math.abs(result) > 1 ? 1 : result;
};
/**
 * Calculate sin(alpha) between Ox axis and accumulative force field vector.
 * If accumulative force field vector length equals 0 or less then it's projection length,
 * considering alpha equals 0 (and sin = 0).
 *
 * @param targetPoint Target point on which electric field is calculated.
 * @param charges All nearby charges.
 */
export const getSinWithAllCharges = (targetPoint: IPoint, charges: IChargeData[]) => {
    const result = totalElectricFieldY(targetPoint, charges) / totalElectricField(targetPoint, charges);

    return Math.abs(result) > 1 ? 0 : result;
};

/**
 * Calculate next point coordinates.
 *
 * @param point Current point.
 * @param chargeSet All charges.
 * @param axis Along which axis to calculate.
 */
export const getNextPoint = (point: IPoint, chargeSet: IChargeData[], axis: EAxis) => {
    switch (axis) {
        case EAxis.X:
            return point[axis] + LINE_INCREMENT * getCosWithAllCharges(point, chargeSet);
        case EAxis.Y:
            return point[axis] + LINE_INCREMENT * getSinWithAllCharges(point, chargeSet);
    }
};