<template>
    <v-container fluid fill-height style="margin: 0px; padding: 0px; width: 100%;">
        <v-layout wrap>
            <!-- <v-card class="pa-4 font-regular" flat height="500px">
                <v-img src="/512/background_sunset_clearsky.png">
                    <v-toolbar flat color="transparent" style="color: white;">
                        <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>
                        
                        <v-spacer></v-spacer>
                        
                        <v-toolbar-title style="font-family: 'Ubuntu', sans-serif; font-weight: 300; font-size: 18px; line-height: 25.28px">Weather</v-toolbar-title>

                        <v-spacer></v-spacer>

                        <v-btn icon>
                            <v-icon color="white">mdi-magnify</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-title>
                        38°
                    </v-card-title>
                </v-img>
            </v-card> -->
            <current-weather-info/>
        </v-layout>
    </v-container>
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