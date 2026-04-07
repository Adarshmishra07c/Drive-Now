import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";
import toast from "react-hot-toast";

const Hero = () => {
  const { navigate } = useAppContext();

  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const locations = ["Delhi", "Mumbai", "Bangalore", "Chandigarh"];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pickupLocation || !pickupDate || !returnDate) {
      toast.error("Please fill all fields");
      return;
    }

    if (returnDate < pickupDate) {
      toast.error("Return date cannot be before pickup date");
      return;
    }

    navigate(
      `/cars?location=${pickupLocation}&pickupDate=${pickupDate}&returnDate=${returnDate}`
    );
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 bg-gradient-to-b from-gray-50 to-gray-100">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
          Luxury Cars on Rent
        </h1>

        <p className="mt-4 text-gray-500">
          Choose your pickup location and dates to explore our premium collection of cars.
        </p>
      </motion.div>

      {/* Search Box */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 w-full max-w-5xl bg-white shadow-xl rounded-2xl p-6
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
      >
        {/* Location */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">
            Pickup Location
          </label>

          <select
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select Location</option>

            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Pickup Date */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">
            Pickup Date
          </label>

          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            min={today}
            className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Return Date */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">
            Return Date
          </label>

          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            min={pickupDate || today}
            className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Button */}
        <div className="flex items-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition"
          >
            <img
              src={assets.search_icon}
              alt="search"
              className="w-4 brightness-200"
            />
            Search
          </motion.button>
        </div>
      </motion.form>

      {/* Car Image */}
      <motion.img
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        src={assets.main_car}
        alt="car"
        className="mt-14 w-full max-w-4xl object-contain"
      />
    </section>
  );
};

export default Hero;