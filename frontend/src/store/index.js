import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        beforeHour: "0000",
        currentHour: "0000",
        currentDay: "01",
        currentMonth: "01",
        currentYear: "2021",
        currentDate: "20210101",
        nowcastWeather: [],
        forecastWeather: [],
        currentLocation: {
            nameeng: 'Seoul',
            namekor: '서울',
            nx: 60,
            ny: 127,
            code: '11B10101'
        },
        locations: [
            {
                nameeng: 'Seoul',
                namekor: '서울',
                nx: 60,
                ny: 127,
                code: '11B10101'
            },
            {
                nameeng: 'Busan',
                namekor: '부산',
                nx: 98,
                ny: 76,
                code: '11H20201'
            },
            {
                nameeng: 'Daegu',
                namekor: '대구',
                nx: 89,
                ny: 90,
                code: '11H10701'
            },
            {
                nameeng: 'Incheon',
                namekor: '인천',
                nx: 55,
                ny: 124,
                code: '11B20201'
            },
            {
                nameeng: 'Gwangju',
                namekor: '광주',
                nx: 58,
                ny: 74,
                code: '11B20702'
            },
            {
                nameeng: 'Daejeon',
                namekor: '대전',
                nx: 67,
                ny: 100,
                code: '11C20401'
            },
            {
                nameeng: 'Ulsan',
                namekor: '울산',
                nx: 102,
                ny: 84,
                code: '11H20101'
            },
            {
                nameeng: 'Sejong',
                namekor: '세종',
                nx: 66,
                ny: 103,
                code: '11C20404'
            },
            {
                nameeng: 'Jeju',
                namekor: '제주',
                nx: 52,
                ny: 38,
                code: '11G00201'
            }
        ]

    },
    mutations: {
        setCurrentTime(state) {
            let date = new Date();
            state.currentHour = "" + (date.getHours() >= 10 ? date.getHours() : "0" + date.getHours())  + "00";
            date.setHours(date.getHours() - 1);

            state.beforeHour = "" + (date.getHours() >= 10 ? date.getHours() : "0" + date.getHours())  + "00";
            state.currentDay = "" + (date.getDate() >= 10 ? date.getDate() : "0" + date.getDate());
            state.currentMonth = "" + ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1));
            state.currentYear = "" + date.getFullYear();
            state.currentDate = "" + state.currentYear + state.currentMonth + state.currentDay;
        },
        setCurrentLocations(state, payload) {
            state.currentLocation = payload;
        },
        setForecastWeather(state, payload) {
            state.forecastWeather = payload;
        },
        setNowcastWeather(state, payload) {
            state.nowcastWeather = payload;
        },
        setNextWeatherInfo(state, payload) {
            return payload;
        }
    },
    getters: {
        getCurrentDate: (state) => {
            return state.currentDate;
        },
        getBeforeHour: (state) => {
            return state.beforeHour;
        },
        getCurrentHour: (state) => {
            return state.currentHour;
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
        getCurrentSKY: (state) => {
            let obj = state.forecastWeather.filter((obj) => {
                return obj.category == 'SKY' && obj.fcstTime == state.currentHour;
            })[0];
            let sky = obj ? obj.fcstValue ? obj.fcstValue : '' : '';
            return sky == '' ? "없음" : parseInt(sky) <= 5 ? "맑음" : parseInt(sky) <= 8 ? "구름많음" : "흐림"
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
        getNextNhSummary: (state) => (time) => {
            let nextHour = "" + (parseInt(state.currentHour) + (time * 100));
            nextHour = nextHour.length < 4 ? "0" + nextHour : nextHour;

            return state.forecastWeather.filter((obj) => {
                return (obj.category == 'T1H' || obj.category == 'SKY' || obj.category == 'PTY') && obj.fcstTime == nextHour;
            });
        }
    },
    actions: {
        fetchWeatherForecast({commit}, location) {
            console.log('----- store > fetchWeatherForecast');
            
            commit('setCurrentTime');

            const prm = {
                params: {
                    numOfRows: "100",
                    pageNo: "1",
                    baseDate: this.getters.getCurrentDate,
                    baseTime: this.getters.getBeforeHour,
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
        fetchWeatherNowcast({commit}, location) {
            console.log('----- store > fetchWeatherNowcast');
            
            commit('setCurrentTime');

            const prm = {
                params: {
                    numOfRows: "100",
                    pageNo: "1",
                    baseDate: this.getters.getCurrentDate,
                    baseTime: this.getters.getBeforeHour,
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
        }
    },
    modules: {
    }
})
