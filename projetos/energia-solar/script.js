(() => {
  const form = document.getElementById('solar-form');
  const rate = document.getElementById('reducao');
  const percent = document.getElementById('percentual');
  const result = document.getElementById('solar-result');
  const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  form.hidden = false;
  rate.addEventListener('input', () => { percent.value = rate.value + '%'; });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const bill = document.getElementById('conta').valueAsNumber;
    const reduction = rate.valueAsNumber;
    if (!Number.isFinite(bill) || bill < 50 || bill > 10000 || !Number.isFinite(reduction) || reduction < 10 || reduction > 80) return;
    const monthly = bill * reduction / 100;
    result.replaceChildren();
    const add = (tag, text, className) => {
      const element = document.createElement(tag);
      element.textContent = text;
      if (className) element.className = className;
      result.append(element);
    };
    add('span', 'ESTIMATIVA ILUSTRATIVA · SEM GARANTIA DE ECONOMIA', 'eyebrow');
    add('h3', 'Redução mensal hipotética');
    add('output', currency.format(monthly), 'result-value');
    add('p', 'Cenário: ' + reduction + '% de ' + currency.format(bill) + ' por mês.');
    add('p', 'Projeção ilustrativa em 12 meses: ' + currency.format(monthly * 12) + '.', 'result-sub');
    add('p', 'Este cálculo aplica apenas o percentual escolhido. Não estima geração solar nem economia real; veja as premissas abaixo.');
  });
})();
