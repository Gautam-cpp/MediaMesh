
import Router from './routes/router'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from 'react-native-toast-notifications'
import { RefreshProvider } from './context/RefreshContext'

export default function App () {

    return (
      <AuthProvider>
        <RefreshProvider>
        <ToastProvider  placement="bottom" duration={3000} animationType="zoom-in">
          <Router />
        </ToastProvider>
        </RefreshProvider>
      </AuthProvider>
    )
  
}
