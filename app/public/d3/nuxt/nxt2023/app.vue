




<template>


  <div>
    <!-- <NuxtWelcome /> -->
    <!-- <h1>Welcome to the homepage</h1>
    <v-alert text="Vuetify3インストールテスト" type="success" variant="outlined"></v-alert>
    <v-icon>mdi-lead-pencil</v-icon>
    <v-icon>mdi-account</v-icon> -->


    <v-app id="inspire">
    <v-container>
      <!-- <v-app-bar
      
      class="px-3"
      color="white"
      flat
      density="compact"
    > -->
    

      <v-spacer></v-spacer>

      <!-- <v-tabs
        centered
        color="grey-darken-2"
      >
        <v-tab
          v-for="link in links"
          :key="link"
        >
          {{ link }}
        </v-tab>
      </v-tabs> -->
      <v-spacer></v-spacer>

    <!-- </v-app-bar> -->

    </v-container>
    
    <v-col
            cols="12"
            sm="2"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
            >
              <!--  -->
            </v-sheet>
          </v-col>


    <v-main class="bg-grey-lighten-3">
      <v-container>

        <v-row>

          <v-col
            cols="12"
            sm="10"
          >
            <v-sheet
              min-height="60vh"
              rounded="lg"
            >
              <!--  -->
            </v-sheet>
          </v-col>

          <v-row>
           <v-col
            cols="12"
            sm="2"
            class="d-flex flex-column mb-6"
          >
            <v-card
              class="ma-2 pa-2"
              min-height="40"
              v-for="link in links"
              :key="link" >
              
            {{ link }}</v-card>
          </v-col>
        
           <v-col
            cols="12"
            sm="2"
            class="d-flex flex-column mb-6"
          >
            <v-card
              class="ma-2 pa-2"
              min-height="40"
              v-for="link in links"
              :key="link" >
              
            {{ link }}</v-card>
          </v-col>
        
           <v-col
            cols="12"
            sm="2"
            class="d-flex flex-column mb-6"
          >
            <v-card
              class="ma-2 pa-2"
              min-height="40"
              v-for="link in links"
              :key="link" >
              
            {{ link }}</v-card>
          </v-col>
        
           <v-col
            cols="12"
            sm="2"
            class="d-flex flex-column mb-6"
          >
            <v-card
              class="ma-2 pa-2"
              min-height="40"
              v-for="link in links"
              :key="link" >
              
            {{ link }}</v-card>
          </v-col>
        
           <v-col
            cols="12"
            sm="2"
            class="d-flex flex-column mb-6"
          >
            <v-card
              class="ma-2 pa-2"
              min-height="40"
              v-for="link in links"
              :key="link" >
              
            {{ link }}</v-card>
          </v-col>
        
           <v-col
            cols="12"
            sm="2"
            class="d-flex flex-column mb-6"
          >
            <v-card
              class="ma-2 pa-2"
              min-height="40"
              v-for="link in links"
              :key="link" >
              
            {{ link }}</v-card>
          </v-col>
        </v-row>
          
        </v-row>
        
      </v-container>
    </v-main>
  </v-app>
    
  </div>
</template>

<script>
  export default {
    data: () => ({
      links: [
        '分類1',
        '分類2',
        '分類3',
        '分類4',
      ],
    }),
  }
</script>