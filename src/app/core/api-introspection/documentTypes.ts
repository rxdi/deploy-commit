
function strEnum<T extends string>(o: Array<T>): {[K in T]: K} {
    return o.reduce((res, key) => {
        res[key] = key;
        return res;
    }, Object.create(null));
}
export const DocumentTypes = strEnum(['statusQuery.graphql',
'addTransactionMutation.graphql',
'checkoutTransactionMutation.graphql',
'commitTransactionMutation.graphql',
'pushTransactionMutation.graphql',
'listTransactionsQuery.graphql']);
export type DocumentTypes = keyof typeof DocumentTypes;