// Catálogo — dados demonstrativos usados pelos filtros e pelo diálogo.
const vehicles = [
    {
        "id": "v1",
        "brand": "Porsche",
        "model": "911 Carrera",
        "price": 789000,
        "year": 2024,
        "km": 12000,
        "gear": "Automático",
        "fuel": "Gasolina",
        "image": "porsche.jpg",
        "description": "Um esportivo para explorar a apresentação de linhas, detalhes e informações em um anúncio premium. Configuração inteiramente fictícia."
    },
    {
        "id": "v2",
        "brand": "BMW",
        "model": "M4 Competition",
        "price": 589000,
        "year": 2023,
        "km": 18000,
        "gear": "Automático",
        "fuel": "Gasolina",
        "image": "bmw-m4.jpg",
        "description": "Um conceito de anúncio que combina fotografia marcante e uma ficha objetiva. Versão, ano, preço e características são apenas demonstrativos."
    },
    {
        "id": "v3",
        "brand": "Audi",
        "model": "R8 Coupé",
        "price": 949000,
        "year": 2022,
        "km": 22000,
        "gear": "Automático",
        "fuel": "Gasolina",
        "image": "audi-r8.jpg",
        "description": "Uma possibilidade de apresentação para um coupé esportivo. A fotografia é ilustrativa e os dados não representam uma oferta real."
    },
    {
        "id": "v4",
        "brand": "Audi",
        "model": "A5 Sportback",
        "price": 239000,
        "year": 2021,
        "km": 45000,
        "gear": "Automático",
        "fuel": "Gasolina",
        "image": "audi-a5.jpg",
        "description": "Design e praticidade como tema de um anúncio demonstrativo. Os dados permitem explorar os filtros e não descrevem um veículo à venda."
    },
    {
        "id": "v5",
        "brand": "BMW",
        "model": "320i Sedan",
        "price": 279000,
        "year": 2024,
        "km": 9000,
        "gear": "Automático",
        "fuel": "Flex",
        "image": "bmw-320i.jpg",
        "description": "Uma ficha conceito para mostrar a organização de informações em um catálogo de sedãs. Todas as características são fictícias."
    },
    {
        "id": "v6",
        "brand": "Ford",
        "model": "Mustang GT",
        "price": 349000,
        "year": 2022,
        "km": 27000,
        "gear": "Automático",
        "fuel": "Gasolina",
        "image": "mustang.jpg",
        "description": "Uma apresentação inspirada nas linhas de um esportivo. Imagem e dados têm função ilustrativa; não existe anúncio comercial ou estoque real."
    }
];

