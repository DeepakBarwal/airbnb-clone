import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import CollapseCard from "./CollapseCard";
import { useState } from "react";
import DestinationInput from "./mobile/DestinationInput";
import CalendarPicker from "./mobile/CalendarPicker";
import Counter from "./Counter";
import { useSearchStore } from "@/store/store";

const MobileMenu = [
  { label: "Where?", content: <DestinationInput /> },
  { label: "When?", content: <CalendarPicker /> },
  { label: "Who?", content: <Counter label="Adults" /> },
];

const MobileNav = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleCurrentUpdate = (tabIndex) => {
    setCurrentTab(tabIndex);
  };

  const removeAllFilters = useSearchStore((state) => state.removeAllFilters);

  return (
    <div className="m-2">
      <label
        htmlFor="my_modal_7"
        className="w-full flex flex-row text-left rounded-full px-4 py-2 items-center gap-4 border drop-shadow-md bg-white"
      >
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
        <div>
          <h2 className="font-semibold text-md">Anywhere</h2>
          <div className="flex text-gray-500 flex-row">
            <span className="mr-2">Any week</span>
            <span className="mr-2">.</span>
            <span className="mr-2">Add Guests</span>
          </div>
        </div>
      </label>
      {/* MODAL */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <label
            className="absolute right-0 top-0 mt-4 mr-4 btn-close"
            htmlFor="my_modal_7"
          >
            <XMarkIcon className="w-5 h-5 text-gray-400" />
          </label>
          <div className="mt-6">
            {MobileMenu.map((item, index) => (
              <CollapseCard
                key={index}
                title={item.label}
                isCurrent={currentTab === index}
                updateTab={handleCurrentUpdate}
                index={index}
              >
                {item.content}
              </CollapseCard>
            ))}
          </div>
          <div className="modal-footer">
            <div className="modal-footer-content flex p-4 justify-between items-center">
              <button onClick={removeAllFilters} className="underline">
                Clear All
              </button>
              <button className="bg-primary px-4 py-2 rounded-md text-white mr-2 flex justify-center items-center">
                <MagnifyingGlassIcon className="w-5 h-5 text-white" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
