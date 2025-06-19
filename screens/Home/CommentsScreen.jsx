import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform,} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../../redux/slices/postSlice';

export default function CommentsScreen({ route }) {
  const { postId } = route.params;
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    state.posts.items.find((p) => p.id === postId)
  );
  const appTheme = useSelector((state) => state.theme.theme);
  const isDark = appTheme === 'dark';

  const [text, setText] = useState('');

  const handleSubmit = async () => {
    if (!text.trim()) return;
    try {
      await dispatch(addComment({ postId, text }));
      setText('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const renderComment = ({ item }) => (
    <View style={styles.commentItem}>
      <Text style={[styles.commentUsername, isDark && styles.darkText]}>
        {item.user?.username || 'User'}:
      </Text>
      <Text style={[styles.commentText, isDark && styles.darkText]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={[styles.container, isDark && styles.darkContainer]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <FlatList
        data={post.comments || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderComment}
        contentContainerStyle={styles.commentsList}
      />

      <View style={[styles.inputContainer, isDark && styles.darkInputContainer]}>
        <TextInput
          style={[styles.input, isDark && styles.darkInput]}
          placeholder="Add a comment..."
          placeholderTextColor={isDark ? '#aaa' : '#555'}
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.sendButton}>
          <Text style={styles.sendText}>Post</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, marginTop: 50, },
  darkContainer: { backgroundColor: '#121212' },
  commentsList: { paddingBottom: 80 },
  commentItem: { marginBottom: 12 },
  commentUsername: { fontWeight: 'bold', marginBottom: 4 },
  commentText: {},
  darkText: { color: '#fff' },

  inputContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#f2f2f2',
    width: '100%',
  },
  darkInputContainer: { backgroundColor: '#1e1e1e' },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    borderRadius: 20,
    height: 40,
  },
  darkInput: {
    backgroundColor: '#2e2e2e',
    color: '#fff',
  },
  sendButton: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  sendText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});
