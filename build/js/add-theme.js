"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fixer = {
    id: 'baseweb-add-theme-to-styled',
    fix: ({ j, api }) => {
        const node = api.closestNode(j.CallExpression, (n) => j.Identifier.check(n.callee) && n.callee.name === 'styled' && n.arguments.length > 0);
        if (!node) {
            return null;
        }
        if (node.arguments.length === 0) {
            return null;
        }
        if (node.arguments.length > 1 && !j.ObjectExpression.check(node.arguments[1])) {
            return null;
        }
        const edit = () => {
            const property = j.property('init', j.identifier('$theme'), j.identifier('$theme'));
            property.shorthand = true;
            const stylesObject = node.arguments.length === 2 ? node.arguments[1] : j.objectExpression([]);
            node.arguments[1] = j.arrowFunctionExpression([j.objectPattern([property])], stylesObject);
            return api.replaceNode(node, node);
        };
        return {
            title: 'Add $theme',
            edit,
        };
    },
};
exports.default = fixer;