// Catálogo e detalhes — escopo e inicialização compartilhados; ordem preservada.
(() => {
    const form = document.getElementById('filters');
    const container = document.getElementById('vehicles');
    const count = document.getElementById('result-count');
    const empty = document.getElementById('empty-state');
    const dialog = document.getElementById('vehicle-dialog');
    const image = document.getElementById('detail-image');
    const views = Array.from(dialog.querySelectorAll('[data-view]'));
    const summary = document.getElementById('interest-summary');
    const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    const integer = new Intl.NumberFormat('pt-BR');
    const cards = new Map(vehicles.map(vehicle => [vehicle.id, document.getElementById(vehicle.id)]));
    const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/\s+/g, ' ');
    let selected = null;
    let opener = null;
    let activeView = 0;

    // Catálogo — busca, filtros, ordenação e estado vazio.
    function render() {
        const search = normalize(document.getElementById('busca').value);
        const brand = document.getElementById('marca').value;
        const price = document.getElementById('preco').value;
        const year = document.getElementById('ano').value;
        const order = document.getElementById('ordem').value;
        const range = price ? price.split(':').map(Number) : [0, Infinity];
        const matches = vehicles.filter(vehicle =>
            normalize(vehicle.brand + ' ' + vehicle.model).includes(search) &&
            (!brand || vehicle.brand === brand) &&
            vehicle.price >= range[0] && vehicle.price <= range[1] &&
            (!year || vehicle.year === Number(year))
        );
        const sorters = {
            'preco-asc': (a, b) => a.price - b.price,
            'preco-desc': (a, b) => b.price - a.price,
            'ano-desc': (a, b) => b.year - a.year,
            'ano-asc': (a, b) => a.year - b.year
        };
        if (sorters[order]) matches.sort(sorters[order]);
        const ids = new Set(matches.map(vehicle => vehicle.id));
        vehicles.forEach(vehicle => { cards.get(vehicle.id).hidden = !ids.has(vehicle.id); });
        matches.forEach(vehicle => container.append(cards.get(vehicle.id)));
        count.textContent = matches.length + (matches.length === 1 ? ' veículo demonstrativo' : ' veículos demonstrativos');
        empty.hidden = matches.length !== 0;
    }

    // Detalhes — enquadramentos da galeria.
    function setView(index, focus = false) {
        activeView = index;
        image.style.objectFit = index === 0 ? 'contain' : 'cover';
        image.style.transform = index === 0 ? 'none' : 'scale(1.5)';
        image.style.transformOrigin = index === 1 ? 'left center' : 'right center';
        views.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
        const labels = ['Foto completa', 'Recorte à esquerda', 'Recorte à direita'];
        image.alt = labels[index] + ': fotografia ilustrativa de ' + selected.brand + ', sem vínculo com uma oferta real';
        if (focus) views[index].focus();
    }

    // Detalhes — preenchimento e abertura do diálogo.
    function openDetails(vehicle, trigger) {
        selected = vehicle;
        opener = trigger;
        document.getElementById('detail-brand').textContent = vehicle.brand.toUpperCase();
        document.getElementById('detail-title').textContent = vehicle.model;
        document.getElementById('detail-price').textContent = currency.format(vehicle.price);
        document.getElementById('detail-description').textContent = vehicle.description;
        image.src = 'imagens/' + vehicle.image;
        image.width = 1600;
        image.height = vehicle.image === 'bmw-m4.jpg' ? 2844 : ['porsche.jpg', 'bmw-320i.jpg'].includes(vehicle.image) ? 2400 : vehicle.image === 'mustang.jpg' ? 1067 : 1068;
        const specs = document.getElementById('detail-specs');
        specs.replaceChildren();
        [['Ano', vehicle.year], ['Quilometragem', integer.format(vehicle.km) + ' km'], ['Câmbio', vehicle.gear], ['Combustível', vehicle.fuel]].forEach(([label, value]) => {
            const group = document.createElement('div');
            const term = document.createElement('dt');
            const detail = document.createElement('dd');
            term.textContent = label;
            detail.textContent = String(value);
            group.append(term, detail);
            specs.append(group);
        });
        summary.hidden = true;
        summary.replaceChildren();
        setView(0);
        dialog.showModal();
        dialog.scrollTop = 0;
        document.getElementById('close-dialog').focus();
    }

    // Catálogo e diálogo — eventos mantidos após as funções usadas por eles.
    container.addEventListener('click', event => {
        const trigger = event.target.closest('[data-open]');
        if (!trigger) return;
        const vehicle = vehicles.find(vehicle => vehicle.id === trigger.dataset.open);
        if (!vehicle) return;
        event.preventDefault();
        openDetails(vehicle, trigger);
    });
    document.getElementById('close-dialog').addEventListener('click', () => {
        dialog.close();
        if (opener && opener.isConnected) opener.focus({ preventScroll: true });
    });
    dialog.addEventListener('close', () => {
        if (dialog.open) return;
        summary.hidden = true;
        if (opener && opener.isConnected) opener.focus({ preventScroll: true });
    });
    views.forEach((button, index) => {
        button.addEventListener('click', () => setView(index));
        button.addEventListener('keydown', event => {
            let next;
            if (event.key === 'ArrowRight') next = (activeView + 1) % views.length;
            if (event.key === 'ArrowLeft') next = (activeView + views.length - 1) % views.length;
            if (event.key === 'Home') next = 0;
            if (event.key === 'End') next = views.length - 1;
            if (next === undefined) return;
            event.preventDefault();
            setView(next, true);
        });
    });
    // Detalhes — simulação local de interesse.
    document.getElementById('simulate-interest').addEventListener('click', () => {
        if (!selected) return;
        const title = document.createElement('h3');
        title.textContent = 'Seu interesse, em resumo';
        const vehicle = document.createElement('p');
        vehicle.textContent = selected.brand + ' ' + selected.model + ' · ' + selected.year + ' · ' + currency.format(selected.price) + ' (fictício)';
        const spec = document.createElement('p');
        spec.textContent = integer.format(selected.km) + ' km · ' + selected.gear + ' · ' + selected.fuel;
        const note = document.createElement('p');
        note.textContent = 'Simulação local. Nenhum contato ou pedido foi enviado. Não há reserva, compra ou armazenamento de interesse.';
        summary.replaceChildren(title, vehicle, spec, note);
        summary.hidden = false;
    });
    // Catálogo — eventos dos filtros e renderização inicial.
    form.addEventListener('submit', event => event.preventDefault());
    form.addEventListener('input', render);
    form.addEventListener('change', render);
    form.addEventListener('reset', () => queueMicrotask(render));
    document.getElementById('clear-empty').addEventListener('click', () => {
        form.reset();
        document.getElementById('busca').focus();
    });
    document.querySelectorAll('.fallback-specs').forEach(element => { element.hidden = true; });
    form.hidden = false;
    render();
})();
