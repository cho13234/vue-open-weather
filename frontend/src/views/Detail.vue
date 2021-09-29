<template>
    <div></div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            weatherData: '',
            air: {
                data: '',
                pm10: '',
                pm2_5: ''
            }
        }
    },
    computed: {
        ...mapGetters({
            currentLocation: 'getCurrentLocation'
        })
    },
    methods: {
        ...mapActions({
            getWeather: 'fetchWeather'
        })
    }
}
</script>

<style>

</style>