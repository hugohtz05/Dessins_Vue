<template>
    <div class="columun is-3 ml-4">
        <div class="box">
            <figure class="image mb-4">
                <img :src="product.thumbnail" alt="{{ product.name }}">
            </figure>
            <h3 class="is-size-4">{{ product.name }}</h3>
            <p class="is-size-7">{{ product.category_name }}</p>
            <div class="is-size-6 has-text-grey">{{ product.price }}€</div>
            <router-link v-bind:to="product.get_absolute_url" class="button is-dark mt-4">Voir le dessin</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductBox',
    props: {
        product: Object
    }
}
</script>

<style scoped>
.image {
    margin-top: -1.25rem;
    margin-left: -1.25rem;
    margin-right: -1.25rem;
}
</style>