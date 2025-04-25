import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function ProfileScreen() {
  // State for switches
  const [allowFriendOfFriends, setAllowFriendOfFriends] = useState(true);
  const [notifyNewBooks, setNotifyNewBooks] = useState(true);
  const [notifyReturns, setNotifyReturns] = useState(true);

  // Dummy user data
  const userData = {
    name: 'Alex Johnson',
    phoneNumber: '+1 (555) 123-4567',
    libraryStats: {
      totalBooks: 42,
      booksLent: 7,
      booksBorrowed: 3,
    },
    friends: 15,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>AJ</Text>
          </View>
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userPhone}>{userData.phoneNumber}</Text>
          
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        
        {/* Stats Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Library Stats</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.libraryStats.totalBooks}</Text>
              <Text style={styles.statLabel}>Books</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.libraryStats.booksLent}</Text>
              <Text style={styles.statLabel}>Lent</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.libraryStats.booksBorrowed}</Text>
              <Text style={styles.statLabel}>Borrowed</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.friends}</Text>
              <Text style={styles.statLabel}>Friends</Text>
            </View>
          </View>
        </View>
        
        {/* Privacy Settings */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Privacy Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Allow Friends of Friends</Text>
              <Text style={styles.settingDescription}>Let friends of your friends view your library</Text>
            </View>
            <Switch
              value={allowFriendOfFriends}
              onValueChange={setAllowFriendOfFriends}
              trackColor={{ false: '#e0e0e0', true: '#a5d6a7' }}
              thumbColor={allowFriendOfFriends ? '#4CAF50' : '#f5f5f5'}
            />
          </View>
        </View>
        
        {/* Notification Settings */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Notification Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>New Books Added</Text>
              <Text style={styles.settingDescription}>Get notified when friends add new books</Text>
            </View>
            <Switch
              value={notifyNewBooks}
              onValueChange={setNotifyNewBooks}
              trackColor={{ false: '#e0e0e0', true: '#a5d6a7' }}
              thumbColor={notifyNewBooks ? '#4CAF50' : '#f5f5f5'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Book Returns</Text>
              <Text style={styles.settingDescription}>Get notified when books are returned</Text>
            </View>
            <Switch
              value={notifyReturns}
              onValueChange={setNotifyReturns}
              trackColor={{ false: '#e0e0e0', true: '#a5d6a7' }}
              thumbColor={notifyReturns ? '#4CAF50' : '#f5f5f5'}
            />
          </View>
        </View>
        
        {/* Action Buttons */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="people-outline" size={20} color="#4CAF50" style={styles.actionIcon} />
            <Text style={styles.actionText}>Manage Friends</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="help-circle-outline" size={20} color="#4CAF50" style={styles.actionIcon} />
            <Text style={styles.actionText}>Help & Support</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="log-out-outline" size={20} color="#F44336" style={styles.actionIcon} />
            <Text style={[styles.actionText, styles.logoutText]}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: 'white',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0f2f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 16,
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 20,
  },
  editButtonText: {
    color: '#4CAF50',
    fontWeight: '500',
  },
  sectionContainer: {
    marginTop: 24,
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionIcon: {
    marginRight: 12,
  },
  actionText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  logoutText: {
    color: '#F44336',
  },
});