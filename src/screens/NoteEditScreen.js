import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../context/AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { storageService } from '../services/storageService';

export default function NoteEditScreen() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const { user } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();
  const { noteId } = route.params || {};

  const loadNote = async () => {
    try {
      const notes = await storageService.getNotes(user.id);
      const note = notes.find((n) => n.id === noteId);
      if (note) {
        setTitle(note.title || '');
        setBody(note.body || '');
        setImageUri(note.imageUri || null);
      }
    } catch (error) {
      console.error('Error loading note:', error);
      Alert.alert('Error', 'Failed to load note');
    }
  };

  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
      Alert.alert(
        'Permissions Required',
        'Camera and media library permissions are required to add images.'
      );
      return false;
    }
    return true;
  };

  const handlePickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1.0,
      });

      if (!result.canceled && result.assets[0]) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleTakePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        quality: 1.0,
      });

      if (!result.canceled && result.assets[0]) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const handleSave = useCallback(async () => {
    try {
      if (noteId) {
        await storageService.updateNote(user.id, noteId, {
          title: title.trim(),
          body: body.trim(),
          imageUri,
        });
      } else {
        await storageService.addNote(user.id, {
          title: title.trim(),
          body: body.trim(),
          imageUri,
        });
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error saving note:', error);
      Alert.alert('Error', 'Failed to save note');
    }
  }, [noteId, user.id, title, body, imageUri, navigation]);

  useEffect(() => {
    if (noteId) {
      loadNote();
    }
  }, [noteId]);

  useEffect(() => {
    navigation.setOptions({
      title: noteId ? 'Edit Note' : 'New Note',
      headerRight: () => (
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, noteId, handleSave]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <TextInput
          style={styles.titleInput}
          placeholder="Note Title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#999"
        />

        {imageUri ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.image} />
            <TouchableOpacity 
              style={styles.removeImageButton} 
              onPress={() => setImageUri(null)}
            >
              <Text style={styles.removeImageText}>Remove Image</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>Add Image</Text>
            <View style={styles.imageButtonContainer}>
              <TouchableOpacity 
                style={styles.selectButton} 
                onPress={handlePickImage}
              >
                <Text style={styles.selectButtonText}>Select from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.selectButton} 
                onPress={handleTakePhoto}
              >
                <Text style={styles.selectButtonText}>Take Photo</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <TextInput
          style={styles.bodyInput}
          placeholder="Write your note here..."
          value={body}
          onChangeText={setBody}
          multiline
          textAlignVertical="top"
          placeholderTextColor="#999"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  imageContainer: {
    width: '100%',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    resizeMode: 'contain',
    backgroundColor: '#f5f5f5',
  },
  removeImageButton: {
    marginTop: 10,
    padding: 12,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    alignItems: 'center',
  },
  removeImageText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  imagePlaceholder: {
    width: '100%',
    minHeight: 200,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    padding: 20,
    marginBottom: 20,
  },
  imagePlaceholderText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 15,
    fontWeight: '600',
  },
  imageButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
  selectButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bodyInput: {
    fontSize: 16,
    color: '#333',
    minHeight: 200,
    lineHeight: 24,
  },
  saveButton: {
    marginRight: 15,
  },
  saveButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

