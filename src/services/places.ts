import {Place} from '../models/place'
import {Location} from "../models/location";

export class PlacesService {
  private places: Place[] = [];

  addPlace(title: string,
           description: string,
           location: Location,
           imageUrl: string) {
    const place = new Place(title, description, location, imageUrl);
    this.places.push(place);
    console.log(JSON.stringify(this.places, null, 2));
  }

  loadPlaces() {
    return this.places.slice();
  }

  deletePlace(index: number) {
    this.places.splice(index, 1);
  }
}
