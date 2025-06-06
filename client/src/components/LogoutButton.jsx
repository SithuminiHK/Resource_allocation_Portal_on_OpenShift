import { useKeycloak } from '@react-keycloak/web';

function LogoutButton() {
  const { keycloak } = useKeycloak();

  const handleLogout = () => {
    keycloak.logout({
      redirectUri: window.location.origin 
    });
  };

  return (
    <button 
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
}

export default LogoutButton;