/**
 * San
 * Copyright 2016 Baidu Inc. All rights reserved.
 *
 * @file 主文件
 * @author errorrik(errorrik@gmail.com)
 *         otakustay(otakustay@gmail.com)
 *         junmer(junmer@foxmail.com)
 */

(function (root) {
    // 人工调整打包代码顺序，通过注释手工写一些依赖
    // require('./util/empty');
    // require('./util/extend');
    // require('./util/inherits');
    // require('./util/each');
    // require('./util/contains');
    // require('./util/bind');
    // require('./browser/on');
    // require('./browser/un');
    // require('./browser/svg-tags');
    // require('./browser/create-el');
    // require('./browser/remove-el');
    // require('./util/guid');
    // require('./util/next-tick');
    // require('./browser/ie');
    // require('./browser/ie-old-than-9');
    // require('./util/indexed-list');
    // require('./browser/auto-close-tags');
    // require('./util/data-types.js');
    // require('./util/create-data-types-checker.js');
    // require('./parser/walker');
    // require('./parser/create-a-node');
    // require('./parser/parse-template');
    // require('./runtime/change-expr-compare');
    // require('./runtime/data-change-type');
    // require('./runtime/data');
    // require('./runtime/escape-html');
    // require('./runtime/default-filters');
    // require('./runtime/binary-op');
    // require('./runtime/eval-expr');
    // require('./view/life-cycle');
    // require('./view/create-text');
    // require('./view/get-prop-handler');
    // require('./view/is-data-change-by-element');
    // require('./view/event-declaration-listener');
    // require('./view/create-node');
    // require('./parser/parse-anode-from-el');
    // require('./view/from-el-init-children');


    // #[main-dependencies]
    /* eslint-disable no-unused-vars */
    var nextTick = require('./util/next-tick');
    var inherits = require('./util/inherits');
    var parseTemplate = require('./parser/parse-template');
    var parseExpr = require('./parser/parse-expr');
    var ExprType = require('./parser/expr-type');
    var LifeCycle = require('./view/life-cycle');
    var Component = require('./view/component');
    var defineComponent = require('./view/define-component');
    var emitDevtool = require('./util/emit-devtool');
    var DataTypes = require('./util/data-types');


    var san = {
        /**
         * san版本号
         *
         * @type {string}
         */
        version: '##version##',

        // #[begin] devtool
        /**
         * 是否开启调试。开启调试时 devtool 会工作
         *
         * @type {boolean}
         */
        debug: true,
        // #[end]

        /**
         * 组件基类
         *
         * @type {Function}
         */
        Component: Component,

        /**
         * 创建组件类
         *
         * @param {Object} proto 组件类的方法表
         * @return {Function}
         */
        defineComponent: defineComponent,

        /**
         * 解析 template
         *
         * @inner
         * @param {string} source template 源码
         * @return {ANode}
         */
        parseTemplate: parseTemplate,

        /**
         * 解析表达式
         *
         * @param {string} source 源码
         * @return {Object}
         */
        parseExpr: parseExpr,

        /**
         * 表达式类型枚举
         *
         * @const
         * @type {Object}
         */
        ExprType: ExprType,

        /**
         * 生命周期
         *
         * @class
         */
        LifeCycle: LifeCycle,

        /**
         * 在下一个更新周期运行函数
         *
         * @param {Function} fn 要运行的函数
         */
        nextTick: nextTick,

        /**
         * 构建类之间的继承关系
         *
         * @param {Function} subClass 子类函数
         * @param {Function} superClass 父类函数
         */
        inherits: inherits,

        /**
         * DataTypes
         *
         * @type {Object}
         */
        DataTypes: DataTypes
    };

    // export
    if (typeof exports === 'object' && typeof module === 'object') {
        // For CommonJS
        exports = module.exports = san;
    }
    else if (typeof define === 'function' && define.amd) {
        // For AMD
        define('san', [], san);
    }
    else {
        // For <script src="..."
        root.san = san;
    }

    // #[begin] devtool
    emitDevtool.start(san);
    // #[end]
})(this);
