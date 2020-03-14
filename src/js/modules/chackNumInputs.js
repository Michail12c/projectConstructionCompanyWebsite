const checkNumInputs = (selectors) => {
  const numInputs = document.querySelectorAll(selectors);
  numInputs.forEach(item => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(/\D/, '');// Перевірка, якщо вводлять не число заміна пустою строкою
    })
  })

}

export default checkNumInputs; 