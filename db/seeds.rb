
order1 = Order.create(description: "King of the Hill DVD", total: 100.00)
order2 = Order.create(description: "Mega Man 3 OST", total: 29.99)
order3 = Order.create(description: "Punch Out!! NES", total: 0.75)

payment1 = Payment.create(order_id: order1.id, amount: 20.00)
payment2 = Payment.create(order_id: order2.id, amount: 1.00)
payment3 = Payment.create(order_id: order3.id, amount: 0.25)


g1 = Game.create(name: "Victor",  status: "3", time: 125)
g2 = Game.create(name: "Robert",  status: "3", time: 115)
g3 = Game.create(name: "Laura",  status: "3", time: 90)
