/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type TransactionsTypeEnum =
  "DEPLOYED" |
  "COMMITED" |
  "UNKNOWN" |
  "BUILD";


export type statusQuery = {
  status:  {
    status: string | null,
  } | null,
};

export type addTransactionMutationVariables = {
  path: string,
  birthtime: string,
  repoFolder: string,
};

export type addTransactionMutation = {
  addTransaction:  {
    _id: string | null,
    status: TransactionsTypeEnum | null,
    path: string | null,
    birthtime: string | null,
  } | null,
};

export type checkoutTransactionMutationVariables = {
  path: string,
  repoFolder: string,
};

export type checkoutTransactionMutation = {
  checkoutTransaction:  {
    _id: string | null,
    status: TransactionsTypeEnum | null,
    birthtime: string | null,
    path: string | null,
  } | null,
};

export type commitTransactionMutationVariables = {
  message: string,
  repoFolder: string,
};

export type commitTransactionMutation = {
  commitTransaction:  {
    _id: string | null,
    status: TransactionsTypeEnum | null,
    birthtime: string | null,
    path: string | null,
    repoFolder: string | null,
    message: string | null,
  } | null,
};

export type pushTransactionMutationMutationVariables = {
  repoFolder: string,
};

export type pushTransactionMutationMutation = {
  pushTransactionMutation:  {
    _id: string | null,
    status: TransactionsTypeEnum | null,
    birthtime: string | null,
    path: string | null,
    repoFolder: string | null,
    message: string | null,
  } | null,
};

export type listTransactionsQueryVariables = {
  status?: TransactionsTypeEnum | null,
  repoFolder: string,
};

export type listTransactionsQuery = {
  listTransactions:  Array< {
    _id: string | null,
    status: TransactionsTypeEnum | null,
    birthtime: string | null,
    path: string | null,
    repoFolder: string | null,
  } | null > | null,
};
/* tslint:enable */
