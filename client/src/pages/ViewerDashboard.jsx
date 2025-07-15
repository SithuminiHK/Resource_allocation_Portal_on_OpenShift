import { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import { getPlatforms, setupAxiosInterceptors } from '../utils/api';
import { useKeycloak } from '@react-keycloak/web';

export default function ViewerDashboard() {
  const { keycloak, initialized } = useKeycloak();
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    if (initialized && keycloak?.token) {
      setupAxiosInterceptors(keycloak);
    }
  }, [initialized, keycloak]);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const data = await getPlatforms();
        setPlatforms(data);
      } catch (error) {
        console.error('Error fetching platforms:', error);
        alert('Failed to load platforms');
      }
    };
    fetchPlatforms();
  }, []);

  if (!initialized) return <LoadingSpinner />;

  return (
    <DashboardLayout roleName="Viewer" welcomeMessage="Welcome Viewer">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Resource Utilization</h2>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cloud Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pool Tag</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Memory Usage</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">vCPU Usage</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Storage Usage</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {platforms.map((platform) => {
              const memoryPercent = ((platform.memoryUsed / platform.memoryTotal) * 100).toFixed(2);
              const vcpuPercent = ((platform.vcpuUsed / platform.vcpuTotal) * 100).toFixed(2);
              const storagePercent = ((platform.storageUsed / platform.storageTotal) * 100).toFixed(2);

              return (
                <tr key={platform.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{platform.name}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{platform.cloudType}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{platform.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{platform.poolTag}</td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${
                          memoryPercent > 80 ? 'bg-red-600' :
                          memoryPercent > 60 ? 'bg-amber-500' : 'bg-green-600'
                        }`}
                        style={{ width: `${memoryPercent}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {platform.memoryUsed}GB / {platform.memoryTotal}GB ({memoryPercent}%)
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${
                          vcpuPercent > 80 ? 'bg-red-600' :
                          vcpuPercent > 60 ? 'bg-amber-500' : 'bg-green-600'
                        }`}
                        style={{ width: `${vcpuPercent}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {platform.vcpuUsed} / {platform.vcpuTotal} ({vcpuPercent}%)
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${
                          storagePercent > 80 ? 'bg-red-600' :
                          storagePercent > 60 ? 'bg-amber-500' : 'bg-green-600'
                        }`}
                        style={{ width: `${storagePercent}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {platform.storageType}:{platform.storageUsed}GB / {platform.storageTotal}GB ({storagePercent}%)
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
