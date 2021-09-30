import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nowcastWeather: [],
    forecastWeather: [],
    currentWeatherInfo: {
      t1h: null, // 기온
      rn1: null, // 1시간 강수량
      sky: null, // 하늘상태 : 0 ~ 5 맑음, 6 ~ 8 구름많음, 9 ~ 10 흐림
      reh: null, // 습도
      pty: null, // 강수형태
      lgt: null, // 낙뢰
      vec: null, // 풍향
      wsd: null, // 풍속
      uuu: null,
      vvv: null
    },
    currentLocation: {
      nameeng: 'Seoul',
      namekor: '서울',
      nx: 60,
      ny: 127
    },
    locations: [
      {
        nameeng: 'Seoul',
        namekor: '서울',
        nx: 60,
        ny: 127
      },
      {
        nameeng: 'Busan',
        namekor: '부산',
        nx: 98,
        ny: 76
      },
      {
        nameeng: 'Daegu',
        namekor: '대구',
        nx: 89,
        ny: 90
      },
      {
        nameeng: 'Incheon',
        namekor: '인천',
        nx: 55,
        ny: 124
      },
      {
        nameeng: 'Gwangju',
        namekor: '광주',
        nx: 58,
        ny: 74
      },
      {
        nameeng: 'Daejeon',
        namekor: '대전',
        nx: 67,
        ny: 100
      },
      {
        nameeng: 'Ulsan',
        namekor: '울산',
        nx: 102,
        ny: 84
      },
      {
        nameeng: 'Sejong',
        namekor: '세종',
        nx: 66,
        ny: 103
      },
      {
        nameeng: 'Jeju',
        namekor: '제주',
        nx: 52,
        ny: 38
      }
    ]

  },
  mutations: {
    setCurrentLocations(state, payload) {
      state.currentLocation = payload;
    },
    setForecastWeather(state, payload) {
      state.forecastWeather = payload;
    },
    setNowcastWeather(state, payload) {
      state.nowcastWeather = payload;
    },
    setCurrentWeatherInfo(state, payload) {
      var date = new Date();
      var currentHour = (date.getHours() >= 10 ? date.getHours() : "0" + date.getHours()) + "00";
      state.currentWeatherInfo.t1h = payload.filter((obj) => {
        return obj.category == 'T1H' && obj.fcstTime == currentHour;
      })[0];
      state.currentWeatherInfo.rn1 = payload.filter((obj) => {
        return obj.category == 'RN1' && obj.fcstTime == currentHour;
      })[0];
      state.currentWeatherInfo.sky = payload.filter((obj) => {
        return obj.category == 'SKY' && obj.fcstTime == currentHour;
      })[0];
      state.currentWeatherInfo.reh = payload.filter((obj) => {
        return obj.category == 'REH' && obj.fcstTime == currentHour;
      })[0];
      state.currentWeatherInfo.pty = payload.filter((obj) => {
        return obj.category == 'PTY' && obj.fcstTime == currentHour;
      })[0];
      state.currentWeatherInfo.lgt = payload.filter((obj) => {
        return obj.category == 'LGT' && obj.fcstTime == currentHour;
      })[0];
      state.currentWeatherInfo.vec = payload.filter((obj) => {
        return obj.category == 'VEC' && obj.fcstTime == currentHour;
      })[0];
      state.currentWeatherInfo.wsd = payload.filter((obj) => {
        return obj.category == 'WSD' && obj.fcstTime == currentHour;
      })[0];
      state.currentWeatherInfo.wsd = payload.filter((obj) => {
        return obj.category == 'UUU' && obj.fcstTime == currentHour;
      })[0];
      state.currentWeatherInfo.wsd = payload.filter((obj) => {
        return obj.category == 'VVV' && obj.fcstTime == currentHour;
      })[0];
    }
  },
  getters: {
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
    getCurrentWeatherInfo: (state) => {
      return state.currentWeatherInfo;
    }
  },
  actions: {
    fetchWeatherForecast({commit}, location) {
      console.log('----- store > fetchWeatherForecast');
      
      let date = new Date();
      date.setHours(date.getHours() - 1);
      let currentHour = "" + (date.getHours() >= 10 ? date.getHours() : "0" + date.getHours())  + "00";
      let currentDay = "" + (date.getDate() >= 10 ? date.getDate() : "0" + date.getDate());
      let currentMonth = "" + ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1));
      let currentYear = "" + date.getFullYear();
      let currentDate = "" + currentYear + currentMonth + currentDay;

      const prm = {
        params: {
          numOfRows: "100",
          pageNo: "1",
          baseDate: currentDate,
          baseTime: currentHour,
          nx: location.nx,
          ny: location.ny
        }
      };

      axios.get(`/api/weather/forecast`, prm)
        .then((result) => {
          console.log('----- store > fetchWeatherForecast > Success');
          commit('setForecastWeather', result.data.response.body.items.item);
          commit('setCurrentWeatherInfo', result.data.response.body.items.item);
        })
        .catch((err) => {
          console.log('----- store > fetchWeatherForecast > Failed');
          console.log(err);
        })
    },
    fetchWeatherNowcast({commit}, location) {
      console.log('----- store > fetchWeatherNowcast');
      
      let date = new Date();
      date.setHours(date.getHours() - 1);
      let currentHour = "" + (date.getHours() >= 10 ? date.getHours() : "0" + date.getHours()) + "00";
      let currentDay = "" + (date.getDate() >= 10 ? date.getDate() : "0" + date.getDate());
      let currentMonth = "" + ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1));
      let currentYear = "" + date.getFullYear();
      let currentDate = "" + currentYear + currentMonth + currentDay;

      const prm = {
        params: {
          numOfRows: "50",
          pageNo: "1",
          baseDate: currentDate,
          baseTime: currentHour,
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
