import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../context/AuthContext';
import CustomButton, { buttonWidth } from '../components/CustomButton';

export default function Profile() {
  const { logout, user } = useAuth();
  // const [backgroundColor, setBackgroundColor] = React.useState('#6C3DFF');
  const [loading, setLoading] = React.useState(false);
  const usernameLength = user?.username?.length || 0;
  const profileColor = () => {
    switch (usernameLength % 6) {
      case 0:
        return '6C3DFF';
      case 1:
        return 'FF6C3D';
      case 2:
        return '3DFF6C';
      case 3:
        return '3D6CFF';
      case 4:
        return 'FF3D6C';
      case 5:
        return '6CFF3D';  
      default:
        return '6C3DFF'; 
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{
            uri: `https://ui-avatars.com/api/?name=${user?.username}&background=${profileColor()}&color=fff`,
          }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{user?.username}</Text>
        <Text style={styles.email}>{user?.email}</Text>

        <CustomButton text="Logout" width={buttonWidth.SMALL} onPress={logout} loading={loading}/>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  username: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: '#6C3DFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
