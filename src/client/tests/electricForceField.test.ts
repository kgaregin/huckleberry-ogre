import {LINE_INCREMENT} from '../modules/electricForceField/electricForceField';
import {
    getCosWithAllCharges,
    getCosWithSingleCharge,
    getDistance,
    getElectricFieldFromSingleCharge,
    getSinWithAllCharges,
    getSinWithSingleCharge,
    totalElectricField,
    totalElectricFieldX,
    totalElectricFieldY
} from '../modules/electricForceField/Utils';

const lineIncrementFlipSquared = 1 / Math.pow(LINE_INCREMENT, 2);

test('distance calculation', () => {
    expect(getDistance({x: 1, y: 0}, {x: 1, y: 0})).toEqual(LINE_INCREMENT);
    expect(getDistance({x: 2, y: 10}, {x: 2, y: 10})).toEqual(LINE_INCREMENT);
    expect(getDistance({x: 2, y: 10}, {x: 3, y: 10})).toEqual(LINE_INCREMENT > 1 ? LINE_INCREMENT : 1);
    expect(getDistance({x: 2, y: 10}, {x: 2, y: 11})).toEqual(LINE_INCREMENT > 1 ? LINE_INCREMENT : 1);
    expect(getDistance({x: 2, y: 10}, {x: 5, y: 14})).toEqual(5);
    expect(getDistance({x: 2, y: 10}, {x: -1, y: 6})).toEqual(5);
});

test('electric field value from single charge', () => {
    expect(getElectricFieldFromSingleCharge({x: 1, y: 0}, {x: 1, y: 0})).toEqual(lineIncrementFlipSquared);
    expect(getElectricFieldFromSingleCharge({x: 2, y: 10}, {x: 2, y: 10})).toEqual(lineIncrementFlipSquared);
    expect(getElectricFieldFromSingleCharge({x: 2, y: 10}, {
        x: 3,
        y: 10
    })).toEqual(LINE_INCREMENT > 1 ? lineIncrementFlipSquared : 1);
    expect(getElectricFieldFromSingleCharge({x: 2, y: 10}, {
        x: 2,
        y: 11
    })).toEqual(LINE_INCREMENT > 1 ? lineIncrementFlipSquared : 1);
    expect(getElectricFieldFromSingleCharge({x: 2, y: 10}, {x: 5, y: 14})).toEqual(1 / 25);
    expect(getElectricFieldFromSingleCharge({x: 2, y: 10}, {x: -1, y: 6})).toEqual(1 / 25);
});

test('cos(alpha) between Ox axis and line that goes through charge and target point', () => {
    expect(getCosWithSingleCharge({x: 1, y: 0}, {x: 1, y: 0})).toEqual(1);
    expect(getCosWithSingleCharge({x: 2, y: 10}, {x: 2, y: 10})).toEqual(1);
    expect(getCosWithSingleCharge({x: 2, y: 10}, {x: 3, y: 10})).toEqual(-0.5);
    expect(getCosWithSingleCharge({x: 2, y: 10}, {x: 2, y: 11})).toEqual(0);
    expect(getCosWithSingleCharge({x: 2, y: 10}, {x: 5, y: 14})).toEqual(-3 / 5);
    expect(getCosWithSingleCharge({x: 2, y: 10}, {x: -1, y: 6})).toEqual(3 / 5);
});

test('sin(alpha) between Ox axis and line that goes through charge and target point', () => {
    expect(getSinWithSingleCharge({x: 1, y: 0}, {x: 1, y: 0})).toEqual(0);
    expect(getSinWithSingleCharge({x: 2, y: 10}, {x: 2, y: 10})).toEqual(0);
    expect(getSinWithSingleCharge({x: 2, y: 10}, {x: 3, y: 10})).toEqual(0);
    expect(getSinWithSingleCharge({x: 2, y: 10}, {x: 2, y: 11})).toEqual(0.5);
    expect(getSinWithSingleCharge({x: 2, y: 10}, {x: 5, y: 14})).toEqual(4 / 5);
    expect(getSinWithSingleCharge({x: 2, y: 10}, {x: -1, y: 6})).toEqual(-4 / 5);
});

test('total electric field from all nearby charges for given point', () => {
    expect(totalElectricField({x: 1, y: 0}, [{x: 1, y: 0}])).toEqual(0.25);
    expect(totalElectricField({x: 2, y: 10}, [{x: 2, y: 10}])).toEqual(0.25);
    expect(totalElectricField({x: 2, y: 10}, [{x: 3, y: 10}])).toEqual(0.25);
    expect(totalElectricField({x: 2, y: 10}, [{x: 2, y: 11}])).toEqual(0.25);
    expect(totalElectricField({x: 2, y: 10}, [{x: 5, y: 14}])).toEqual(1 / 25);
    expect(totalElectricField({x: 2, y: 10}, [{x: -1, y: 6}])).toEqual(1 / 25);
});



