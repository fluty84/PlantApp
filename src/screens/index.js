export { default as LoginScreen} from './LoginScreen/LoginScreen'
export { default as HomeScreen } from './HomeScreen/HomeScreen'
export { default as RegistrationScreen } from './RegistrationScreen/RegistrationScreen'

import { AppRegistry, Platform } from 'react-native';
import App from '../../App';

AppRegistry.registerComponent('main', () => App);

if (Platform.OS === 'web') {
    const rootTag = document.getElementById('root') || document.getElementById('main');
    AppRegistry.runApplication('main', { rootTag });
}