/**
 * @file 创建 slot 元素
 * @author errorrik(errorrik@gmail.com)
 */

var empty = require('../util/empty');
var createANode = require('../parser/create-a-node');
var NodeType = require('./node-type');
var nodeInit = require('./node-init');
var nodeDispose = require('./node-dispose');
var createNodeByEl = require('./create-node-by-el');
var elementDisposeChildren = require('./element-dispose-children');

/**
 * 创建 slot 元素
 *
 * @param {Object} options 初始化参数
 * @return {Object}
 */
function createSlot(options) {
    var literalOwner = options.owner;
    var aNode = createANode();


    var nameBind = options.aNode.props.get('name');
    options.name = nameBind ? nameBind.raw : '____';

    var givenSlots = literalOwner.aNode.givenSlots;
    var givenChildren = givenSlots && givenSlots[options.name];
    aNode.children = givenChildren || options.aNode.children.slice(0);

    if (givenChildren) {
        options.owner = literalOwner.owner;
        options.scope = literalOwner.scope;
    }

    options.aNode = aNode;


    var node = nodeInit(options);
    node.children = [];
    node._type = NodeType.SLOT;
    node.dispose = slotOwnDispose;

    node._getEl = slotOwnGetEl;
    node._doAttach = slotOwnDoAttach;
    node._update = empty;


    var parent = node.parent;
    while (parent) {
        if (parent === node.owner) {
            parent.ownSlotChildren.push(node);
            break;
        }

        if (parent._type !== NodeType.SLOT && parent.owner === node.owner) {
            parent.slotChildren.push(node);
            break;
        }

        parent = parent.parent;
    }

    return node;
}


/**
 * 将元素attach到页面
 *
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement=} beforeEl 要添加到哪个元素之前
 */
function slotOwnDoAttach(parentEl, beforeEl) {
    var me = this;
    each(me.aNode.children, function (aNodeChild) {
        var child = createNode(aNodeChild, me);
        if (!child._static) {
            me.children.push(child);
        }
        child._doAttach(parentEl, beforeEl);
    });
}

/**
 * 获取 slot 对应的主元素
 * slot 是片段的管理，没有主元素，所以直接返回爹的主元素，不持有引用
 *
 * @return {HTMLElement}
 */
function slotOwnGetEl() {
    return this.parent._getEl();
}

/**
 * 销毁释放 slot
 */
function slotOwnDispose(dontDetach) {
    elementDisposeChildren(this, dontDetach);
    nodeDispose(this);
}

exports = module.exports = createSlot;
