"use strict";

export class LocationMap {
  constructor(parent, ...coords) {
    this.parent = parent;
    this.coords = coords;
    this.loadMap();
  }

  loadMap() {
    this.mapContainer = document.createElement("div");
    this.mapContainer.className = "col-sm-12 map-wrapper";
    this.mapContainer.setAttribute("id", "map");
    this.latitude = document.createElement("div");
    this.latitude.className = "col-sm-12 map-wrapper-lat";
    this.latitude.innerHTML = `Latitude: ${this.coords[1]}`;
    this.longtitude = document.createElement("div");
    this.longtitude.className = "col-sm-12 map-wrapper-lon";
    this.longtitude.innerHTML = `Longtitude: ${this.coords[0]}`;
    if (this.parent.children[1] || this.parent.lastElementChild) {
      this.parent.replaceChild(this.latitude, this.parent.children[1]);
      this.parent.replaceChild(this.longtitude, this.parent.lastElementChild);
    } else
      this.parent.append(this.mapContainer, this.latitude, this.longtitude);
  }
}
