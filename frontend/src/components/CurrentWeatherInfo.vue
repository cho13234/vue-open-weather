<template>
    <v-card class="mx-auto font-regular" max-width="400" width="90%" height="500px" style="margin-top: 10px;">
        <v-card-text style="padding-top: 40px; padding-bottom: 30px;">
            <v-row align="center">
                <v-col cols="8">
                    <span style="padding-left: 10px; font-family: 'Montserrat', sans-serif; font-style: normal; font-weight: normal; font-size: 42px; line-height: 44px; color: #000000;">
                        {{ t1h }}&deg;
                    </span>
                    <span style="font-family: 'Nanum Myeongjo', sans-serif; font-style: normal; font-weight: normal; font-size: 18px; font-weight: 300; color: #000000;">
                         {{ sky }}
                    </span>
                </v-col>
                <v-col cols="4" align="center">
                    <v-img :src="'/2x' + skyIcon" style="width: 50%;"></v-img>
                </v-col>
            </v-row>
            <v-row align="center">
                <v-col cols="12" >
                    <span style="padding-left: 10px; font-family: 'Raleway', sans-serif; font-style: normal; font-weight: 600; font-size: 20px; line-height: 26px; color: #000000;">
                        {{ currentLocation.nameeng }}, Korea
                    </span>
                </v-col>
            </v-row>
            <v-row align="center">
                <v-col cols="4" align="center">
                    <span style="font-family: 'Raleway', sans-serif; font-weight: 600; font-size: 16px; line-height: 26px; color: #000000;">{{ reh }}%</span>
                    <br/>
                    <span style="font-family: 'Raleway', sans-serif; font-weight: 400; font-size: 14px; line-height: 14px; color: #000000;">Humidity</span>
                </v-col>
                <v-col cols="4" align="center">
                    <span style="font-family: 'Raleway', sans-serif; font-weight: 600; font-size: 16px; line-height: 26px; color: #000000;">{{ vec }}</span>
                    <br/>
                    <span style="font-family: 'Raleway', sans-serif; font-weight: 400; font-size: 14px; line-height: 14px; color: #000000;">Wind Direction</span>
                </v-col>
                <v-col cols="4" align="center">
                    <span style="font-family: 'Raleway', sans-serif; font-weight: 600; font-size: 16px; line-height: 26px; color: #000000;">{{ wsd }}</span>
                    <br/>
                    <span style="font-family: 'Raleway', sans-serif; font-weight: 400; font-size: 14px; line-height: 14px; color: #000000;">Wind</span>
                </v-col>
            </v-row>
        </v-card-text>
        <!-- <div class="header-temperature">
            <span class="temperature-text">{{ t1h }}</span>
            <span class="temperature-text-oppo">o</span>
        </div>
        <span class="temperature-text-weather">| {{ sky }}</span>
        <div class="weather-icon-big" :style="'background-image:url(/2x' + skyIcon + ');'"></div> -->
        <!-- <img class="weather-icon-big" :src=" + skyIcon" alt=""> -->
        <!-- <span class="current-location">
            {{ currentLocation.nameeng }}, Korea
        </span> -->
        <!-- <v-select class="switch-location" v-model="currentLocationName" :items="locations" item-text="namekor" item-value="nameeng"></v-select> -->
    </v-card>
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
            return this.currentWeather ? this.currentWeather.sky ? this.currentWeather.sky.fcstValue ? parseInt(this.currentWeather.sky.fcstValue) <= 5 ? "맑음" : parseInt(this.currentWeather.sky.fcstValue) <= 8 ? "구름많음" : "흐림" : "" : "" : "";
        },
        reh() {
            return this.currentWeather ? this.currentWeather.reh ? this.currentWeather.reh.fcstValue ? this.currentWeather.reh.fcstValue : '' : '' : '';
        },
        vec() {
            return this.currentWeather ? this.currentWeather.vec ? this.currentWeather.vec.fcstValue ? this.currentWeather.vec.fcstValue : '' : '' : '';
        },
        wsd() {
            return this.currentWeather ? this.currentWeather.wsd ? this.currentWeather.wsd.fcstValue ? this.currentWeather.wsd.fcstValue : '' : '' : '';
        },
        skyIcon() {
            console.log(this.sky);
            return this.sky == "맑음" ? "/sunny.png" : this.sky == "구름많음" ? "/half_sun.png" : "/cloudy_grey.png";
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
    position: absolute; width: 58px; height: 50px; left: 24px; top: 37px;
}
.temperature-text {
    position: absolute;
    width: 52px;
    height: 44px;
    left: 0px;
    top: 6px;

    font-family: 'Montserrat', sans-serif;
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

    font-family: 'Montserrat', sans-serif;
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
    /* top: 19.71%; */
    top: 60px;
    bottom: 78.33%;

    font-family: 'Noto Sans KR', 'Ubuntu', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 20px;

    color: #000000;
}
.weather-icon-big {
    position: absolute;
    width: 94px;
    height: 77.95px;
    /* left: 267px; */
    right: 24px;
    top: 23px;
    background-position: center;
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
    top: 121px;

    font-family: 'Montserrat', sans-serif;
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
    top: 153px;

    font-family: 'Nanum Myeongjo', 'Montserrat', sans-serif;
    font-style: normal;
}
</style>