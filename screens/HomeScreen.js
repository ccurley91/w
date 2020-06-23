import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Animated, Header, Image, Linking, ImageBackground, Button, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Firebase from '../constants/Firebase';
import { useScrollToTop } from '@react-navigation/native';

import { MonoText } from '../components/StyledText';
import VisView from '../components/VisView';
import { Link, animateScroll as scroll } from 'react-scroll';

/*
export {homeRef};
export {voteRef};
export {contactRef};
export {missionRef};
export {volunteerRef};
export {repRef};
*/

const resultWindow = new Animated.Value(300);

class Politicians extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      repz: [],
      senatorz: [],
      govz: [],
      senator1: [],
      senator2: []
    };
  }

  render() {
    if(this.state.repz.length > 0) {
      return (
        <Text>
            Representatives:
        </Text>
      );
    }
    if(this.state.senatorz.length > 0) {
      return (
        <Text>
          Senators:
        </Text>      
      );
    }
    if(this.state.govz.length > 0) {
      return (
        <Text>
          Governors:
        </Text>
      );
    }
    else {
      return null;
    }
  }
}


export default function HomeScreen() {

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  const myRef = React.useRef(null);

  const homeRef = React.useRef(null);

  const voteRef = React.useRef(null);

  const contactRef = React.useRef(null);

  const missionRef = React.useRef(null);

  const volunteerRef = React.useRef(null);

  const repRef = React.useRef(null);

  //const resultsRef = React.useRef(null);

  //const demandRef = React.useRef(null);

  global.homeRef = homeRef;

  global.voteRef = voteRef;

  global.contactRef = contactRef;

  global.missionRef = missionRef;

  global.volunteerRef = volunteerRef;

  global.repRef = repRef;

  const [zipValue, onChangeText] = React.useState('');

  const [zip, setZip] = React.useState('');

  const [hide, setHide] = React.useState('true');

  const [repz, setRepz] = React.useState(null);

  const [senz, setSenz] = React.useState(null);

  const [govz, setGovz] = React.useState(null);

  const [rResp, setRResp] = React.useState(null);

  const [sResp, setSResp] = React.useState(null);

  const [gResp, setGResp] = React.useState(null);

  //const [resultWindow, setResultWindow] = React.useState(300);

  const db = Firebase.firestore();

  const fbRef = db.collection('wheresthepolicy');

  let repLoc = null;

  let missionLoc = null;

  let voteLoc = null;

  let volunteerLoc = null;

  let contactLoc = null;

  setTimeout(() => {
    //console.log('Reps');
    repRef.current.measure((x, y, width, height, pagex, pagey) => {
      //console.log('Reps x value: ', x);
      //console.log('Reps x coordinate: ', pagex);
      //console.log('Reps y value: ', y);
      //console.log('Reps y coordinate: ', pagey);
      repLoc = y;
    });
    //console.log('Home');
    //homeRef.current.getNode().measure((x, y, width, height, pagex, pagey) => {
    //  console.log('x value: ', x);
    //  console.log('x coordinate: ', pagex);
    //  console.log('y value: ', y);
    //  console.log('y coordinate: ', pagey);
    //  homeLoc = y;
    //});
    //console.log('Vote');
    voteRef.current.measure((x, y, width, height, pagex, pagey) => {
      //console.log('Vote x value: ', x);
      //console.log('Vote x coordinate: ', pagex);
      //console.log('Vote y value: ', y);
      //console.log('Vote y coordinate: ', pagey);
      voteLoc = y;
    });
    //console.log('Volunteer');
    volunteerRef.current.measure((x, y, width, height, pagex, pagey) => {
      //console.log('Volunteer x value: ', x);
      //console.log('Volunteer x coordinate: ', pagex);
      //console.log('Volunteer y value: ', y);
      //console.log('Volunteer y coordinate: ', pagey);
      volunteerLoc = y;
    });
    //console.log('Contact');
    contactRef.current.measure((x, y, width, height, pagex, pagey) => {
      //console.log('Contact x value: ', x);
      //console.log('Contact x coordinate: ', pagex);
      //console.log('Contact y value: ', y);
      //console.log('Contact y coordinate: ', pagey);
      contactLoc = y;
    });
    //console.log('Mission');
    missionRef.current.measure((x, y, width, height, pagex, pagey) => {
      //console.log('Mission x value: ', x);
      //console.log('Mission x coordinate: ', pagex);
      //console.log('Mission y value: ', y);
      //console.log('Mission y coordinate: ', pagey);
      missionLoc = y;
    });
  },1000);

  //this might be really dumb, but come back to here when you are trying to debug the set value skip
  function handleZipInput(zipperoo) {
    onChangeText(zipperoo);
    return zipValue;
  }

  function handleOnPress(zipper) {
    if(zipper.length == 5) {
      setZip(zipper);
      //console.log(zip);
      //potential remove the followingm, but check for the latency
     // console.log('zippen em:' + zip);
      //console.log('second wave' + zip);
      //console.log(zip.length);
      //do you call the functions here?
    }
    else {
      return null;
    }
  }

  React.useEffect(() => {
    if(zip.length == 5) {
      const rHunt = repSearch(zip);
      const sHunt = senSearch(zip);
      const gHunt = govSearch(zip);
      setTimeout(() => {
        const [rHuntin1, rHuntin2] = rHunt; //need to add programmatic destructuring by array size
        const [sHuntin1, sHuntin2] = sHunt; //need to add programmatic destructuring by array size
        const [gHuntin] = gHunt;
        /*
        console.log('first effects list');
        console.log(rHunt);
        console.log(sHunt);
        console.log(gHunt);
        console.log(typeof(rHunt));
        console.log(rHuntin1);
        console.log(sHuntin1);
        console.log(gHuntin);
        console.log(rHunt[0]);
        console.log(sHunt[0]);
        console.log(gHunt[0]);
        console.log('pre for loop');
        console.log(Array.isArray(rHunt));
        console.log(rHunt[0]);
        //rHunt.prototype.forEach(item => {
        */
        for(const item in rHunt) {
          console.log('in loop');
          console.log(item);
        }
        setRepz(rHunt);
        setSenz(sHunt);
        setGovz(gHunt);
      },750);
      //console.log('the beans:');
      //console.log(repz);
      //console.log(senz);
      //console.log(govz);
    }
  },[zip]);

  React.useEffect(() => {
    //console.log('Heres the rep effect: ');
    //console.log(repz);
    if(repz != null) {
      //console.log('in tha loop');
      //const [repzRep] = repz[0];
      //console.log(repzRep);
      //setRResp(repz);
    }
  },[repz]);

  React.useEffect(() => {
    //console.log('Heres the senator effect: ');
    //console.log(senz);
    if(senz != null) {
      //setSResp(senz[0]);
    }
  },[senz]);

  React.useEffect(() => {
    //console.log('Heres the gov effect: ');
    //console.log(govz);
    //if(govs != null) {
      //setGResp(govz[0]);
    //}
  },[govz]);
  
  //console.log('Debug info: ' + govz);
/*
  if(govz != null) {
    console.log('Debug length: ' + govz.length);
    console.log('Debug full: ' + govz[0]);
    console.log('Debug type: ' + typeof(govz[0]));
    if(typeof(govz[0]) != 'undefined') {
      console.log('you know this happened bruh');
      console.log(govz[0]);
      console.log('Here is the sub data:');
      console.log(govz[0].toString);
      console.log('From here we doing some destructuring!');
      const response = govz[0];
      console.log(response);
      console.log('Here is the response variable:');
      //const { address: a, contact_form: cf, district: d, election_date: ed, election_details: edeets, name: n, party: p, phone_number: pn, policy: pol, policy_link: pl, state: s, statement: st, tweet_template: tt, twitter: t, type: type, zip_code: z } = response;
      //console.log(govz[0].map((value) => value));
      //console.log(a);
      console.log(response.address);
    }
  }
*/
  const PoliticalFolks = () => {
    if(repz != null && senz != null && govz != null) {
      //if(repz.length > 0 && senz.length > 0 && repz != 0) {
      if(typeof(repz[0]) != 'undefined' && typeof(senz[0]) != 'undefined' && typeof(govz[0]) != 'undefined') {
        if(repz.length == 1) {
          //console.log('Make sure this is hitting: ');
          const govResponse = govz[0];
          const senResponse1 = senz[0];
          const senResponse2 = senz[1];
          const repResponse = repz[0];
          return (
            <View style={{marginLeft: 50, marginRight: 50}}>
              <Text style={styles.polHeader}>Representatives</Text>
              <View style={styles.polCard}>
                <Text style={styles.polAttrHeader}>Name:</Text>
                <Text style={styles.polAttr}>{repResponse.name}</Text>
                <Text style={styles.polAttrHeader}>Address:</Text>
                <Text style={styles.polAttr}>{repResponse.address}</Text>
                <Text style={styles.polAttrHeader}>Phone Number:</Text>
                <Text style={styles.polAttr}>{repResponse.phone_number}</Text>
                <Text style={styles.polAttrHeader}>Twitter Account:</Text>
                <Text style={styles.polAttr}>{repResponse.twitter}</Text>
                <Text 
                  style={[styles.polAttr, {color: '#0000EE'}]}
                  onPress={() => Linking.openURL(renResponse.tweet_template)}
                >
                  Tweet @ Them
                </Text>
              </View>
              <Text style={styles.polHeader}>Senators</Text>
              <View style={styles.polCard}>
                <Text style={styles.polAttrHeader}>Name</Text>
                <Text style={styles.polAttr}>{senResponse1.name}</Text>
                <Text style={styles.polAttrHeader}>Election Date:</Text>
                <Text style={styles.polAttr}>{senResponse1.election_date}</Text>
                <Text style={styles.polAttrHeader}>Address:</Text>
                <Text style={styles.polAttr}>{senResponse1.address}</Text>
                <Text style={styles.polAttrHeader}>Phone Number</Text>
                <Text style={styles.polAttr}>{senResponse1.phone_number}</Text>
                <Text style={styles.polAttrHeader}>Twitter Account:</Text>
                <Text style={styles.polAttr}>{senResponse1.twitter}</Text>
                <Text 
                  style={[styles.polAttr,{color: '#0000EE'}]}
                  onPress={() => Linking.openURL(senResponse1.tweet_template)}
                >
                  Tweet @ Them
                </Text>
                <Text style={[styles.polAttrHeader,{marginTop: 20}]}>Name</Text>
                <Text style={styles.polAttr}>{senResponse1.name}</Text>
                <Text style={styles.polAttrHeader}>Election Date:</Text>
                <Text style={styles.polAttr}>{senResponse1.election_date}</Text>
                <Text style={styles.polAttrHeader}>Address:</Text>
                <Text style={styles.polAttr}>{senResponse1.address}</Text>
                <Text style={styles.polAttrHeader}>Phone Number</Text>
                <Text style={styles.polAttr}>{senResponse2.phone_number}</Text>
                <Text style={styles.polAttrHeader}>Twitter Account:</Text>
                <Text style={styles.polAttr}>{senResponse2.twitter}</Text>
                <Text 
                  style={[styles.polAttr,{color: '#0000EE'}]}
                  onPress={() => Linking.openURL(senResponse2.tweet_template)}
                >
                  Tweet @ Them
                </Text>
              </View>
              <Text style={styles.polHeader}>Governors</Text>
              <View style={styles.polCard}>
                <Text style={styles.polAttrHeader}>Name</Text>
                <Text style={styles.polAttr}>{govResponse.name}</Text>
                <Text style={styles.polAttrHeader}>Election Date</Text>
                <Text style={styles.polAttr}>{govResponse.election_date}</Text>
                <Text style={styles.polAttrHeader}>Address:</Text>
                <Text style={styles.polAttr}>{govResponse.address}</Text>
                <Text style={styles.polAttrHeader}>Phone Number:</Text>
                <Text style={styles.polAtt}>{govResponse.phone_number}</Text>
                <Text style={styles.polAttrHeader}>Twitter Account:</Text>
                <Text style={styles.polAttr}>@{govResponse.twitter}</Text>
                <Text 
                style={[styles.polAttr,{color: '#0000EE'}]}
                onPress={() => Linking.openURL(govResponse.tweet_template)}
              >
                Tweet @ Them
              </Text>
              </View>
            </View>
          );
        }
        if(repz.length == 2) {
          console.log('Make sure this is hitting: ');
          Animated.timing(resultWindow, {
            toValue: 2050,
            duration: 150
          }).start();
          const govResponse = govz[0];
          const senResponse1 = senz[0];
          const repResponse1 = repz[0];
          const senResponse2 = senz[1];
          const repResponse2 = repz[1];
          return (
            <View style={{marginLeft: 50, marginRight: 50}}>
              <Text style={styles.polHeader}>Representatives</Text>
              <View style={styles.polCard}>
                <Text style={styles.polAttrHeader}>Name:</Text>
                <Text style={styles.polAttr}>{repResponse1.name}</Text>
                <Text style={styles.polAttrHeader}>Election Date</Text>
                <Text style={styles.polAttr}>{repResponse1.election_date}</Text>
                <Text style={styles.polAttrHeader}>Address:</Text>
                <Text style={styles.polAttr}>{repResponse1.address}</Text>
                <Text style={styles.polAttrHeader}>Phone Number:</Text>
                <Text style={styles.polAttr}>{repResponse1.phone_number}</Text>
                <Text style={styles.polAttrHeader}>Twitter Account:</Text>
                <Text style={styles.polAttr}>@{repResponse1.twitter}</Text>
                <Text 
                  style={[styles.polAttr, {color: '#0000EE'}]}
                  onPress={() => Linking.openURL(repResponse1.tweet_template)}
                >
                  Tweet @ Them!
                </Text>
                <Text style={[styles.polAttrHeader,{marginTop: 20}]}>Name:</Text>
                <Text style={styles.polAttr}>{repResponse2.name}</Text>
                <Text style={styles.polAttrHeader}>Election Date</Text>
                <Text style={styles.polAttr}>{repResponse2.election_date}</Text>
                <Text style={styles.polAttrHeader}>Address:</Text>
                <Text style={styles.polAttr}>{repResponse2.address}</Text>
                <Text style={styles.polAttrHeader}>Phone Number:</Text>
                <Text style={styles.polAttr}>{repResponse2.phone_number}</Text>
                <Text style={styles.polAttrHeader}>Twitter Account:</Text>
                <Text style={styles.polAttr}>@{repResponse2.twitter}</Text>
                <Text 
                  style={[styles.polAttr,{color: '#0000EE'}]}
                  onPress={() => Linking.openURL(repResponse2.tweet_template)}
                >
                  Tweet @ Them
                </Text>
              </View>
              <Text style={styles.polHeader}>Senators</Text>
              <View style={styles.polCard}>
                <Text style={styles.polAttrHeader}>Name:</Text>
                <Text style={styles.polAttr}>{senResponse1.name}</Text>
                <Text style={styles.polAttrHeader}>Election Date:</Text>
                <Text style={styles.polAttr}>{senResponse1.election_date}</Text>
                <Text style={styles.polAttrHeader}>Address:</Text>
                <Text style={styles.polAttr}>{senResponse1.address}</Text>
                <Text style={styles.polAttrHeader}>Phone Number:</Text>
                <Text style={styles.polAttr}>{senResponse1.phone_number}</Text>
                <Text style={styles.polAttrHeader}>Twitter Account:</Text>
                <Text style={styles.polAttr}>@{senResponse1.twitter}</Text>
                <Text
                  style={[styles.polAttr,{color: '#0000EE'}]}
                  onPress={() => Linking.openURL(senResponse.tweet_template)}
                >
                  Tweet @ Them
                </Text>
                <Text style={[styles.polAttrHeader,{marginTop: 20}]}>Name:</Text>
                <Text style={styles.polAttr}>{senResponse2.name}</Text>
                <Text style={styles.polAttrHeader}>Election Date:</Text>
                <Text style={styles.polAttr}>{senResponse2.election_date}</Text>
                <Text style={styles.polAttrHeader}>Address:</Text>
                <Text style={styles.polAttr}>{senResponse2.address}</Text>
                <Text style={styles.polAttrHeader}>Phone Number:</Text>
                <Text style={styles.polAttr}>{senResponse2.phone_number}</Text>
                <Text style={styles.polAttrHeader}>Twitter Account:</Text>
                <Text style={styles.polAttr}>@{senResponse2.twitter}</Text>
                <Text 
                  style={[styles.polAttr,{color: '#0000EE'}]}
                  onPress={() => Linking.openURL(senResponse2.tweet_template)}
                >
                  Tweet @ Them
                </Text>
              </View>
              <Text style={styles.polHeader}>Governors</Text>
              <View style={styles.polCard}>
                <Text style={styles.polAttrHeader}>Name</Text>
                <Text style={styles.polAttr}>{govResponse.name}</Text>
                <Text style={styles.polAttrHeader}>Election Date</Text>
                <Text style={styles.polAttr}>{govResponse.election_date}</Text>
                <Text style={styles.polAttrHeader}>Address:</Text>
                <Text style={styles.polAttr}>{govResponse.address}</Text>
                <Text style={styles.polAttrHeader}>Phone Number</Text>
                <Text style={styles.polAttr}>{govResponse.phone_number}</Text>
                <Text style={styles.polAttrHeader}>Twitter Account:</Text>
                <Text style={styles.polAttr}>@{govResponse.twitter}</Text>
                <Text
                  style={[styles.polAttr,{color: '#0000EE'}]}
                  onPress={() => Linking.openURL(govResponse.tweet_template)}
                >
                  Tweet @ Them!
                </Text>
              </View>
            </View>
          );
        }
        if(repz.length == 3) {
          console.log('Make sure this is hitting: ');
          Animated.timing(resultWindow, {
            toValue: 2375,
            duration: 150
          }).start();
          const govResponse = govz[0];
          const senResponse1 = senz[0];
          const repResponse1 = repz[0];
          const senResponse2 = senz[1];
          const repResponse2 = repz[1];
          const repResponse3 = repz[2];
          return (
            <View style={{marginLeft: 100, marginRight: 100}}>
              <Text style={styles.polHeader}>Representatives</Text>
              <View style={styles.polCard}>
                <Text style={styles.polAttrHeader}>Name:</Text>
                <Text style={styles.polAttr}>{repResponse1.name}</Text>
                <Text style={styles.polAttrHeader}>Election Date</Text>
                <Text style={styles.polAttr}>{repResponse1.election_date}</Text>
                <Text style={styles.polAttrHeader}>Address:</Text>
                <Text style={styles.polAttr}>{repResponse1.address}</Text>
                <Text style={styles.polAttrHeader}>Phone Number:</Text>
                <Text style={styles.polAttr}>{repResponse1.phone_number}</Text>
                <Text style={styles.polAttrHeader}>Twitter Account:</Text>
                <Text style={styles.polAttr}>@{repResponse1.twitter}</Text>
                <Text 
                  style={[styles.polAttr,{color: '#0000EE'}]}
                  onPress={() => Linking.openURL(repResponse1.tweet_template)}
                >
                  Tweet @ Them!
                </Text>
                <Text style={[styles.polAttrHeader,{marginTop: 20}]}>Name:</Text>
                <Text style={styles.polAttr}>{repResponse2.name}</Text>
                <Text style={styles.polAttrHeader}>Election Date</Text>
                <Text style={styles.polAttr}>{repResponse2.election_date}</Text>
                <Text style={styles.polAttrHeader}>Address:</Text>
                <Text style={styles.polAttr}>{repResponse2.address}</Text>
                <Text style={styles.polAttrHeader}>Phone Number:</Text>
                <Text style={styles.polAttr}>{repResponse2.phone_number}</Text>
                <Text style={styles.polAttrHeader}>Twitter Account:</Text>
                <Text style={styles.polAttr}>@{repResponse2.twitter}</Text>
                <Text 
                  style={[styles.polAttr,{color: '#0000EE'}]}
                  onPress={() => Linking.openURL(repResponse2.tweet_template)}
                >
                  Tweet @ Them
                </Text>
                <Text style={[styles.polAttrHeader,{marginTop: 20}]}>Name:</Text>
                <Text style={styles.polAttr}>{repResponse3.name}</Text>
                <Text style={styles.polAttrHeader}>Election Date</Text>
                <Text style={styles.polAttr}>{repResponse3.election_date}</Text>
                <Text style={styles.polAttrHeader}>Address:</Text>
                <Text style={styles.polAttr}>{repResponse3.address}</Text>
                <Text style={styles.polAttrHeader}>Phone Number:</Text>
                <Text style={styles.polAttr}>{repResponse3.phone_number}</Text>
                <Text style={styles.polAttrHeader}>Twitter Account:</Text>
                <Text style={styles.polAttr}>@{repResponse3.twitter}</Text>
                <Text 
                  style={[styles.polAttr,{color: '#0000EE'}]}
                  onPress={() => Linking.openURL(repResponse3.tweet_template)}
                >
                  Tweet @ Them!
                </Text>
              </View>
              <Text style={styles.polHeader}>Senators</Text>
              <View style={styles.polCard}>
                <Text style={styles.polAttrHeader}>Name:</Text>
                <Text style={styles.polAttr}>{senResponse1.name}</Text>
                <Text style={styles.polAttrHeader}>Election Date:</Text>
                <Text style={styles.polAttr}>{senResponse1.election_date}</Text>
                <Text style={styles.polAttrHeader}>Address:</Text>
                <Text style={styles.polAttr}>{senResponse1.address}</Text>
                <Text style={styles.polAttrHeader}>Phone Number:</Text>
                <Text style={styles.polAttr}>{senResponse1.phone_number}</Text>
                <Text style={styles.polAttrHeader}>Twitter Account:</Text>
                <Text style={styles.polAttr}>@{senResponse1.twitter}</Text>
                <Text 
                  style={styles.polAttr}
                  onPress={() => Linking.openURL(senResponse1.tweet_template)}
                >
                  Tweet @ Them
                </Text>
                <Text style={[styles.polAttrHeader,{marginTop: 20}]}>Name:</Text>
                <Text style={styles.polAttr}>{senResponse2.name}</Text>
                <Text style={styles.polAttrHeader}>Election Date:</Text>
                <Text style={styles.polAttr}>{senResponse2.election_date}</Text>
                <Text style={styles.polAttrHeader}>Address:</Text>
                <Text style={styles.polAttr}>{senResponse2.address}</Text>
                <Text style={styles.polAttrHeader}>Phone Number:</Text>
                <Text style={styles.polAttr}>{senResponse2.phone_number}</Text>
                <Text style={styles.polAttrHeader}>Twitter Account:</Text>
                <Text style={styles.polAttr}>@{senResponse2.twitter}</Text>
                <Text
                  style={[styles.polAttr,{color: '#0000EE'}]}
                  onPress={() => Linking.openURL(senResponse2.tweet_template)}
                >
                  Tweet @ Them
                </Text>
              </View>
              <Text style={styles.polHeader}>Governors</Text>
              <View style={styles.polCard}>
                <Text style={styles.polAttrHeader}>Name</Text>
                <Text style={styles.polAttr}>{govResponse.name}</Text>
                <Text style={styles.polAttrHeader}>Election Date</Text>
                <Text style={styles.polAttr}>{govResponse.election_date}</Text>
                <Text style={styles.polAttrHeader}>Address:</Text>
                <Text style={styles.polAttr}>{govResponse.address}</Text>
                <Text style={styles.polAttrHeader}>Phone Number</Text>
                <Text style={styles.polAttr}>{govResponse.phone_number}</Text>
                <Text style={styles.polAttrHeader}>Twitter Account:</Text>
                <Text style={styles.polAttr}>@{govResponse.twitter}</Text>
                <Text 
                  style={[styles.polAttr,{color: '#0000EE'}]}
                  onPress={() => Linking.openURL(govResponse.tweet_template)}
                >
                  Tweet @ Them!
                </Text>
              </View>
            </View>
          );
        }
      }
      else {
        return null;
      }
    }
    else {
      return null;
    }
  };

    
  //code for new consolidated function call

  //code for position type functions and zip to state mapping

  //new components that turn visible based on the data availability!!!

  //funtion to display rows with data input for each politician type

  //add content and size the fuck out of the site


  function senSearch(zip) {
    const senArray =[]

    const state = zipToState(zip);

    //console.log('sen check');
    //console.log(state);

    fbRef.where('type','==','Sen').get().then(snapshot => {
      snapshot.forEach(doc => {
        if(doc.data().state == state) {
          senArray.push(doc.data());
        }
      });
    })
    .catch(err => {
      console.log('Error getting documents',err);
    });

    return senArray;
  }

  function repSearch(zip) {
    const repArray =[]

    fbRef.where('zip_code','array-contains',zip).get().then(snapshot => {
      snapshot.forEach(doc => {
        repArray.push(doc.data());
      });
    })
    .catch(err => {
      console.log('Error getting documents',err);
    });
    return repArray;
  }

  function govSearch(zip, ref) {
    const govArray =[]

    const state = zipToState(zip);

    //console.log('govCheck');
    //console.log(state);

    fbRef.where('type','==','Gov').get().then(snapshot => {
      snapshot.forEach(doc => {
        if(doc.data().state == state) {
          govArray.push(doc.data());
        }
      });
    })
    .catch(err => {
      console.log('Error getting documents',err);
    });

    return govArray;
  }

  function zipToState(zip) {
    const zip3 = zip.substring(0,3);
    const zip2 = zip.substring(0,2);
      //AL
    if (Number(zip2) >= 35 && Number(zip2) <= 36) {
      return 'AL';
    }
    //AK
    else if(Number(zip3) >= 995 && Number(zip3) <= 999) {
      return 'AK';
    }
    //AZ
    else if(Number(zip2) >= 85 && Number(zip2) <= 86) {
      return 'AZ';
    }
    //AR
    else if(Number(zip3) >= 716 && Number(zip3) <= 729) {
      return 'AR';
    }
    //CA
    else if(Number(zip3) >= 900 && Number(zip3) <= 961) {
      return 'CA';
    }
    //CO
    else if(Number(zip2) >= 80 && Number(zip2) <= 81) {
      return 'CO';
    }
    //CT
    else if(Number(zip2) == 6) {
      return 'CT';
    }
    //DE
    else if(Number(zip3) >= 197 && Number(zip3) <= 199) {
        return 'DE';
    }
    //FL
    else if(Number(zip2) >= 32 && Number(zip2) <= 34) {
      return 'FL';
    }
    //GA
    else if(Number(zip2) >= 30 && Number(zip2) <= 31) {
      return 'GA';
    }
    //HI
    else if(Number(zip3) >= 967 && Number(zip3) <= 968) {
      return 'HI';
    }
    //ID
    else if(Number(zip3) >= 832 && Number(zip3) <= 839) {
      return 'ID';
    }
    //IL
    else if(Number(zip2) >= 60 && Number(zip2) <= 62) {
      return 'IL';
    }
    //IN
    else if(Number(zip2) >= 46 && Number(zip2) <= 47) {
      return 'IN';
    }
    //IA
    else if(Number(zip2) >= 50 && Number(zip2) <= 52) {
      return 'IA';
    }
    //KS
    else if(Number(zip2) >= 66 && Number(zip2) <= 67) {
      return 'KS';
    }
    //KY
    else if(Number(zip2) >= 40 && Number(zip2) <= 42) {
      return 'KY';
    }
    //LA
    else if(Number(zip3) >= 700 && Number(zip3) <= 715) {
      return 'LA';
    }
    //ME
    else if(Number(zip3) >= 39 && Number(zip3) <= 49) {
      return 'ME';
    }
    //MD
    else if(Number(zip3) >= 206 && Number(zip3) <= 219) {
      return 'MD';
    }
    //MA
    else if(Number(zip3) >= 10 && Number(zip3) <= 27) {
      return 'MA';
    }
    //MI
    else if(Number(zip2) >= 48 && Number(zip2) <= 49) {
      return 'MI';
    }
    //MN
    else if(Number(zip3) >= 550 && Number(zip3) <= 567) {
      return 'MN';
    }
    //MS
    else if(Number(zip3) >= 386 && Number(zip3) <= 399) {
      return 'MS';
    }
    //MO
    else if(Number(zip2) >= 63 && Number(zip2) <= 65) {
      return 'MO';
    }
    //MT
    else if(Number(zip2) == 59) {
      return 'MT';
    }
    //NE
    else if(Number(zip2) >= 68 && Number(zip2) <= 69) {
      return 'NE';
    }
    //NV
    else if(Number(zip3) >= 889 && Number(zip3) <= 899) {
      return 'NV';
    }
    //NH
    else if(Number(zip3) >= 30 && Number(zip3) <= 38) {
      return 'NH';
    }
    //NJ
    else if(Number(zip2) >= 7 && Number(zip2) <= 8) {
      return 'NJ';
    }
    //NM
    else if(Number(zip3) >= 870 && Number(zip3) <= 884) {
      return 'NM';
    }
    //NY
    else if(Number(zip2) >= 10 && Number(zip2) <= 14) {
      return 'NY';
    }
    //NC
    else if(Number(zip2) >= 27 && Number(zip2) <= 28) {
      return 'NC';
    }
    //ND
    else if(Number(zip2) == 58) {
      return 'ND';
    }
    //OH
    else if(Number(zip2) >= 43 && Number(zip2) <= 45) {
      return 'OH';
    }
    //OK
    else if(Number(zip2) >= 73 && Number(zip2) <= 74) {
      return 'OK';
    }
    //OR
    else if(Number(zip2) == 97) {
      return 'OR';
    }
    //PA
    else if(Number(zip3) >= 150 && Number(zip3) <= 196) {
      return 'PA';
    }
    //RI
    else if(Number(zip3) >= 28 && Number(zip3) <= 29) {
      return 'RI';
    }
    //SC
    else if(Number(zip2) == 29) {
      return 'SC';
    }
    //SD
    else if(Number(zip2) == 59) {
      return 'SD';
    }
    //TN
    else if(Number(zip3) >= 370 && Number(zip3) <= 385) {
      return 'TN';
    }
    //TX
    else if(Number(zip2) >= 75 && Number(zip2) <= 79) {
      return 'TX';
    }
    //UT
    else if(Number(zip2) == 84) {
      return 'UT';
    }
    //VT
    else if(Number(zip2) == 5) {
      return 'VT';
    }
    //VA
    else if(Number(zip3) >= 220 && Number(zip3) <= 246) {
      return 'VA';
    }
    //WA
    else if(Number(zip3) >= 980 && Number(zip3) <= 994) {
      return 'WA';
    }
    //WV
    else if(Number(zip3) >= 247 && Number(zip3) <= 269) {
      return 'WV';
    }
    //WI
    else if(Number(zip2) >= 53 && Number(zip2) <= 54) {
      return 'WI';
    }
    //WY
    else if(Number(zip3) >= 820 && Number(zip3) <= 831) {
      return 'WY';
    }
    else {
      console.log('No State Found');
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.contentContainer}
      >
        <View
          ref={repRef}
        >
          <ImageBackground 
            source={require("../assets/images/capital-ceiling.png")}
            style={styles.zipView}
          >
            <Text style={styles.watchingTitle}>
              The World Is Watching.
            </Text>
            <Text style={styles.watchingText}>
              Search your zip code to find your elected representatives.
            </Text>
            <Text style={styles.zipEntryTitle}>
              Zip Code:
            </Text>
            <TextInput 
              style={styles.zipInput}
              onChangeText={text => onChangeText(text)}
              value={zipValue}
            />
            <TouchableOpacity
              style={styles.zipButton}
              onPress={() => handleOnPress(zipValue)}
            >
              <Text style={styles.zipButtonText}>
                Submit
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <Animated.View 
          style={styles.resultsContainer}
        >
          <View style={styles.repBrief}>
            <Text style={styles.missionTitle}>
              We Demand Accountability.
            </Text>
            <Text style={styles.missionText}>
              We are witnessing the impact that systemic racism has on our nation, communities, and lives. Our voices are being heard loud and clear to elected representatives that the people are demanding change.
            </Text>
            <Text style={styles.missionText}>
              We have the opportunity to elect or re-elect Representatives that are aligned with the systemic change we want to see in this country.
            </Text>
          </View>
          <PoliticalFolks />
        </Animated.View>
        <View 
          style={styles.missionView}
          ref={missionRef}
        >
          <Text style={styles.missionHeader}>
            Three Simple Steps to Hold Our Representatives Accountable
          </Text>
          <Text style={styles.missionText}>
            1. Enter Your Zip Code to find your Representatives
          </Text>
          <Text style={styles.missionText}>
            2. One-Click Tweet at your Representative
          </Text>
          <Text style={[styles.missionText,{marginBottom: 10}]}>
            3. Call your Representative
          </Text>
          <Text style={styles.missionHeader}>
            Who is up for Re-Election this November 2020?
          </Text>
          <Text style={styles.missionSubHeader}>
            All 435 Members of Congress
          </Text>
          <Text style={styles.missionSubHeader}>
            35 out of 50 Senators
          </Text>
          <Text style={styles.missionSubHeader}>
            11 out of 50 Governors
          </Text>
        </View>
        <View style={styles.votingView}
          ref={voteRef}
        >
          <Text style={styles.votingText}>
            Register to Vote to Make Your Voice Heard!
          </Text>
          <TouchableOpacity
            style={styles.votingButton}
            onPress={() => Linking.openURL('https://register.vote.org/?partner=111111&campaign=free-tools')}
          >
            <Text style={styles.votingButtonText}>
              Register to Vote!
            </Text>
          </TouchableOpacity>
        </View>
        <ImageBackground source={require('../assets/images/justitia.png')} style={styles.justiceView}>
          <Text style={styles.justiceText}>
            Help accelerate systemic change for a better tomorrow.
          </Text>
          <Text style={styles.justiceText}>
          Hold your Representatives accountable.
          </Text>
        </ImageBackground>
        <View 
          style={styles.volunteerView}
          ref={volunteerRef}
        >
          <Text style={styles.volunteerText}>
            Interested in supporting Wheres The Policy? Sign up below to volunteer!
          </Text>
          <TouchableOpacity
            style={styles.volunteerButton}
            onPress={() => Linking.openURL('https://form.typeform.com/to/ApxtVMOC')}
          >
            <Text style={styles.volunteerButtonText}>
              Volunteer Sign-up
            </Text>
          </TouchableOpacity>
        </View>
        <View 
          style={styles.footerView}
          ref={contactRef}
        >
          <View style={styles.footerNav}>
          <TouchableOpacity
            onPress={() => window.scrollTo(0,repLoc)}
          >
            <Text style={styles.footerNavLink}>
              Your Representatives
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => window.scrollTo(0,voteLoc)}
          >
            <Text style={styles.footerNavLink}>
              Register to Vote
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => window.scrollTo(0,volunteerLoc)}
          >
            <Text style={styles.footerNavLink}>
              Volunteer
            </Text>
          </TouchableOpacity>
          </View>
          <View style={styles.footerImg}>
            <Image 
              source={require('../assets/images/WTPLogoWhiteBlack200.png')} 
              style={styles.footerLogo} 
            />
          </View>
          <View style={styles.footerSocial}>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://www.facebook.com/wheresthepolicy')}
            >
              <Image 
                source={require('../assets/images/facebookicon.png')} 
                style={styles.fbLogo} 
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://twitter.com/wheresthepolicy')}
            >
              <Image
                source={require('../assets/images/twittericon.png')} 
                style={styles.twitterLogo}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://www.instagram.com/wheresthepolicy/')}
            >
              <Image 
                source={require('../assets/images/instagramicon.png')}
                style={styles.instaLogo}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};


