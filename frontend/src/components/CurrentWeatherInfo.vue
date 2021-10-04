<template>
    <v-card flat tile class="mx-auto" max-width="400px" width="95%" style="margin-top: 10px;">
        <v-card-text style="padding-top: 20px; padding-bottom: 30px;">
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
                    <v-img :src="skyIcon(sky, pty)" contain height="73px"></v-img>
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
                    <span class="bottom_value_bold">{{ reh }}%</span>
                    <br/>
                    <span class="bottom_label_regular">Humidity</span>
                </v-col>
                <v-col cols="4" align="center">
                    <span class="bottom_value_bold">{{ vec }}</span>
                    <br/>
                    <span class="bottom_label_regular">W Direction</span>
                </v-col>
                <v-col cols="4" align="center">
                    <span class="bottom_value_bold">{{ wsd }}</span>
                    <br/>
                    <span class="bottom_label_regular">Wind</span>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'CurrentWeatherInfo',
    mounted() {
        console.log(`CURRENT LOCATION: ${this.currentLocation}`);
        this.currentLocationName = this.currentLocation.nameeng;
    },
    computed: {
        ...mapGetters({
            currentLocation: 'getCurrentLocation',
            forecastWeather: 'getForecastWeather',
            t1h: 'getCurrentT1H',
            sky: 'getCurrentSKY',
            reh: 'getCurrentREH',
            vec: 'getCurrentVEC',
            pty: 'getCurrentPTY',
            wsd: 'getCurrentWSD',
            currentHour: 'getCurrentHour',
            skyIcon: 'getSkyIcon'
        }),
    }
}
</script>

<style>
.bottom_value_bold {
    font-family: 'Raleway', sans-serif;
    font-weight: 600;
    font-size: 16px;
    line-height: 26px;
    color: #000000;
}
.bottol_label_regular {
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    color: #000000;
}
</style>