abstract class TravelPackage {
  private _packageId: string;
  private _packageName: string;
  protected _basePrice: number;

  constructor(packageId: string, packageName: string, basePrice: number) {
    this._packageId = packageId;
    this._packageName = packageName;
    this._basePrice = basePrice;
  }

  get packageId(): string {
    return this._packageId;
  }

  get packageName(): string {
    return this._packageName;
  }

  get basePrice(): number {
    return this._basePrice;
  }

  abstract calculatePrice(people: number): number;
  abstract getDetails(): string;
}

class OneDayTrip extends TravelPackage {
  constructor(packageId: string, packageName: string, basePrice: number) {
    super(packageId, packageName, basePrice);
  }

  calculatePrice(people: number): number {
    let total = this._basePrice * people;
    if (people >= 5) {
      total *= 0.9;
    }
    return total;
  }

  getDetails(): string {
    return `${this.packageName} (One-Day)`;
  }
}

class OvernightTrip extends TravelPackage {
  private _numberOfNights: number;

  constructor(packageId: string, packageName: string, basePrice: number, numberOfNights: number) {
    super(packageId, packageName, basePrice);
    this._numberOfNights = numberOfNights;
  }

  get numberOfNights(): number {
    return this._numberOfNights;
  }

  calculatePrice(people: number): number {
    let total = this._basePrice * people * this._numberOfNights;
    if (this._numberOfNights >= 3) {
      total *= 0.85;
    }
    return total;
  }

  getDetails(): string {
    return `${this.packageName} (Overnight - ${this._numberOfNights} Nights)`;
  }
}

class Customer {
  private _customerId: string;
  private _name: string;
  private _phone: string;

  constructor(customerId: string, name: string, phone: string) {
    this._customerId = customerId;
    this._name = name;
    this._phone = phone;
  }

  get customerId(): string {
    return this._customerId;
  }

  get name(): string {
    return this._name;
  }

  get phone(): string {
    return this._phone;
  }
}

class BookingDetail {
  private _travelers: string[];

  constructor(travelers: string[]) {
    this._travelers = travelers;
  }

  get travelers(): string[] {
    return this._travelers;
  }
}

class Booking {
  private _bookingId: string;
  private _customer: Customer;
  private _pkg: TravelPackage;
  private _bookingDetail: BookingDetail;

  constructor(bookingId: string, customer: Customer, pkg: TravelPackage, travelers: string[]) {
    this._bookingId = bookingId;
    this._customer = customer;
    this._pkg = pkg;
    this._bookingDetail = new BookingDetail(travelers);
  }

  calculateTotalPrice(): number {
    return this._pkg.calculatePrice(this._bookingDetail.travelers.length);
  }

  displayBookingDetail(): void {
    const peopleCount = this._bookingDetail.travelers.length;
    const totalPrice = this.calculateTotalPrice();
    const travelersList = this._bookingDetail.travelers.join(', ');

    console.log("===== Booking Detail =====");
    console.log(`Booking ID: ${this._bookingId}`);
    console.log(`Customer: ${this._customer.name}`);
    console.log(`Package: ${this._pkg.packageName}`);
    console.log(`Travelers: ${peopleCount} (${travelersList})`);
    console.log("");
    console.log(`Total Price (10% Disc): ${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Baht`);
  }
}

class TravelAgency {
  private _packages: TravelPackage[] = [];

  addPackage(pkg: TravelPackage): void {
    this._packages.push(pkg);
  }

  displayPackages(): void {
    console.log("===== Travel Packages =====");
    this._packages.forEach((pkg, index) => {
      console.log(`${index + 1}. ${pkg.getDetails()}`);
      console.log(`Price: ${pkg.basePrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Baht`);
    });
    console.log("");
  }
}

const agency = new TravelAgency();
const pkg1 = new OneDayTrip("P001", "Bangkok City Tour", 1500);
const pkg2 = new OvernightTrip("P002", "Chiang Mai Trip", 2500, 3);
const customer = new Customer("C001", "Alice", "0812345678");
const travelers = ["Alice", "Bob", "Carol", "David", "Eve"];
const booking = new Booking("B001", customer, pkg1, travelers);agency.addPackage(pkg1);
agency.addPackage(pkg2);
agency.displayPackages();
booking.displayBookingDetail();