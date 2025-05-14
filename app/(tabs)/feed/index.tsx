import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Activity types
type ActivityType = 'borrow' | 'return' | 'add_book' | 'new_friend';

// Dummy activity data
const DUMMY_ACTIVITIES = [
  {
    id: '1',
    type: 'borrow' as ActivityType,
    user: {
      name: 'Jamie',
      id: 'user1',
    },
    book: {
      title: 'The Lord of the Rings',
      id: 'book1',
    },
    friendFrom: {
      name: 'Sarah',
      id: 'user2',
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60),  // 1 hour ago
  },
  {
    id: '2',
    type: 'add_book' as ActivityType,
    user: {
      name: 'Marco',
      id: 'user3',
    },
    book: {
      title: 'Dune',
      id: 'book2',
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),  // 3 hours ago
  },
  {
    id: '3',
    type: 'return' as ActivityType,
    user: {
      name: 'Lena',
      id: 'user4',
    },
    book: {
      title: 'Pride and Prejudice',
      id: 'book3',
    },
    friendTo: {
      name: 'Michelle',
      id: 'user5',
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),  // 5 hours ago
  },
  {
    id: '4',
    type: 'new_friend' as ActivityType,
    user: {
      name: 'David',
      id: 'user6',
    },
    newFriend: {
      name: 'Rachel',
      id: 'user7',
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),  // 8 hours ago
  },
  {
    id: '5',
    type: 'borrow' as ActivityType,
    user: {
      name: 'Alex',
      id: 'user8',
    },
    book: {
      title: 'The Hobbit',
      id: 'book4',
    },
    friendFrom: {
      name: 'Marco',
      id: 'user3',
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),  // 1 day ago
  },
];

interface Activity {
  id: string;
  type: ActivityType;
  user: {
    name: string;
    id: string;
  };
  book?: {
    title: string;
    id: string;
  };
  friendFrom?: {
    name: string;
    id: string;
  };
  friendTo?: {
    name: string;
    id: string;
  };
  newFriend?: {
    name: string;
    id: string;
  };
  timestamp: Date;
}

// Format relative time
const formatRelativeTime = (date: Date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
};

// Activity Item Component
const ActivityItem = ({ activity }: { activity: Activity }) => {
  // Icon based on activity type
  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'borrow': return 'arrow-forward-circle-outline';
      case 'return': return 'arrow-back-circle-outline';
      case 'add_book': return 'add-circle-outline';
      case 'new_friend': return 'people-outline';
      default: return 'ellipse-outline';
    }
  };
  
  // Background color based on activity type
  const getActivityColor = (type: ActivityType) => {
    switch (type) {
      case 'borrow': return '#e3f2fd';
      case 'return': return '#e8f5e9';
      case 'add_book': return '#f3e5f5';
      case 'new_friend': return '#fff3e0';
      default: return '#f5f5f5';
    }
  };
  
  // Activity message based on type
  const getActivityMessage = (activity: Activity) => {
    switch (activity.type) {
      case 'borrow':
        return (
          <Text style={styles.activityText}>
            <Text style={styles.highlightText}>{activity.user.name}</Text> borrowed{' '}
            <Text style={styles.highlightText}>{activity.book?.title}</Text> from{' '}
            <Text style={styles.highlightText}>{activity.friendFrom?.name}</Text>
          </Text>
        );
      case 'return':
        return (
          <Text style={styles.activityText}>
            <Text style={styles.highlightText}>{activity.user.name}</Text> returned{' '}
            <Text style={styles.highlightText}>{activity.book?.title}</Text> to{' '}
            <Text style={styles.highlightText}>{activity.friendTo?.name}</Text>
          </Text>
        );
      case 'add_book':
        return (
          <Text style={styles.activityText}>
            <Text style={styles.highlightText}>{activity.user.name}</Text> added{' '}
            <Text style={styles.highlightText}>{activity.book?.title}</Text> to their library
          </Text>
        );
      case 'new_friend':
        return (
          <Text style={styles.activityText}>
            <Text style={styles.highlightText}>{activity.user.name}</Text> and{' '}
            <Text style={styles.highlightText}>{activity.newFriend?.name}</Text> are now friends
          </Text>
        );
      default:
        return <Text style={styles.activityText}>Unknown activity</Text>;
    }
  };

  return (
    <TouchableOpacity style={styles.activityItem}>
      <View 
        style={[
          styles.activityIcon, 
          { backgroundColor: getActivityColor(activity.type) }
        ]}
      >
        <Ionicons 
          name={getActivityIcon(activity.type)} 
          size={24} 
          color="#4CAF50" 
        />
      </View>
      
      <View style={styles.activityContent}>
        {getActivityMessage(activity)}
        <Text style={styles.timestamp}>{formatRelativeTime(activity.timestamp)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function FeedScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DUMMY_ACTIVITIES}
        renderItem={({ item }) => <ActivityItem activity={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No recent activity</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  listContainer: {
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activityIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
    justifyContent: 'center',
  },
  activityText: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 6,
    lineHeight: 22,
  },
  highlightText: {
    fontWeight: '600',
    color: '#000',
  },
  timestamp: {
    fontSize: 12,
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
});
