import { Address } from './../model/address';
import { ElementRef, NgZone, OnInit, ViewChild, Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
// import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'jhi-address',
  templateUrl: './address.component.html',
  styles: []
})

/**
 * How to use:
 *1. Import: below module into your module
 *  ProstarsWebSharedModule
 *2. Use <jhi-address [(address)]="<your binding var> [controlType] = "address"></jhi-address> in your html file
 *3. Control types:
 * address => for searching full address
 * (cities) => for searching only for city
 */
export class AddressComponent implements OnInit {

  addressValue: Address;

  // 'address' => for searching full address
  // '(cities)' => for searching only for city
  @Input() controlType = 'address';

  @Input() placeHolder = '';

  @Output() addressChange = new EventEmitter();

  searchControl: FormControl;

  @ViewChild("search")
  searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    //create search FormControl
    this.searchControl = new FormControl();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: [this.controlType]
      });

      this.displayText();

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (!place.geometry) {
            return;
          }

          // clear old data
          this.addressValue = new Address();
          this.addressValue.displayText = this.searchElementRef.nativeElement.value;

          // parse data
          for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            var val = place.address_components[i]['long_name'];

            // parse address data
            // address type:
            // Street address: street_number + route
            // City: locality
            // State: administrative_area_level_1
            // Zipcode: postal_code
            // Country: country
            switch (addressType) {
              case 'street_number': {
                this.addressValue.streetNumber = val;
                break;
              }
              case 'route': {
                this.addressValue.streetName = val;
                break;
              }
              case 'locality': {
                this.addressValue.city = val;
                break;
              }
              case 'administrative_area_level_1': {
                this.addressValue.state = val;
                break;
              }
              case 'postal_code': {
                this.addressValue.zipCode = val;
                break;
              }
              case 'country': {
                this.addressValue.country = val;
                break;
              }
            }
            this.addressValue.latitude = place.geometry.location.lat();
            this.addressValue.longitude = place.geometry.location.lng();
          }
          this.addressChange.emit(this.addressValue);
        });
      });
      this.displayText();
    });
  }

  // @Input()
  // get placeHolder() {
  //   return this.placeHolderValue;
  // }

  // set placeHolder(val) {
  //   this.placeHolderValue = val; 
  // }

  // @Input()
  // get controlType() {
  //   return this.controlTypeValue;
  // }

  // set controlType(val) {
  //   this.controlTypeValue = val;
  // }

  @Input()
  get address() {
    return this.addressValue;
  }

  set address(val) {
    this.addressValue = val;
    this.displayText();
    this.addressChange.emit(this.addressValue);
  }

  displayText() {
    if (this.addressValue && this.addressValue.displayText) {
      this.searchElementRef.nativeElement.value = this.addressValue.displayText;
    }
  }
}