test('total electric field along Ox', () => {
    expect(totalElectricFieldX({x: 1, y: 0}, [{x: 1, y: 0}])).toEqual(0.25);
    expect(totalElectricFieldX({x: 2, y: 10}, [{x: 2, y: 10}])).toEqual(0.25);
    expect(totalElectricFieldX({x: 2, y: 10}, [{x: 3, y: 10}])).toEqual(-0.125);
    expect(totalElectricFieldX({x: 2, y: 10}, [{x: 2, y: 11}])).toEqual(0);
    expect(totalElectricFieldX({x: 2, y: 10}, [{x: 5, y: 14}])).toEqual(-3 / 125);
    expect(totalElectricFieldX({x: 2, y: 10}, [{x: -1, y: 6}])).toEqual(3 / 125);
});

test('total electric field along Oy', () => {
    expect(totalElectricFieldY({x: 1, y: 0}, [{x: 1, y: 0}])).toEqual(0);
    expect(totalElectricFieldY({x: 2, y: 10}, [{x: 2, y: 10}])).toEqual(0);
    expect(totalElectricFieldY({x: 2, y: 10}, [{x: 3, y: 10}])).toEqual(0);
    expect(totalElectricFieldY({x: 2, y: 10}, [{x: 2, y: 11}])).toEqual(0.125);
    expect(totalElectricFieldY({x: 2, y: 10}, [{x: 5, y: 14}])).toEqual(4 / 125);
    expect(totalElectricFieldY({x: 2, y: 10}, [{x: -1, y: 6}])).toEqual(-4 / 125);
});

test('cos(alpha) between Ox axis and accumulative force field vector', () => {
    expect(getCosWithAllCharges({x: 1, y: 0}, [{x: 1, y: 0}])).toEqual(1);
    expect(getCosWithAllCharges({x: 2, y: 10}, [{x: 2, y: 10}])).toEqual(1);
    expect(getCosWithAllCharges({x: 2, y: 10}, [{x: 3, y: 10}])).toEqual(-0.5);
    expect(getCosWithAllCharges({x: 2, y: 10}, [{x: 2, y: 11}])).toEqual(0);
    expect(getCosWithAllCharges({x: 2, y: 10}, [{x: 5, y: 14}])).toEqual(-0.6);
    expect(getCosWithAllCharges({x: 2, y: 10}, [{x: -1, y: 6}])).toEqual(0.6);
    expect(getCosWithAllCharges({x: 2, y: 10}, [{x: -1, y: 6}, {x: 5, y: 14}])).toEqual(0);
    expect(getCosWithAllCharges({x: 2, y: 10}, [{x: -1, y: 6}, {x: 5, y: 14}, {x: 3, y: 10}])).toEqual(-0.3787878787878788);
    expect(getCosWithAllCharges({x: 2, y: 10}, [{x: -1, y: 6}, {x: 5, y: 14}, {x: 3, y: 10}, {x: 2, y: 10}])).toEqual(0.21551724137931033);
});

test('sin(alpha) between Ox axis and accumulative force field vector', () => {
    expect(getSinWithAllCharges({x: 1, y: 0}, [{x: 1, y: 0}])).toEqual(0);
    expect(getSinWithAllCharges({x: 2, y: 10}, [{x: 2, y: 10}])).toEqual(0);
    expect(getSinWithAllCharges({x: 2, y: 10}, [{x: 3, y: 10}])).toEqual(0);
    expect(getSinWithAllCharges({x: 2, y: 10}, [{x: 2, y: 11}])).toEqual(0.5);
    expect(getSinWithAllCharges({x: 2, y: 10}, [{x: 5, y: 14}])).toEqual(0.8);
    expect(getSinWithAllCharges({x: 2, y: 10}, [{x: -1, y: 6}])).toEqual(-0.8);
    expect(getSinWithAllCharges({x: 2, y: 10}, [{x: -1, y: 6}, {x: 5, y: 14}])).toEqual(0);
    expect(getSinWithAllCharges({x: 2, y: 10}, [{x: -1, y: 6}, {x: 5, y: 14}, {x: 3, y: 10}])).toEqual(0);
    expect(getSinWithAllCharges({x: 2, y: 10}, [{x: -1, y: 6}, {x: 5, y: 14}, {x: 3, y: 10}, {x: 2, y: 10}])).toEqual(0);
});













