import { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

// Dummy data for friend libraries
const DUMMY_FRIENDS = [
  {
    id: '1',
    name: 'Sarah J.',
    distance: '0.3 miles',
    bookCount: 42,
    coordinate: { latitude: 37.78825, longitude: -122.4324 },
  },
  {
    id: '2',
    name: 'Marco L.',
    distance: '0.7 miles',
    bookCount: 31,
    coordinate: { latitude: 37.79125, longitude: -122.4354 },
  },
  {
    id: '3',
    name: 'Lena K.',
    distance: '1.2 miles',
    bookCount: 68,
    coordinate: { latitude: 37.78525, longitude: -122.4234 },
  },
  {
    id: '4',
    name: 'David R.',
    distance: '1.7 miles',
    bookCount: 23,
    coordinate: { latitude: 37.78925, longitude: -122.4384 },
  },
  {
    id: '5',
    name: 'Michelle P.',
    distance: '2.1 miles',
    bookCount: 54,
    coordinate: { latitude: 37.78625, longitude: -122.4284 },
  },
];

interface FriendLibrary {
  id: string;
  name: string;
  distance: string;
  bookCount: number;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

// Friend Library Item Component
const FriendLibraryItem = ({ library }: { library: FriendLibrary }) => {
  return (
    <TouchableOpacity style={styles.libraryItem}>
      <View style={styles.libraryIcon}>
        <Text style={styles.libraryIconText}>📚</Text>
      </View>
      <View style={styles.libraryInfo}>
        <Text style={styles.libraryName}>{library.name}</Text>
        <Text style={styles.libraryDetails}>{library.distance} • {library.bookCount} books</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#7f8c8d" />
    </TouchableOpacity>
  );
};

export default function FriendsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const bottomSheetHeight = useRef(new Animated.Value(200)).current;
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredLibraries = DUMMY_FRIENDS.filter(library => {
    return searchQuery === '' || 
      library.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const toggleBottomSheet = () => {
    const toValue = isExpanded ? 200 : 450;
    
    Animated.spring(bottomSheetHeight, {
      toValue,
      useNativeDriver: false,
    }).start();
    
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {DUMMY_FRIENDS.map(library => (
          <Marker
            key={library.id}
            coordinate={library.coordinate}
            title={library.name}
            description={`${library.bookCount} books`}
          />
        ))}
      </MapView>
      
      {/* Bottom Sheet */}
      <Animated.View style={[styles.bottomSheet, { height: bottomSheetHeight }]}>
        <TouchableOpacity 
          style={styles.handle}
          onPress={toggleBottomSheet}
        >
          <View style={styles.handleBar} />
        </TouchableOpacity>
        
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#7f8c8d" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search friends libraries"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <FlatList
          data={filteredLibraries}
          renderItem={({ item }) => <FriendLibraryItem library={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No libraries found</Text>
            </View>
          }
        />
      </Animated.View>
      
      <TouchableOpacity style={styles.addButton} onPress={() => console.log('Find more friends')}>
        <Ionicons name="person-add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  map: {
    flex: 1,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
    paddingBottom: 20,
  },
  handle: {
    width: '100%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#dfe6e9',
    borderRadius: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#dfe6e9',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
    paddingTop: 8,
  },
  libraryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  libraryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0f2f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  libraryIconText: {
    fontSize: 24,
  },
  libraryInfo: {
    flex: 1,
  },
  libraryName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: 4,
  },
  libraryDetails: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: '#7f8c8d',
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 220,  // Positioned above the bottom sheet
    right: 24,
    backgroundColor: '#4CAF50',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});