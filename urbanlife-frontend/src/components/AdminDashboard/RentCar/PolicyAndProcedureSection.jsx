import React from "react";

const PolicyAndProcedureSection = ({
  id,
  isActive,
  content,
  onChangePolicy,
}) => {
  return (
    <div id={id} className={isActive ? "block" : "hidden"}>
      <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20">
        <h3 className="text-lg font-semibold mb-4">Policy and Procedure</h3>
        <div className="flex space-x-4 mt-4">
          {content.map((item, index) => (
            <div key={item.bahasa} className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                {item.bahasa}
              </label>
              <div className="mt-2">
                <span className="text-red-500 mr-1">*</span> Policy
              </div>
              <textarea
                value={item.kebijakan || ""}
                onChange={(e) => onChangePolicy(index, e.target.value)}
                className="mt-1 p-2 w-full rounded-md h-60 border border-gray-300 focus:outline-cyan-600"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default PolicyAndProcedureSection;
