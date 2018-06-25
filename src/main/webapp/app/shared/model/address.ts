export class Address {
    constructor(
      public streetNumber?: string,
      public streetName?: string,
      public city?: string,
      public state?: string,
      public zipCode?: string,
      public country?: string,
      public latitude?: number,
      public longitude?: number,
      public displayText?: string
    ) {
      this.streetNumber = '';
      this.streetName = '';
      this.city = '';
      this.state = '';
      this.zipCode = '';
      this.country = '';
      this.latitude = 0;
      this.longitude = 0;
      this.displayText = '';
    }

    public toString(): string {
      return this.streetNumber + ' ' + this.streetName + ' '
        + this.city + ' ' + this.state + ' ' + this.country + ' ' + this.zipCode;
    }
}