"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function strEnum(o) {
    return o.reduce((res, key) => {
        res[key] = key;
        return res;
    }, Object.create(null));
}
exports.DocumentTypes = strEnum(['statusQuery.graphql',
    'addTransactionMutation.graphql',
    'checkoutTransactionMutation.graphql',
    'commitTransactionMutation.graphql',
    'pushTransactionMutation.graphql',
    'listTransactionsQuery.graphql']);
//# sourceMappingURL=documentTypes.js.map