import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = '@users';
const NOTES_PREFIX = '@notes_';

export const storageService = {
  // User management
  async getUsers() {
    try {
      const usersJson = await AsyncStorage.getItem(USERS_KEY);
      return usersJson ? JSON.parse(usersJson) : [];
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  },

  async addUser(user) {
    try {
      const users = await this.getUsers();
      users.push(user);
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  },

  // Notes management
  async getNotes(userId) {
    try {
      const notesJson = await AsyncStorage.getItem(`${NOTES_PREFIX}${userId}`);
      return notesJson ? JSON.parse(notesJson) : [];
    } catch (error) {
      console.error('Error getting notes:', error);
      return [];
    }
  },

  async saveNotes(userId, notes) {
    try {
      await AsyncStorage.setItem(`${NOTES_PREFIX}${userId}`, JSON.stringify(notes));
    } catch (error) {
      console.error('Error saving notes:', error);
      throw error;
    }
  },

  async addNote(userId, note) {
    try {
      const notes = await this.getNotes(userId);
      const newNote = {
        id: Date.now().toString(),
        ...note,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      notes.push(newNote);
      await this.saveNotes(userId, notes);
      return newNote;
    } catch (error) {
      console.error('Error adding note:', error);
      throw error;
    }
  },

  async updateNote(userId, noteId, updates) {
    try {
      const notes = await this.getNotes(userId);
      const index = notes.findIndex(n => n.id === noteId);
      if (index !== -1) {
        notes[index] = {
          ...notes[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        await this.saveNotes(userId, notes);
        return notes[index];
      }
      return null;
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  },

  async deleteNote(userId, noteId) {
    try {
      const notes = await this.getNotes(userId);
      const filteredNotes = notes.filter(n => n.id !== noteId);
      await this.saveNotes(userId, filteredNotes);
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  },
};

