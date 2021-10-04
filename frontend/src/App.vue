<template>
    <v-app style="background-color: rgb(233,233,233);">
        <v-app-bar app flat color="transparent">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            
            <v-toolbar-title style="font-family: 'Ubuntu', sans-serif; font-weight: 300; font-size: 22px; line-height: 25.28px">Weather</v-toolbar-title>
            
            <!-- <v-btn icon>
                <v-icon>mdi-chevron-down</v-icon>
            </v-btn> -->
        </v-app-bar>
        
        <v-navigation-drawer v-model="drawer" absolute temporary>
            <v-list nav dense>
                <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
                    <v-list-item>
                        <v-list-item-title class="font-regular" @click="goToView({name: 'Main'})">날씨예보</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title class="font-regular" @click="goToView({name: 'InsightSatelite'})">위성사진</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'App',

    data: () => ({
        drawer: false,
        group: null
    }),
    computed: {
        ...mapGetters({
            locations: 'getLocations',
        })
    },
    methods: {
        goToView(routeObj) {
            let objKeys = Object.keys(routeObj);

            for (var i in objKeys) {
                if (this.$router.currentRoute[objKeys[i]] === routeObj[objKeys[i]]) {
                    this.$router.go(this.$router.currentRoute);
                }
            }
            this.$router.push(routeObj);
        }
    }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Nanum+Myeongjo:wght@400;700;800&display=swap');
/* @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap'); */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');

.font-regular {
    font-family: 'Noto Sans Kr', 'Ubuntu', sans-serif;
    font-weight: 700;
    font-size: 24px;
    color: #000000;
}
</style>