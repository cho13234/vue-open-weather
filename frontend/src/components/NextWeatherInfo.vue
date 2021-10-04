<template>
    <v-card flat tile class="mx-auto" max-width="400px" width="95%" style="margin-top: 10px;">
        <v-card-title style="font-family: 'Raleway', sans-serif; font-style: normal; font-weight: 600; font-size: 20px; line-height: 26px; color: #000000; padding-top: 30px; padding-bottom: 20px;">Today</v-card-title>
        <v-card-text style="padding-bottom: 30px;">
            <v-row align="center">
                <v-col cols="2.4" align="center" v-for="(item, index) in nhArr" :key="index">
                    <v-img max-width="40px" :src="item ? item.skyIcon : ''" contain height="73px"></v-img>
                    <span class="bottom-t1h-bold">{{ item ? item.T1H : 0 }}&deg;</span>
                    <br/>
                    <span class="bottom-time-regular">{{ getHourDesc(item) }}</span>
                </v-col>
                <!-- <v-col cols="2.4" align="center">
                    <v-img max-width="40px" :src="nhArr[1] ? nhArr[1].skyIcon : ''" contain height="73px"></v-img>
                    <span class="bottom-t1h-bold">{{ nhArr[1] ? nhArr[1].T1H : 0 }}&deg;</span>
                    <br/>
                    <span class="bottom-time-regular">{{ getHourDesc(nhArr[1]) }}</span>
                </v-col>
                <v-col cols="2.4" align="center">
                    <v-img max-width="40px" :src="nhArr[2] ? nhArr[2].skyIcon : ''" contain height="73px"></v-img>
                    <span class="bottom-t1h-bold">{{ nhArr[2] ? nhArr[2].T1H : 0 }}&deg;</span>
                    <br/>
                    <span class="bottom-time-regular">{{ getHourDesc(nhArr[2]) }}</span>
                </v-col>
                <v-col cols="2.4" align="center">
                    <v-img max-width="40px" :src="nhArr[3] ? nhArr[3].skyIcon : ''" contain height="73px"></v-img>
                    <span class="bottom-t1h-bold">{{ nhArr[3] ? nhArr[3].T1H : 0 }}&deg;</span>
                    <br/>
                    <span class="bottom-time-regular">{{ getHourDesc(nhArr[3]) }}</span>
                </v-col>
                <v-col cols="2.4" align="center">
                    <v-img max-width="40px" :src="nhArr[4] ? nhArr[4].skyIcon : ''" contain height="73px"></v-img>
                    <span class="bottom-t1h-bold">{{ nhArr[4] ? nhArr[4].T1H : 0 }}&deg;</span>
                    <br/>
                    <span class="bottom-time-regular">{{ getHourDesc(nhArr[4]) }}</span>
                </v-col> -->
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
            currentHour: 'getCurrentHour',
            nhArr: 'getNhArr',
        }),
    },
    methods: {
        getHourDesc(obj) {
            if (!obj) return "";

            let date = obj.date.substr(4,2) + "/" + obj.date.substr(6,2);
            let hour = obj.time.slice(0,2) + ":00";
            return date + " " + hour;
        },
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