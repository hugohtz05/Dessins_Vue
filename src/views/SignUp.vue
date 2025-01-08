<template>
    <div class="page-sign-up">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="title has-text-dark">Inscription</h1>

                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label for="email">Adresse mail</label>
                        <div class="control">
                            <input id="email" ref="emailInput" type="text" class="input has-background-white has-text-dark" v-model="username">
                        </div>
                    </div>
                    
                    <div class="field">
                        <label for="username">Nom d'utilisateur</label>
                        <div class="control">
                            <input id="username" type="text" class="input has-background-white has-text-dark" v-model="username">
                        </div>
                    </div>

                    <div class="field">
                        <label for="password">Mot de passe</label>
                        <div class="control">
                            <input id="password" type="password" class="input has-background-white has-text-dark" v-model="password">
                        </div>
                    </div>

                    <div class="field">
                        <label for="password2">Confirmation du mot de passe</label>
                        <div class="control">
                            <input id="password2" type="password" class="input has-background-white has-text-dark" v-model="password2">
                        </div>
                    </div>

                    <div class="notification is-danger" v-if="errors.length">
                        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                    </div>

                    <div class="field">
                        <div class="control">
                            <button class="button is-dark" :disabled="errors.length || isSubmitting">S'inscrire</button>
                        </div>
                    </div>

                    <hr>

                    Vous avez déjà un compte ?<router-link to="/login"> Cliquez ici</router-link>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { toast } from 'bulma-toast';

export default {
    name: 'SignUp',
    data () {
        return {
            email: '',
            username: '',
            password: '',
            password2: '',
            errors: [],
            isSubmitting: false,
        }
    },
    mounted() {
        this.$refs.emailInput.focus();

        document.title = "Inscription | Dessins d'ici et d'ailleurs";
    },
    methods: {
        submitForm() {
            this.errors = [];
            this.isSubmitting = true
;
            if (!/\S+@\S+\.\S+/.test(this.email)) {
                this.errors.push("Veuillez entrer une adresse mail valide");
            }

            if (this.username === '') {
                this.errors.push("Vous avez oublié le nom d'utilisateur");
            }

            if (this.password.length < 8) {
                this.errors.push("Votre mot de passe doit contenir au moins 8 charactères");
            }

            if (this.password2 !== this.password) {
                this.errors.push("Vos mots de passe ne correspondent pas");
            }

            if (!this.errors.length) {
                const formData = {
                    email: this.email,
                    username: this.username,
                    password: this.password
                };

                axios
                    .post("/api/v1/users/", formData)
                    .then(response => {
                        toast({
                            message: "Votre compte a été créé, vous pouvez vous connecter",
                            type: 'is-success',
                            dismissible: true,
                            pauseOnHover: true,
                            duration: 2000,
                            position: 'bottom-right',
                        });

                        this.$router.push('/login');
                    })
                    .catch(error => {
                        if (error.response) {
                            for (const property in error.response.data) {
                                this.errors.push(`${property}: ${error.response.data[property]}`);
                            }
                        } else if (error.message) {
                            this.errors.push("Une erreur est survenue. Veuillez réessayer");
                        }
                    })
                    .finally(() => {
                        this.isSubmitting = false;
                    });
            } else {
                this.isSubmitting = false;
            }
        },
    },
};
</script>