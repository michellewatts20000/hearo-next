import React, { useState, useEffect } from "react";
import PlacesAutocomplete from "react-places-autocomplete";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

function PlaceFinder(props) {
  const { setPost } = props;
  const [query, setQuery] = useState("");
  const [address, setAddress] = useState("");
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const handleSelect = async (address) => {
    try {
      setQuery(address);
      setAddress(address);
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
      setScriptLoaded(true);
    };

    document.getElementsByTagName("head")[0].appendChild(script);

    return () => {
      // Cleanup: Remove the script when the component unmounts
      document.getElementsByTagName("head")[0].removeChild(script);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleClear = () => {
    setQuery("");
    setAddress("");
  };

  useEffect(() => {
    setPost((formstate) => ({
      ...formstate,
      placeName: address ? query?.split(",")[0] : "",
      placeLocation: address ? `${query.split(",")[1]}, ${query.split(",")[2]}` : "",
    }));
  }, [setPost, address]);

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
                <div style={{ display: "flex" }}>
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
                      className="mt-5 w-full black_btn" // Add some margin to separate the button from the input
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div>
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#62C5C1" : "#fff",
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
