<template>
    <v-card flat tile class="mx-auto" max-width="400px" width="95%" style="margin-top: 10px;">
        <v-card-title style="font-family: 'Raleway', sans-serif; font-style: normal; font-weight: 600; font-size: 20px; line-height: 26px; color: #000000; padding-top: 30px; padding-bottom: 30px;">7 Day Forecast</v-card-title>
        <v-card-text style="padding-bottom: 35px;">
            <v-row align="center" v-for="(item, index) in nextWeekData" :key="index">
                <v-col align="center" cols="2" style="font-family: 'Raleway', sans-serif; font-style: normal; font-weight: 500; font-size: 11px; line-height: 16px;">{{ getAfterNDate(3 + index) }}</v-col>
                <v-col align="center" cols="5">
                    <v-row align="center">
                        <v-col cols="2.5">
                            <v-img max-width="30px" :src="item ? getSkyIcon(item['fcstAm']) : ''" contain height="33px"></v-img>
                        </v-col>
                        /
                        <v-col cols="2.5">
                            <v-img max-width="30px" :src="item ? getSkyIcon(item['fcstPm']) : ''" contain height="33px"></v-img>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col align="center" cols="5" style="font-family: 'Noto Sans Kr', 'Ubuntu', sans-serif; font-style: normal; font-weight: 300; font-size: 13px; line-height: 16px; color: #000000;">
                    최저 <span style="font-weight:500;">{{ item['min'] }}&deg;</span> / 최고 <span style="font-weight:500;">{{ item['max'] }}&deg;</span>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'NextWeekWeatherInfo',
    data() {
        return {
            keys: [
                ['wf3Am', 'wf3Pm', 'taMin3', 'taMax3'],
                ['wf4Am', 'wf4Pm', 'taMin4', 'taMax4'],
                ['wf5Am', 'wf5Pm', 'taMin5', 'taMax5'],
                ['wf6Am', 'wf6Pm', 'taMin6', 'taMax6'],
                ['wf7Am', 'wf7Pm', 'taMin7', 'taMax7'],
            ]
        }
    },
    computed: {
        ...mapGetters({
            currentLocation: 'getCurrentLocation',
            currentHour: 'getCurrentHour',
            midLandFcst: 'getMidLandFcst',
            midTa: 'getMidTa'
        }),
        nextWeekData() {
            let arr = [];
            
            if (this.midLandFcst.length <= 0 || this.midTa <= 0) return [];

            for (var i in this.keys) {
                arr.push({
                    'fcstAm': this.midLandFcst[0][this.keys[i][0]],
                    'fcstPm': this.midLandFcst[0][this.keys[i][1]],
                    'min': this.midTa[0][this.keys[i][2]],
                    'max': this.midTa[0][this.keys[i][3]]
                });
            }
            return arr;
        }
    },
    methods: {
        getAfterNDate(term) {
            let date = new Date();

            date.setTime(date.getTime() + (term * 24 * 60 * 60 * 1000));
            return "" + (date.getMonth() + 1) + "-" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
        },
        getSkyIcon(skyDesc) {
            let curSunStat = (parseInt(this.currentHour) > 20 || parseInt(this.currentHour) <= 6) ? 'moon' : 'sunny';

            switch(skyDesc) {
                case "맑음":
                    return "/weather_icon/" + curSunStat + ".png";
                case "구름많음":
                    return "/weather_icon/half_" + curSunStat + "_cloudy.png";
                case "구름많고 비":
                    return "/weather_icon/half_" + curSunStat + "_cloudy_heavy rain.png";
                case "구름많고 눈":
                    return "/weather_icon/half_" + curSunStat + "_cloudy_snow.png";
                case "구름많고 비/눈":
                    return "/weather_icon/half_" + curSunStat + "_cloudy_snow_rain.png";
                case "구름많고 소나기":
                    return "/weather_icon/half_" + curSunStat + "_cloudy_heavy rain.png";
                case "흐림":
                    return "/weather_icon/cloudy.png";
                case "흐리고 비":
                    return "/weather_icon/cloudy_heavy rain.png";
                case "흐리고 눈":
                    return "/weather_icon/cloudy_heavy snow.png";
                case "흐리고 비/눈":
                    return "/weather_icon/cloudy_snow_rain.png";
                case "흐리고 소나기":
                    return "/weather_icon/cloudy_heavy rain.png";
                default:
                    return "/weather_icon/" + curSunStat + ".png";
            }
        }
    }
}
</script>

<style>
.bottom-t1h-bold {
    font-family: 'Raleway', sans-serif;
    font-weight: 600;
    font-size: 16px;
    line-height: 26px;
    color: #000000;
}
.bottol-time-regular {
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    color: #000000;
}
</style>