/*
function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}
*/

const styles = StyleSheet.create({
  zipView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  repBrief: {
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 300,
    marginRight: 300
  },
  instaLogo: {
    height: 50,
    width: 50,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    borderColor: '#000000',
  },
  fbLogo: {
    height: 50,
    width: 50,
    backgroundColor: '#ffffff',
    borderRadius: 50
  },
  twitterLogo: {
    height: 50,
    width: 50,
    backgroundColor: '#ffffff',
    borderRadius: 50
  },
  footerSocial: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  footerLogo: {
    height: 95,
    width: 200
  },
  footerImg: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  footerNavLink: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Spectral',
    color: 'gold',
    textDecorationLine: 'underline',
    marginLeft: 10,
    marginRight: 10
  },
  footerNav: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  footerView: {
    backgroundColor: '#000000',
    height: '100',
    paddingTop: 10,
    paddingBottom: 10
  },
  volunteerView: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8d264',
    height: 500,
  },
  volunteerText:{
    marginBottom: 50,
    fontFamily: 'Spectral',
    fontSize: 35,
  },
  volunteerButton: {
    //borderWidth: 2,
    borderRadius: 10,
    //borderColor: '#000000',
    backgroundColor: '#DCDCDC',
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    width: 200
  },
  volunteerButtonText:{
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    fontWeight: 'bold',
    //fontFamily: 'Spectral',
    fontSize: 18
  },
  justiceText: {
    fontFamily: 'Spectral',
    fontSize: 35,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  justiceView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
  },
  primerView: {
    height: 100,
  },
  missionSubHeader: {
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Spectral',
    fontSize: 30,
    fontWeight: 'bold'
  },
  missionHeader: {
    marginTop: 20,
    maringBottom: 10,
    fontFamily: 'Spectral',
    fontWeight: 'bold',
    fontSize: 35
  },
  missionText: {
    fontFamily: 'Spectral',
    fontSize: 22,
    marginTop: 20,
    marginBotton: 20,
  },
  missionTitle: {
    fontSize: 40,
    fontFamily: 'Spectral',
    fontWeight: 'bold'
  },
  missionView: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8d264',
    height: 500
   // height: 450
  },
  votingView: {
    backgroundColor: '#f4f7ea',
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  votingText: {
    fontFamily: 'Spectral',
    fontWeight: 'bold',
    fontSize: 35,
    textDecorationLine: 'underline',
    marginBottom: 75
  },
  votingButton: {
    //borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#DCDCDC',
    //borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    width: 200
  },
  votingButtonText:{
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    fontWeight: 'bold',
    //fontFamily: 'Spectral',
    fontSize: 18
  },
  polHeader: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 32
  },
  polAttrHeader: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 18
  },
  polAttr: {
    marginTop: 5,
    fontSize: 18
  },
  polCard: {
    paddingLeft: 20,
    paddingBottom: 20,
    borderWidth: 1,
    borderRadius: 10
  },
  watchingTitle: {
    marginTop: 50,
    //marginLeft: 40,
    fontSize: 50,
    color: '#ffffff',
    fontFamily: 'Spectral',
    fontWeight: 'bold'
  },
  watchingText: {
    fontSize: 30,
    marginTop: 60,
    //marginLeft: 40,
    //marginRight: 100,
    color: '#ffffff',
    fontFamily: 'Spectral',
  },
  zipEntryTitle: {
    fontSize: 30,
    marginTop: 60,
    //marginLeft: 40,
    color: '#ffffff',
    fontFamily: 'Spectral'
  },
  zipInput: {
    marginTop: 20,
    //marginLeft: 40,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    height: 35,
    width:200
  },
  zipButton: {
    //marginLeft: 40,
    marginBottom: 50,
    borderColor: '#E8D264',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#ffffff00',
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  testStyle: {
    position: 'absolute',
    marginTop: 1000,
  },
  zipButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  resultsContainer: {
    backgroundColor: '#F4F7EA',
    height: resultWindow,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 0,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: 'yellow'
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

