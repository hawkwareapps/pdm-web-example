<template>
    <v-row>
        <v-item v-for="i in items" :item="i" :key="i.Id"/>

        <v-row v-if="searching"
            class="fill-height ma-0"
            align="center"
            justify="center">
            <v-progress-circular indeterminate color="grey"></v-progress-circular>
        </v-row>

        <v-row v-if="items.length == 0 && searchCompleted"
            class="fill-height ma-0"
            align="center"
            justify="center">
            <v-alert type="info">
                No items found.
            </v-alert>
        </v-row>
    </v-row>
</template>

<script>
import ItemTemplate from './ItemTemplate'

export default {
    computed: {
        username () {
            return this.$store.state.authentication.username;
        },
        items () {
            return this.$store.state.search.items;
        },
        searching () {
            return this.$store.state.search.status.searching;
        },
        searchCompleted () {
            return this.$store.state.search.status.completed;
        }
    },
    components: {
        'v-item': ItemTemplate
    } 
};
</script>