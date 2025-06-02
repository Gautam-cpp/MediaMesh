import React, { Component, use, useEffect, useState } from 'react'
import { Text, StyleSheet, View, ScrollView } from 'react-native'
import TopBar from '../components/TopBar'
import ContentCard from '../components/ContentCard'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { useToast } from 'react-native-toast-notifications'
import LoadingIcon from '../components/LoadingIcon'
import { useRefresh } from '../context/RefreshContext'
import { BACKEND_URL } from '@env';

export default function Tweets() {
  const [content, setContent] = useState([])
  const { token } = useAuth()
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const {refresh} = useRefresh()

  const fetchContent = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/content/get/Tweet`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.status === 200) {
        setContent(response.data)
        setLoading(false)
      }
    } catch (error) {
      console.error("Error fetching content:", error)
      setLoading(false)
      toast.show('Failed to fetch content. Please try again.', {
        type: 'danger',
      })
    }
  }

  useEffect(() => {
    fetchContent()
  }, [refresh])

  return (
    <View style={styles.container}>
      <TopBar />
      <Text style={styles.header}>Tweets</Text>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        {loading ? (
          <LoadingIcon centered={true} />
        ) : content.length > 0 ? (
          content.map((item: any, index) => (
            <ContentCard
              key={index}
              id={item.id}
              title={item.title}
              contentType={item.content_type}
              link={item.link}
              tags={item.tags}
              date={item.created_at}
            />
          ))
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>No content available</Text>
        )}
      </ScrollView>


    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,

  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',

    marginLeft: 20,
  },

})
