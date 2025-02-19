<template>
    <div class="page-failure">
        <div class="colums is-multiline">
            <div class="column is-12">
                <h1 class="title">Echec du paiement</h1>

                <hr>

                <p>Une erreur est survenue lors du traitement du paiement.</p>
                <p v-if="errorMessage" class="has-text-danger">{{ errorMessage }}</p>

                <button @click="retryPayment" class="button is-dark">Réessayer</button>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            errorMessage: localStorage.getItem('payment_error')
        };
    },
    methods: {
        retryPayment() {
            localStorage.removeItem('payment_error');
            this.$router.push("/checkout");
        }
    }
};
</script>