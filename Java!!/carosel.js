const carousel = document.getElementById("carousel");

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let autoSlide;
let scrollTimer;

let items = [];
let originalCount = 0;

// Atualiza a lista de discos
function updateItems() {
    items = Array.from(carousel.querySelectorAll(".carousel-item"));
}

// Encontra o disco mais próximo do centro
function getCenterItem() {
    const carouselCenter = carousel.getBoundingClientRect().left + carousel.clientWidth / 2;

    let closestItem = null;
    let smallestDistance = Infinity;
    let closestIndex = 0;

    items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();

        const itemCenter = rect.left + rect.width / 2;

        const distance = Math.abs(carouselCenter - itemCenter);

        if (distance < smallestDistance) {
            smallestDistance = distance;
            closestItem = item;
            closestIndex = index;
        }
    });

    return {
        item: closestItem,
        index: closestIndex,
    };
}

// Centraliza um disco específico
function centerItem(item, behavior = "smooth") {
    const carouselRect = carousel.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    const currentCenter = itemRect.left - carouselRect.left + carousel.scrollLeft + itemRect.width / 2;

    const target = currentCenter - carousel.clientWidth / 2;

    carousel.scrollTo({
        left: target,
        behavior: behavior,
    });
}

// Destaca o disco central
function updateActiveItem() {
    const center = getCenterItem();

    items.forEach(item => {
        item.classList.remove("active");
    });

    if (center.item) {
        center.item.classList.add("active");
    }
}

// Cria o loop infinito
function createInfiniteLoop() {
    updateItems();

    originalCount = items.length;

    if (originalCount === 0) return;

    const originalItems = [...items];

    const before = document.createDocumentFragment();
    const after = document.createDocumentFragment();

    // Duplica os discos no começo e no final
    originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        clone.classList.remove("active");
        clone.dataset.clone = "true";

        before.appendChild(clone);
    });

    originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        clone.classList.remove("active");
        clone.dataset.clone = "true";

        after.appendChild(clone);
    });

    carousel.prepend(before);
    carousel.append(after);

    updateItems();

    // Começa no primeiro disco original
    const firstOriginal = items[originalCount];

    centerItem(firstOriginal, "instant");

    updateActiveItem();
}

// Corrige a posição quando chega às cópias
function fixInfiniteLoop() {
    if (!originalCount) return;

    const center = getCenterItem();

    if (center.index < originalCount) {
        const correspondingItem = items[center.index + originalCount];

        centerItem(correspondingItem, "instant");
    } else if (center.index >= originalCount * 2) {
        const correspondingItem = items[center.index - originalCount];

        centerItem(correspondingItem, "instant");
    }

    updateActiveItem();
}

// Detecta quando a movimentação terminou
function handleScrollEnd() {
    clearTimeout(scrollTimer);

    fixInfiniteLoop();
}

// Avança um disco
function nextSlide() {
    const center = getCenterItem();

    const nextIndex = center.index + 1;

    if (nextIndex < items.length) {
        centerItem(items[nextIndex]);
    }
}

// Volta um disco
function prevSlide() {
    const center = getCenterItem();

    const previousIndex = center.index - 1;

    if (previousIndex >= 0) {
        centerItem(items[previousIndex]);
    }
}

// Atualiza o destaque durante a rolagem
carousel.addEventListener("scroll", () => {
    updateActiveItem();

    clearTimeout(scrollTimer);

    // Compatibilidade com navegadores sem scrollend
    scrollTimer = setTimeout(handleScrollEnd, 700);
});

// Detecta o fim da animação de rolagem
carousel.addEventListener("scrollend", handleScrollEnd);

// Botões
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Movimentação automática
function startAutoSlide() {
    stopAutoSlide();

    autoSlide = setInterval(() => {
        nextSlide();
    }, 3500);
}

function stopAutoSlide() {
    clearInterval(autoSlide);
}

// Pausa ao passar o mouse
carousel.addEventListener("mouseenter", stopAutoSlide);
carousel.addEventListener("mouseleave", startAutoSlide);

// Inicialização
createInfiniteLoop();
startAutoSlide();
