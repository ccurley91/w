import * as firebase from 'firebase';

  const firebaseConfig = {
      apiKey: "AIzaSyCPdSSThcPdp5kCl8Qlfo64I45CEuqsrIY",
      authDomain: "wheresthepolicy.firebaseapp.com",
      databaseURL: "https://wheresthepolicy.firebaseio.com",
      projectId: "wheresthepolicy",
      storageBucket: "wheresthepolicy.appspot.com",
      messagingSenderId: "1015917592307",
      appId: "1:1015917592307:web:bbf0d8cd47246d78068186",
      measurementId: "G-2VY2L6GXHN"
  }

  const Firebase = firebase.initializeApp(firebaseConfig);

  export default Firebase;