<template>
    <!-- <div>
        {{ lastInsightSatelite }}
        <v-img :src="lastInsightSatelite" contain></v-img>
    </div> -->
    <v-container fluid fill-height>
        <v-layout wrap>
            <v-row>
                <v-col cols="12" align="center">
                    <v-card class="mx-auto" max-width="400px" width="95%" style="margin-top: 10px;">
                        <v-card-title style="font-family: 'Raleway', sans-serif; font-style: normal; font-weight: 600; font-size: 20px; line-height: 26px; color: #000000;">Today</v-card-title>
                        <v-card-text style="padding-bottom: 30px;">
                            <v-row align="center">
                                <v-col align="center">
                                    <v-img aspect-ratio="1" :src="lastInsightSatelite"></v-img>
                                </v-col>
                            </v-row>
                            <v-row align="center">
                                <v-col align="center">
                                    <span class="bottom-t1h-bold">Satelite: G2 / Data: IR105</span>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-layout>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    created() {
        this.getInsightSatelite();
    },
    computed: {
        ...mapGetters({
            lastInsightSatelite: 'getLastInsightSatelite'
        })
    },
    methods: {
        ...mapActions({
            getInsightSatelite: 'fetchInsightSatelite'
        })
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
</style>