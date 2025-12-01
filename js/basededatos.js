 // BASE DE DATOS DE BÚSQUEDA
    const searchData = [
      // PLATILLOS
      { name: "Tacos al pastor", category: "Platillos", url: "platillos.html#tacos-al-pastor", keywords: ["tacos", "pastor", "taco", "carne"] },
      { name: "Pozole", category: "Platillos", url: "platillos.html#pozole", keywords: ["pozole", "sopa", "maíz"] },
      { name: "Tamales", category: "Platillos", url: "platillos.html#tamales", keywords: ["tamales", "masa", "hoja"] },
      { name: "Enchiladas", category: "Platillos", url: "platillos.html#enchiladas", keywords: ["enchiladas", "tortilla", "salsa"] },
      
      // RECETAS
      { name: "Birria", category: "Recetas", url: "recetas.html#birria", keywords: ["birria", "res", "guiso", "jalisco"] },
      { name: "Burritos", category: "Recetas", url: "recetas.html#burritos", keywords: ["burritos", "burrito", "tortilla", "harina"] },
      { name: "Bistec Ranchero", category: "Recetas", url: "recetas.html#bistec-ranchero", keywords: ["bistec", "ranchero", "carne", "jitomate"] },
      
      // FESTIVALES
      { name: "Feria del Mole", category: "Festivales", url: "feria-del-mole.html", keywords: ["feria", "mole", "puebla", "salsa"] },
      { name: "Feria del Taco", category: "Festivales", url: "feria-del-taco.html", keywords: ["feria", "taco", "cdmx", "tacos"] },
      { name: "Feria del Maíz", category: "Festivales", url: "feria-del-maiz.html", keywords: ["feria", "maíz", "estado de méxico", "elote"] },
      
      // PÁGINAS PRINCIPALES
      { name: "Historia de la gastronomía mexicana", category: "Páginas", url: "historia.html", keywords: ["historia", "origen", "tradición"] },
      { name: "Platillos típicos mexicanos", category: "Páginas", url: "platillos.html", keywords: ["platillos", "comida", "típico"] },
      { name: "Recetas mexicanas", category: "Páginas", url: "recetas.html", keywords: ["recetas", "cocina", "preparar"] },
      { name: "Festivales gastronómicos", category: "Páginas", url: "festivales.html", keywords: ["festivales", "eventos", "celebraciones"] }
    ];

    // ELEMENTOS DEL DOM
    const searchInput = document.getElementById('search-input');
    const searchSuggestions = document.getElementById('search-suggestions');
    const searchButton = document.getElementById('search-button');

    // FUNCIÓN PARA REALIZAR BÚSQUEDA
    function performSearch() {
      const searchTerm = searchInput.value.trim();
      
      if (!searchTerm) {
        // Si no hay término de búsqueda, mostrar todas las sugerencias
        showAllSuggestions();
        searchSuggestions.classList.add('active');
        return;
      }

      // Buscar el primer resultado que coincida
      const results = searchData.filter(item => {
        const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const keywordMatch = item.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return nameMatch || keywordMatch;
      });

      if (results.length > 0) {
        // Ir al primer resultado
        window.location.href = results[0].url;
      } else {
        // Si no hay resultados, mostrar sugerencias filtradas
        filterSuggestions(searchTerm);
        searchSuggestions.classList.add('active');
      }
    }

    // FUNCIÓN PARA FILTRAR SUGERENCIAS
    function filterSuggestions(searchTerm) {
      if (!searchTerm.trim()) {
        return showAllSuggestions();
      }

      const filtered = searchData.filter(item => {
        const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const keywordMatch = item.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return nameMatch || keywordMatch;
      });

      displaySuggestions(filtered, searchTerm);
    }

    // MOSTRAR TODAS LAS SUGERENCIAS
    function showAllSuggestions() {
      const categorized = {};
      
      searchData.forEach(item => {
        if (!categorized[item.category]) {
          categorized[item.category] = [];
        }
        categorized[item.category].push(item);
      });

      let html = '';
      
      // Mostrar solo algunas categorías por defecto
      const defaultCategories = ['Platillos', 'Recetas', 'Festivales'];
      
      defaultCategories.forEach(category => {
        if (categorized[category]) {
          html += `
            <div class="suggestion-group">
              <div class="suggestion-header">${category}</div>
              ${categorized[category].slice(0, 3).map(item => `
                <a href="${item.url}" class="suggestion-item">
                  ${item.name}
                  <div class="suggestion-category">En ${item.category}</div>
                </a>
              `).join('')}
            </div>
          `;
        }
      });

      searchSuggestions.innerHTML = html;
    }

    // MOSTRAR SUGERENCIAS FILTRADAS
    function displaySuggestions(results, searchTerm) {
      if (results.length === 0) {
        searchSuggestions.innerHTML = `
          <div class="no-results">
            No se encontraron resultados para "${searchTerm}"
            <br><small>Prueba con otras palabras como "tacos", "birria" o "mole"</small>
          </div>
        `;
        return;
      }

      const categorized = {};
      
      results.forEach(item => {
        if (!categorized[item.category]) {
          categorized[item.category] = [];
        }
        categorized[item.category].push(item);
      });

      let html = '';

      Object.keys(categorized).forEach(category => {
        html += `
          <div class="suggestion-group">
            <div class="suggestion-header">${category}</div>
            ${categorized[category].map(item => {
              const highlightedName = highlightText(item.name, searchTerm);
              return `
                <a href="${item.url}" class="suggestion-item">
                  ${highlightedName}
                  <div class="suggestion-category">En ${item.category}</div>
                </a>
              `;
            }).join('')}
          </div>
        `;
      });

      searchSuggestions.innerHTML = html;
    }

    // RESALTAR TEXTO QUE COINCIDE CON LA BÚSQUEDA
    function highlightText(text, searchTerm) {
      if (!searchTerm.trim()) return text;
      
      const regex = new RegExp(`(${searchTerm})`, 'gi');
      return text.replace(regex, '<span class="suggestion-highlight">$1</span>');
    }

    // EVENTOS
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value;
      filterSuggestions(searchTerm);
      searchSuggestions.classList.add('active');
    });

    searchInput.addEventListener('focus', function() {
      if (!this.value.trim()) {
        showAllSuggestions();
      }
      searchSuggestions.classList.add('active');
    });

    // Buscar al presionar Enter
    searchInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault(); 
        performSearch();
      }
    });

    // Buscar al hacer clic en la lupa
    searchButton.addEventListener('click', function() {
      performSearch();
    });

    // Cerrar sugerencias al hacer clic fuera
    document.addEventListener('click', function(event) {
      if (!event.target.closest('.search-container')) {
        searchSuggestions.classList.remove('active');
      }
    });

    // Cerrar menú móvil automáticamente
    const menuToggle = document.getElementById('menu-toggle');
    const menuLinks = document.querySelectorAll('.mobile-nav a');
    
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.checked = false;
      });
    });

    // Mostrar sugerencias iniciales
    showAllSuggestions();