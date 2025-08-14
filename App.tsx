import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecipePage from './src/screens/RecipePage';
import RecipeGallery from './src/screens/RecipeGallery';

const Stack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: { screen: RecipeGallery },
    Recipe: { screen: RecipePage },
  },
});

Stack.config.initialRouteName;
const Navigation = createStaticNavigation(Stack);

function App() {
  console.log('rendering app');
  const colorScheme = useColorScheme() ?? 'light';
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <StatusBar
          barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        />
        <View style={styles.container}>
          <Navigation />
        </View>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

// function AppContent() {
//   // const safeAreaInsets = useSafeAreaInsets();

//   return (

//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
