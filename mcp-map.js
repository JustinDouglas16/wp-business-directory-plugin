document.addEventListener("DOMContentLoaded", function () {
  var map = L.map("map").setView([5.841062173729498, -55.043227522267586], 8);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);

  var markers = L.markerClusterGroup(); // Create a cluster group
  var companyListContainer = document.getElementById("mcp-company-items");
  var searchInput = document.getElementById("mcp-search");
  var districtFilter = document.getElementById("mcp-district-filter");
  var sectorFilter = document.getElementById("mcp-sector-filter");

  // Populate district & business sector dropdowns
  var districts = new Set();
  var sectors = new Set();

  if (typeof mcpCompanies !== "undefined" && Array.isArray(mcpCompanies)) {
    mcpCompanies.forEach(function (company) {
      if (company.district) districts.add(company.district);
      if (company.business_sector) sectors.add(company.business_sector);
    });

    districts.forEach((district) => {
      var option = document.createElement("option");
      option.value = district;
      option.textContent = district;
      districtFilter.appendChild(option);
    });

    sectors.forEach((sector) => {
      var option = document.createElement("option");
      option.value = sector;
      option.textContent = sector;
      sectorFilter.appendChild(option);
    });
  }

  function updateCompanyList() {
    companyListContainer.innerHTML = "";
    markers.clearLayers(); // Clear existing markers

    var searchValue = searchInput.value.toLowerCase();
    var selectedDistrict = districtFilter.value;
    var selectedSector = sectorFilter.value;

    mcpCompanies.forEach(function (company) {
      if (
        (searchValue === "" ||
          company.title.toLowerCase().includes(searchValue)) &&
        (selectedDistrict === "" || company.district === selectedDistrict) &&
        (selectedSector === "" || company.business_sector === selectedSector)
      ) {
        var listItem = document.createElement("li");
        listItem.style.padding = "10px";
        listItem.style.borderBottom = "1px solid #ddd";
        listItem.style.cursor = "pointer";

        listItem.innerHTML = `
            <div>
                <strong><i class="fas fa-building"></i> ${
                  company.title
                }</strong><br>
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

        var popupContent = `
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

        var marker = L.marker([company.lat, company.lng]).bindPopup(
          popupContent
        );
        markers.addLayer(marker); // Add marker to cluster group

        listItem.addEventListener("click", function () {
          map.setView([company.lat, company.lng], 14);
          marker.openPopup();
        });

        companyListContainer.appendChild(listItem);
      }
    });

    map.addLayer(markers); // Add the cluster group to the map
  }

  searchInput.addEventListener("input", updateCompanyList);
  districtFilter.addEventListener("change", updateCompanyList);
  sectorFilter.addEventListener("change", updateCompanyList);

  updateCompanyList();
});
