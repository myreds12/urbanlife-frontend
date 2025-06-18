import { useEffect } from 'react';
import 'flowbite';

// Impor bahasa Indonesia untuk datepicker (pastikan file ini ada di proyekmu)
import id from 'date-fns/locale/id'; // Pastikan install 'date-fns' dan 'date-fns/locale/id'

const CardForm = () => {
  useEffect(() => {
    // Inisialisasi date-rangepicker setelah komponen dimuat
    const dateRangePicker = document.getElementById('date-range-picker');
    if (dateRangePicker) {
      new Datepicker(dateRangePicker, {
        autohide: true,
        format: 'ccc, d mmm', // Format: "Rab, 7 Mei" (ccc = hari pendek, d = tanggal, mmm = bulan pendek)
        language: id, // Gunakan bahasa Indonesia
      });
    }
  }, []);

  return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <form className="max-w-sm mx-auto space-y-4">
        {/* Dropdown Country */}
        <select
          id="countries-1"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>Select country</option>
          <option>Indonesia</option>
          <option>Vietnam</option>
        </select>

        {/* Dropdown City */}
        <select
          id="countries-2"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>Select city</option>
          <option>Jakarta</option>
          <option>Hanoi</option>
        </select>

        {/* Dropdown Services */}
        <select
          id="countries-3"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>Select services</option>
          <option>Service 1</option>
          <option>Service 2</option>
        </select>

        {/* Date Range Picker */}
        <div id="date-range-picker" date-rangepicker className="flex items-center space-x-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input
              id="datepicker-range-start"
              name="start"
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="From"
            />
          </div>
          <span className="text-gray-500">to</span>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input
              id="datepicker-range-end"
              name="end"
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="To"
            />
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default CardForm;