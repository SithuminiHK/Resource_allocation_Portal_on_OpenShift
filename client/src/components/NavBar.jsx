import { useKeycloak } from '@react-keycloak/web';

export default function Navbar() {
  const { keycloak } = useKeycloak();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-semibold">My App</span>
          </div>
          <div className="flex items-center space-x-4">
            {keycloak.authenticated && (
              <>
                <span>Hello, {keycloak.tokenParsed?.preferred_username}</span>
                <button
                  onClick={() => keycloak.logout()}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}