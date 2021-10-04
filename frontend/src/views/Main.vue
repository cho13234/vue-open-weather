<template>
    <v-container fluid fill-height>
        <v-layout wrap>
            <v-row>
                <v-col>
                    <current-weather-info/>
                    <next-weather-info/>
                    <next-week-weather-info/>
                </v-col>
            </v-row>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import CurrentWeatherInfo from '../components/CurrentWeatherInfo.vue'
import NextWeatherInfo from '../components/NextWeatherInfo.vue'
import NextWeekWeatherInfo from '../components/NextWeekWeatherInfo.vue'

export default {
    components: { CurrentWeatherInfo, NextWeatherInfo, NextWeekWeatherInfo },
    name: 'Main',
    created() {
        this.getWeatherNowcast(this.currentLocation);
        this.getWeatherForecast(this.currentLocation);
        this.getMidLandFcst(this.currentLocation);
        this.getMidTa(this.currentLocation);
    },
    computed: {
        ...mapGetters({
            currentLocation: 'getCurrentLocation'
        }),
    },
    methods: {
        ...mapActions({
            getWeatherForecast: 'fetchWeatherForecast',
            getWeatherNowcast: 'fetchWeatherNowcast',
            getMidLandFcst: 'fetchMidLandFcst',
            getMidTa: 'fetchMidTa'
        })
    }
}
</script>

<style>

</style>