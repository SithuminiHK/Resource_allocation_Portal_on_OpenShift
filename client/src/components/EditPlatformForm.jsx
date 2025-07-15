import { useState } from 'react';

export default function EditPlatformForm({ platform, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: platform.name,
    cloudType: platform.cloudType,
    location: platform.location,
    poolTag: platform.poolTag,
    memoryTotal: platform.memoryTotal,
    memoryUsed: platform.memoryUsed,
    vcpuTotal: platform.vcpuTotal,
    vcpuUsed: platform.vcpuUsed,
    storageType: platform.storageType,
    storageTotal: platform.storageTotal,
    storageUsed: platform.storageUsed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name.includes('Total') || name.includes('Used') ? parseInt(value) : value;
    setFormData({ ...formData, [name]: updatedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...platform, ...formData });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Edit Platform</h3>

      {[
        { label: 'Name', name: 'name' },
        { label: 'Cloud Type', name: 'cloudType' },
        { label: 'Location', name: 'location' },
        { label: 'Pool Tag', name: 'poolTag' },
        { label: 'Memory Total (GB)', name: 'memoryTotal' },
        { label: 'Memory Used (GB)', name: 'memoryUsed' },
        { label: 'vCPU Total', name: 'vcpuTotal' },
        { label: 'vCPU Used', name: 'vcpuUsed' },
        { label: 'Storage Type', name: 'storageType' },
        { label: 'Storage Total (GB)', name: 'storageTotal' },
        { label: 'Storage Used (GB)', name: 'storageUsed' }
      ].map(({ label, name }) => (
        <div key={name}>
          <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          <input
            type={name.includes('Total') || name.includes('Used') ? 'number' : 'text'}
            id={name}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
      ))}

      <div className="flex justify-end space-x-3 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
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
    </form>
  );
}
