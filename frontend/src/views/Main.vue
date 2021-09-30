<template>
    <div>
        <div style="width:500px; height:1000px;"></div>
        <current-weather-info/>
    </div>
</template>

<script>
import CurrentWeatherInfo from '../components/CurrentWeatherInfo.vue'

export default {
    components: { CurrentWeatherInfo },
    name: 'Main',
}
</script>

<style>

</style>