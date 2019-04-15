import "jest";
import { Container, createTestBed } from "@rxdi/core";
import { TransactionService } from "./transaction.service";
import { ITransactionType } from "../api-introspection";
import { createFakeInjectables } from "../test-factory/test-factory.service";

describe("Transaction Service", () => {
  beforeAll(async () => {
    await createTestBed({
      imports: [],
      providers: [...createFakeInjectables(), TransactionService]
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
    const transactionService = Container.get(TransactionService);
    const spy = spyOn(transactionService, "addTransaction").and.callFake(() =>
      addTransaction()
    );
    const transaction = await transactionService.addTransaction();
    expect(spy).toHaveBeenCalled();
    expect(transaction._id).toBeDefined();
    expect(transaction.birthtime).toBeDefined();
    expect(transaction.message).toBeDefined();
    expect(transaction.path).toBeDefined();
    expect(transaction.repoFolder).toBeDefined();
    expect(transaction.status).toBeDefined();
  });
});
