import React, { useState } from 'react';
import { StyleSheet,View,Text,TouchableOpacity,FlatList,TextInput, ScrollView,Linking,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const HelpCenterScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const appTheme = useSelector((state) => state.theme.theme);
  const isDark = appTheme === 'dark';

  const faqs = [
    {
      id: '1',
      question: 'How do I reset my password?',
      answer: 'To reset your password, go to the login screen and tap "Forgot Password". Follow the instructions sent to your email to create a new password.'
    },
    {
      id: '2',
      question: 'Can I edit my profile?',
      answer: 'Yes! On the main screen and the settings section(Account Settings) you will find an Edit Profile button. There you can update your name, email, profile picture, and other personal information.'
    },
    {
      id: '3',
      question: 'Can I change my username?',
      answer: 'Yes, you can change your username once every 30 days. Go to Account Settings > Edit Profile > Username to make this change.'
    },
    {
      id: '4',
      question: 'How do I delete my account?',
      answer: 'To delete your account, go to Account Settings, go to the Account Information tab and scroll down to the bottom. Tap "Delete Account" and follow the confirmation process. Please note that this action is permanent and cannot be undone.'
    },
  ];

  const supportCategories = [
    { id: '1', title: 'Account Issues', icon: '👤' },
    { id: '2', title: 'Billing & Payments', icon: '💰' },
    { id: '3', title: 'Technical Support', icon: '🔧' },
    { id: '4', title: 'Feature Requests', icon: '✨' },
  ];

  const filteredFaqs = searchQuery 
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleContactSupport = () => {
    // Open email or support chat
    Linking.openURL('mailto:support@example.com');
  };

  const handleCategoryPress = (category) => {
    // Navigate to specific support category or show relevant FAQs
    console.log(`Selected category: ${category.title}`);
  };

  const renderFaqItem = ({ item }) => {
    const isExpanded = expandedFaq === item.id;
    
    return (
      <TouchableOpacity 
        style={styles.faqItem} 
        onPress={() => toggleFaq(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.faqHeader}>
          <Text style={styles.faqQuestion}>{item.question}</Text>
          <Text style={styles.faqExpandIcon}>{isExpanded ? '−' : '+'}</Text>
        </View>
        
        {isExpanded && (
          <Text style={styles.faqAnswer}>{item.answer}</Text>
        )}
      </TouchableOpacity>
    );
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.categoryItem}
      onPress={() => handleCategoryPress(item)}
    >
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text style={styles.categoryTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, isDark && styles.darkContainer]}>
      <View style={[styles.header, isDark && styles.darkHeader]}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color={isDark ? "#FFFFFF" : "black"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDark && styles.darkText]}>Help Center</Text>
        <View style={styles.headerRightPlaceholder} /> 
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for help..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
        </View>

        <View style={styles.supportCategories}>
          <Text style={styles.sectionTitle}>Support Categories</Text>
          <FlatList
            data={supportCategories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map(item => <View key={item.id}>{renderFaqItem({ item })}</View>)
          ) : (
            <Text style={styles.noResultsText}>
              No matching questions found. Try a different search term or contact our support team.
            </Text>
          )}
        </View>

        <View style={styles.contactSection}>
          <Text style={styles.contactText}>
            Couldn't find what you were looking for?
          </Text>
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={handleContactSupport}
          >
            <Text style={styles.contactButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    marginTop: 0,
  },
  darkContainer: {
    backgroundColor: '#000000',
  },
  darkText: {
    color: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4e8',
  },
  darkHeader: {
    backgroundColor: '#121212',
    borderBottomColor: '#333333',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRightPlaceholder: {
    width: 24,
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 44,
    backgroundColor: '#f0f2f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  supportCategories: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  categoryItem: {
    flex: 1,
    margin: 6,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  faqSection: {
    marginTop: 24,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  faqItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  faqExpandIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  faqAnswer: {
    marginTop: 12,
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  noResultsText: {
    textAlign: 'center',
    padding: 20,
    color: '#666',
    fontSize: 16,
  },
  contactSection: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  contactText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 12,
  },
  contactButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default HelpCenterScreen;