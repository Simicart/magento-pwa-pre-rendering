class ObjectHelper {
    static shallowEqual(objA, objB) {
        if (objA === objB) {
            return false;
        }

        if (typeof objA !== 'object' || objA === null ||
            typeof objB !== 'object' || objB === null) {
            return false;
        }

        let keysA = Object.keys(objA);
        let keysB = Object.keys(objB);

        if (keysA.length !== keysB.length) {
            return false;
        }

        // Test for A's keys different from B.
        let bHasOwnProperty = hasOwnProperty.bind(objB);
        let length = keysA.length;
        for (let i = 0; i < length; i++) {
            if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
                return false;
            }
        }

        return true;
    }

    static shallowCompare(instance, nextProps, nextState) {
        return (
            !this.shallowEqual(instance.props, nextProps) ||
            !this.shallowEqual(instance.state, nextState)
        );
    }
}

export default ObjectHelper;
