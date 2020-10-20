import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyCjEaS2AUAhT6RGBfc0fXGuFs8lZCGJpaA",
    authDomain: "grocery-store-6c056.firebaseapp.com",
    databaseURL: "https://grocery-store-6c056.firebaseio.com",
    projectId: "grocery-store-6c056",
    storageBucket: "grocery-store-6c056.appspot.com",
    messagingSenderId: "659202270105",
    appId: "1:659202270105:web:b8781e096eb03e6d0ea908"
};
firebase.initializeApp(config);
export default firebase