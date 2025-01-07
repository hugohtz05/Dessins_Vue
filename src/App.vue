<template>
	<div id="wrapper">
		<nav class="navbar has-background-white">
			<div class="navbar-brand">
				<router-link to="/" class="navbar-item brand has-text-dark"><strong>Dessins d'ici et d'ailleurs</strong></router-link>

				<a class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu" @click="showMobileMenu = !showMobileMenu">
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>
			<div class="navbar-menu" id="navbar-menu" v-bind:class="{'is-active': showMobileMenu }">
				<div class="navbar-end">
					<router-link to="/a4" class="navbar-item has-text-dark">Format A4</router-link>
					<router-link to="/postal-card" class="navbar-item has-text-dark">Carte postale</router-link>
					<router-link to="/login" class="navbar-item has-text-dark">
						<span class="icon"><i class="fas fa-user"></i></span>
						<span>Connexion</span>
					</router-link>
					<router-link to="/cart" class="navbar-item has-text-dark">
						<span class="icon"><i class="fas fa-shopping-cart"></i></span>
						<span>Panier {{ cartTotalLength }}</span>
					</router-link>
				</div>
			</div>
		</nav>

		<div class="is-loading-bar has-text-centered" v-bind:class="{'is-loading': $store.state.isLoading }">
			<div class="lds-dual-ring"></div>
		</div>

		<section class="section">
			<router-view/>
		</section>

		<footer class="footer">
			<p class="has-text-centered">Copyright (c) 2021</p>
		</footer>
	</div>
</template>

<script>
export default {
	data() {
		return {
			showMobileMenu: false,
			cart: {
				items: []
			}
		}
	},
	beforeCreate() {
		this.$store.commit('initializeStore')
	},
	mounted() {
		this.cart = this.$store.state.cart
	},
	computed: {
		cartTotalLength() {
			let totalLength = 0

			for (let i = 0; i < this.cart.items.length; i++) {
				totalLength += this.cart.items[i].quantity
			}
			if (totalLength > 0) {
				return `(${totalLength})`
			}
		}
	}
}
</script>

<style lang="scss">
@import '../node_modules/bulma/';
@import url('https://fonts.googleapis.com/css2?family=Playwrite+AU+SA:wght@100..400&display=swap');

.brand {
  font-family: "Playwrite AU SA", serif;
  font-optical-sizing: auto;
  font-weight: bold;
  font-style: normal;
}
.lds-dual-ring {
	display: inline-block;
	width: 80px;
	height: 80px;
}

.lds-dual-ring::after {
	content: " ";
	display: block;
	width: 64px;
	height: 64px;
	margin: 8px;
	border-radius: 50%;
	border: 6px solid #ccc;
	border-color: #ccc transparent #ccc transparent;
	animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rorate(360deg);
	}
}

.is-loading-bar {
	height:	0;
	overflow: hidden;

	-webkit-transition: all 0.3s;
	transition: all 0.3s;

	&.is-loading {
		height: 80px;
	}
}
</style>
