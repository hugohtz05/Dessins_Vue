<template>
    <div class="box mb-4">
        <h3 class="is-size-4 mb-6">Commande #{{ order.order_id }}</h3>
        <h4 class="is-size-5">Produits</h4>

        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <td>Produit</td>
                    <td>Prix</td>
                    <td>Quantité</td>
                    <td>Total</td>
                </tr>
            </thead>

            <tbody>
                <tr
                    v-for="item in order.items"
                    v-bind:key="item.product.id"
                >
                    <td>{{ item.product.name }}</td>
                    <td>{{ item.product.price }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ getItemTotal(item).toFixed(2) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'OrderSummary',
    props: {
        order: Object
    },
    methods: {
        getItemTotal(item) {
            return item.quantity * item.product.price;
        },
        orderTotalLength(order) {
            return order.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        },
    }
};
</script>