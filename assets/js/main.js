// Function to include templates dynamically
function includeHTML() {
    const elements = document.querySelectorAll("[data-include]");
    elements.forEach(async (el) => {
      const file = el.getAttribute("data-include");
      if (file) {
        try {
          const response = await fetch(file);
          if (response.ok) {
            el.innerHTML = await response.text();
          } else {
            el.innerHTML = "Template not found.";
          }
        } catch (error) {
          console.error("Error loading template:", error);
        }
      }
    });
  }
  
  // Call the function once the DOM is ready
  document.addEventListener("DOMContentLoaded", includeHTML);
  