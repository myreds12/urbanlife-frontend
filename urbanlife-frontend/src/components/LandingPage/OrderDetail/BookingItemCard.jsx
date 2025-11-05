import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FiChevronRight, FiX, FiChevronDown } from "react-icons/fi";
import "react-datepicker/dist/react-datepicker.css";
import { DateInput } from "../../../components/LandingPage/HomePage/CardForm/DateInput.jsx";
import { differenceInDays, addDays } from "date-fns"; // date utils biar rapi
import { useNavigate } from "react-router-dom";

const BookingItemCard = ({
  id,
  tanggal_mulai,
  tanggal_selesai,
  item_type,
  adultCount,
  childCount,
  hargaAnak,
  hargaDewasa,
  durasi,
  selectedDuration,
  selectedRoom,
  totalHarga,
  image,
  location,
  title,
  roomPrice,
  handleChange,
  handleRemove,
  packagePrices,
  lPackagePrice,
  vPackagePrice,
}) => {
  const { t, i18n } = useTranslation();
  console.log("Current language:", i18n.language); // Debug bahasa saat ini

  useEffect(() => {
    console.log("Language changed to:", i18n.language); // Debug perubahan bahasa
  }, [i18n.language]);

  useEffect(() => {
    if (tanggal_mulai && tanggal_selesai) {
      if (item_type === "akomodasi") {
        const start = new Date(tanggal_mulai);
        const end = new Date(tanggal_selesai);

        const diff = differenceInDays(end, start) + 1;

        if (diff > 0 && diff !== durasi) {
          handleChange("durasi", diff); // update durasi
        }
      } else if (item_type == "travel_package") {
        const start = new Date(tanggal_mulai);
        const end = new Date(tanggal_selesai);

        const selisih = end - start;

        const durasiHari = selisih / (1000 * 60 * 60 * 24);
        const diff = Math.round(durasiHari) + 1

        if (diff > 0 && diff !== durasi) {
          handleChange("durasi", diff); // update durasi
        }
      } else {
        const start = new Date(tanggal_mulai);
        const end = new Date(tanggal_selesai);

        const selisih = end - start;

        const durasiHari = selisih / (1000 * 60 * 60 * 24);
        const diff = Math.round(durasiHari)
        if (diff > 0 && diff !== durasi) {
          setKendaraanDurasi(diff)
        }
        setSelDuration((selectedDuration?.harga || 0) * diff)
      }
    }
  }, [tanggal_mulai, tanggal_selesai]);

  // const fallbackImage = "https://via.placeholder.com/60?text=No+Image";

  // State untuk dropdown
  const [showAdultDropdown, setShowAdultDropdown] = useState(false);
  const [showChildDropdown, setShowChildDropdown] = useState(false);
  const [showDurationDropdown, setShowDurationDropdown] = useState(false);
  const [showRoomDropdown, setShowRoomDropdown] = useState(false);
  const [prizing, setPrizing ] = useState("normal");
  const [showPrizingDropdown, setShowPrizingDropdown] = useState(false);
  const [showPackageDropdown, setShowPackageDropdown] = useState(false);
  const [selDuration, setSelDuration] = useState(null)
  const [kendaraanDurasi, setKendaraanDurasi] = useState(1)

  const navigate = useNavigate()
  const redirectService = () => {
    switch (item_type) {
      case 'travel_package':
        navigate('/DayTour')
        break;
      case 'kendaraan':
        navigate('/unit-car')
        break
      case 'akomodasi':
        navigate('/accomodation')
        break
      default:
        break;
    }
  }

  useEffect(() => {
    if(selDuration) {
      handleChange("harga", selDuration)
    }
  }, [selDuration])

  const handleDurationChange = (value) => {
    const selected = durasi.find((d) => d.durasi === value)
    const kendaraan_harga = (selected?.harga || 0) * kendaraanDurasi

    handleChange("selected_durasi", selected);
    setSelDuration(kendaraan_harga)
  }

  // Custom Dropdown Component
  const CustomDropdown = ({
    label,
    value,
    options,
    onChange,
    placeholder,
    showDropdown,
    setShowDropdown,
    displayValue,
    isOpen,
  }) => (
    <div className="relative">
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`
          w-full py-2 px-3 rounded-md shadow-sm border transition-all duration-200 ease-in-out
          flex items-center justify-between text-sm text-left
          ${
            showDropdown
              ? "border-cyan-600 bg-cyan-50 ring-1 ring-cyan-500"
              : "border-gray-300 bg-white hover:border-blue-300 hover:bg-gray-50"
          }
          focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200
        `}
      >
        <span
          className={`${
            value ? "text-gray-900" : "text-gray-500"
          } flex-1 min-w-0`}
        >
          {typeof displayValue === "object"
            ? displayValue
            : displayValue || placeholder}
        </span>
        <FiChevronDown
          className={`ml-2 transition-transform duration-200 text-gray-400 ${
            showDropdown ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute left-0 right-0 mt-1 border border-blue-200 bg-white rounded-lg shadow-lg z-30 overflow-hidden animate-in slide-in-from-top-2 duration-200">
          <div className="py-1 max-h-48 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setShowDropdown(false);
                }}
                className={`
                  w-full text-left px-3 py-2 transition-all duration-150
                  hover:bg-blue-50 focus:outline-none focus:bg-blue-50
                  flex items-center justify-between text-sm
                  ${
                    value === option.value
                      ? "bg-blue-100 text-blue-800 font-medium"
                      : "text-gray-700"
                  }
                `}
              >
                <span>{option.label}</span>
                {option.price && (
                  <span className="text-xs text-gray-500 ml-2">
                    Rp {option.price.toLocaleString("id-ID")}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Close dropdown when clicking outside */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-6 relative space-y-4 w-full max-w-md">
      {/* Remove Button */}
      <button
        onClick={() => handleRemove(id, item_type)}
        className="absolute top-2 right-2 text-red-500 hover:text-red-600 transition-colors"
      >
        <FiX className="w-5 h-5" />
      </button>

      {/* Booking Date */}
      <div>
        <label className="block text-sm font-medium text-gray-500 mb-1">
          {t("bookingitem.booking_date")}
        </label>
        <div className="grid grid-cols-2 gap-2">
          <DateInput
            label={t("bookingitem.start_date")}
            selected={tanggal_mulai ? new Date(tanggal_mulai) : null}
            onChange={(date) => handleChange("tanggal_mulai", date)}
            minDate={new Date()}
          />
          <DateInput
            label={t("bookingitem.end_date")}
            selected={tanggal_selesai ? new Date(tanggal_selesai) : null}
            onChange={(date) => handleChange("tanggal_selesai", date)}
            minDate={tanggal_mulai ? new Date(tanggal_mulai) : new Date()}
          />
        </div>
      </div>

      { item_type === "travel_package" ? 
          <div>
            <p className="font-medium mb-3 text-sm text-black-800">
                {t("bookingitem.pricing")}
            </p>
            <div className="">
              <CustomDropdown
                value={prizing === 'normal' ? t("bookingitem.normal_price") : t("bookingitem.package_price")}
                options={[
                  { value: 'normal', label: t("bookingitem.normal_price") },
                  { value: 'package', label: t("bookingitem.package_price") },
                ]}
                onChange={(value) => setPrizing(value)}
                showDropdown={showPrizingDropdown}
                setShowDropdown={setShowPrizingDropdown}
                displayValue={
                  <div className="leading-tight">
                      <div>
                        {prizing === 'normal' ? t("bookingitem.normal_price") : t("bookingitem.package_price")}
                      </div>
                    </div>
                }
              />
            </div>
          </div>
          : <></>
      }

      {/* Duration or Person Count */}
      <div className="space-y-3">
        <div>
          <p className="font-medium mb-3 text-sm text-gray-600">
            {item_type === "travel_package"
              ? prizing === "normal" ? t("bookingitem.person_number") : t("bookingitem.package_price")
              : item_type === "akomodasi"
              ? t("bookingitem.room_and_duration")
              : t("bookingitem.duration")}
          </p>

          {item_type === "travel_package" ? (
            prizing === "normal" 
            ? <div className="grid grid-cols-2 gap-2">
              {/* Adults Dropdown */}
              <CustomDropdown
                label={t("bookingitem.adults")}
                value={adultCount}
                options={[1, 2, 3, 4, 5].map((n) => ({
                  value: n,
                  label: `${n} ${t("bookingitem.adult_count")}`,
                  price: (hargaDewasa || 0) * n,
                }))}
                onChange={(value) => handleChange("jumlah_dewasa", value)}
                placeholder={t("bookingitem.select_adults")}
                showDropdown={showAdultDropdown}
                setShowDropdown={setShowAdultDropdown}
                displayValue={
                  adultCount ? (
                    <div className="leading-tight">
                      <div>
                        {adultCount} {t("bookingitem.adult_count")}
                      </div>
                      <div className="text-xs text-gray-500">
                        Rp{" "}
                        {((hargaDewasa || 0) * adultCount).toLocaleString(
                          "id-ID"
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )
                }
              />

              {/* Children Dropdown */}
              <CustomDropdown
                label={t("bookingitem.children")}
                value={childCount}
                options={[0, 1, 2, 3].map((n) => ({
                  value: n,
                  label: `${n} ${t("bookingitem.child_count")}`,
                  price: (hargaAnak || 0) * n,
                }))}
                onChange={(value) => handleChange("jumlah_anak", value)}
                placeholder={t("bookingitem.select_children")}
                showDropdown={showChildDropdown}
                setShowDropdown={setShowChildDropdown}
                displayValue={
                  childCount !== undefined ? (
                    <div className="leading-tight">
                      <div>
                        {childCount} {t("bookingitem.child_count")}
                      </div>
                      <div className="text-xs text-gray-500">
                        Rp{" "}
                        {((hargaAnak || 0) * childCount).toLocaleString(
                          "id-ID"
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )
                }
              />
            </div>
            : <div className="grid grid-cols-2 gap-2">
              <CustomDropdown
                value={vPackagePrice}
                options={
                  packagePrices.map((p) => ({
                    value: p.id,
                    label: p.description.replace('persons', t('detail.persons'))
                  }))
                }
                onChange={(value) => handleChange("v_package_price", value)}
                showDropdown={showPackageDropdown}
                setShowDropdown={setShowPackageDropdown}
                displayValue={
                  vPackagePrice ? (
                    <div className="leading-tight">
                      <div className="text-sm text-gray-500">
                        {lPackagePrice}
                      </div>
                    </div>
                  ) : (
                    <div>{t("bookingitem.select_type")}</div>
                  )
                }
              />

              <div className="relative">
                <label className="block text-sm text-gray-600 mb-1"></label>
                <input
                  type="text"
                  name="package_price"
                  placeholder={t("bookingitem.package_price")}
                  value={
                    vPackagePrice
                      ? `Rp ${Number(vPackagePrice).toLocaleString("id-ID")}`
                      : "" 
                  }
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>
          ) : item_type === "kendaraan" ? (
            <CustomDropdown
              label={t("bookingitem.duration")}
              value={selectedDuration?.durasi}
              options={durasi.map((d) => ({
                value: d.durasi,
                label: d.durasi.replace('hours', t('rentcar.hours'))
              }))}
              // onChange={(value) => {
              //   const selected = durasi.find((d) => d.durasi === value);
              //   handleChange("selected_durasi", selected);
              //   handleChange("harga", selected?.harga || 0);
              // }}
              onChange={handleDurationChange}
              placeholder={t("bookingitem.choose_duration")}
              showDropdown={showDurationDropdown}
              setShowDropdown={setShowDurationDropdown}
              displayValue={selectedDuration ? selectedDuration.durasi.replace('hours', t('rentcar.hours')) : ""}
            />
          ) : (
            item_type === "akomodasi" && (
              <div className="grid grid-cols-2 gap-2">
                <CustomDropdown
                  label={t("bookingitem.room")}
                  value={selectedRoom?.nama}
                  options={roomPrice.map((d) => ({
                    value: d.nama,
                    label: d.nama,
                  }))}
                  onChange={(value) => {
                    const selected = roomPrice.find((d) => d.nama === value);
                    handleChange("selected_room", selected);
                    handleChange("harga", selected?.harga || 0);
                  }}
                  placeholder={t("bookingitem.choose_room")}
                  showDropdown={showRoomDropdown}
                  setShowDropdown={setShowRoomDropdown}
                  displayValue={selectedRoom?.nama}
                />

                {/* Durasi Menginap */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    {t("bookingitem.duration_nights")}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={durasi || ""}
                    onChange={(e) => {
                      const newDurasi = parseInt(e.target.value);
                      handleChange("durasi", newDurasi);

                      if (tanggal_mulai && newDurasi > 0) {
                        const newEnd = addDays(
                          new Date(tanggal_mulai),
                          newDurasi
                        );
                        handleChange("tanggal_selesai", newEnd);
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 shadow-sm transition-all duration-200"
                  />
                </div>
              </div>
            )
          )}
        </div>

        {/* Price Section - Separate Row */}
        <div className="border-t border-gray-300 border-dashed pt-3">
          <div className="flex justify-end">
            <div className="text-sm text-right">
              <p className="text-gray-500 font-medium">
                {t("bookingitem.price")}
              </p>
              <p className="font-bold text-gray-800 mt-1">
                Rp. {Number(totalHarga).toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image and Info */}
      <div className="flex items-center gap-3">
        <img
          src={image}
          alt="Thumbnail"
          className="w-14 h-14 object-cover rounded-md aspect-square"
        />
        <div className="flex-1">
          <p className="text-[11px] text-gray-500 truncate">
            {t("bookingitem.location")} {location}
          </p>
          <p className="text-sm font-medium text-gray-800 truncate">{title}</p>
        </div>
      </div>

      {/* Change Package / Unit */}
      <div className="flex items-center text-sm text-red-500 font-medium cursor-pointer hover:underline transition-all" onClick={redirectService}>
        {item_type === "travel_package"
          ? t("bookingitem.change_package")
          : t("bookingitem.change_unit")}
        <FiChevronRight className="ml-1 w-4 h-4" />
      </div>
    </div>
  );
};

export default BookingItemCard;
