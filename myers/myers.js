export function DynamicList(listId, drawItem, areItemsTheSame) {
    let currentList = [];

    this.show = function(list) {
        updateList(list);
    }

    function insertItem(position, item) {
        console.log("insert: " + position);
        const listItem = drawItem(item);
        const list = document.getElementById(listId);
        list.insertBefore(listItem, list.children[position]);
    }

    function removeItem(position) {
        console.log("remove: " + position);
        const list = document.getElementById(listId);
        const elemToRemove = list.children[position];
        list.removeChild(elemToRemove);
    }

    function findModificationPath(oldItems, newItems) {
        let paths = [];
        paths.push([{x: -1, y: -1}]);

        let shortestPath = null;
        while (shortestPath === null) {

            let newPaths = [];

            for (let i = 0; i < paths.length; i++) {
                let path = paths[i];
                let lastPoint = path[path.length - 1];

                if (lastPoint.x === oldItems.length - 1 && lastPoint.y === newItems.length - 1) {
                    shortestPath = path;
                } else {
                    while ((lastPoint.x < oldItems.length - 1)
                        && (lastPoint.y < newItems.length - 1)
                        && areItemsTheSame(oldItems[lastPoint.x + 1], newItems[lastPoint.y + 1])) {
                        path.push({x: lastPoint.x + 1, y: lastPoint.y + 1});
                        lastPoint = path[path.length - 1];
                    }

                    if (lastPoint.x === oldItems.length - 1 && lastPoint.y === newItems.length - 1) {
                        shortestPath = path;
                    }

                    if (lastPoint.x < oldItems.length - 1) {
                        let newPathX = [];
                        Object.assign(newPathX, path);
                        newPathX.push({x: lastPoint.x + 1, y: lastPoint.y});
                        newPaths.push(newPathX);
                    }

                    if (lastPoint.y < newItems.length - 1) {
                        let newPathY = [];
                        Object.assign(newPathY, path);
                        newPathY.push({x: lastPoint.x, y: lastPoint.y + 1});
                        newPaths.push(newPathY);
                    }
                }
            }
            Object.assign(paths, newPaths);
        }
        return shortestPath;
    }

    function updateList(newItems) {
        let extraItemsCount = 0;

        const path = findModificationPath(currentList, newItems);

        for (let i = 0; i < path.length - 1; i++) {
            const currentPoint = path[i];
            const nextPoint = path[i + 1];

            if (nextPoint.x > currentPoint.x && nextPoint.y === currentPoint.y) {
                removeItem(nextPoint.x + extraItemsCount);
                extraItemsCount--;
            } else if (nextPoint.y > currentPoint.y && nextPoint.x === currentPoint.x) {
                insertItem(nextPoint.y, newItems[nextPoint.y]);
                extraItemsCount++;
            }
        }

        Object.assign(currentList, newItems);
    }

}