"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const documents_1 = require("./documents");
const graphql_1 = require("graphql");
function importQuery(search) {
    let result;
    Object.keys(documents_1.DOCUMENTS)
        .filter(doc => {
        if (doc.indexOf(search) !== -1) {
            result = documents_1.DOCUMENTS[doc];
        }
    });
    if (!result) {
        throw new Error(`Missing query: ${search}`);
    }
    return graphql_1.print(result);
}
exports.importQuery = importQuery;
//# sourceMappingURL=graphql-helpers.js.map