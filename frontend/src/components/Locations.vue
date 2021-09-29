<template>
    <div class="locations">
        <v-btn type="button" class="btn-location"
            :class="{ active : this.$route.params.id == 'MyLocation' }"
            @click="goToLocation('MyLocation')"
        >
            내 위치
        </v-btn>
        <v-btn type="button" class="btn-location"
            v-for="(item, index) in locations" :key="index"
            :class="{ active : local == item.nameeng }"
            @click="goToLocation(item.nameeng)"
        >
            {{ item.namekor }}
        </v-btn>
    </div>
</template>

<script>
export default {
    props: {
        local: String
    },
    computed: {
        locations() {
            return this.$store.state.locations;
        }
    },
    methods: {
        goToLocation(local) {
            this.$router.push('/location/' + local);
        }
    }
}
</script>

<style>

</style>