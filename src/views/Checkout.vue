<template>
    <div class="checkout-page">
        <h1>Paiement de la commande</h1>
        <div v-if="loading">Chargement du paiement...</div>
  
        <form v-else @submit.prevent="handlePayment">
            <div id="payment-element" class="mb-5"></div>

            <div class="field">
                <label class="label">Nom complet</label>
                <input v-model="shipping.name" class="input" type="text" required>
            </div>
            
            <div class="field">
                <label class="label">Téléphone</label>
                <input v-model="shipping.phone" class="input" type="tel" required>
            </div>

            <div class="field">
                <label class="label">Addresse</label>
                <input v-model="shipping.address" class="input" type="text" required>
            </div>

            <div class="field">
                <label class="label">Code Postal</label>
                <input v-model="shipping.postal_code" class="input" type="text" required>
            </div>

            <div class="field">
                <label class="label">Ville</label>
                <input v-model="shipping.city" class="input" type="text" required>
            </div>

            <div class="field">
                <label class="label">Pays</label>
                <div class="select">
                    <select v-model="shipping.country" required>
                        <option value="FR">FRANCE</option>
                        <option value="BE">BELGIQUE</option>
                    </select>
                </div>
            </div>
            <button class="button is-dark" type="submit" :disabled="processing">
                {{ processing ? "Paiement en cours..." : "Payer" }}
            </button>
        </form>
  
    </div>
</template>
  
<script>
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "bulma-toast";
    
export default {
    name: 'Checkout',
    data() {
        return {
            stripe: null,
            elements: null,
            orderId: localStorage.getItem("order_id"),
            loading: true,
            clientSecret: "",
            processing: false,
            shipping: {
                name: "",
                phone: "",
                address: "",
                postal_code: "",
                city: "",
                country: "",
            }
        };
    },
    async mounted() {
        document.title = "Paiement | Dessins d'ici et d'ailleurs";

        this.stripe = await loadStripe("pk_test_51Qk5MpBIhNeDc8rcwWsD9Ik19xO3wWFGxw6fecloMVLjq3BD14YvRGOHx67ZcuE4KTDzKsMbGh0H0oAZkNwS36CI00rdoGzGQN");

        try {
            await axios
                .post(`/orders/${this.orderId}/create_payment/`)
                .then(response => {
                    this.clientSecret = response.data.client_secret
                });
            
            const clientSecret = this.clientSecret
            this.loading = false;

            this.$nextTick(() => {
                const appearance = { theme: "stripe" };
                this.elements = this.stripe.elements({ appearance, clientSecret });
                const paymentElementOptions = { layout: "accordion" };
                const cardElement = this.elements.create("payment", paymentElementOptions);
                cardElement.mount("#payment-element");
            })

        } catch(error) {
            toast({
                message: "Une erreur est survenue lors du paiment. Veuillez essayer une nouvelle fois",
                type: 'is-danger',
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: 'bottom-right',
            });
        }
    },
    methods: {
        async handlePayment() {
            this.processing = true;

            if (Object.values(this.shipping).some(value => !value)) {
                toast({
                    message: "Veuillez remplir toutes les informations de livraison.",
                    type: 'is-warning',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 3000,
                    position: 'bottom-right',
                });
                this.processing = false;
                return;
            }

            try {
                const { error, paymentIntent } = await this.stripe.confirmPayment({
                    elements: this.elements,
                    confirmParams: {
                        shipping: {
                            name: this.shipping.name,
                            phone: this.shipping.phone,
                            address: {
                                line1: this.shipping.address,
                                postal_code: this.shipping.postal_code,
                                city: this.shipping.city,
                                country: this.shipping.country,
                            }
                        },
                        return_url: window.location.origin + "/order/success"
                    }
                });

                if (error.type === 'card_error' || error.type === 'validation_error') {
                    localStorage.setItem('payment_error', error.message);
                    this.$router.push("/order/failure");
                }
            } catch (error) {
                localStorage.setItem('payment_error', "Une erreur inattendue s'est produite.");
                    this.$router.push("/order/failure");
            } finally {
                this.processing = false;
            }
        },  
    },
};
</script>
    