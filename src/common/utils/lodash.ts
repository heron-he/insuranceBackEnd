import * as _ from 'lodash';

interface MenuItem {
    id: number;
    parentId: number | null;
    name: string;
    [key: string]: any;
}

export function convertToTree(array: MenuItem[], parentId: number | null = null): MenuItem[] {
    return _.chain(array)
        .filter({ parentId })
        .map((item) => ({ ...item, children: convertToTree(array, item.id) }))
        .value();
}
