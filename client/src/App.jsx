import { useKeycloak } from '@react-keycloak/web'
import SuperAdminDashboard from './pages/SuperAdminDashboard'
import OperatorDashboard from './pages/OperatorDashboard'
import ViewerDashboard from './pages/ViewerDashboard'
import LoadingSpinner from './components/LoadingSpinner'
import './App.css';

function App() {
  const { keycloak, initialized } = useKeycloak()

  if (!initialized) {
    return <LoadingSpinner />
  }

  if (!keycloak.authenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <button 
          onClick={() => keycloak.login()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Login with Keycloak
        </button>
      </div>
    )
  }

  // Get roles from token
  const roles = keycloak.tokenParsed?.realm_access?.roles || []

  // Route based on roles
  if (roles.includes('super-admin')) return <SuperAdminDashboard />
  if (roles.includes('operators')) return <OperatorDashboard />
  if (roles.includes('view-only')) return <ViewerDashboard />

  // Fallback for unauthorized users
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">You don't have permission to access this portal!</h1>
        <button 
          onClick={() => keycloak.logout()}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default App