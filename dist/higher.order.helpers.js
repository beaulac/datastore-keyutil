"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ub64 = require("urlsafe-base64");
const keyToUid_1 = require("./keyToUid");
exports.pluralize = (fn, ctx) => (es = [undefined]) => es.map(fn, ctx);
exports.uidFromKey = (keyFn) => (entity) => keyToUid_1.keyToUID(keyFn(entity));
exports.base64ify = (uidFn) => (e) => ub64.encode(Buffer.from(uidFn(e)));
