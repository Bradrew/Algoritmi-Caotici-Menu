fetch('menu.json')
  .then(res => res.json())
  .then(data => {
    const menuElement = document.getElementById('menu');
    const description = document.getElementById('restaurant-description');

    const descriptions = document.querySelectorAll('.color-box');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1; 
            } else {
                entry.target.style.opacity = 0; 
            }
        });
    }, {
        threshold: 0.4 // 0.2 means 20% of the element is visible before fade in 
    });

    descriptions.forEach(desc => {
        observer.observe(desc);
    });

    for (const category in data) {
      // Section header
      const section = document.createElement('div');
      section.classList.add('menu-section');

      // Header 
      const header = document.createElement('div'); 
      header.classList.add('menu-header'); 
      header.innerHTML = `<h2>${category}</h2>`; 
      section.appendChild(header);

      // Content container (hidden by default in CSS) 
      const content = document.createElement('div'); 
      content.classList.add('menu-content'); 

      // Items
      data[category].forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('menu-item');

        // let html = `<strong style="font-size: 1.4em;">${item.name}</strong> <span style="font-style: italic; float: right;">${item.price}</span><br><em>${item.desc}</em>`;

        let html = `
            <span class="item-name">${item.name}</span> 
            <span class="item-price">${item.price}</span>
            <br>
            <span class="item-desc">${item.desc}</span> 
        `;
        
        if (item.img) {
          html += `<br><img src="${item.img}" alt="${item.name}" class="menu-image">`;
        }

        itemDiv.innerHTML = html;
        content.appendChild(itemDiv);
      });

      section.appendChild(content); 
      menuElement.appendChild(section);
    }

    // toggle expand/collapse on click 
    document.querySelectorAll('.menu-header').forEach(header => {
        header.addEventListener('click', () => {
            header.parentElement.classList.toggle('active'); 
        });
    });
  })
  .catch(err => {
    console.error("Error loading menu:", err);
    document.getElementById('menu').innerHTML = "<p>Menu unavailable. Please try again later.</p>";
  });
