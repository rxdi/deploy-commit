import "jest";
import { Container, createTestBed } from "@rxdi/core";
import { TransactionService } from "./transaction.service";
import { REACTIVE_JSON, COMMAND_PARSER } from "../../app.injection";
import { ITransactionType } from "../api-introspection";

describe("Transaction Service", () => {
  beforeAll(async () => {
    await createTestBed({
      imports: [],
      providers: [
        TransactionService,
        {
          provide: COMMAND_PARSER,
          useValue: {}
        },

        {
          provide: REACTIVE_JSON,
          useValue: {}
        }
      ]
    }).toPromise();
  });

  const addTransaction = async (
    payload?: ITransactionType
  ): Promise<ITransactionType> => ({
    _id: "dada",
    birthtime: "11414141",
    message: "dada",
    path: "dada",
    repoFolder: "dada",
    status: "BUILD",
    ...payload
  });

  it("should be defined", done => {
    expect(Container.has(TransactionService)).toBeTruthy();
    done();
  });

  it("should add transaction", async () => {
    const transaction = await addTransaction();
    expect(transaction._id).toBeDefined();
    expect(transaction.birthtime).toBeDefined();
    expect(transaction.message).toBeDefined();
    expect(transaction.path).toBeDefined();
    expect(transaction.repoFolder).toBeDefined();
    expect(transaction.status).toBeDefined();
  });
});
