import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet/dist/images/marker-shadow.png';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.configMap()
  }

  map: any;

  configMap() {
    //
    this.map = L.map('map', { zoom: 10 }).locate({
      setView: true,
      maxZoom: 16,
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    const user_location = navigator.geolocation.getCurrentPosition((position) => {
      var marker = L.marker([
        position.coords.latitude,
        position.coords.longitude,
      ]).addTo(this.map);

      const kino_pod_baranami = L.marker([
        50.06177313575869, 19.935332407828856,
      ])
        .addTo(this.map)
        .bindPopup('Kino Pod Baranami.<br> Najlepsze kino studyjne w Krakowie.')
        .openPopup()
        .on('click', function (e) {
          window.location.href = 'https://www.kinopodbaranami.pl/';
        });

      const kino_kijow = L.marker([50.05881323697858, 19.925030830072455])
        .addTo(this.map)
        .bindPopup('Kino Kijów.<br> Kultowe miejsce na mapie Krakowa.')
        .openPopup()
        .on('click', function (e) {
          window.location.href = 'https://kijow.pl/';
        });

      const kino_paradox = L.marker([50.063198234786505, 19.926495092311548])
        .addTo(this.map)
        .bindPopup(
          'Kino Paradox.<br> Kameralne kino niezależne wyświetlające nowoczesne i klasyczne filmy europejskie.'
        )
        .openPopup()
        .on('click', function (e) {
          window.location.href = 'https://www.kinoparadox.pl/';
        });
    });
  }
}
