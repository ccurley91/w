import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import useCachedResources from './hooks/useCachedResources';
import HomeScreen from './screens/HomeScreen';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';
//import { homeRef, voteRef, volunteerRef, contactRef, missionRef, repRef } from './screens/HomeScreen';

const Stack = createStackNavigator();

//const ref = React.useRef(null);

//useScrollToTop(ref);

const HeaderForreal = () => {
  return(
    <View style={styles.headerView}>
      <Image source={require('./assets/images/WTPLogoWhiteBlack200.png')} style={styles.logo} />
    </View>
  );
}
/*
HomeScreen.navigationOptions = {
  headerTitle: <HeaderForreal />
};
*/

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  const window = Dimensions.get("window");
  const screen = Dimensions.get("screen");
  console.log('heres the window');
  console.log(window);
  console.log(window.width);
  console.log('heres the screen');
  console.log(screen);
  console.log(screen.width);

  setTimeout(() => {
    console.log('this is from the top level file boiiii:');
    console.log(HomeScreen);
  },2000);
/*
  const [dimensions, setDimensions] = React.useState({ window, screen });

  const onChange = ({ window, screen, }) => {
    setDimensions({ window, screen });
  };

  React.useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });
*/
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer>
          <Stack.Navigator 
            header='float'
            >
            <Stack.Screen
              name='Home'
              component={HomeScreen}
              options={{
                headerTitle: <HeaderForreal />,
                headerStyle: {
                 height: 120,
                 backgroundColor: 'black'
                }
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

/*
options={{
                headerTitle: <HeaderForreal />,
                headerStyle: {
                 height: 120,
                 backgroundColor: 'black'
                }
              }}
*/

/*
function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return (
        <Image source={require('../assets/images/WTPLogoWhiteBlack200.png')} style={styles.logo} />
      );
    case 'Links':
      return 'Links to learn more';
  }
}
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 95,
    marginRight: 500
  },
  headerViewButtons: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  headerView: {
    flex: 1,
    flexDirection: 'row',
    //backgroundColor: 'black',
    alignItems: 'center',
    width: window.width,
    height: 120
  },
  headerButtonText: {
    color: 'white',
    fontFamily: 'Spectral',
    fontWeight: 'bold'
  }
});
