/**
 * @file 将元素attach到页面
 * @author errorrik(errorrik@gmail.com)
 */

var createChildrenAndAttach = require('./create-children-and-attach');

/**
 * 将元素attach到页面
 *
 * @param {Object} element 元素节点
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
function elementAttach(element, parentEl, beforeEl) {
    element._create();
    if (parentEl) {
        if (beforeEl) {
            parentEl.insertBefore(element.el, beforeEl);
        }
        else {
            parentEl.appendChild(element.el);
        }
    }

    if (!element._contentReady) {
        createChildrenAndAttach(element);
        element._contentReady = 1;
    }
}


exports = module.exports = elementAttach;
