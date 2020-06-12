"use strict";

import { timers } from "jquery";

export class CreateBtn {
  constructor(parent) {
    this.parent = parent;
    this.renderRefresh();
    this.renderLangs();
    this.renderTemp();
  }

  renderRefresh() {
    this.container = document.createElement("div");
    this.container.className = "btn-toolbar col-sm-12 col-md-12 col-lg-7";
    this.container.setAttribute("role", "toolbar");
    this.refreshCont = document.createElement("div");
    this.refreshCont.className = "functional-btns";
    this.btn = document.createElement("button");
    this.btn.className = "btn btn-secondary refresh-btn";
    this.btn.innerHTML = `<i class="fas fa-sync-alt"></i>`;
    this.refreshCont.append(this.btn);
    this.container.append(this.refreshCont);
    this.parent.append(this.container);
  }

  renderLangs() {
    this.selectCont = document.createElement("div");
    this.selectCont.className = "select-wrapper";
    this.select = document.createElement("select");
    this.select.setAttribute("id", "language");
    this.select.className = "custom-select";
    this.optionEN = document.createElement("option");
    this.optionEN.setAttribute("selected", "selected");
    this.optionEN.setAttribute("value", "en");
    this.optionEN.innerText = "EN";
    this.optionUA = document.createElement("option");
    this.optionUA.setAttribute("value", "pl");
    this.optionUA.innerText = "PL";
    this.select.append(this.optionEN);
    this.select.append(this.optionUA);
    this.selectCont.append(this.select);
    this.container.append(this.selectCont);
    this.parent.append(this.container);
  }

  renderTemp() {
    this.tempBtns = document.createElement("div");
    this.tempBtns.setAttribute("id", "toggle-temp");
    this.tempBtns.className = "btn-group functional-btns";
    this.tempBtns.setAttribute("role", "group");
    this.btnF = document.createElement("button");
    this.btnF.className = "btn btn-secondary";
    this.btnF.setAttribute("type", "button");
    this.btnF.setAttribute("value", "f");
    this.btnF.innerText = "°F";
    this.btnC = document.createElement("button");
    this.btnC.className = "btn btn-secondary active";
    this.btnC.setAttribute("type", "button");
    this.btnC.setAttribute("value", "c");
    this.btnC.innerText = "°C";
    this.tempBtns.append(this.btnF);
    this.tempBtns.append(this.btnC);
    this.container.append(this.tempBtns);
    this.parent.append(this.container);
  }
}
