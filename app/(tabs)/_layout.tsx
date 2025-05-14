import { Tabs } from 'expo-router';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { BlurView } from 'expo-blur';

// Color palette
const COLORS = {
  darkGreen: '#283618',
  oliveGreen: '#606C38',
  cream: '#FEFAE0',
  tan: '#DDA15E',
  rust: '#BC6C25',
};

// Navigation header with notification and scan buttons
function NavigationHeader() {
  const navigation = useNavigation();
  
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.iconButton} onPress={() => console.log('Notifications')}>
        <Ionicons name="notifications-outline" size={24} color={COLORS.oliveGreen} />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.iconButton} onPress={() => console.log('Scan Book')}>
        <Ionicons name="scan-outline" size={24} color={COLORS.oliveGreen} />
      </TouchableOpacity>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerRight: () => <NavigationHeader />,
        headerStyle: {
          backgroundColor: COLORS.cream,
        },
        headerTintColor: COLORS.darkGreen,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.rust,
        tabBarInactiveTintColor: COLORS.oliveGreen,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="library/index"
        options={{
          title: 'My Library',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="friends/index"
        options={{
          title: 'Friends',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="feed/index"
        options={{
          title: 'Activity',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    marginRight: 16,
  },
  iconButton: {
    paddingHorizontal: 8,
  },
  tabBar: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    elevation: 4,
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 70,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    paddingBottom: 6,
    margin: 10,
  },
});
