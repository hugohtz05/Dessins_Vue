<template>
    <div class="page-success">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Merci !</h1>

                <p>Votre commande va être traitée dans les 48 heures à venir. :)</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Success',
    mounted() {
        document.title = "Validation | Dessins d'ici et d'ailleurs"
    },
}
</script>