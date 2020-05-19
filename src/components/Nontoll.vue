<template>
  <div id="form">
    <v-container>
      <v-form class="px-3" id="nontollForm" ref="form">
        
        <div class="singleRow">
          <v-select
            v-model="ridership.Vessels"
            :items="vesselItems"
            item-text="Vessels"
            item-value="Vessels"
            label="Vessels"
            return-object
          ></v-select>
          <v-select
            v-model="ridership.Routes"
            :items="routesItems"
            item-text="Routes"
            item-value="Routes"
            label="Routes"
            return-object
          ></v-select>
        </div>
        <div class="doubleRow">
          <v-text-field
            v-model="ridership.Singles"
            label="Singels - in state"
            id="Singles"
            type="number"
          >
          </v-text-field>
          <v-text-field
            v-model="ridership.SinglesOutOfState"
            label="Singels - out of state"
            id="SinglesOutOfState"
            type="number"
          >
          </v-text-field>
          <v-text-field
            v-model="ridership.Doubles"
            label="Doubles - in state"
            id="Doubles"
            type="number"
          >
          </v-text-field>
          <v-text-field
            v-model="ridership.DoublesOutOfState"
            label="Doubles - out of state"
            id="DoublesOutOfState"
            type="number"
          >
          </v-text-field>
          <v-text-field
            v-model="ridership.Triples"
            label="Triples - in state"
            id="Triples"
            type="number"
          >
          </v-text-field>
          <v-text-field
            v-model="ridership.TriplesOutOfState"
            label="Triples - out of state"
            id="TriplesOutOfState"
            type="number"
          >
          </v-text-field>
          <v-text-field
            v-model="ridership.Motorcycles"
            label="Motorcycles - in state"
            id="Motorcycles"
            type="number"
          >
          </v-text-field>
          <v-text-field
            v-model="ridership.MotorcyclesOutOfState"
            label="Motorcycles - out of state"
            id="MotorcyclesOutOfState"
            type="number"
          >
          </v-text-field>
          <v-text-field
            v-model="ridership.WalkOns"
            label="Walk-ons"
            id="WalkOns"
            type="number"
          >
          </v-text-field>
          <v-text-field
            v-model="ridership.VehiclesLeft"
            label="Vehicles Left"
            id="VehiclesLeft"
            type="number"
          >
          </v-text-field>
          <v-text-field
            v-model="ridership.BicycleCount"
            label="Bicycle Count"
            id="BicycleCount"
            type="number"
          >
          </v-text-field>
          <v-text-field
            v-model="ridership.PassengerCount"
            label="Passenger Count"
            id="PassengerCount"
            type="number"
          >
          </v-text-field>
        </div>
        <v-btn color="success" @click="saveData"
          >Submit</v-btn
        >
      </v-form>
    </v-container>
    <div v-if="submissions">
      <v-container>
        <ul >
          <li v-for="(submission, index) in submissions" :key="index">
            {{ submission}}
          </li>
        </ul>
      </v-container>
    </div>
  </div>
</template>

<script>

//import uuid from 'vue-uuid';
import {db} from '../firebase'

export default {
  data() {
    return {
      db:null,
      ready:false,
      addDisabled:false,
      vesselItems: [
        "SILVERLAKE",
        "CEDAR ISLAND",
        "CARTERET",
        "SWAN QUARTER",
        "SEA LEVEL",
        "GOV DANIEL RUSSEL",
        "SOUTHPORT",
        "NEUSE",
        "LUPTON",
        "FORT FISHER",
        "W. STANFORD WHITE",
        "CROATOAN",
        "HATTERAS",
        "KINNAKEET",
        "FRISC0",
        "CHICAMOCOMICO",
        "CAPE POINT",
        "OCRACOKE",
        "ROANOKE",
        "THOMAS A. BAUM",
        "GOVERNOR JAMES BAXTER HUNT JR",
        "RODANTHE",
      ],
      routesItems: [
        "Cherry Branch to Minnesott",
        "Minnesott to Cherry Branch",
        "Hatteras to Southdock",
        "Southdock to Hatteras",
        "Bayview to Aurora",
        "Aurora to Bayview",
        "Currituck to Knotts Island",
        "Knotts Island to Currituck",
        "Stumpy Point to Rodanthe",
        "Rodanthe to Stumpy Point",
        "Hatteras to Stumpy Point",
        "Stumpy Point to Hatteras",
      ],
      submissions: [],
      ridership: {
          id:null,
        BicycleCount: 0,
        Doubles: 0,
        DoublesOutOfState: 0,

        HazMat: false,
        Motorcycles: 0,
        MotorcyclesOutOfState: 0,
        PassengerCount: 0,

        Routes: "",

        Singles: 0,
        SinglesOutOfState: 0,
        Triples: 0,
        TriplesOutOfState: 0,
        VehiclesLeft: 0,
        Vessels: "",
        WalkOns:0,
      },
    };
  },
  created() {
    this.returnList;
  },

  methods: {
    returnList(){
      if(localStorage.getItem('transactions')==null)
             localStorage.setItem('transactions',JSON.stringify([]))
             return JSON.parse(localStorage.getItem('transactions'))
    },
      generateId(){
        var d = new Date().getTime();
        this.ridership.id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return this.ridership.id;
      },
    addData() {
        this.addDisabled = true;
        // this.generateId();
        //this.ridership.id = uuid;
        console.log(this.ridership);
        //this.saveData();
        let ridership = this.ridership;
        let submissions = this.submissions;
        let submission = Object.fromEntries(
            Object.entries(ridership).map(([key,value])=>[key, value])
        );
            this.submissions.push(submission)
        localStorage.setItem('transactions',JSON.stringify(submissions))
        console.log(this.submissions);
        //this.$refs.form.reset();
        this.addDisabled = false;
        this.reset();
        
    },
    reset(){
     // this.$refs.form.reset();
     this.ridership.Vessels = this.ridership.Routes = "";
     this.ridership.Singles = this.ridership.SinglesOutOfState = this.ridership.Doubles = this.ridership.DoublesOutOfState = this.ridership.Triples = this.ridership.TriplesOutOfState = this.ridership.BicycleCount = this.ridership.Motorcycles = this.ridership.MotorcyclesOutOfState = this.ridership.PassengerCount = this.ridership.WalkOns = this.ridership.VehiclesLeft = 0
    },
    saveData(){
      var self = this;
      this.generateId();
     
      db.collection("tickets").add(this.ridership)
      
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          self.addData();        
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      })
      
    }

  },
};
</script>

<style lang="scss" scoped>
.doubleRow {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 25px;
}
</style>
