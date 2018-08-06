/**
 * Prevent default browser behavior on drag and drop events.
 */
export const preventDefaultDragNDropEvents = () => {
    const dragAndDropEvents = ['dragenter', 'dragstart', 'dragend', 'dragleave', 'dragover', 'drag', 'drop'];
    dragAndDropEvents.forEach(eventType => {
        document.addEventListener(eventType, event => event.preventDefault());
    });
};
