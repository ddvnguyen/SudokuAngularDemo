"use strict";
var Dictionary = (function () {
    function Dictionary(init) {
        var _this = this;
        this._keys = [];
        this._values = [];
        this.getValue = function (key) {
            var result = _this[key];
            return result;
        };
        for (var x = 0; x < init.length; x++) {
            this[init[x].key] = init[x].value;
            this._keys.push(init[x].key);
            this._values.push(init[x].value);
        }
    }
    Dictionary.prototype.add = function (key, value) {
        console.log("add", key, value);
        this[key] = value;
        if (this._keys.indexOf(key) < 0)
            this._keys.push(key);
        this._values.push(value);
    };
    Dictionary.prototype.remove = function (key) {
        var index = this._keys.indexOf(key, 0);
        this._keys.splice(index, 1);
        this._values.splice(index, 1);
        delete this[key];
    };
    Dictionary.prototype.keys = function () {
        return this._keys;
    };
    Dictionary.prototype.values = function () {
        return this._values;
    };
    Dictionary.prototype.containsKey = function (key) {
        if (typeof this[key] === "undefined") {
            return false;
        }
        return true;
    };
    Dictionary.prototype.toLookup = function () {
        return this;
    };
    return Dictionary;
}());
exports.Dictionary = Dictionary;
//# sourceMappingURL=Dictionary.js.map