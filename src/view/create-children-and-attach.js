/**
 * @file 生成子元素html
 * @author errorrik(errorrik@gmail.com)
 */

var each = require('../util/each');
var createNode = require('./create-node');
var nodeEvalExpr = require('./node-eval-expr');

/**
 * 生成子元素html
 *
 * @param {Element} element 元素
 */
function createChildrenAndAttach(element) {
    if (element.tagName !== 'textarea') {
        var htmlDirective = element.aNode.directives.get('html');

        if (htmlDirective) {
            element.el.innerHTML = nodeEvalExpr(element, htmlDirective.value);
        }
        else {
            each(element.aNode.children, function (aNodeChild) {
                var child = createNode(aNodeChild, element);
                if (!child._static) {
                    element.children.push(child);
                }
                child._doAttach(element._getEl());
            });
        }
    }
}

exports = module.exports = createChildrenAndAttach;
