"use client";
import { useState, useEffect } from "react";
import { push, ref, set, get, update, remove } from "firebase/database";
import { database } from "../../utils/firebase";

export default function Home() {
  const [personalInfo, setPersonalInfo] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("Taiwan");
  const [editId, setEditId] = useState(null);

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  // Fetch data from Firebase
  const fetchData = async () => {
    try {
      const personalInfoRef = ref(database, "personal-information");
      const snapshot = await get(personalInfoRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const formattedData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setPersonalInfo(formattedData);
        console.log(data, "data");
        console.log(formattedData, "formattedData");
      }
    } catch (error) {
      console.error("Firebase Error: ", error);
    }
  };

  // Create new data in Firebase
  const handleSubmitClick = async () => {
    try {
      const personalInfoRef = ref(database, "personal-information");
      const newDataRef = push(personalInfoRef);
      await set(newDataRef, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        country: country,
      });

      alert("Submit Successfully!");
      fetchData();
      resetForm();
    } catch (error) {
      console.error("Firebase Error: ", error);
    }
  };

  // Update existing data in Firebase
  const handleUpdateClick = async () => {
    if (!editId) return;
    try {
      const personalInfoRef = ref(database, `personal-information/${editId}`);
      await update(personalInfoRef, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        country: country,
      });

      alert("Update Successfully!");
      fetchData();
      resetForm();
      setEditId(null); // Clear the edit ID
    } catch (error) {
      console.error("Firebase Error: ", error);
    }
  };

  // Delete data from Firebase
  const handleDeleteClick = async (id) => {
    try {
      const personalInfoRef = ref(database, `personal-information/${id}`);
      await remove(personalInfoRef);

      alert("Delete Successfully!");
      fetchData();
    } catch (error) {
      console.error("Firebase Error: ", error);
    }
  };

  // Reset form fields
  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setCountry("Taiwan");
  };

  // Edit data
  const handleEditClick = (id) => {
    const selectedInfo = personalInfo.find((info) => info.id === id);
    setFirstName(selectedInfo.first_name);
    setLastName(selectedInfo.last_name);
    setEmail(selectedInfo.email);
    setCountry(selectedInfo.country);
    setEditId(id);
  };

  return (
    <main className="flex min-h-fit flex-col items-center justify-between p-24 relative">
      <form>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={(e) => setCountry(e.target.value)}
                  value={country}
                >
                  <option>Taiwan</option>
                  <option>Canada</option>
                  <option>United States</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          {editId ? (
            <button
              type="button"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              onClick={handleUpdateClick}
            >
              Update
            </button>
          ) : (
            <button
              type="button"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              onClick={handleSubmitClick}
            >
              Submit
            </button>
          )}
        </div>
      </form>

      <div className="mt-10">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Stored Information
        </h2>
        <div>
          {personalInfo.map((info) => (
            <div key={info.id} className="flex items-center space-x-4">
              <div>
                {info.first_name} {info.last_name} - {info.email} -{" "}
                {info.country}
              </div>
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                onClick={() => handleEditClick(info.id)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-md"
                onClick={() => handleDeleteClick(info.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
