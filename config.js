
import firebase from "react-native-firebase";
import React from 'react';
let firebaseConfig = {
  apiKey: "AIzaSyAj-DknJT3jofC_HWzxNouBO5Azdhy20YA",
  authDomain: "todeaf-dc7f3.firebaseapp.com",
  databaseURL: "https://todeaf-dc7f3.firebaseio.com",
  projectId: "todeaf-dc7f3",
  storageBucket: "todeaf-dc7f3.appspot.com",
  messagingSenderId: "350849477626",
  appId: "1:350849477626:web:1e384ddccd6e9822261243",
  measurementId: "G-0L9D7FDVSY"
};


//let app = Firebase.initializeApp(firebaseConfig);
//export const db = app.database();



class config {

  constructor() {
    this.auth = firebase.auth()
    this.sugLocate = firebase.firestore().collection('cadastroLocate');
    this.auth.currentUser = firebase.auth().currentUser;
  }


  SugLocate = (locate) =>
    this.sugLocate.add({
      nome: locate.nome,
      cep: locate.cep,
      cidade: locate.cidade,
      descricao: locate.descricao,
      endereco: locate.endereco,
      LatitudeLocate: locate.LatitudeLocate,
      LongitudeLocate: locate.LongitudeLocate,
      visible: false,
    });

  MostrarLocal = (visibilidade, snapshot) =>
    this.sugLocate
      .where("visible", "==", visibilidade)
      .onSnapshot(snapshot);


  

  getCurrentUsername(){
    this.auth.currentUser
  }

  logout() {
    this.auth.signOut();
  }

  SendRedefinitionPass = (email) =>
    this.auth.sendPasswordResetEmail(email);

}

export default config;