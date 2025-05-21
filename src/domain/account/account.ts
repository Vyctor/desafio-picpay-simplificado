export type AccountConstructorProps = {
  name: string;
  cpf: string;
  email: string;
  password: string;
  balance: number;
}

export type CreateNewAccountProps = Omit<AccountConstructorProps, 'balance'>;


export class Account {
  #name: string;
  #cpf: string;
  #email: string;
  #password: string;
  #balance: number;

  private constructor(private props: AccountConstructorProps) {
    this.#name = props.name;
    this.#cpf = props.cpf;
    this.#email = props.email;
    this.#password = props.password;
    this.#balance = props.balance;
  }

  get name() {
    return this.#name;
  }

  get cpf() {
    return this.#cpf;
  }

  get email() {
    return this.#email;
  }

  get password() {
    return this.#password;
  }

  get balance() {
    return this.#balance;
  }

  static createNewAccount(props: CreateNewAccountProps) {
    return new Account({
      ...props,
      balance: 0,
    });
  }

  static constructFromDatabase(props: AccountConstructorProps) {
    return new Account(props);
  }

  deposit(amount: number) {
    if (amount < 0) {
      throw new Error('Amount must be positive');
    }
    this.#balance += amount;
  }

  withdraw(amount: number) {
    if (amount < 0) {
      throw new Error('Amount must be positive');
    }
    if (this.#balance < amount) {
      throw new Error('Insufficient balance');
    }
    this.#balance -= amount;
  }

  toJSON({
    omitBalance = false,
    omitPassword = true,
  }) {
    return {
      name: this.#name,
      cpf: this.#cpf,
      email: this.#email,
      balance: omitBalance ? undefined : this.#balance,
      ...(omitPassword ? {} : { password: this.#password }),
    }
  }
}