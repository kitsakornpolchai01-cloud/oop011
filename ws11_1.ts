class Restaurant {
    constructor(private name: string, private menuItem: MenuItem[]) {}
    showMenu(): void {
        console.log(`Menu ของร้าน ${this.name}:`);
        this.menuItem.forEach(item => {
            console.log(item.getMenuInfo());
        });
    }
    calculateNetPrice(total: number): { netPrice: number; discountPercent: number } {
        if (total > 500) {
            const discountPercent = 1;
            const netPrice = total * (1 - discountPercent / 100);
            return { netPrice, discountPercent };
        }
        return { netPrice: total, discountPercent: 0 };
    }
}
class MenuItem {
    constructor(private _name: string, private _price: number, private _category: string) {}
    get name(): string {
        return this._name;
    }
    get price(): number {
        return this._price;
    }
    get category(): string {
        return this._category;
    }
    getMenuInfo(): string {
        return `${this._name} - ${this._price} - ${this._category}`;
    }
}

class Order {
    private items: { item: MenuItem; quantity: number }[] = [];

    showOrder(item: MenuItem, quantity: number): void {
        this.items.push({ item, quantity });
    }
    getItems() {
        return this.items;
    }
    calculateTotal(): number {
        return this.items.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0);
    }
    showOrderInfo(): void {
        this.items.forEach(entry => {
            const itemTotal = (entry.item.price * entry.quantity).toFixed(2);
            const itemPrice = entry.item.price.toFixed(2);
            console.log(`${entry.quantity} x ${entry.item.name} - ${itemPrice} - ${entry.item.category} = $${itemTotal}`);
        });
    }
}

class Customer {
    constructor(private name: string) {}
    placeOrder(restaurant: Restaurant, order: Order): void {
        console.log(`${this.name} สั่งอาหารรายการดังนี้:`);
        console.log("รายละเอียดการสั่งซื้อ:");
        order.showOrderInfo();
        console.log("-----------------------------------------");
        const total = order.calculateTotal();
        console.log(`ราคารวม: ฿${total.toFixed(2)}`);
        const { netPrice, discountPercent } = restaurant.calculateNetPrice(total);
        if (discountPercent > 0) {
            console.log(`ราคาสุทธิ (ส่วนลด ${discountPercent}%): ฿${netPrice.toFixed(2)}`);
        } else {
            console.log(`ราคาสุทธิ: ฿${netPrice.toFixed(2)}`);
        }
    }
}

const menu1 = new MenuItem("Pizza", 199, "Italian");
const menu2 = new MenuItem("Pasta", 159, "Italian");
const menu3 = new MenuItem("Steak", 259, "Europe");
const restaurant1 = new Restaurant("Pizzahut", [menu1, menu2, menu3]);
const santaOrder = new Order();
const santa = new Customer("Santa");
santaOrder.showOrder(menu1, 2);
santaOrder.showOrder(menu2, 1);
restaurant1.showMenu();
santa.placeOrder(restaurant1, santaOrder);