document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('search');
    const filterSelect = document.getElementById('filter');
    const toggleViewBtn = document.getElementById('toggleView');
    
    let isGridView = true;

    // Cargar rubros y productos al inicio.
    fetchRubros();
    fetchProducts(); 
    toggleView(); 

    // Alterno entre vista de lista y cuadrícula.
    toggleViewBtn.addEventListener('click', () => {
        isGridView = !isGridView;
        toggleView();
    });

    function toggleView() {
        if (isGridView) {
            productList.classList.remove('list-view');
            productList.classList.add('grid-view');
            toggleViewBtn.textContent = 'Vista Lista';
        } else {
            productList.classList.remove('grid-view');
            productList.classList.add('list-view');
            toggleViewBtn.textContent = 'Vista Cuadrícula'; 
        }
    }

    // Buscar productos en tiempo real (con petición al backend).
    searchInput.addEventListener('input', () => {
        const query = searchInput.value;
        const rubro = filterSelect.value;
        fetchProducts(query, rubro);
    });

    // Filtro los productos por rubro (con petición al backend).
    filterSelect.addEventListener('change', () => {
        const query = searchInput.value;
        const rubro = filterSelect.value;
        fetchProducts(query, rubro);
    });

    // Obtengo rubros desde la API.
    async function fetchRubros() {
        try {
            const res = await fetch('/api/products/rubros');
            const rubros = await res.json();
            renderRubros(rubros);
        } catch (error) {
            console.error('Error al obtener los rubros:', error);
        }
    }

    // Realizo un renderizado de rubros en el select.
    function renderRubros(rubros) {
        rubros.forEach(rubro => {
            const option = document.createElement('option');
            option.value = rubro.Codigo;
            option.textContent = rubro.Descripcion;
            filterSelect.appendChild(option);
        });
    }

    // Obtendo los productos desde la API.
    async function fetchProducts(query = '', rubro = '') {
        try {
            // Realiza la petición al backend con la descripción y rubro como parámetros
            const res = await fetch(`/api/products?descripcion=${encodeURIComponent(query)}&rubro=${encodeURIComponent(rubro)}`);
            const products = await res.json();
            renderProducts(products);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    }

    // Renderizo el productos en el DOM.
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


// Búsqueda de Productos:

// Se ajustó el evento input en searchInput para llamar a fetchProducts(query, rubro) cada vez que el usuario escribe. Esto hace una solicitud al backend con la descripción del producto y el rubro seleccionado.
// Filtrado por Rubro:

// Cuando el usuario cambia el rubro en el selector, también se realiza una petición al backend con los parámetros actualizados.
// Codificación de URL:

// Se utiliza encodeURIComponent() para asegurar que la consulta y el rubro se codifiquen correctamente al ser enviados a la API, evitando problemas con caracteres especiales.