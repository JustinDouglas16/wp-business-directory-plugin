/**
 * Companies Map Functionality
 * Uses ES6+ features for better organization and readability
 */
document.addEventListener("DOMContentLoaded", () => {
  // Map Configuration
  class CompaniesMap {
    constructor() {
      // Map initialization
      this.map = L.map("map").setView(
        [5.841062173729498, -55.043227522267586],
        8
      );
      this.markers = L.markerClusterGroup();

      // DOM elements
      this.companyListContainer = document.getElementById("mcp-company-items");
      this.searchInput = document.getElementById("mcp-search");
      this.districtFilter = document.getElementById("mcp-district-filter");
      this.sectorFilter = document.getElementById("mcp-sector-filter");

      // Initialize map components
      this.initializeMap();
      this.setupFilters();
      this.renderCompanies();
    }

    initializeMap() {
      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }).addTo(this.map);
    }

    setupFilters() {
      // Collect unique filter values
      const districts = new Set();
      const sectors = new Set();

      if (typeof mcpCompanies !== "undefined" && Array.isArray(mcpCompanies)) {
        mcpCompanies.forEach((company) => {
          if (company.district) districts.add(company.district);
          if (company.business_sector) sectors.add(company.business_sector);
        });

        // Populate district dropdown
        this.populateDropdown(this.districtFilter, districts);

        // Populate sector dropdown
        this.populateDropdown(this.sectorFilter, sectors);
      }

      // Add event listeners
      this.searchInput.addEventListener("input", () => this.renderCompanies());
      this.districtFilter.addEventListener("change", () =>
        this.renderCompanies()
      );
      this.sectorFilter.addEventListener("change", () =>
        this.renderCompanies()
      );
    }

    populateDropdown(selectElement, optionsSet) {
      [...optionsSet].sort().forEach((value) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        selectElement.appendChild(option);
      });
    }

    renderCompanies() {
      // Clear previous data
      this.companyListContainer.innerHTML = "";
      this.markers.clearLayers();

      // Get current filter values
      const searchValue = this.searchInput.value.toLowerCase();
      const selectedDistrict = this.districtFilter.value;
      const selectedSector = this.sectorFilter.value;

      // Filter companies
      const filteredCompanies = this.filterCompanies(
        searchValue,
        selectedDistrict,
        selectedSector
      );

      // Render each company
      filteredCompanies.forEach((company) => this.renderCompanyItem(company));

      // Add markers to map
      this.map.addLayer(this.markers);
    }

    filterCompanies(searchValue, selectedDistrict, selectedSector) {
      if (!mcpCompanies || !Array.isArray(mcpCompanies)) return [];

      return mcpCompanies.filter((company) => {
        return (
          (searchValue === "" ||
            company.title.toLowerCase().includes(searchValue)) &&
          (selectedDistrict === "" || company.district === selectedDistrict) &&
          (selectedSector === "" || company.business_sector === selectedSector)
        );
      });
    }

    renderCompanyItem(company) {
      // Create list item element
      const listItem = document.createElement("li");
      listItem.classList.add("mcp-company-item");

      // Generate HTML content
      listItem.innerHTML = this.generateCompanyListHTML(company);

      // Create map marker with popup
      const popupContent = this.generatePopupHTML(company);
      const marker = L.marker([company.lat, company.lng]).bindPopup(
        popupContent
      );
      this.markers.addLayer(marker);

      // Add click handler to focus map on company
      listItem.addEventListener("click", () => {
        this.map.setView([company.lat, company.lng], 14);
        marker.openPopup();
      });

      // Add to DOM
      this.companyListContainer.appendChild(listItem);
    }

    generateCompanyListHTML(company) {
      return `
        <div>
          <strong><i class="fas fa-building"></i> ${company.title}</strong><br>
          ${
            company.phone
              ? `<i class="fas fa-phone"></i> ${company.phone}<br>`
              : ""
          }
          ${
            company.address
              ? `<i class="fas fa-location-arrow"></i> ${company.address}<br>`
              : ""
          }
          ${
            company.email
              ? `<i class="fas fa-envelope"></i> <a href="mailto:${company.email}">${company.email}</a><br>`
              : ""
          }
          ${
            company.website
              ? `<i class="fas fa-globe"></i> <a href="${company.website}" target="_blank">${company.website}</a><br>`
              : ""
          }
        </div>
      `;
    }

    generatePopupHTML(company) {
      return `
        <div style="max-width: 250px;">
          ${
            company.thumbnail
              ? `<img src="${company.thumbnail}" style="width: 100%; border-radius: 5px; margin-bottom: 10px;">`
              : ""
          }
          <strong>${company.title}</strong><br>
          ${
            company.phone
              ? `<i class="fas fa-phone"></i> ${company.phone}<br>`
              : ""
          }
          ${
            company.email
              ? `<i class="fas fa-envelope"></i> <a href="mailto:${company.email}">${company.email}</a><br>`
              : ""
          }
          ${
            company.website
              ? `<i class="fas fa-globe"></i> <a href="${company.website}" target="_blank">${company.website}</a><br>`
              : ""
          }
          ${
            company.facebook
              ? `<i class="fab fa-facebook"></i> <a href="${company.facebook}" target="_blank">Facebook</a><br>`
              : ""
          }
          ${
            company.instagram
              ? `<i class="fab fa-instagram"></i> <a href="${company.instagram}" target="_blank">Instagram</a><br>`
              : ""
          }
          ${
            company.linkedin
              ? `<i class="fab fa-linkedin"></i> <a href="${company.linkedin}" target="_blank">LinkedIn</a><br>`
              : ""
          }
        </div>
      `;
    }
  }

  // Initialize the companies map
  new CompaniesMap();
});
