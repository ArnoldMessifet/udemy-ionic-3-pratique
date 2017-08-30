import { Component, OnInit } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {AddPlacePage} from "../add-place/add-place";
import {Place} from "../../models/place";
import {PlacesService} from "../../services/places";
import {PlacePage} from "../place/place";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  addPlacePage = AddPlacePage;
  places: Place[] = [];

  constructor(public navCtrl: NavController,
              private placesService: PlacesService,
              private modalCtrl: ModalController) {}

  ngOnInit() {
    // load the store in the service
    this.placesService
      .fetchPlaces()
      .then(() => {
        this.places = this.placesService.loadPlaces();
      });
  }

  ionViewWillEnter() {
    // console.log('ionViewWillEnter', JSON.stringify(this.placesService.loadPlaces(), null, 2));
    console.log('ionViewWillEnter');
    this.places = this.placesService.loadPlaces();
  }

  onOpenPlace(place: Place, index: number) {
    const modal = this.modalCtrl.create(PlacePage, {place: place, index: index});
    modal.present();
  }

}
