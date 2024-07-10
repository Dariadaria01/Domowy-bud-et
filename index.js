const incomeForm = document.getElementById('incomeForm');
const incomeList = document.getElementById('incomeList');
const incomeData = [];

const renderIncomeList = () => {
  incomeList.innerHTML = '';
  incomeData.map((income) => {
    const li = document.createElement('li');
    li.textContent = `${income.title} - ${income.amount}`;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'usuń';
    li.appendChild(removeButton);
    incomeList.appendChild(li);

    removeButton.addEventListener('click', () => {
      const indexToRemove = incomeData.findIndex((item) => item.id === income.id);
      incomeData.splice(indexToRemove, 1);
      renderIncomeList();
    });
  });
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
