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
                        <label>Prénom*</label>
                        <div class="control">
                            <input type="text" class="input has-background-white has-text-dark" v-model="first_name">
                        </div>
                    </div>

                    <div class="field">
                        <label>Nom*</label>
                        <div class="control">
                            <input type="text" class="input has-background-white has-text-dark" v-model="last_name">
                        </div>
                    </div>
                    
                    <div class="field">
                        <label for="password">Mot de passe</label>
                        <div class="control">
                            <input id="password" type="password" class="input has-background-white has-text-dark" v-model="password">
                        </div>
                    </div>

                    <div class="field">
                        <label for="re_password">Confirmation du mot de passe</label>
                        <div class="control">
                            <input id="re_password" type="password" class="input has-background-white has-text-dark" v-model="re_password">
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
            first_name: '',
            last_name: '',
            password: '',
            re_password: '',
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
            
            if (this.first_name === '') {
                this.errors.push("Vous n'avez pas renseigné votre prénom");
            }

            if (this.last_name === '') {
                this.errors.push("Vous n'avez pas renseigné votre nom");
            }

            if (this.password.length < 8) {
                this.errors.push("Votre mot de passe doit contenir au moins 8 charactères");
            }

            if (this.re_password !== this.password) {
                this.errors.push("Vos mots de passe ne correspondent pas");
            }

            if (!this.errors.length) {
                const formData = {
                    first_name: this.first_name,
                    last_name: this.last_name,
                    email: this.email,
                    password: this.password,
                    re_password: this.re_password,
                };

                axios
                    .post("/auth/users/", formData)
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
                                this.errors.push(`${error.response.data[property]}`);
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