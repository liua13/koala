import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Color palette
const COLORS = {
  darkGreen: '#283618',
  oliveGreen: '#606C38',
  cream: '#FEFAE0',
  tan: '#DDA15E',
  rust: '#BC6C25',
};

// Dummy data for initial UI
const DUMMY_BOOKS = [
  {
    id: '1',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    status: 'available',
    coverUrl: 'https://placeholder.com/book1',
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    status: 'borrowed',
    borrower: 'Alex',
    coverUrl: 'https://placeholder.com/book2',
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    status: 'on_hold',
    holder: 'Jamie',
    coverUrl: 'https://placeholder.com/book3',
  },
  {
    id: '4',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    status: 'available',
    coverUrl: 'https://placeholder.com/book4',
  },
  {
    id: '5',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    status: 'borrowed',
    borrower: 'Taylor',
    coverUrl: 'https://placeholder.com/book5',
  },
];

type BookStatus = 'available' | 'borrowed' | 'on_hold';

interface Book {
  id: string;
  title: string;
  author: string;
  status: BookStatus;
  coverUrl: string;
  borrower?: string;
  holder?: string;
}

// Book Item Component
const BookItem = ({ book }: { book: Book }) => {
  const getStatusColor = (status: BookStatus) => {
    switch (status) {
      case 'available': return COLORS.oliveGreen;
      case 'borrowed': return COLORS.tan;
      case 'on_hold': return COLORS.rust;
      default: return COLORS.oliveGreen;
    }
  };

  const getStatusText = (status: BookStatus) => {
    switch (status) {
      case 'available': return 'Available';
      case 'borrowed': return `Borrowed by ${book.borrower}`;
      case 'on_hold': return `On Hold for ${book.holder}`;
      default: return 'Available';
    }
  };

  return (
    <View style={styles.bookItem}>
      <View style={styles.bookCover}>
        <Text style={styles.bookCoverText}>📚</Text>
      </View>
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{book.title}</Text>
        <Text style={styles.bookAuthor}>{book.author}</Text>
        <Text style={[styles.bookStatus, { color: getStatusColor(book.status) }]}>
          {getStatusText(book.status)}
        </Text>
      </View>
    </View>
  );
};

// Filter Tabs Component
const FilterTabs = ({ activeFilter, setActiveFilter }: { activeFilter: string, setActiveFilter: (filter: string) => void }) => {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'available', label: 'Available' },
    { id: 'borrowed', label: 'Borrowed' },
    { id: 'on_hold', label: 'On Hold' },
  ];

  return (
    <View style={styles.filtersContainer}>
      {filters.map(filter => (
        <TouchableOpacity
          key={filter.id}
          style={[styles.filterTab, activeFilter === filter.id && styles.activeFilterTab]}
          onPress={() => setActiveFilter(filter.id)}
        >
          <Text style={[styles.filterText, activeFilter === filter.id && styles.activeFilterText]}>
            {filter.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default function LibraryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredBooks = DUMMY_BOOKS.filter(book => {
    // Apply search filter
    const matchesSearch = searchQuery === '' || 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply status filter
    const matchesFilter = activeFilter === 'all' || book.status === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.oliveGreen} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search books by title or author"
          value={searchQuery}
          onChangeText={setSearchQuery}
          spellCheck={false}
          autoCorrect={false}
          placeholderTextColor={COLORS.oliveGreen}
          color={COLORS.darkGreen}
        />
      </View>
      
      <FilterTabs activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      
      <FlatList
        data={filteredBooks}
        renderItem={({ item }) => <BookItem book={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No books found</Text>
          </View>
        }
      />
      
      <TouchableOpacity style={styles.addButton} onPress={() => console.log('Add new book')}>
        <Ionicons name="add" size={24} color={COLORS.cream} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 0.5,
    borderColor: COLORS.tan,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  filterTab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 10,
  },
  activeFilterTab: {
    backgroundColor: COLORS.oliveGreen,
  },
  filterText: {
    color: COLORS.darkGreen,
    fontWeight: '500',
  },
  activeFilterText: {
    color: 'white',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100, // Extra padding at the bottom for the floating tab bar
  },
  bookItem: {
    flexDirection: 'row',
    backgroundColor: '#ECDCB6',
    borderRadius: 8,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  bookCover: {
    width: 70,
    height: 100,
    borderRadius: 4,
    backgroundColor: COLORS.tan,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bookCoverText: {
    fontSize: 32,
  },
  bookInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.darkGreen,
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: COLORS.oliveGreen,
    marginBottom: 8,
  },
  bookStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: COLORS.oliveGreen,
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 100, // Position above the floating tab bar
    right: 24,
    backgroundColor: COLORS.rust,
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
    zIndex: 10,
  },
});
