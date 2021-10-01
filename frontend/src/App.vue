<template>
    <v-app style="background-color: rgb(233,233,233);">
        <v-app-bar app flat color="transparent">
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            
            <v-spacer></v-spacer>
            
            <v-toolbar-title style="font-family: 'Ubuntu', sans-serif; font-weight: 300; font-size: 22px; line-height: 25.28px">Weather</v-toolbar-title>
            
            <v-spacer></v-spacer>
            
            <v-btn icon>
            <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
        </v-app-bar>
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
        //
    }),
    computed: {
        ...mapGetters({
            locations: 'getLocations',
        })
    }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Nanum+Myeongjo:wght@400;700;800&display=swap');
/* @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap'); */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');

.font-regular {
    font-family: 'Noto Sans Kr', 'Ubuntu', sans-serif;
}
</style>