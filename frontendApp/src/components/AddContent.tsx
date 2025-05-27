import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
  
} from 'react-native';

import InputBar from './InputBar';
import CustomButton, { buttonWidth } from './CustomButton';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useToast } from 'react-native-toast-notifications';
import { useRefresh } from '../context/RefreshContext';
import { BACKEND_URL } from '@env';

const { height } = Dimensions.get('window');

export default function AddContent({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const slideAnim = useRef(new Animated.Value(height)).current;

  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedContentType, setSelectedContentType] = useState('Article');
  const {token} = useAuth();
  const toast = useToast();
  const {triggerRefresh} = useRefresh()

  const contentTypes = ['Article', 'Image', 'Video', 'Audio', 'Tweet', 'Memory'];

  const handleContentTypeSelect = (item: string) => {
    setSelectedContentType(item);
    setDropdownVisible(false);
  };

  const SubmitContent = async () => {
    if (!title  || title.length > 20 || !link || !selectedContentType) {
      toast.show('Please fill in all fields.', {
        type: 'warning',
      });
      return;
    }
    if (!link.startsWith('http://') && !link.startsWith('https://')) {
      toast.show('Link must start with http:// or https://', {
        type: 'warning',
      });
      return;
    }
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/content/add`,
        {
          title,
          link,
          tags,
          content_type: selectedContentType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(response.status === 201) {
        toast.show('Content added successfully!', {
          type: 'success',
        });
        setDropdownVisible(false);
        
        triggerRefresh()
        Keyboard.dismiss();
        onClose(); 
        setTitle('');
        setLink('');
        setTags([]);
      }
    } catch (error) {
      toast.show('Failed to add content. Please try again.', {
        type: 'danger',
      });
      // console.error('Error adding content:', error);
    }

     
  };

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleTagInput = (text: string) => {
    const parsed = text
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
    setTags(parsed);
  };

  return (
    <Animated.View
      style={[
        styles.sidebar,
        {
          transform: [{ translateY: slideAnim }],
        },
      ]}
      pointerEvents={visible ? 'auto' : 'none'}
    >
      <View style={styles.header}>
        <Text style={styles.sidebarText}>Add New Content</Text>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => {
            Keyboard.dismiss();
            onClose();
          }}
        >
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <InputBar placeholder="Title" value={title} setValue={setTitle} />
        <InputBar placeholder="Link (URL)" value={link} setValue={setLink} />

        <Text style={styles.dropdownLabel}>Content type</Text>
        <TouchableOpacity
          style={styles.dropdownSelector}
          onPress={() => setDropdownVisible(true)}
        >
          <Text style={{ fontSize: 16 }}>{selectedContentType}</Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>

        
        <InputBar
          placeholder="Tags (comma separated)"
          value={tags.join(', ')}
          setValue={handleTagInput}
        />
      </View>

      <CustomButton text="Add Content" width={buttonWidth.MEDIUM} onPress={SubmitContent} />

      
      <Modal
        transparent={true}
        visible={dropdownVisible}
        animationType="none"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={[styles.dropdownList, styles.dropdownPosition]}>
                <FlatList
                  data={contentTypes}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.dropdownItem,
                        selectedContentType === item && styles.selectedItem,
                      ]}
                      onPress={() => handleContentTypeSelect(item)}
                    >
                      <Text
                        style={
                          selectedContentType === item
                            ? styles.selectedItemText
                            : undefined
                        }
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: height / 2,
    backgroundColor: 'rgb(236, 232, 240)',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    padding: 20,
    bottom: 0,
    zIndex: 1000,
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sidebarText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeBtn: {
    padding: 5,
  },
  closeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginTop: 20,
  },
    dropdownLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
        marginHorizontal: 17,
    },
  dropdownSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginVertical: 5,
    marginHorizontal: 15,
    backgroundColor: '#f8f8f8',
    
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#555',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  dropdownList: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    maxHeight: 200,
  },
  dropdownPosition: {
    position: 'absolute',
    top: '53%',
   
    width: '90%',
    maxWidth: 280,
    maxHeight: 180,
    marginHorizontal: 23,
    alignSelf: 'center',
    
  },
  dropdownItem: {
    padding: 12,
    
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedItem: {
    backgroundColor: '#6C3DFF',
  },
  selectedItemText: {
    color: 'white',
  },
});
