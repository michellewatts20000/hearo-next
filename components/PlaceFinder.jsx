import React, { useState, useEffect, useRef } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

function PlaceFinder(props) {
  console.log(props, 'props')
  const { setPost } = props;
  const [query, setQuery] = useState("");
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const autoCompleteRef = useRef(null);

  const handleSelect = async (address) => {
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      setQuery(address);
      setPost(address);
      setAddress(address);
      setCoordinates(latLng);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleInputChange = (newValue) => {
    setQuery(newValue);
  };

  useEffect(() => {
    // Load Google Maps Places API script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&type=restaurant`;

    script.onload = () => {
      handleScriptLoad(setQuery, autoCompleteRef);
      setScriptLoaded(true);
    };

    document.getElementsByTagName("head")[0].appendChild(script);

    return () => {
      // Cleanup: Remove the script when the component unmounts
      document.getElementsByTagName("head")[0].removeChild(script);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleScriptLoad = (updateQuery, autoCompleteRef) => {
    const center = { lat: -33.865143, lng: 151.2099 };
    const defaultBounds = {
      north: center.lat + 0.1,
      south: center.lat - 0.1,
      east: center.lng + 0.1,
      west: center.lng - 0.1,
    };
  };

  const handleClear = () => {
    setQuery("");
    setAddress("");
    setCoordinates({ lat: null, lng: null });
  };

  useEffect(() => {
    setPost((formstate) => ({
      ...formstate,
      placeName: query?.split(",")[0],
      placeLocation: address ? `${query.split(",")[1]}, ${query.split(",")[2]}` : "",
    }));
  }, [setPost, query]);

  if (!scriptLoaded) {
    // Show a loading message or component while the script is loading
    return <div>Loading...</div>;
  }

  return (
    <>
      <label>
        <span className="font-semibold text-base text-gray-700">
          Place name
        </span>
        {scriptLoaded && (
          <PlacesAutocomplete
            value={query}
            onChange={handleInputChange}
            onSelect={handleSelect}
            searchOptions={{ types: ["establishment"], componentRestrictions: { country: "au" } }}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: "Enter Place",
                    className: "form_input",
                  })}
                  value={query.split(",")[0]}
                // Update the input value with the selected query
                />
                {/* Clear button */}
                {query && (
                  <button
                    onClick={handleClear}
                    className="bg-primary-500 rounded-full py-2 px-2"
                  >
                    X
                  </button>
                )}
                <div>
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "primary-500" : "#fff",
                    };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, { style })}
                        key={suggestion.placeId}
                      >
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        )}
      </label>
    </>
  );
}

export default PlaceFinder;
