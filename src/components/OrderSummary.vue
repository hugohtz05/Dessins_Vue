<template>
    <div class="box mb-4">
        <h3 class="is-size-4 mb-6">Commande #{{ order.order_id }}</h3>
        <h4 class="is-size-5">{{ order.status }}</h4>

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
                    v-bind:key="item.product"
                >
                    <td>{{ item.product_name }}</td>
                    <td>{{ item.product_price }}€</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.item_subtotal }}€</td>
                </tr>
            </tbody>

            <tfoot>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{{ order.total_price }}€</td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script>
export default {
    name: 'OrderSummary',
    props: {
        order: Object
    },
};
</script>