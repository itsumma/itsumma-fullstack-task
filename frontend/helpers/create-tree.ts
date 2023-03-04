import {FamilyTree} from "@/interfaces/famili-tree";
import {FamilyMember} from "@/interfaces/family-member";

function convertArrayToMap(array: any[]) {
    return array.reduce(function(map, item) {
        map[item.id] = item;
        return map;
    }, {});
}

function createTree(array: FamilyMember[]) {
    const map = convertArrayToMap(array);
    const tree: [] | [FamilyTree] = [];
    for (let i = 0; i < array.length; i++) {
        let item = array[i];
        if (item.parent_id) {
            const parent = map[item.parent_id];
            if (!parent.children) {
                parent.children = [];
            }
            parent.children.push(item);
        } else {
            // @ts-ignore
            tree.push(item);
        }
    }
    return tree;
}

export default createTree
