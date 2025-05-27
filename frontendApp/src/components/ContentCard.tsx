import React from 'react'
import { Text, StyleSheet, View, Touchable, TouchableOpacity } from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons";
// import { embedContentByLink } from '../utils/embedlinks';
import WebView from 'react-native-webview';
import { EmbedContentByLink } from '../utils/EmbedContentByLink';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useToast } from 'react-native-toast-notifications';
import { useRefresh } from '../context/RefreshContext';
import Clipboard from '@react-native-clipboard/clipboard';

    

type contentCardProps = {
    id: number,
    title: string,
    link: string,
    contentType: string,
    tags: string[],
    date: string,
}

export default function ContentCard(props: contentCardProps) {
  const {token} = useAuth();
  const toast = useToast();
  const {triggerRefresh} = useRefresh() 

  const deleteContent = async () => {
    const response = await axios.delete(`http://192.168.18.240:8000/api/v1/content/delete/${props.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    )
    if(response.status === 200) {
      console.log('Content deleted successfully')
      toast.show('Content deleted successfully!', {
        type: 'success',
      })
      triggerRefresh()
    } else {
      console.log('Failed to delete content')
      toast.show('Failed to delete content. Please try again.', {
        type: 'danger',
      })
    }
  }
   

    const contentIcon = (typeofContent: string) => {
      switch (typeofContent) {
          case 'Article':
              return <Ionicons name="newspaper-outline" size={24} color="black" />;
          case 'Image':
              return <Ionicons name="image-outline" size={24} color="black" />;
          case 'Video':
              return <Ionicons name="videocam-outline" size={24} color="black" />;
          case 'Audio':
              return <Ionicons name="musical-notes-outline" size={24} color="black" />;
          case 'Tweet':
              return <Ionicons name="logo-twitter" size={24} color="black" />;
          case 'Memory':
              return <Ionicons name="time-outline" size={24} color="black" />;
          case 'Link':
              return <Ionicons name="link-outline" size={24} color="black" />;
          default:
              return null;
      }
    }



    


    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {contentIcon(props.contentType)}
          <Text style={styles.title}>{props.title}</Text>
          <View style={styles.leftheader}>
            <TouchableOpacity onPress={() =>{
              Clipboard.setString(props.link);
              toast.show('Link copied to clipboard!', {
                type: 'success',
              })
            }}>
              <Ionicons name="share-social-sharp" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteContent}>
              <Ionicons name="trash-bin" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        
        
        <View style={styles.embeddedContent}>
          <View style={styles.webViewContainer}>
            {EmbedContentByLink(props.link)}
          </View>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.date}>{props.date}</Text>
          <View style={styles.tags}>
            {props.tags.map((tag, index) => (
              <Text key={index} style={styles.tag}>{tag}</Text>
            ))}
          </View>
        </View>
      </View>
    )
    
  
}

const styles = StyleSheet.create({
  container: {
    margin: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 8,
    color: '#333',
  },
  leftheader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  embeddedContent: {
    marginVertical: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  tag: {
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    fontSize: 12,
    color: '#444',
    marginRight: 4,
    marginBottom: 4,
  },
  
  webViewContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden', 
    backgroundColor: '#f0f0f0', 
  },
  
});

