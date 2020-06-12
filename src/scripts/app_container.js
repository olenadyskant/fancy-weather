"use strict";

export class WeatherApp {
  constructor(classes) {
    this.appendDivs();
  }

  appendDivs() {
    const classes = [
      "container-fluid functional-container",
      "weather-container col-sm-12 col-md-12 col-lg-7",
      "map-container col-sm-12 col-md-12 col-lg-5",
    ];
    
    this.container = document.createElement("div");
    this.container.setAttribute("id", "main");
    this.container.className = "main-container";
    classes.forEach((el) => {
      if (el.includes("weather-container")) {
        this.wrapper = document.createElement("div");
        this.wrapper.className = "container-fluid weather-wrapper";
        this.wrapRow = document.createElement("div");
        this.wrapRow.className = "row";
        this.divContainer = document.createElement("div");
        this.divContainer.className = el;
        this.row = document.createElement("div");
        this.row.className = "row";
        this.divContainer.append(this.row);
        this.wrapRow.append(this.divContainer);
        this.wrapper.append(this.wrapRow);
      } else if (el.includes("map-container")) {
        this.divContainer = document.createElement("div");
        this.divContainer.className = el;
        this.row = document.createElement("div");
        this.row.className = "row";
        this.divContainer.append(this.row);
        this.wrapRow.append(this.divContainer);
        this.wrapper.append(this.wrapRow);
        this.container.append(this.wrapper);
      } else {
        this.divContainer = document.createElement("div");
        this.divContainer.className = el;
        this.row = document.createElement("div");
        this.row.className = "row";
        this.divContainer.append(this.row);
        this.container.append(this.divContainer);
      }
    });
    document.body.prepend(this.container);
  }
}
