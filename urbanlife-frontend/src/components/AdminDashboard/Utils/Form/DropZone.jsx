import { useDropzone } from "react-dropzone";
import ComponentCard from "../../common/ComponentCard";

const Dropzone = () => {
  const onDrop = (acceptedFiles) => {
    console.log("Files dropped:", acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/svg+xml": [],
    },
  });

  return (
    <ComponentCard title="">
      <div
        {...getRootProps()}
        className={`border border-dashed rounded-xl transition p-10 cursor-pointer 
          ${isDragActive ? "border-teal-500 bg-gray-50" : "border-gray-200 bg-white"}
        `}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center text-center space-y-4 ">
          {/* Icon */}
          <div className="w-[68px] h-[68px] flex items-center justify-center rounded-full bg-gray-100 text-gray-500">
            <svg
              className="fill-current"
              width="29"
              height="28"
              viewBox="0 0 29 28"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"
              />
            </svg>
          </div>

          {/* Title */}
          <h4 className="text-lg font-semibold text-gray-800">
            {isDragActive ? "Drop Files Here" : "Drag & Drop Files Here"}
          </h4>

          {/* Description */}
          <p className="text-sm text-gray-500">
            Drag and drop your PNG, JPG, WebP, SVG images here or browse
          </p>

          {/* Browse */}
          <span className="font-medium text-teal-500 underline text-sm">
            Browse File
          </span>
        </div>
      </div>
    </ComponentCard>
  );
};

export default Dropzone;
