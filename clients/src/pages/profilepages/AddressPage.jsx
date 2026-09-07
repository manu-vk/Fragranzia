import axios from "axios";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast'

const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    phoneNumber: '',
    streetAddress: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false
  });
  const [showForm, setShowForm] = useState(false);

  const handleAddAddress = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post("https://fragranzia-w7my.onrender.com/api/address", newAddress, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchAddresses(); // refresh list
      setShowForm(false);

      // reset form
      setNewAddress({
        fullName: '',
        phoneNumber: '',
        streetAddress: '',
        city: '',
        state: '',
        pincode: '',
        isDefault: false
      });

    } catch (error) {
      console.log(error);
    }
  };
  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("https://fragranzia-w7my.onrender.com/api/address", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setAddresses(res.data);

    } catch (error) {
      console.log(error);
    }
  };
  const handleSetDefault = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(`https://fragranzia-w7my.onrender.com/api/address/default/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchAddresses();

    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteAddress = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(`https://fragranzia-w7my.onrender.com/api/address/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    toast.success("Address deleted successfully");

    fetchAddresses();

  } catch (error) {
    console.log(error);
    toast.error("Failed to delete address");
  }
};
   useEffect(() => {
    fetchAddresses();
  }, []);


  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-primary text-2xl font-bold">My Addresses</h1>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dull">+ Add Address</button>
      </div>

      {showForm && (
        <div className="bg-white border rounded-xl p-6 mb-6">
          <h2 className="text-primary text-lg font-semibold mb-4">Add New Address</h2>
          <form onSubmit={handleAddAddress} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name *" value={newAddress.fullName} onChange={(e) => setNewAddress(p => ({ ...p, fullName: e.target.value }))} className="p-3 border rounded-lg focus:ring-2 focus:ring-black" required />
              <input type="tel" placeholder="Phone Number *" value={newAddress.phoneNumber} onChange={(e) => setNewAddress(p => ({ ...p, phoneNumber: e.target.value }))} className="p-3 border rounded-lg focus:ring-2 focus:ring-black" required />
              <input type="text" placeholder="City *" value={newAddress.city} onChange={(e) => setNewAddress(p => ({ ...p, city: e.target.value }))} className="p-3 border rounded-lg focus:ring-2 focus:ring-black" required />
              <input type="text" placeholder="State *" value={newAddress.state} onChange={(e) => setNewAddress(p => ({ ...p, state: e.target.value }))} className="p-3 border rounded-lg focus:ring-2 focus:ring-black" required />
              <input type="text" placeholder="Pincode *" value={newAddress.pincode} onChange={(e) => setNewAddress(p => ({ ...p, pincode: e.target.value }))} className="p-3 border rounded-lg focus:ring-2 focus:ring-black" required />
            </div>
            <textarea placeholder="Complete Address *" value={newAddress.streetAddress} onChange={(e) => setNewAddress(p => ({ ...p, streetAddress: e.target.value }))} rows="3" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black" required />
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={newAddress.isDefault} onChange={(e) => setNewAddress(p => ({ ...p, isDefault: e.target.checked }))} className="w-4 h-4" />Set as default</label>
              <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dull">Save Address</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div key={addr._id} className={`border rounded-xl p-5 ${addr.isDefault ? 'border-black border-2' : ''}`}>
            {addr.isDefault && <span className="inline-block px-3 py-1 bg-primary text-white text-xs rounded-full mb-3">Default</span>}
            <div className="mb-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{addr.fullName}</h3>
                <div className="flex gap-2">
                  <button onClick={() => handleSetDefault(addr._id)} className="text-sm text-blue-600 hover:text-blue-800">{addr.isDefault ? 'Default' : 'Set Default'}</button>
                  <button onClick={() => { if (window.confirm('Delete address?')) { handleDeleteAddress(addr._id); } }} className="text-sm text-red-600 hover:text-red-800">Delete</button>
                </div>
              </div>
              <p className="text-gray-600 mb-1">{addr.phoneNumber}</p>
              <p className="text-gray-700">{addr.streetAddress}</p>
            </div>
            {!addr.isDefault && <button onClick={() => handleSetDefault(addr._id)} className="w-full py-2 border border-black text-black rounded-lg hover:bg-primary hover:text-white">Deliver Here</button>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AddressPage