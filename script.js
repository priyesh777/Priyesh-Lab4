async function fetchISSLocation() {
    try {
        const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
        const data = await response.json();
        return {
            id: data.id,
            altitude: data.altitude,
            latitude: data.latitude,
            longitude: data.longitude,
        };
    } catch (error) {
        console.error("Error fetching ISS data:", error);
        throw error;
    }
}

async function updateMapWithISSLocation() {
    try {
        const issLocation = await fetchISSLocation();
        const map = L.map("map").setView([issLocation.latitude, issLocation.longitude], 2);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

        const marker = L.marker([issLocation.latitude, issLocation.longitude]).addTo(map);
        marker.bindPopup("Satellite").openPopup();

        const mapInfo =
            `<div>
            <p> ID : <strong> ${issLocation.id} </strong></p>
            <p> Altitude :<strong> ${issLocation.altitude} </strong></p>
            <p>Latitude : <strong>${issLocation.latitude}</strong></p>
            <p>Longitude : <strong>${issLocation.longitude}</strong></p>
            </div>`;

        // Setting innerHTML as map variables
        document.getElementById("lat_long").innerHTML = mapInfo;
    }
    catch (error) {
        console.error("Error updating ISS map:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => updateMapWithISSLocation());
