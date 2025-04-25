import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

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
      case 'available': return '#4CAF50';
      case 'borrowed': return '#FF9800';
      case 'on_hold': return '#F44336';
      default: return '#4CAF50';
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
        <Ionicons name="search" size={20} color="#7f8c8d" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search books by title or author"
          value={searchQuery}
          onChangeText={setSearchQuery}
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
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: 16,
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
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  filterTab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#ecf0f1',
  },
  activeFilterTab: {
    backgroundColor: '#4CAF50',
  },
  filterText: {
    color: '#7f8c8d',
    fontWeight: '500',
  },
  activeFilterText: {
    color: 'white',
  },
  listContainer: {
    padding: 16,
  },
  bookItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
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
    backgroundColor: '#e0f2f1',
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
    color: '#2c3e50',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#7f8c8d',
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
    color: '#7f8c8d',
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
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