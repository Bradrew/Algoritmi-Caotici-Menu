fetch('menu.json')
  .then(res => res.json())
  .then(data => {
    const menuElement = document.getElementById('menu');
    const description = document.getElementById('restaurant-description');

    // Fade and slide description on scroll 
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY; 
        const fadeStart = 100; // Adjust for when fade should finish 
        const fadeEnd = 700; 
        const fadePoint = 700; 

        let opacity = 1; 
        if (scrollY > fadeStart) {
            opacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart); 
        }
        opacity = Math.max(opacity, 0); 

        // document.querySelector('.description-wrapper').style.opacity = opacity;
        description.style.opacity = opacity; 

        // if (scrollY <= fadePoint) {
        //     // Calculate opacity and slide based on scroll 
        //     const opacity = 1 - scrollY / fadePoint; 
        //     const translateY = scrollY / 2; // subtle upward slide 
        //     description.style.opacity = opacity; 
        //     description.style.transform = `translateY(-${translateY}px)`; 
        // } else {
        //     // Hide completely when past fadepoint 
        //     description.style.opacity = 0; 
        //     description.style.transform = `translateY(-50px)`; 
        // }
    });

    // Menu fade-in using IntersectionObserver 
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    menuElement.classList.add('visible'); 
                }
            }); 
        }, 
        { threshold: 0.1 } // trigger when 10% of menu is visible  
    );

    observer.observe(menuElement); 


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
