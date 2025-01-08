<template>
    <div class="page-login">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="title has-text-dark">Connexion</h1>

                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label>Nom d'utilisateur</label>
                        <div class="control">
                            <input type="text" class="input has-background-white has-text-dark" v-model="username">
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
            username: '',
            password: '',
            errors: [],
        }
    },
    mounted() {
        document.title = "Connexion | Dessins d'ici et d'ailleurs";
    },
    methods: {
        async submitForm() {
            axios.defaults.headers.common['Authorization'] = '';

            localStorage.removeItem("token");

            const formData = {
                username: this.username,
                password: this.password
            };

            await axios
                .post("/api/v1/token/login/", formData)
                .then(response => {
                    const token = response.data.auth_token;

                    this.$store.commit('setToken', token);

                    axios.defaults.headers.common['Authorization'] = "Token " + token;

                    localStorage.setItem("token", token);

                    const toPath = this.$route.query.to || '/cart';

                    this.$router.push(toPath);
                })
                .catch(error => {
                    if (error.response) {
                        for (const property in error.response.data) {
                            this.error.push(`${property}: ${error.response.data[property]}`);
                        }
                    } else if (error.message) {
                        this.error.push("Une erreur est survenue. Veuillez réessayer");
                    }
                })
        },
    },
};
</script>