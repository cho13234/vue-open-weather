import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentHour: "0000",
        currentDay: "01",
        currentMonth: "01",
        currentYear: "2022",
        currentDate: "20220101",
        currentUTCHour: "0000",
        currentUTCDay: "01",
        currentUTCMonth: "01",
        currentUTCYear: "2022",
        currentUTCDate: "20220101",
        beforeHour: "0000",
        beforeDay: "01",
        beforeMonth: "01",
        beforeYear: "2022",
        beforeDate: "20220101",
        nowcastWeather: [],
        forecastWeather: [],
        currentLocation: {
            nameeng: 'Seoul',
            namekor: '서울',
            nx: 60,
            ny: 127,
            taCode: '11B10101',
            fcstCode: '11B00000'
        },
        locations: [
            {
                nameeng: 'Seoul',
                namekor: '서울',
                nx: 60,
                ny: 127,
                taCode: '11B10101',
                fcstCode: '11B00000'
            },
            {
                nameeng: 'Busan',
                namekor: '부산',
                nx: 98,
                ny: 76,
                taCode: '11H20201',
                fcstCode: '11H20000'
            },
            {
                nameeng: 'Daegu',
                namekor: '대구',
                nx: 89,
                ny: 90,
                taCode: '11H10701',
                fcstCode: '11H10000'
            },
            {
                nameeng: 'Incheon',
                namekor: '인천',
                nx: 55,
                ny: 124,
                taCode: '11B20201',
                fcstCode: '11B00000'
            },
            {
                nameeng: 'Gwangju',
                namekor: '광주',
                nx: 58,
                ny: 74,
                taCode: '11B20702',
                fcstCode: '11F20000'
            },
            {
                nameeng: 'Daejeon',
                namekor: '대전',
                nx: 67,
                ny: 100,
                taCode: '11C20401',
                fcstCode: '11C20000'
            },
            {
                nameeng: 'Ulsan',
                namekor: '울산',
                nx: 102,
                ny: 84,
                taCode: '11H20101',
                fcstCode: '11H20000'
            },
            {
                nameeng: 'Sejong',
                namekor: '세종',
                nx: 66,
                ny: 103,
                taCode: '11C20404',
                fcstCode: '11C20000'
            },
            {
                nameeng: 'Jeju',
                namekor: '제주',
                nx: 52,
                ny: 38,
                taCode: '11G00201',
                fcstCode: '11G00000'
            }
        ],
        insightSatelite: [],
        midLandFcst: [],
        midTa: []

    },
    mutations: {
        setCurrentTime(state) {
            let date = new Date();
            state.currentHour = "" + (date.getHours() >= 10 ? date.getHours() : "0" + date.getHours())  + "00";
            state.currentDay = "" + (date.getDate() >= 10 ? date.getDate() : "0" + date.getDate());
            state.currentMonth = "" + ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1));
            state.currentYear = "" + date.getFullYear();
            state.currentDate = "" + state.currentYear + state.currentMonth + state.currentDay;

            state.currentUTCHour = "" + (date.getUTCHours() >= 10 ? date.getUTCHours() : "0" + date.getUTCHours())  + "00";
            state.currentUTCDay = "" + (date.getUTCDate() >= 10 ? date.getUTCDate() : "0" + date.getUTCDate());
            state.currentUTCMonth = "" + ((date.getUTCMonth() + 1) >= 10 ? (date.getUTCMonth() + 1) : "0" + (date.getUTCMonth() + 1));
            state.currentUTCYear = "" + date.getUTCFullYear();
            state.currentUTCDate = "" + state.currentUTCYear + state.currentUTCMonth + state.currentUTCDay;
            
            date.setHours(date.getHours() - 1);
            state.beforeHour = "" + (date.getHours() >= 10 ? date.getHours() : "0" + date.getHours())  + "00";
            state.beforeDay = "" + (date.getDate() >= 10 ? date.getDate() : "0" + date.getDate());
            state.beforeMonth = "" + ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1));
            state.beforeYear = "" + date.getFullYear();
            state.beforeDate = "" + state.beforeYear + state.beforeMonth + state.beforeDay;
        },
        setCurrentLocation(state, payload) {
            state.currentLocation = payload;
        },
        setForecastWeather(state, payload) {
            state.forecastWeather = payload;
        },
        setNowcastWeather(state, payload) {
            state.nowcastWeather = payload;
        },
        setInsightSatelite(state, payload) {
            state.insightSatelite = payload;
        },
        setMidLandFcst(state, payload) {
            state.midLandFcst = payload;
        },
        setMidTa(state, payload) {
            state.midTa = payload;
        }
    },
    getters: {
        getBeforeHour: (state) => {
            return state.beforeHour;
        },
        getBeforeDate: (state) => {
            return state.beforeDate;
        },
        getCurrentHour: (state) => {
            return state.currentHour;
        },
        getCurrentDate: (state) => {
            return state.currentDate;
        },
        getCurrentUTCHour: (state) => {
            return state.currentUTCHour;
        },
        getCurrentUTCDate: (state) => {
            return state.currentUTCDate;
        },
        getCurrentLocation: (state) => {
            return state.currentLocation;
        },
        getForecastWeather: (state) => {
            return state.forecastWeather;
        },
        getNowcastWeather: (state) => {
            return state.nowcastWeather;
        },
        getLocations: (state) => {
            return state.locations;
        },
        getSkyDesc: () => (sky) => {
            return sky == '' ? "없음" : parseInt(sky) == 1 ? "맑음" : parseInt(sky) == 3 ? "구름많음" : parseInt(sky) == 4 ? "흐림" : "없음";
        },
        getSkyIcon: (getters) => (sky, pty) => {
            let curSunStat = (parseInt(getters.getCurrentHour) > 20 || parseInt(getters.getCurrentHour) <= 6) ? 'moon' : 'sunny';

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
        },
        getCurrentT1H: (state) => {
            let obj = state.forecastWeather.filter((obj) => {
                return obj.category == 'T1H' && obj.fcstTime == state.currentHour;
            })[0];
            return obj ? obj.fcstValue ? obj.fcstValue : '' : '';
        },
        getCurrentRN1: (state) => {
            let obj = state.forecastWeather.filter((obj) => {
                return obj.category == 'RN1' && obj.fcstTime == state.currentHour;
            })[0];
            return obj ? obj.fcstValue ? obj.fcstValue : '' : '';
        },
        getCurrentSKY: (state, getters) => {
            let obj = state.forecastWeather.filter((obj) => {
                return obj.category == 'SKY' && obj.fcstTime == state.currentHour;
            })[0];
            let sky = obj ? obj.fcstValue ? obj.fcstValue : '' : '';
            return getters.getSkyDesc(sky);
        },
        getCurrentREH: (state) => {
            let obj = state.forecastWeather.filter((obj) => {
                return obj.category == 'REH' && obj.fcstTime == state.currentHour;
            })[0];
            return obj ? obj.fcstValue ? obj.fcstValue : '' : '';
        },
        getCurrentPTY: (state) => {
            let obj = state.forecastWeather.filter((obj) => {
                return obj.category == 'PTY' && obj.fcstTime == state.currentHour;
            })[0];
            return obj ? obj.fcstValue ? obj.fcstValue : '' : '';
        },
        getCurrentLGT: (state) => {
            let obj = state.forecastWeather.filter((obj) => {
                return obj.category == 'LGT' && obj.fcstTime == state.currentHour;
            })[0];
            return obj ? obj.fcstValue ? obj.fcstValue : '' : '';
        },
        getCurrentVEC: (state) => {
            let obj = state.forecastWeather.filter((obj) => {
                return obj.category == 'VEC' && obj.fcstTime == state.currentHour;
            })[0];
            let vec = obj ? obj.fcstValue ? obj.fcstValue : '' : '';
            return vec == '' ? 'X' : vec <= 45 ? 'N-NE' : vec <= 90 ? 'NE-E' : vec <= 135 ? 'E-SE' : vec <= 180 ? 'SE-S' : vec <= 225 ? 'S-SW' : vec <= 270 ? 'SW-W' : vec <= 315 ? 'W-NW' : 'NW-N';
        },
        getCurrentWSD: (state) => {
            let obj = state.forecastWeather.filter((obj) => {
                return obj.category == 'WSD' && obj.fcstTime == state.currentHour;
            })[0];
            return obj ? obj.fcstValue ? obj.fcstValue : '' : '';
        },
        getCurrentUUU: (state) => {
            let obj = state.forecastWeather.filter((obj) => {
                return obj.category == 'UUU' && obj.fcstTime == state.currentHour;
            })[0];
            return obj ? obj.fcstValue ? obj.fcstValue : '' : '';
        },
        getCurrentVVV: (state) => {
            let obj = state.forecastWeather.filter((obj) => {
                return obj.category == 'VVV' && obj.fcstTime == state.currentHour;
            })[0];
            return obj ? obj.fcstValue ? obj.fcstValue : '' : '';
        },
        getNextHour: (state) => (time) => {
            let nextHour = parseInt(state.currentHour) + (time*100);
            nextHour = nextHour >= 2400 ? "" + (nextHour - 2400) : "" + nextHour;
            while(nextHour.length < 4) {
                nextHour = "0" + nextHour;
            }
            return nextHour.length < 4 ? "0" + nextHour : nextHour;
        },
        getNhArr: (state, getters) => {
            let resultArr = [];
            for (var i = 1; i < 6; i++) {
                let nextHour = getters.getNextHour(i);
                let temp = state.forecastWeather.filter((obj) => {
                    return (obj.category == 'T1H' || obj.category == 'SKY' || obj.category == 'PTY')
                        && obj.fcstTime == nextHour;
                }).reduce((newObj, obj) => {
                    newObj[obj.category] = obj.fcstValue;
                    newObj['date'] = obj.fcstDate;
                    newObj['time'] = obj.fcstTime;
                    return newObj;
                }, {});
                if (Object.keys(temp).length > 0) {
                    temp['skyDesc'] = getters.getSkyDesc(temp['SKY'], temp['PTY']);
                    temp['skyIcon'] = getters.getSkyIcon(temp['skyDesc']);
                    resultArr.push(temp);
                }
            }
            return resultArr;
        },
        getLastInsightSatelite: (state) => {
            return state.insightSatelite[state.insightSatelite.length - 1];
        },
        getTmFc: (state) => {
            let currentHour = parseInt(state.currentHour);
            if (currentHour < 1800) {
                if (currentHour < 600) {
                    let date = new Date();
                    date.setTime(date.getTime() - (24 * 60 * 60 * 1000));
                    return "" + date.getFullYear() + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + "1800";
                } else {
                    return state.currentDate + "0600";
                }
            } else {
                return state.currentDate + "1800";
            }
        },
        getMidLandFcst: (state) => {
            return state.midLandFcst;
        },
        getMidTa: (state) => {
            return state.midTa;
        }
    },
    actions: {
        fetchWeatherForecast({commit, getters}, location) {
            console.log('----- store > fetchWeatherForecast');
            
            commit('setCurrentTime');

            const prm = {
                params: {
                    numOfRows: "100",
                    pageNo: "1",
                    baseDate: getters.getBeforeDate,
                    baseTime: getters.getBeforeHour,
                    nx: location.nx,
                    ny: location.ny
                }
            };

            axios.get(`/api/weather/forecast`, prm)
                .then((result) => {
                    console.log('----- store > fetchWeatherForecast > Success');
                    commit('setForecastWeather', result.data.response.body.items.item);
                })
                .catch((err) => {
                    console.log('----- store > fetchWeatherForecast > Failed');
                    console.log(err);
                })
        },
        fetchWeatherNowcast({commit, getters}, location) {
            console.log('----- store > fetchWeatherNowcast');
            
            commit('setCurrentTime');

            const prm = {
                params: {
                    numOfRows: "100",
                    pageNo: "1",
                    baseDate: getters.getBeforeDate,
                    baseTime: getters.getBeforeHour,
                    nx: location.nx,
                    ny: location.ny
                }
            };

            axios.get(`/api/weather/nowcast`, prm)
                .then((result) => {
                    console.log('----- store > fetchWeatherNowcast > Success');
                    commit('setNowcastWeather', result.data.response.body.items.item);
                })
                .catch((err) => {
                    console.log('----- store > fetchWeatherNowcast > Failed');
                    console.log(err);
                })
        },
        fetchInsightSatelite({commit, getters}) {
            console.log('----- store > fetchInsightSatelite');

            commit('setCurrentTime');

            const prm = {
                params: {
                    numOfRows: "100",
                    pageNo: "1",
                    sat: "G2",
                    data: "ir105",
                    time: getters.getCurrentUTCDate
                }
            };

            axios.get(`/api/weather/getInsightSatlit`, prm)
                .then((result) => {
                    console.log('----- store > fetchInsightSatelite > Success');
                    //commit('setInsightSatlite', result.data.response.body.items.item);
                    let tempObj = result.data.response.body.items.item[0];
                    let tempData = tempObj[Object.keys(tempObj)[0]];
                    commit('setInsightSatelite', tempData.replace("[", "").replace("]", "").split(","));
                })
                .catch((err) => {
                    console.log('----- store > fetchInsightSatelite > Failed');
                    console.log(err);
                })
        },
        fetchMidLandFcst({commit, getters}, location) {
            console.log('----- store > fetchMidLandFcst');

            commit('setCurrentTime');

            const prm = {
                params: {
                    numOfRows: "100",
                    pageNo: "1",
                    regId: location.fcstCode,
                    tmFc: getters.getTmFc
                }
            };

            axios.get(`/api/weather/getMidLandFcst`, prm)
                .then((result) => {
                    console.log('----- store > fetchMidLandFcst > Success');
                    commit('setMidLandFcst', result.data.response.body.items.item);
                })
                .catch((err) => {
                    console.log('----- store > fetchMidLandFcst > Failed');
                    console.log(err);
                })
        },
        fetchMidTa({commit, getters}, location) {
            console.log('----- store > fetchMidTa');

            commit('setCurrentTime');

            const prm = {
                params: {
                    numOfRows: "100",
                    pageNo: "1",
                    regId: location.taCode,
                    tmFc: getters.getTmFc
                }
            };

            axios.get(`/api/weather/getMidTa`, prm)
                .then((result) => {
                    console.log('----- store > fetchMidTa > Success');
                    commit('setMidTa', result.data.response.body.items.item);
                })
                .catch((err) => {
                    console.log('----- store > fetchMidTa > Failed');
                    console.log(err);
                })
        },
    },
    modules: {
    }
})
