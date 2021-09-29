<template>
    <div>
        <div class="header-temperature">
            <span class="temperature-text">{{ t1h }}</span>
            <span class="temperature-text-oppo">o</span>
        </div>
        <span class="temperature-text-weather">|{{ sky }}</span>
        <img class="weather-icon-big" :src="'/' + skyIcon" alt="">
        <span class="current-location">
            Howdy, Alver
        </span>
        <v-select class="switch-location" v-model="currentLocationName" :items="locations" item-text="namekor" item-value="nameeng"></v-select>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'CurrentWeatherInfo',
    data() {
        var date = new Date();
        return {
            'currentLocationName': '',
            'currentHour': '' + date.getHours() + '00'
        }
    },
    created() {
        this.getWeatherNowcast(this.currentLocation);
        this.getWeatherForecast(this.currentLocation);
    },
    mounted() {
        console.log(this.currentLocation)
        this.currentLocationName = this.currentLocation.nameeng;
        console.log(JSON.stringify(this.currentWeather));
    },
    computed: {
        ...mapGetters({
            currentLocation: 'getCurrentLocation',
            currentWeather: 'getCurrentWeatherInfo',
            forecastWeather: 'getForecastWeather',
            locations: 'getLocations',
        }),
        t1h() {
            return this.currentWeather ? this.currentWeather.t1h ? this.currentWeather.t1h.fcstValue ? this.currentWeather.t1h.fcstValue : '' : '' : '';
        },
        sky() {
            return parseInt(this.currentWeather.sky.fcstValue) <= 5 ? "맑음" : parseInt(this.currentWeather.sky.fcstValue) <= 8 ? "구름많음" : "흐림";
        },
        skyIcon() {
            return this.sky == "맑음" ? "sunny.png" : this.sky == "구름많음" ? "half_sun.png" : "cloudy_grey.png";
        }
    },
    methods: {
        ...mapActions({
            getWeatherForecast: 'fetchWeatherForecast',
            getWeatherNowcast: 'fetchWeatherNowcast'
        })
    }
}
</script>

<style>
.header-temperature {
    position: absolute; width: 58px; height: 50px; left: 24px; top: 137px;
}
.temperature-text {
    position: absolute;
    width: 52px;
    height: 44px;
    left: 0px;
    top: 6px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 42px;
    line-height: 44px;

    color: #000000;
}
.temperature-text-oppo {
    position: absolute;
    width: 11px;
    height: 18px;
    left: 47px;
    top: 0px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;

    color: #000000;
}
.temperature-text-weather {
    position: absolute;
    left: 22.93%;
    right: 50.93%;
    top: 19.21%;
    bottom: 78.33%;

    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;

    color: #000000;
}
.weather-icon-big {
    position: absolute;
    width: 80px;
    height: 77.95px;
    left: 267px;
    top: 123px;
}
.wheather-icon-big-inner {
    position: absolute;
    width: 80px;
    height: 55.38px;
    left: 0px;
    top: 0px;
}
.current-location {
    position: absolute;
    width: 135px;
    height: 26px;
    left: 24px;
    top: 221px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 26px;

    color: #000000;
}
.switch-location {
    position: absolute;
    width: 176px;
    height: 24px;
    left: 24px;
    top: 253px;
}
</style>