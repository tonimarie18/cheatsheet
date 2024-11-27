document.addEventListener('DOMContentLoaded', () => {
    const contentArea = document.getElementById('content'); // Main content container
    const navLinks = document.querySelectorAll('a[data-section]'); // Navigation links
  
    // Function to dynamically load content
    const loadContent = async (section, subsection = null) => {
      try {
        const response = await fetch(`/content/${section}`); // Fetch the content file
        if (!response.ok) throw new Error(`Failed to load ${section}`);
        
        // Load content into the content area
        const html = await response.text();
        contentArea.innerHTML = html;
  
        // Scroll to subsection if provided
        if (subsection) {
          const target = document.querySelector(`#${subsection}`);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          } else {
            console.warn(`Subsection #${subsection} not found.`);
          }
        }
      } catch (error) {
        console.error(error.message);
        contentArea.innerHTML = `<p>Error loading content: ${error.message}</p>`;
      }
    };
  
    // Attach click event listeners to navigation links
    navLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        const section = link.getAttribute('data-section'); // File to load
        const subsection = link.getAttribute('data-subsection'); // Subsection ID
        loadContent(section, subsection);
      });
    });
  });
  