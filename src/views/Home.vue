<template>
    <div class="home is-white">
        <section class="hero is-medium is-white mb-6">
            <div class="hero-body has-text-centered">
                <p class="title mb-6">
                    Bienvenue à Dessins d'ici et d'ailleurs
                </p>
                <p class="subtitle">
                    Les dessins originaux de mes voyages en Asie
                </p>
            </div>    
        </section>
    
        <div class="columns is-multiline">
            <div class="column is-12">
                <h2 class="is-size-2 has-text-centered">
                    Mes nouveaux dessins
                </h2>
            </div>

            <ProductBox
                v-for="product in latestProducts"
                :key="product.id"
                :product="product" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ProductBox from '@/components/ProductBox.vue';

export default {
  name: 'Home',
  components: {
    ProductBox
  },
  data() {
    return {
        latestProducts: []
    }
  },
  components: {
  },
  mounted() {
    this.getLatestProducts()

    document.title = "Page d'accueil | Dessins d'ici et d'ailleurs"
  },
  methods: {
    async getLatestProducts() {
        this.$store.commit('setIsLoading', true)

        await axios
            .get('/api/v1/latest-product/')
            .then(response => {
                this.latestProducts = response.data
            })
        .catch(error => {
            console.log(error)
        })

        this.$store.commit('setIsLoading', false)
    }
  }
}
</script>