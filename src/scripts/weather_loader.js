"use strict";

export class WeatherLoader {
  constructor(parent, data) {
    this.parent = parent;
    this.city = data.city.name;
    this.country = data.city.country;
    this.weather = data.list;
    this.nextDays = this.weather.filter((obj) => {
      return new Date(obj.dt_txt).getHours() == 12;
    });
    this.weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    this.loadCity();
    this.loadDate();
    this.loadDegree();
    this.loadNextDays();
  }

  loadCity() {
    this.firstCol = document.createElement("div");
    this.firstCol.className = "col-sm-12 city-wrapper";
    this.firstCol.innerHTML = `<h2>${this.city}, ${this.country}</h2>`;
    if (this.parent.firstElementChild) {
      this.parent.replaceChild(this.firstCol, this.parent.firstElementChild);
    } else this.parent.append(this.firstCol);
  }

  loadDate() {
    const today = new Date();
    const hours =
      today.getHours() < 10 ? `0${today.getHours()}` : today.getHours();
    const minutes =
      today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes();
    this.date = `${this.weekDays[today.getDay()]} ${today.getDate()} ${
      this.months[today.getMonth()]
    } ${hours}:${minutes}`;

    this.scndCol = document.createElement("div");
    this.scndCol.className = "col-sm-12 time-wrapper";
    this.scndCol.innerHTML = `<h3>${this.date}</h3>`;
    if (this.parent.children[1]) {
      this.parent.replaceChild(this.scndCol, this.parent.children[1]);
    } else this.parent.append(this.scndCol);
  }

  loadDegree() {
    this.thirdCol = document.createElement("div");
    this.thirdCol.className = "col-sm-12 degree-wrapper";
    this.innerRow = document.createElement("div");
    this.innerRow.className = "row align-items-center";
    this.degree = document.createElement("div");
    this.degree.className = "col-sm-8";
    this.degree.innerHTML = `<h1 class="tempr-data">+${Math.floor(
      this.weather[0].main.temp - 273.15
    )}°</h1>`;
    this.details = document.createElement("div");
    this.details.className = "col-sm-4 details-wrapper";
    this.details.innerHTML = ` <div class="details-txt">${
      this.weather[0].weather[0].description
    }</div>
    <div class="details-txt">Feels like: +${Math.floor(
      this.weather[0].main.feels_like - 273.15
    )}°</div>
    <div class="details-txt">Wind: ${this.weather[0].wind.speed} m/s</div>
    <div class="details-txt">Humidity: ${this.weather[0].main.humidity}%</div>`;
    this.image = document.createElement("img");
    this.image.className = "img-fluid";
    this.image.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${this.weather[0].weather[0].icon}@2x.png`
    );
    this.image.setAttribute("alt", this.weather[0].weather[0].description);
    this.details.prepend(this.image);
    this.innerRow.append(this.degree, this.details);
    this.thirdCol.append(this.innerRow);
    if (this.parent.children[2]) {
      this.parent.replaceChild(this.thirdCol, this.parent.children[2]);
    } else this.parent.append(this.thirdCol);
  }

  loadNextDays() {
    this.nextWeekDay = this.nextDays.map((obj) => {
      return new Date(obj.dt_txt).getDay();
    });
    this.forthCol = document.createElement("div");
    this.forthCol.className = "col-sm-12 next-days-wrapper";
    this.innerRow = document.createElement("div");
    this.innerRow.className = "row";
    this.firstDay = document.createElement("div");
    this.firstDay.className = "col-sm-4";
    this.firstDay.innerHTML = `<div class="weekday"">${
      this.weekDays[this.nextWeekDay[0]]
    }</div>
<div class="temperature tempr-data">+${Math.floor(
      this.nextDays[0].main.temp - 273.15
    )}°</div>`;
    this.image1 = document.createElement("img");
    this.image1.className = "img-fluid weekdayImg";
    this.image1.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${this.nextDays[0].weather[0].icon}@2x.png`
    );
    this.image1.setAttribute("alt", this.nextDays[0].weather[0].description);
    this.firstDay.append(this.image1);
    this.secondDay = document.createElement("div");
    this.secondDay.className = "col-sm-4";
    this.secondDay.innerHTML = `<div class="weekday" style="width: 100%">${
      this.weekDays[this.nextWeekDay[1]]
    }</div>
<div class="temperature tempr-data">+${Math.floor(
      this.nextDays[1].main.temp - 273.15
    )}°</div>`;
    this.image2 = document.createElement("img");
    this.image2.className = "img-fluid weekdayImg";
    this.image2.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${this.nextDays[1].weather[0].icon}@2x.png`
    );
    this.image2.setAttribute("alt", this.nextDays[1].weather[0].description);
    this.secondDay.append(this.image2);
    this.thirdDay = document.createElement("div");
    this.thirdDay.className = "col-sm-4";
    this.thirdDay.innerHTML = `<div class="weekday">${
      this.weekDays[this.nextWeekDay[2]]
    }</div>
<div class="temperature tempr-data">+${Math.floor(
      this.nextDays[2].main.temp - 273.15
    )}°</div>`;
    this.image3 = document.createElement("img");
    this.image3.className = "img-fluid weekdayImg";
    this.image3.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${this.nextDays[2].weather[0].icon}@2x.png`
    );
    this.image3.setAttribute("alt", this.nextDays[2].weather[0].description);
    this.thirdDay.append(this.image3);
    this.innerRow.append(this.firstDay, this.secondDay, this.thirdDay);
    this.forthCol.append(this.innerRow);
    if (this.parent.children[3]) {
      this.parent.replaceChild(this.forthCol, this.parent.children[3]);
    } else this.parent.append(this.forthCol);
  }
}
