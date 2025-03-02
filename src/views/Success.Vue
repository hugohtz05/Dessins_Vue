<template>
    <div class="page-success">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Merci !</h1>

                <p>Votre commande va être traitée dans les 48 heures à venir. :</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Success',
    async mounted() {
        document.title = "Validation | Dessins d'ici et d'ailleurs";
        localStorage.removeItem('order_id');
        this.$store.commit('clearCart');

        try {
            await axios.get("/restaure_cookies/")
            this.$store.commit('setIsAuthenticated', true);
        } catch(error) {
            alert("Payement réussi!");
            this.$store.commit('setIsAuthenticated', false);
        }
    },
}
</script>