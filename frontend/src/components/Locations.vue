<template>
    <v-card flat tile class="mx-auto" max-width="333px" width="95%" style="margin-top: 10px;">
        <v-chip-group active-class="primary--text" mandatory style="margin-left: 10px; margin-right: 10px;">
            <v-chip label link v-for="(item, index) in locations" :key="index" @click="relocation(item)"
                style="font-family: 'Noto Sans Kr', 'Ubuntu', sans-serif; font-style: normal; font-weight: 500; font-size: 13px; line-height: 16px;">
                {{ item.namekor }}
            </v-chip>
        </v-chip-group>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    props: {
        local: String
    },
    computed: {
        ...mapGetters({
            locations: 'getLocations',
            currentLocation: 'getCurrentLocation'
        })
    },
    methods: {
        ...mapActions({
            getWeatherForecast: 'fetchWeatherForecast',
            getWeatherNowcast: 'fetchWeatherNowcast',
            getMidLandFcst: 'fetchMidLandFcst',
            getMidTa: 'fetchMidTa'
        }),
        relocation(location) {
            console.log(location);
            this.$store.commit('setCurrentLocation', location);

            this.getWeatherNowcast(this.currentLocation);
            this.getWeatherForecast(this.currentLocation);
            this.getMidLandFcst(this.currentLocation);
            this.getMidTa(this.currentLocation);
        }
    }
}
</script>

<style>

</style>