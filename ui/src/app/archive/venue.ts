export const TEHRAN = {lat: 35.6892, lng: 51.3890};

export class Venue {
  id = -1;
  title = '';
  latitude: number;
  longitude: number;
  farsiAddress1 = '';
  farsiAddress2 = '';
  mapUrl = '';
  description = '';
  link = '';
  virtual = false;


  constructor(
    id: number = 0,
    title: string = '',
    lat: number = TEHRAN.lat,
    lng: number = TEHRAN.lng,
    address1: string = '',
    address2: string = '',
    mapUrl: string = '') {

    this.id = id;
    this.title = title;
    this.latitude = lat;
    this.longitude = lng;
    this.farsiAddress1 = address1;
    this.farsiAddress2 = address2;
    this.mapUrl = mapUrl;
  }
}
