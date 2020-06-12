"use strict";

export class SearchCity {
  constructor(parent) {
    this.parent = parent;
    this.renderSearch();
  }

  renderSearch() {
    this.container = document.createElement("div");
    this.container.className = "col-sm-12 col-md-12 col-lg-5 search-wrapper";
    this.searchGroup = document.createElement("div");
    this.searchGroup.className = "input-group";
    this.input = document.createElement("input");
    this.input.className = "form-control";
    this.input.setAttribute("id", "cityVal");
    this.input.setAttribute("type", "text");
    this.input.setAttribute("placeholder", "Search The City");
    this.input.setAttribute("value", "");
    this.searchBtn = document.createElement("div");
    this.searchBtn.setAttribute("id", "searchCity");
    this.searchBtn.className = "input-group-prepend functional-btns";
    this.searchBtn.innerHTML = `<button type="button" class="input-group-text text-btn" style="border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem">Search</button>`;
    this.searchGroup.append(this.input, this.searchBtn);
    this.container.append(this.searchGroup);
    this.parent.append(this.container);
  }
}
