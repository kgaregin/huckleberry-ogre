import React from 'react';

/**
 * Prevent default browser behavior on drag and drop events.
 */
export const preventDefaultDragNDropEvents = () => {
    const dragAndDropEvents = ['dragenter', 'dragstart', 'dragend', 'dragleave', 'dragover', 'drag', 'drop'];
    dragAndDropEvents.forEach(eventType => {
        document.addEventListener(eventType, event => event.preventDefault());
    });
};

/**
 * True if event target is inside element of given selector.
 *
 * @param {MouseEvent} event Any mouse event.
 * @param {string} selector Element selector.
 */
export const isInsideElement = (event: React.MouseEvent<any>, selector: string): boolean => (
    !!(event.target instanceof Element && event.target.closest(selector))
);
