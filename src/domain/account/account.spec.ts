import { Account } from "./account";

describe('Account Entity unit tests', () => {
  it("should create an new account", () => {
    const account = Account.createNewAccount({
      name: 'John Doe',
      cpf: '12345678900',
      email: 'john.doe@example.com',
      password: '123456',
    });

    expect(account.name).toBe('John Doe');
    expect(account.cpf).toBe('12345678900');
    expect(account.email).toBe('john.doe@example.com');
    expect(account.password).toBe('123456');
    expect(account.balance).toBe(0);
  });

  it("should create an new account from database", () => {
    const account = Account.constructFromDatabase({
      name: 'John Doe',
      cpf: '12345678900',
      email: 'john.doe@example.com',
      password: '123456',
      balance: 15000,
    });

    expect(account.name).toBe('John Doe');
    expect(account.cpf).toBe('12345678900');
    expect(account.email).toBe('john.doe@example.com');
    expect(account.balance).toBe(15000);
  });

  it("should deposit money in the account", () => {
    const account = Account.createNewAccount({
      name: 'John Doe',
      cpf: '12345678900',
      email: 'john.doe@example.com',
      password: '123456',
    });
    account.deposit(1000);
    expect(account.balance).toBe(1000);
  });

  it("should withdraw money in the account", () => {
    const account = Account.createNewAccount({
      name: 'John Doe',
      cpf: '12345678900',
      email: 'john.doe@example.com',
      password: '123456',
    });
    account.deposit(1000);
    expect(account.balance).toBe(1000);
    account.withdraw(500);
    expect(account.balance).toBe(500);
    account.withdraw(500);
    expect(account.balance).toBe(0);
  });

  it("should not deposit or withdraw negative amount", () => {
    const account = Account.createNewAccount({
      name: 'John Doe',
      cpf: '12345678900',
      email: 'john.doe@example.com',
      password: '123456',
    });
    expect(() => account.deposit(-1000)).toThrow('Amount must be positive');
    expect(() => account.withdraw(-1000)).toThrow('Amount must be positive');
  })

  it("should not withdraw more than the balance", () => {
    const account = Account.createNewAccount({
      name: 'John Doe',
      cpf: '12345678900',
      email: 'john.doe@example.com',
      password: '123456',
    });
    account.deposit(1000);
    expect(() => account.withdraw(1500)).toThrow('Insufficient balance');
  })
});