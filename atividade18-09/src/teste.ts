import { loadMapsApi } from 'google-maps-api-loader'
import google from 'google-maps-api-loader'

let map: google.maps.Map;
async function initMap(): Promise<void> {
  await loadMapsApi()
  const { Map } = await google.maps.importLibrary("maps");
  map = new Map(document.getElementById("map") as HTMLElement, {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

initMap();