import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/contexts/ThemeContext';
import RecipePage from './src/screens/RecipePage';

function App() {
  const colorScheme = useColorScheme() ?? 'light';
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <StatusBar
          barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        />
        <AppContent />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
function AppContent() {
  // const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <RecipePage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
