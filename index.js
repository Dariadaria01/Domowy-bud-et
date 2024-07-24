const incomeForm = document.getElementById('incomeForm');
const incomeList = document.getElementById('incomeList');
const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');
const totalText = document.getElementById('total');
const totalExpenses = document.getElementById('totalExpenses');
const totalIncomes = document.getElementById('totalIncomes');
const expenseData = [];
const incomeData = [];

const calculateTotal = () => {
  const totalExpense = expenseData.reduce((prevValue, currValue) => {
    return prevValue + currValue.amount;
  }, 0);
  totalExpenses.textContent = totalExpense;
  const totalIncome = incomeData.reduce((prevValue, currValue) => {
    return prevValue + currValue.amount;
  }, 0);
  totalIncomes.textContent = totalIncome;
  const total = totalIncome - totalExpense;
  if (total > 0) {
    totalText.innerHTML = `Możesz jeszcze wydać ${total} złotych`;
  }
  if (total < 0) {
    totalText.innerHTML = `Bilans jest ujemny. Jesteś na minusie ${total} złotych`;
  }
  if (total === 0) {
    totalText.innerHTML = `Bilans wynosi zero`;
  }
};

const renderIncomeList = () => {
  incomeList.innerHTML = '';
  incomeData.map((income) => {
    const li = document.createElement('li');
    li.textContent = `${income.title} - ${income.amount}`;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'usuń';
    li.appendChild(removeButton);
    const editButton = document.createElement('button');
    editButton.textContent = 'edytuj';
    li.appendChild(editButton);
    incomeList.appendChild(li);

    removeButton.addEventListener('click', () => {
      const indexToRemove = incomeData.findIndex(
        (item) => item.id === income.id
      );
      incomeData.splice(indexToRemove, 1);
      renderIncomeList();
    });
    editButton.addEventListener('click', () => {
      li.innerHTML = '';
      const form = document.createElement('form');
      const inputTitle = document.createElement('input');
      inputTitle.name = 'incomeTitle';
      inputTitle.required = true;
      inputTitle.value = income.title;
      const inputAmount = document.createElement('input');
      inputAmount.name = 'incomeAmount';
      inputAmount.type = 'number';
      inputAmount.required = true;
      inputAmount.min = 0.01;
      inputAmount.step = 0.01;
      inputAmount.value = income.amount;
      const saveButton = document.createElement('button');
      const cancelButton = document.createElement('button');
      saveButton.textContent = 'Zapisz';
      cancelButton.textContent = 'Anuluj';
      cancelButton.type = 'reset';
      form.appendChild(inputTitle);
      form.appendChild(inputAmount);
      form.appendChild(saveButton);
      form.appendChild(cancelButton);

      li.appendChild(form);

      cancelButton.addEventListener('click', () => {
        renderIncomeList();
      });
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const incomeTitle = event.target.incomeTitle.value;
        const incomeAmount = event.target.incomeAmount.valueAsNumber;
        income.title = incomeTitle;
        income.amount = incomeAmount;
        renderIncomeList();
      });
    });
  });
  calculateTotal();
};

incomeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const incomeTitle = event.target.incomeTitle.value;
  const incomeAmount = event.target.incomeAmount.valueAsNumber;
  const newIncome = {
    title: incomeTitle,
    amount: incomeAmount,
    id: crypto.randomUUID(),
  };
  incomeData.push(newIncome);
  renderIncomeList();
});

const renderExpenseList = () => {
  expenseList.innerHTML = '';
  expenseData.map((expense) => {
    const li = document.createElement('li');
    li.textContent = `${expense.title} - ${expense.amount}`;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'usuń';
    li.appendChild(removeButton);
    const editButton = document.createElement('button');
    editButton.textContent = 'edytuj';
    li.appendChild(editButton);
    expenseList.appendChild(li);

    removeButton.addEventListener('click', () => {
      const indexToRemove = expenseData.findIndex(
        (item) => item.id === expense.id
      );
      expenseData.splice(indexToRemove, 1);
      renderExpenseList();
    });

    editButton.addEventListener('click', () => {
      li.innerHTML = '';
      const form = document.createElement('form');
      const inputTitle = document.createElement('input');
      inputTitle.name = 'expenseTitle';
      inputTitle.required = true;
      inputTitle.value = expense.title;
      const inputAmount = document.createElement('input');
      inputAmount.name = 'expenseAmount';
      inputAmount.type = 'number';
      inputAmount.required = true;
      inputAmount.min = 0.01;
      inputAmount.step = 0.01;
      inputAmount.value = expense.amount;
      const saveButton = document.createElement('button');
      const cancelButton = document.createElement('button');
      saveButton.textContent = 'Zapisz';
      cancelButton.textContent = 'Anuluj';
      cancelButton.type = 'reset';
      form.appendChild(inputTitle);
      form.appendChild(inputAmount);
      form.appendChild(saveButton);
      form.appendChild(cancelButton);

      li.appendChild(form);

      cancelButton.addEventListener('click', () => {
        renderExpenseList();
      });
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const expenseTitle = event.target.expenseTitle.value;
        const expenseAmount = event.target.expenseAmount.valueAsNumber;
        expense.title = expenseTitle;
        expense.amount = expenseAmount;
        renderExpenseList();
      });
    });
  });
  calculateTotal();
};

expenseForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const expenseTitle = event.target.expenseTitle.value;
  const expenseAmount = event.target.expenseAmount.valueAsNumber;
  const newExpense = {
    title: expenseTitle,
    amount: expenseAmount,
    id: crypto.randomUUID(),
  };
  expenseData.push(newExpense);
  renderExpenseList();
});
