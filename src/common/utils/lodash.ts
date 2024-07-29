import * as _ from 'lodash';

export interface MenuItem {
    id: number;
    parentId: number | null;
    name: string;
    [key: string]: any;
}

export function menuConvertToTree(array: MenuItem[], parentId: number | null = null): MenuItem[] {
    return _.chain(array)
        .filter({ parentId })
        .map((item) => ({ ...item, children: menuConvertToTree(array, item.id) }))
        .value();
}
