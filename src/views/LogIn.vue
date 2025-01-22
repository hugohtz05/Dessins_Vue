<template>
    <div class="page-login">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="title has-text-dark">Connexion</h1>

                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label>Adresse mail</label>
                        <div class="control">
                            <input type="text" class="input has-background-white has-text-dark" v-model="email">
                        </div>
                    </div>

                    <div class="field">
                        <label>Mot de passe</label>
                        <div class="control">
                            <input type="password" class="input has-background-white has-text-dark" v-model="password">
                        </div>
                    </div>
                    
                    <div class="notification is-danger" v-if="errors.length">
                        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                    </div>

                    <div class="field">
                        <div class="control">
                            <button class="button is-dark">Se connecter</button>
                        </div>
                    </div>
                    <hr>

                    Vous n'avez pas de compte ?<router-link to="/signup"> Cliquez ici</router-link>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'LogIn',
    data() {
        return {
            email: '',
            password: '',
            errors: [],
        }
    },
    mounted() {
        document.title = "Connexion | Dessins d'ici et d'ailleurs";
    },
    methods: {
        async submitForm() {
            this.errors = [];

            const formData = {
                email: this.email,
                password: this.password
            };

            try {
                await axios.post("/jwt/create/", formData);

                this.$store.commit('setIsAuthenticated', true);

                const toPath = this.$route.query.to || '/cart';
                this.$router.push(toPath);
            } catch (error) {
                this.errors.push("Une erreur est survenue. Veuillez réessayer");
            }
        },
    },
};
</script>