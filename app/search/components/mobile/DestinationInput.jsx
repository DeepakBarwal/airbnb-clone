import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useSearchStore } from "../../../../store/store";

const DestinationInput = () => {
  const locationInput = useSearchStore((state) => state.location);

  return (
    <div className="destination-input bg-white flex items-center rounded-md p-1 border">
      <span>
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 ml-1" />
      </span>
      <input
        type="text"
        id="destination"
        placeholder="Where are you going?"
        className="w-full pl-4 py-2 pr-4 bg-transparent rounded-full focus:outline-none"
        onChange={(e) => useSearchStore.setState({ location: e.target.value })}
        value={locationInput}
      />
    </div>
  );
};

export default DestinationInput;
