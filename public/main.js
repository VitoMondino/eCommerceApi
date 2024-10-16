document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('search');
    const filterSelect = document.getElementById('filter');
    const toggleViewBtn = document.getElementById('toggleView');
    let isGridView = true;

    // Cargar rubros y productos al inicio
    fetchRubros();
    fetchProducts();

    // Alternar entre vista de lista y cuadrícula
    toggleViewBtn.addEventListener('click', () => {
        isGridView = !isGridView;
        productList.className = isGridView ? 'grid' : 'list';
    });

    // Buscar productos en tiempo real
    searchInput.addEventListener('input', () => {
        const query = searchInput.value;
        const rubro = filterSelect.value;
        fetchProducts(query, rubro);
    });

    // Filtrar productos por rubro
    filterSelect.addEventListener('change', () => {
        const query = searchInput.value;
        const rubro = filterSelect.value;
        fetchProducts(query, rubro);
    });

    // Obtener rubros desde la API
    async function fetchRubros() {
        try {
            const res = await fetch('/api/products/rubros');
            const rubros = await res.json();
            renderRubros(rubros);
        } catch (error) {
            console.error('Error al obtener los rubros:', error);
        }
    }

    // Renderizar rubros en el select
    function renderRubros(rubros) {
        rubros.forEach(rubro => {
            const option = document.createElement('option');
            option.value = rubro.Codigo;
            option.textContent = rubro.Descripcion;
            filterSelect.appendChild(option);
        });
    }

    // Obtener productos desde la API
    async function fetchProducts(query = '', rubro = '') {
        try {
            const res = await fetch(`/api/products?descripcion=${query}&rubro=${rubro}`);
            const products = await res.json();
            renderProducts(products);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    }

    // Renderizar productos en el DOM
    function renderProducts(products) {
        productList.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.URLImagen}" alt="${product.Descripcion}">
                <h3>${product.Descripcion}</h3>
                <p>Precio: $${product.Precio}</p>
                <p>Rubro: ${product.Rubro}</p>
            </div>
        `).join('');
    }
});
