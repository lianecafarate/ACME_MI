import * as dmUtils from "./dm-utils";

/*
* title : "root",
* inputType : "JSON",
*/
interface Root {
orderId: string
customer: {
customerId: string
name: string
email: string
phone: string
}
items: {
productId: string
name: string
quantity: number
unitPrice: number
}[]
shipping: {
address: {
street: string
city: string
state: string
zip: string
country: string
}
method: string
cost: number
}
payment: {
method: string
transactionId: string
totalAmount: number
}
status: string
orderDate: string
orderTime: string
}

/*
* title : "root",
* outputType : "JSON",
*/
interface OutputRoot {
orderId: string
customer: {
customerId: string
name: string
email: string
phone: string
}
items: {
productId: string
name: string
quantity: number
unitPrice: number
}[]
shipping: {
address: {
street: string
city: string
state: string
zip: string
country: string
}
method: string
cost: number
}
payment: {
method: string
transactionId: string
totalAmount: number
}
status: string
orderTimeStamp: string
}



/**
 * functionName : map_S_root_S_root
 * inputVariable : inputroot
*/
export function mapFunction(input: Root): OutputRoot {
    return {
        orderId: input.orderId,
        customer: {
            customerId: input.customer.customerId,
            name: input.customer.name,
            email: input.customer.email,
            phone: input.customer.phone
        },
        items: input.items.map(item => {
            return {
                productId: item.productId,
                name: item.name,
                quantity: item.quantity,
                unitPrice: item.unitPrice
            };
        }),
        shipping: {
            address: {
                street: input.shipping.address.street,
                city: input.shipping.address.city,
                state: input.shipping.address.state,
                zip: input.shipping.address.zip,
                country: input.shipping.address.country
            },
            method: input.shipping.method,
            cost: input.shipping.cost
        },
        payment: {
            method: input.payment.method,
            transactionId: input.payment.transactionId,
            totalAmount: input.payment.totalAmount
        },
        status: input.status,
        orderTimeStamp: `${input.orderDate} ${input.orderTime}`
    };
}

