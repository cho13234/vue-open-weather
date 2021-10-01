<template>
    <v-card class="mx-auto" max-width="400px" width="95%" style="margin-top: 10px;">
        <v-card-title style="font-family: 'Raleway', sans-serif; font-style: normal; font-weight: 600; font-size: 20px; line-height: 26px; color: #000000;">Today</v-card-title>
        <v-card-text style="padding-bottom: 30px;">
            <v-row align="center">
                <v-col cols="2.4" align="center">
                    <v-img max-width="40px" :src="nhArrSkyIcon[0]" contain height="73px"></v-img>
                    <span class="bottom-t1h-bold">{{ nhArr[0] ? nhArr[0].T1H : 0 }}&deg;</span>
                    <br/>
                    <span class="bottom-time-regular">{{ getHourDesc(nhArr[0]) }}</span>
                </v-col>
                <v-col cols="2.4" align="center">
                    <v-img max-width="40px" :src="nhArrSkyIcon[1]" contain height="73px"></v-img>
                    <span class="bottom-t1h-bold">{{ nhArr[1] ? nhArr[1].T1H : 0 }}&deg;</span>
                    <br/>
                    <span class="bottom-time-regular">{{ getHourDesc(nhArr[1]) }}</span>
                </v-col>
                <v-col cols="2.4" align="center">
                    <v-img max-width="40px" :src="nhArrSkyIcon[2]" contain height="73px"></v-img>
                    <span class="bottom-t1h-bold">{{ nhArr[2] ? nhArr[2].T1H : 0 }}&deg;</span>
                    <br/>
                    <span class="bottom-time-regular">{{ getHourDesc(nhArr[2]) }}</span>
                </v-col>
                <v-col cols="2.4" align="center">
                    <v-img max-width="40px" :src="nhArrSkyIcon[3]" contain height="73px"></v-img>
                    <span class="bottom-t1h-bold">{{ nhArr[3] ? nhArr[3].T1H : 0 }}&deg;</span>
                    <br/>
                    <span class="bottom-time-regular">{{ getHourDesc(nhArr[3]) }}</span>
                </v-col>
                <v-col cols="2.4" align="center">
                    <v-img max-width="40px" :src="nhArrSkyIcon[4]" contain height="73px"></v-img>
                    <span class="bottom-t1h-bold">{{ nhArr[4] ? nhArr[4].T1H : 0 }}&deg;</span>
                    <br/>
                    <span class="bottom-time-regular">{{ getHourDesc(nhArr[4]) }}</span>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'NextWeatherInfo',
    mounted() {
        console.log(this.n1h);
    },
    computed: {
        ...mapGetters({
            currentHour: 'getCurrentHour'
        }),
        nhArr() {
            let arr = [];
            for (var i = 1; i < 6; i++) {
                let val = this.$store.getters.getNextNhSummary(i);
                
                if (val.length < 3) return [];

                arr.push(val.map((obj) => { return { cat: obj.category, val: obj.fcstValue, date: obj.fcstDate, time: obj.fcstTime } })
                    .reduce((newObj, obj) => { newObj[obj.cat] = obj.val; newObj['date'] = obj.date; newObj['time'] = obj.time; return newObj; }, []));
            }
            return arr;
        },
        nhArrSkyIcon() {
            let arr = [];
            for (var i in this.nhArr) {
                if (Object.keys(this.nhArr[i]).length <= 0) return ["", "", "", "", ""];
                arr.push(this.getSkyIcon(this.getSkyDesc(this.nhArr[i]['SKY'], this.nhArr[i]['PTY'])));
            }
            return arr.length > 0 ? arr : ["", "", "", "", ""];
        }
    },
    methods: {
        getHourDesc(obj) {
            if (!obj) return "";

            let date = obj.date.substr(4,2) + "/" + obj.date.substr(6,2);
            let hour = obj.time.slice(0,2) + ":00";
            return date + " " + hour;
        },
        getSkyDesc(sky) {
            return sky == '' ? "없음" : parseInt(sky) <= 5 ? "맑음" : parseInt(sky) <= 8 ? "구름많음" : "흐림";
        },
        getSkyIcon(sky, pty) {
            let curSunStat = (parseInt(this.currentHour) > 20 || parseInt(this.currentHour) <= 6) ? 'moon' : 'sunny';

            switch(parseInt(pty)) {
                case 0:
                    return sky == "맑음" ? "/weather_icon/" + curSunStat + ".png" : sky == "구름많음" ? "/weather_icon/half_" + curSunStat + "_cloudy.png" : "/weather_icon/cloudy.png";
                case 1: // 비
                    return sky == "맑음" ? "/weather_icon/half_" + curSunStat + "_cloudy_heavy rain.png" : sky == "구름많음" ? "/weather_icon/half_" + curSunStat + "_cloudy_heavy rain.png" : "/weather_icon/cloudy_heavy rain.png";
                case 2: // 비/눈
                    return sky == "맑음" ? "/weather_icon/half_" + curSunStat + "_cloudy_snow_rain.png" : sky == "구름많음" ? "/weather_icon/half_" + curSunStat + "_cloudy_snow_rain.png" : "/weather_icon/cloudy_snow_rain.png";
                case 3: // 눈
                    return sky == "맑음" ? "/weather_icon/half_" + curSunStat + "_cloudy_snow.png" : sky == "구름많음" ? "/weather_icon/half_" + curSunStat + "_cloudy_snow.png" : "/weather_icon/cloudy_heavy snow.png";
                case 5: // 빗방울
                    return sky == "맑음" ? "/weather_icon/half_" + curSunStat + "_cloudy_little rain.png" : sky == "구름많음" ? "/weather_icon/half_" + curSunStat + "_cloudy_little rain.png" : "/weather_icon/cloudy_little rain.png";
                case 6: // 빗방울눈날림
                    return sky == "맑음" ? "/weather_icon/half_" + curSunStat + "_cloudy_snow_rain.png" : sky == "구름많음" ? "/weather_icon/half_" + curSunStat + "_cloudy_snow_rain.png" : "/weather_icon/cloudy_snow_rain.png";
                case 7: // 눈날림
                    return sky == "맑음" ? "/weather_icon/half_" + curSunStat + "_cloudy_snow.png" : sky == "구름많음" ? "/weather_icon/half_" + curSunStat + "_cloudy_snow.png" : "/weather_icon/cloudy_little snow.png";
                default:
                    return sky == "맑음" ? "/weather_icon/" + curSunStat + ".png" : sky == "구름많음" ? "/weather_icon/half_" + curSunStat + "_cloudy.png" : "/weather_icon/cloudy.png";
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