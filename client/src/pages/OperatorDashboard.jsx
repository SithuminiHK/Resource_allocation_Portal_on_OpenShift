import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

export default function OperatorDashboard() {
  const [editingPlatform, setEditingPlatform] = useState(null);
  const [platforms, setPlatforms] = useState([
    // Sample data - in real app this would come from API
    {
      id: 1,
      name: 'Production Cluster',
      cloudType: 'VMware',
      location: 'HQ',
      poolTag: 'Production',
      memoryTotal: 256,
      memoryUsed: 128,
      vcpuTotal: 32,
      vcpuUsed: 16,
      storageType: 'SSD',
      storageTotal: 2000,
      storageUsed: 800
    }
  ]);

  const handleUpdatePlatform = (updatedPlatform) => {
    setPlatforms(platforms.map(p => 
      p.id === updatedPlatform.id ? updatedPlatform : p
    ));
    setEditingPlatform(null);
    // Here you would call your API endpoint
  };

  return (
    <DashboardLayout 
      roleName="Operator" 
      welcomeMessage="Welcome Operator"
    >
      <h2 className="text-lg font-medium text-gray-900 mb-6">Resource Management</h2>
          {editingPlatform && (
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium mb-4">Edit Platform</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleUpdatePlatform({
                  ...editingPlatform,
                  memoryPercent: ((editingPlatform.memoryUsed / editingPlatform.memoryTotal) * 100).toFixed(2),
                  vcpuPercent: ((editingPlatform.vcpuUsed / editingPlatform.vcpuTotal) * 100).toFixed(2),
                  storagePercent: ((editingPlatform.storageUsed / editingPlatform.storageTotal) * 100).toFixed(2)
                });
              }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Platform Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Platform Name *</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={editingPlatform.name}
                  onChange={(e) => setEditingPlatform({...editingPlatform, name: e.target.value})}
                  required
                />
              </div>

              {/* Cloud Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Cloud Type *</label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={editingPlatform.cloudType}
                  onChange={(e) => setEditingPlatform({...editingPlatform, cloudType: e.target.value})}
                >
                  <option value="VMware">VMware</option>
                  <option value="Oracle">Oracle</option>
                  <option value="Azure">Azure</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Location *</label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={editingPlatform.location}
                  onChange={(e) => setEditingPlatform({...editingPlatform, location: e.target.value})}
                >
                  <option value="HQ">HQ</option>
                  <option value="Welikada">Welikada</option>
                  <option value="Pitipana">Pitipana</option>
                </select>
              </div>

              {/* Memory - Total */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Memory Total (GB) *</label>
                <input
                  type="number"
                  min="1"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={editingPlatform.memoryTotal}
                  onChange={(e) => setEditingPlatform({...editingPlatform, memoryTotal: e.target.value})}
                  required
                />
              </div>

              {/* Memory - Used */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Memory Used (GB) *</label>
                <input
                  type="number"
                  min="0"
                  max={editingPlatform.memoryTotal || ''}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={editingPlatform.memoryUsed}
                  onChange={(e) => setEditingPlatform({...editingPlatform, memoryUsed: e.target.value})}
                  required
                />
              </div>

              {/* vCPU - Total */}
              <div>
                <label className="block text-sm font-medium text-gray-700">vCPU Total *</label>
                <input
                  type="number"
                  min="1"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={editingPlatform.vcpuTotal}
                  onChange={(e) => setEditingPlatform({...editingPlatform, vcpuTotal: e.target.value})}
                  required
                />
              </div>

              {/* vCPU - Used */}
              <div>
                <label className="block text-sm font-medium text-gray-700">vCPU Used *</label>
                <input
                  type="number"
                  min="0"
                  max={editingPlatform.vcpuTotal || ''}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={editingPlatform.vcpuUsed}
                  onChange={(e) => setEditingPlatform({...editingPlatform, vcpuUsed: e.target.value})}
                  required
                />
              </div>

              {/* Storage Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Storage Type *</label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={editingPlatform.storageType}
                  onChange={(e) => setEditingPlatform({...editingPlatform, storageType: e.target.value})}
                >
                  <option value="HDD">HDD</option>
                  <option value="SSD">SSD</option>
                </select>
              </div>

              {/* Storage - Total */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Storage Total (GB) *</label>
                <input
                  type="number"
                  min="1"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={editingPlatform.storageTotal}
                  onChange={(e) => setEditingPlatform({...editingPlatform, storageTotal: e.target.value})}
                  required
                />
              </div>

              {/* Storage - Used */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Storage Used (GB) *</label>
                <input
                  type="number"
                  min="0"
                  max={editingPlatform.storageTotal || ''}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={editingPlatform.storageUsed}
                  onChange={(e) => setEditingPlatform({...editingPlatform, storageUsed: e.target.value})}
                  required
                />
              </div>

              <div className="md:col-span-2 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setEditingPlatform(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cloud Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pool Tag</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Memory</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">vCPU</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Storage</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {platforms.map((platform) => (
              <tr key={platform.id}>
                <td className="px-6 py-4 whitespace-nowrap">{platform.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{platform.cloudType}</td>
                <td className="px-6 py-4 whitespace-nowrap">{platform.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">{platform.poolTag}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {platform.memoryUsed}GB / {platform.memoryTotal}GB ({((platform.memoryUsed / platform.memoryTotal) * 100).toFixed(2)}%)
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {platform.vcpuUsed} / {platform.vcpuTotal} ({((platform.vcpuUsed / platform.vcpuTotal) * 100).toFixed(2)}%)
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {platform.storageType}: {platform.storageUsed}GB / {platform.storageTotal}GB ({((platform.storageUsed / platform.storageTotal) * 100).toFixed(2)}%)
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => setEditingPlatform(platform)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
} 