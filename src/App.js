import React, { Component } from 'react';
import Total from './Components/total/Total';
import History from './Components/history/History';
import Operation from './Components/operation/Operation';



class App extends Component {
  state = {
    transactions: [],
    description: '',
    amount: '',
    incomes: '',
    expenses: '',
    balance: '',
  }

  addTransaction = add => {
    const transactions = [...this.state.transactions,
    {
      id: `cmr${(+new Date).toString(16)}`,
      description: this.state.description,
      amount: this.state.amount,
      add
    }
    ];

    const incomes = this.countIncome(transactions);
    const expenses = this.countExpense(transactions);

    this.setState({
      transactions,
      description: '',
      amount: '',
      incomes: incomes,
      expenses: expenses,
      balance: (incomes - expenses),
    });


  }

  addAmoumt = e => {
    this.setState({ amount: e.target.value });
  }

  addDescription = e => {
    this.setState({ description: e.target.value });
  }

  countIncome = (transactions) => {
    let incomes = 0;
    transactions.filter(item => {
      if (item.add) {
        incomes += +item.amount;
      };
    });
    return incomes;
  }

  countExpense = (transactions) => {
    let expenses = 0;
    transactions.filter(item => {
      if (!item.add) {
        expenses += +item.amount;
      };
    });
    return expenses;
  }

  render() {
    return (
      <>
        <header>
          <h1> Кошелек </h1>
          <h2> Калькулятор расходов </h2>
        </header>
        <main>
          <div className="container">
            <Total
              incomes={this.state.incomes}
              expenses={this.state.expenses}
              balance={this.state.balance}
            />
            <History transactions={this.state.transactions} />
            <Operation
              addTransaction={this.addTransaction}
              addAmoumt={this.addAmoumt}
              addDescription={this.addDescription}
              description={this.state.description}
              amount={this.state.amount}
            />
          </div>
        </main>
      </>
    );
  }
}

export default App;