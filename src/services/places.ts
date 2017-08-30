import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { File } from "@ionic-native/file";

import {Place} from '../models/place'
import {Location} from "../models/location";

declare const cordova: any;

@Injectable()
export class PlacesService {
  private places: Place[] = [];

  constructor(private storage: Storage,
              private file: File) {}

  addPlace(title: string,
           description: string,
           location: Location,
           imageUrl: string) {
    const place = new Place(title, description, location, imageUrl);
    this.places.push(place);

    // store data
    this.storage
      .set('places', this.places)
      .then()
      .catch((err) => {
        this.places.splice(this.places.indexOf(place), 1);
      })
  }

  loadPlaces() {
    return this.places.slice();
  }

  fetchPlaces(): Promise<any> {
    return new Promise((resolve, reject) =>{
      this.storage.get('places')
        .then(
          (places: Place[]) => {
            places.map((place: Place) => {
              place.imageRef = cordova.file.dataDirectory + place.imageRef;
              return place;
            });
            console.log('places', JSON.stringify(places, null, 2));
            this.places = places != null ? places : [];
            resolve();
          }
        )
        .catch((err) => {
          console.log(err);
          reject();
        });
    });
  }

  deletePlace(index: number) {
    const place = this.places[index];

    this.places.splice(index, 1);
    this.storage.set('places', this.places)
      .then(() => {
        this.removeFile(place);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private removeFile(place: Place) {
    const currentName = place.imageRef.replace(/.*[\\\/]/, '');
    this.file
      .removeFile(cordova.file.dataDirectory, currentName)
      .then(() => {
        console.log('Removed File', cordova.file.dataDirectory);
      })
      .catch((err) => {
        console.log('Error while removing File', err);
        this.addPlace(place.title, place.description, place.location, place.imageRef);
      });
  }
}
