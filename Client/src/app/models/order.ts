
export class Order {

    public constructor(
        public _id?: string,
        public userId?: string,
        public cartId?: string,
        public city?: string,
        public street?: string,
        public deliveryDate?: Date,
        public orderDate?: Date,
        public creditCard?: number) {
    }
}