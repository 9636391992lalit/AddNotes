import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  RefreshControl,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { storageService } from '../services/storageService';

const SORT_OPTIONS = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  TITLE_ASC: 'title_asc',  // A-Z
  TITLE_DESC: 'title_desc', // Z-A
};

export default function NotesListScreen() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState(SORT_OPTIONS.NEWEST); // Default: newest
  const [refreshing, setRefreshing] = useState(false);
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    loadNotes();
    const unsubscribe = navigation.addListener('focus', () => {
      loadNotes();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    filterAndSortNotes();
  }, [notes, searchQuery, sortOption]);

  const loadNotes = async () => {
    try {
      const userNotes = await storageService.getNotes(user.id);
      setNotes(userNotes);
    } catch (error) {
      console.error('Error loading notes:', error);
      Alert.alert('Error', 'Failed to load notes');
    }
  };

  const filterAndSortNotes = () => {
    let filtered = [...notes];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.body.toLowerCase().includes(query)
      );
    }

    // Apply single sort option
    filtered.sort((a, b) => {
      switch (sortOption) {
        case SORT_OPTIONS.NEWEST:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        
        case SORT_OPTIONS.OLDEST:
          return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        
        case SORT_OPTIONS.TITLE_ASC:
          const titleA = ((a.title || '').trim() || 'Untitled').toLowerCase();
          const titleB = ((b.title || '').trim() || 'Untitled').toLowerCase();
          return titleA.localeCompare(titleB);
        
        case SORT_OPTIONS.TITLE_DESC:
          const titleAZ = ((a.title || '').trim() || 'Untitled').toLowerCase();
          const titleBZ = ((b.title || '').trim() || 'Untitled').toLowerCase();
          return titleBZ.localeCompare(titleAZ);
        
        default:
          return 0;
      }
    });

    setFilteredNotes(filtered);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadNotes();
    setRefreshing(false);
  }, []);

  const handleDelete = (noteId) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await storageService.deleteNote(user.id, noteId);
              loadNotes();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete note');
            }
          },
        },
      ]
    );
  };

  const renderNoteItem = ({ item }) => {
    const preview = item.body.length > 100
      ? item.body.substring(0, 100) + '...'
      : item.body;

    return (
      <TouchableOpacity
        style={styles.noteItem}
        onPress={() => navigation.navigate('NoteEdit', { noteId: item.id })}
      >
        {item.imageUri && (
          <Image source={{ uri: item.imageUri }} style={styles.thumbnail} />
        )}
        <View style={styles.noteContent}>
          <Text style={styles.noteTitle}>{item.title || 'Untitled'}</Text>
          <Text style={styles.notePreview} numberOfLines={2}>
            {preview || 'No content'}
          </Text>
          <Text style={styles.noteDate}>
            {new Date(item.updatedAt).toLocaleDateString()}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Notes</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search notes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort:</Text>
        <View style={styles.sortButtons}>
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortOption === SORT_OPTIONS.NEWEST && styles.sortButtonActive,
            ]}
            onPress={() => setSortOption(SORT_OPTIONS.NEWEST)}
          >
            <Text
              style={[
                styles.sortButtonText,
                sortOption === SORT_OPTIONS.NEWEST && styles.sortButtonTextActive,
              ]}
            >
              Newest
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortOption === SORT_OPTIONS.OLDEST && styles.sortButtonActive,
            ]}
            onPress={() => setSortOption(SORT_OPTIONS.OLDEST)}
          >
            <Text
              style={[
                styles.sortButtonText,
                sortOption === SORT_OPTIONS.OLDEST && styles.sortButtonTextActive,
              ]}
            >
              Oldest
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortOption === SORT_OPTIONS.TITLE_ASC && styles.sortButtonActive,
            ]}
            onPress={() => setSortOption(SORT_OPTIONS.TITLE_ASC)}
          >
            <Text
              style={[
                styles.sortButtonText,
                sortOption === SORT_OPTIONS.TITLE_ASC && styles.sortButtonTextActive,
              ]}
            >
              A-Z
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortOption === SORT_OPTIONS.TITLE_DESC && styles.sortButtonActive,
            ]}
            onPress={() => setSortOption(SORT_OPTIONS.TITLE_DESC)}
          >
            <Text
              style={[
                styles.sortButtonText,
                sortOption === SORT_OPTIONS.TITLE_DESC && styles.sortButtonTextActive,
              ]}
            >
              Z-A
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredNotes}
        renderItem={renderNoteItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No notes found</Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('NoteEdit', { noteId: null })}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    color: '#007AFF',
    fontSize: 16,
  },
  searchContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  sortLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 10,
    fontWeight: '600',
  },
  sortButtons: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    gap: 8,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#f5f5f5',
  },
  sortButtonActive: {
    backgroundColor: '#007AFF',
  },
  sortButtonText: {
    fontSize: 12,
    color: '#666',
  },
  sortButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  listContent: {
    padding: 15,
  },
  noteItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  noteContent: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  notePreview: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  noteDate: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    justifyContent: 'center',
    paddingLeft: 10,
  },
  deleteButtonText: {
    color: '#FF3B30',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  fabText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
});

