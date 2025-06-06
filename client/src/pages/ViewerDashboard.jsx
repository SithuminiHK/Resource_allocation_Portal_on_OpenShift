import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

export default function ViewerDashboard() {
  const [platforms] = useState([
    // Sample data - in real app this would come from API
    {
      id: 1,
      name: 'Production Cluster',
      cloudType: 'VMware',
      location: 'HQ',
      poolTag: 'Production',
      memoryTotal: 256,
      memoryUsed: 128,
      memoryPercent: '50.00',
      vcpuTotal: 32,
      vcpuUsed: 16,
      vcpuPercent: '50.00',
      storageType: 'SSD',
      storageTotal: 2000,
      storageUsed: 800,
      storagePercent: '40.00'
    }
  ]);

  return (
    <DashboardLayout 
      roleName="Viewer" 
      welcomeMessage="Welcome Viewer"
    >
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
            {platforms.map((platform) => (
              <tr key={platform.id}>
                <td className="px-6 py-4 whitespace-nowrap">{platform.name}</td>
                <td className="px-4 py-4 whitespace-nowrap">{platform.cloudType}</td>
                <td className="px-4 py-4 whitespace-nowrap">{platform.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">{platform.poolTag}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        parseFloat(platform.memoryPercent) > 80 ? 'bg-red-600' : 
                        parseFloat(platform.memoryPercent) > 60 ? 'bg-amber-500' : 'bg-green-600'
                      }`}
                      style={{ width: `${platform.memoryPercent}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {platform.memoryUsed}GB / {platform.memoryTotal}GB ({platform.memoryPercent}%)
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        parseFloat(platform.vcpuPercent) > 80 ? 'bg-red-600' : 
                        parseFloat(platform.vcpuPercent) > 60 ? 'bg-amber-500' : 'bg-green-600'
                      }`}
                      style={{ width: `${platform.vcpuPercent}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {platform.vcpuUsed} / {platform.vcpuTotal} ({platform.vcpuPercent}%)
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        parseFloat(platform.storagePercent) > 80 ? 'bg-red-600' : 
                        parseFloat(platform.storagePercent) > 60 ? 'bg-amber-500' : 'bg-green-600'
                      }`}
                      style={{ width: `${platform.storagePercent}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {platform.storageType}:{platform.storageUsed}GB / {platform.storageTotal}GB ({platform.storagePercent}%)
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}