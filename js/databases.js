 // SEARCH DATABASE
const searchData = [
  // DISHES
  { name: "Tacos al pastor", category: "Dishes", url: "dishes-en.html#tacos-al-pastor", keywords: ["tacos", "pastor", "taco", "meat"] },
  { name: "Pozole", category: "Dishes", url: "dishes-en.html#pozole", keywords: ["pozole", "soup", "corn"] },
  { name: "Tamales", category: "Dishes", url: "dishes-en.html#tamales", keywords: ["tamales", "dough", "leaf"] },
  { name: "Enchiladas", category: "Dishes", url: "dishes-en.html#enchiladas", keywords: ["enchiladas", "tortilla", "sauce"] },
  
  // RECIPES
  { name: "Birria", category: "Recipes", url: "recipes-en.html#birria", keywords: ["birria", "beef", "stew", "jalisco"] },
  { name: "Burritos", category: "Recipes", url: "recipes-en.html#burritos", keywords: ["burritos", "burrito", "tortilla", "flour"] },
  { name: "Ranch Steak", category: "Recipes", url: "recipes-en.html#bistec-ranchero", keywords: ["steak", "ranch", "beef", "tomato"] },
  
  // FESTIVALS
  { name: "Mole Fair", category: "Festivals", url: "mole-en.html", keywords: ["fair", "mole", "puebla", "sauce"] },
  { name: "Taco Fair", category: "Festivals", url: "taco-en.html", keywords: ["fair", "taco", "mexico city", "tacos"] },
  { name: "Corn Fair", category: "Festivals", url: "maiz-en.html", keywords: ["fair", "corn", "mexico state", "corn cob"] },
  
  // MAIN PAGES
  { name: "History of Mexican gastronomy", category: "Pages", url: "history-en.html", keywords: ["history", "origin", "tradition"] },
  { name: "Typical Mexican dishes", category: "Pages", url: "dishes-en.html", keywords: ["dishes", "food", "typical"] },
  { name: "Mexican recipes", category: "Pages", url: "recipes-en.html", keywords: ["recipes", "cooking", "prepare"] },
  { name: "Gastronomic festivals", category: "Pages", url: "festivals-en.html", keywords: ["festivals", "events", "celebrations"] }
];

    // DOM ELEMENTS
    const searchInput = document.getElementById('search-input');
    const searchSuggestions = document.getElementById('search-suggestions');
    const searchButton = document.getElementById('search-button');

    // PERFORM SEARCH FUNCTION
    function performSearch() {
      const searchTerm = searchInput.value.trim();
      
      if (!searchTerm) {
        // If no search term, show all suggestions
        showAllSuggestions();
        searchSuggestions.classList.add('active');
        return;
      }

      // Find the first matching result
      const results = searchData.filter(item => {
        const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const keywordMatch = item.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return nameMatch || keywordMatch;
      });

      if (results.length > 0) {
        // Go to first result
        window.location.href = results[0].url;
      } else {
        // If no results, show filtered suggestions
        filterSuggestions(searchTerm);
        searchSuggestions.classList.add('active');
      }
    }

    // FILTER SUGGESTIONS FUNCTION
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

    // SHOW ALL SUGGESTIONS
    function showAllSuggestions() {
      const categorized = {};
      
      searchData.forEach(item => {
        if (!categorized[item.category]) {
          categorized[item.category] = [];
        }
        categorized[item.category].push(item);
      });

      let html = '';
      
      // Show only some categories by default
      const defaultCategories = ['Dishes', 'Recipes', 'Festivals'];
      
      defaultCategories.forEach(category => {
        if (categorized[category]) {
          html += `
            <div class="suggestion-group">
              <div class="suggestion-header">${category}</div>
              ${categorized[category].slice(0, 3).map(item => `
                <a href="${item.url}" class="suggestion-item">
                  ${item.name}
                  <div class="suggestion-category">In ${item.category}</div>
                </a>
              `).join('')}
            </div>
          `;
        }
      });

      searchSuggestions.innerHTML = html;
    }

    // SHOW FILTERED SUGGESTIONS
    function displaySuggestions(results, searchTerm) {
      if (results.length === 0) {
        searchSuggestions.innerHTML = `
          <div class="no-results">
            No results found for "${searchTerm}"
            <br><small>Try other words like "tacos", "birria" or "mole"</small>
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
                  <div class="suggestion-category">In ${item.category}</div>
                </a>
              `;
            }).join('')}
          </div>
        `;
      });

      searchSuggestions.innerHTML = html;
    }

    // HIGHLIGHT MATCHING TEXT
    function highlightText(text, searchTerm) {
      if (!searchTerm.trim()) return text;
      
      const regex = new RegExp(`(${searchTerm})`, 'gi');
      return text.replace(regex, '<span class="suggestion-highlight">$1</span>');
    }

    // EVENTS
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

    // Search when pressing Enter
    searchInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault(); 
        performSearch();
      }
    });

    // Search when clicking the magnifying glass
    searchButton.addEventListener('click', function() {
      performSearch();
    });

    // Close suggestions when clicking outside
    document.addEventListener('click', function(event) {
      if (!event.target.closest('.search-container')) {
        searchSuggestions.classList.remove('active');
      }
    });

    // Automatically close mobile menu
    const menuToggle = document.getElementById('menu-toggle');
    const menuLinks = document.querySelectorAll('.mobile-nav a');
    
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.checked = false;
      });
    });

    // Show initial suggestions
    showAllSuggestions();