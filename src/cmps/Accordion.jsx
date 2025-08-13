import {
  View,
  Text,
  Animated,
  useAnimatedValue,
  StyleSheet,
  Image,
  Pressable
} from 'react-native';
import { useContext, useRef, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const Accordion = ({ list, listTitle }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandAnim = useRef(useAnimatedValue(0)).current;
  const rotateAnim = useRef(useAnimatedValue(0)).current;
  const { mode, themeColors } = useContext(ThemeContext);
  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
    Animated.parallel([
      Animated.timing(expandAnim, {
        toValue: isExpanded ? 0 : 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(rotateAnim, {
        toValue: isExpanded ? 0 : 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      // Animation completed
      console.log(isExpanded ? 'Accordion expanded' : 'Accordion collapsed');
    });
  };
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  return (
    <View style={[styles.accordionContainer, { borderBottomColor: themeColors[mode].border }]}>
      <Pressable style={styles.accordionHeader} onPress={toggleAccordion}>
        <Image source={require('../assets/images/icons/ingredients.png')} style={styles.accordionHeaderIcon} />
        <Text style={[styles.accordionHeadline, { color: themeColors[mode].text }]}>{listTitle}</Text>
        <Animated.Image source={require('../assets/images/icons/expand.png')} style={[styles.accordionHeaderIcon, { transform: [{ rotate }] }]} />
      </Pressable>
      <Animated.View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          overflow: 'hidden',
          height: expandAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, list.length * 28], // 28 is an estimated height per item, adjust as needed
          }),
        }}
      >
        <View>
          {list.map((item, index) => (
            <Text key={index} style={{ color: themeColors[mode].text }}>
              {`${index + 1}. ${item}\n`}
            </Text>
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  accordionContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  accordionHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  accordionHeaderIcon: {
    width: 30,
    height: 30,
  },
  accordionHeadline: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default Accordion;
