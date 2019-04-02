export declare type TransactionsTypeEnum = "DEPLOYED" | "COMMITED" | "UNKNOWN" | "BUILD";
export declare type statusQuery = {
    status: {
        status: string | null;
    } | null;
};
export declare type addTransactionMutationVariables = {
    path: string;
    birthtime: string;
    repoFolder: string;
};
export declare type addTransactionMutation = {
    addTransaction: {
        _id: string | null;
        status: TransactionsTypeEnum | null;
        path: string | null;
        birthtime: string | null;
    } | null;
};
export declare type checkoutTransactionMutationVariables = {
    path: string;
    repoFolder: string;
};
export declare type checkoutTransactionMutation = {
    checkoutTransaction: {
        _id: string | null;
        status: TransactionsTypeEnum | null;
        birthtime: string | null;
        path: string | null;
    } | null;
};
export declare type commitTransactionMutationVariables = {
    message: string;
    repoFolder: string;
};
export declare type commitTransactionMutation = {
    commitTransaction: {
        _id: string | null;
        status: TransactionsTypeEnum | null;
        birthtime: string | null;
        path: string | null;
        repoFolder: string | null;
        message: string | null;
    } | null;
};
export declare type pushTransactionMutationMutationVariables = {
    repoFolder: string;
};
export declare type pushTransactionMutationMutation = {
    pushTransactionMutation: {
        _id: string | null;
        status: TransactionsTypeEnum | null;
        birthtime: string | null;
        path: string | null;
        repoFolder: string | null;
        message: string | null;
    } | null;
};
export declare type listTransactionsQueryVariables = {
    status?: TransactionsTypeEnum | null;
    repoFolder: string;
};
export declare type listTransactionsQuery = {
    listTransactions: Array<{
        _id: string | null;
        status: TransactionsTypeEnum | null;
        birthtime: string | null;
        path: string | null;
        repoFolder: string | null;
    } | null> | null;
};
