/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App.js'
import Contacts from './screens/Contacts';
import Profile from './screens/Profile';


import StackNavigator from './routes/routes';
import {name as appName} from './app.json';
import User from './screens/User.js';

AppRegistry.registerComponent(appName, () => App);
