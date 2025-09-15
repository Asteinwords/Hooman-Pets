import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import theme from "../theme";
import logo from "../assets/Group 10703.png";
import NavigationButtons from "./NavigationButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Full JSON data as constant - updated to arrays of strings
const breedsData = {
  "dog": [
    "Affenpinscher",
    "Afghan Hound",
    "Airedale Terrier",
    "Akita",
    "Alaskan Malamute",
    "American Bulldog",
    "American Eskimo Dog",
    "American Foxhound",
    "American Pit Bull Terrier",
    "American Staffordshire Terrier",
    "Anatolian Shepherd Dog",
    "Appenzeller Sennenhund",
    "Australian Cattle Dog",
    "Australian Shepherd",
    "Australian Terrier",
    "Azawakh",
    "Barbet",
    "Basenji",
    "Basset Hound",
    "Beagle",
    "Bearded Collie",
    "Beauceron",
    "Bedlington Terrier",
    "Belgian Laekenois",
    "Belgian Malinois",
    "Belgian Sheepdog",
    "Belgian Tervuren",
    "Bergamasco Sheepdog",
    "Berger Picard",
    "Bernese Mountain Dog",
    "Bichon Frise",
    "Black and Tan Coonhound",
    "Bloodhound",
    "Bluetick Coonhound",
    "Boerboel",
    "Bolognese",
    "Border Collie",
    "Border Terrier",
    "Borzoi",
    "Boston Terrier",
    "Bouvier des Flandres",
    "Boxer",
    "Boykin Spaniel",
    "Bracco Italiano",
    "Briard",
    "Brittany",
    "Brussels Griffon",
    "Bull Terrier",
    "Bulldog",
    "Bullmastiff",
    "Cairn Terrier",
    "Canaan Dog",
    "Cane Corso",
    "Cardigan Welsh Corgi",
    "Cavalier King Charles Spaniel",
    "Cesky Terrier",
    "Chesapeake Bay Retriever",
    "Chihuahua",
    "Chinese Crested",
    "Chinese Shar-Pei",
    "Chinook",
    "Chow Chow",
    "Clumber Spaniel",
    "Cocker Spaniel",
    "Collie",
    "Coton de Tulear",
    "Curly-Coated Retriever",
    "Dachshund",
    "Dalmatian",
    "Dandie Dinmont Terrier",
    "Doberman Pinscher",
    "Dogo Argentino",
    "Dog de Bordeaux",
    "Dutch Shepherd",
    "English Cocker Spaniel",
    "English Foxhound",
    "English Setter",
    "English Springer Spaniel",
    "Entlebucher Mountain Dog",
    "Field Spaniel",
    "Finnish Lapphund",
    "Finnish Spitz",
    "Flat-Coated Retriever",
    "French Bulldog",
    "German Pinscher",
    "German Shepherd",
    "German Shorthaired Pointer",
    "German Wirehaired Pointer",
    "Giant Schnauzer",
    "Glen of Imaal Terrier",
    "Golden Retriever",
    "Gordon Setter",
    "Great Dane",
    "Great Pyrenees",
    "Greater Swiss Mountain Dog",
    "Greyhound",
    "Harrier",
    "Havanese",
    "Ibizan Hound",
    "Icelandic Sheepdog",
    "Irish Red and White Setter",
    "Irish Setter",
    "Irish Terrier",
    "Irish Water Spaniel",
    "Irish Wolfhound",
    "Italian Greyhound",
    "Jack Russell Terrier",
    "Japanese Chin",
    "Keeshond",
    "Kerry Blue Terrier",
    "Komondor",
    "Kuvasz",
    "Labradoodle",
    "Labrador Retriever",
    "Lakeland Terrier",
    "Leonberger",
    "Lhasa Apso",
    "Lowchen",
    "Maltese",
    "Manchester Terrier",
    "Mastiff",
    "Miniature American Shepherd",
    "Miniature Bull Terrier",
    "Miniature Pinscher",
    "Miniature Schnauzer",
    "Neapolitan Mastiff",
    "Newfoundland",
    "Norfolk Terrier",
    "Norwegian Buhund",
    "Norwegian Elkhound",
    "Norwegian Lundehund",
    "Norwich Terrier",
    "Nova Scotia Duck Tolling Retriever",
    "Old English Sheepdog",
    "Otterhound",
    "Papillon",
    "Parson Russell Terrier",
    "Pekingese",
    "Pembroke Welsh Corgi",
    "Petit Basset Griffon Vendeen",
    "Pharaoh Hound",
    "Plott Hound",
    "Pointer",
    "Polish Lowland Sheepdog",
    "Pomeranian",
    "Poodle",
    "Portuguese Podengo",
    "Portuguese Water Dog",
    "Pug",
    "Puli",
    "Pumi",
    "Rat Terrier",
    "Redbone Coonhound",
    "Rhodesian Ridgeback",
    "Rottweiler",
    "Russell Terrier",
    "Saint Bernard",
    "Saluki",
    "Samoyed",
    "Schipperke",
    "Scottish Deerhound",
    "Scottish Terrier",
    "Sealyham Terrier",
    "Shetland Sheepdog",
    "Shiba Inu",
    "Shih Tzu",
    "Siberian Husky",
    "Silky Terrier",
    "Skye Terrier",
    "Sloughi",
    "Soft Coated Wheaten Terrier",
    "Spanish Water Dog",
    "Spinone Italiano",
    "Staffordshire Bull Terrier",
    "Standard Schnauzer",
    "Sussex Spaniel",
    "Swedish Vallhund",
    "Tibetan Mastiff",
    "Tibetan Spaniel",
    "Tibetan Terrier",
    "Toy Fox Terrier",
    "Treeing Walker Coonhound",
    "Vizsla",
    "Weimaraner",
    "Welsh Springer Spaniel",
    "Welsh Terrier",
    "West Highland White Terrier",
    "Whippet",
    "Wire Fox Terrier",
    "Wirehaired Pointing Griffon",
    "Wirehaired Vizsla",
    "Xoloitzcuintli",
    "Yorkshire Terrier",
    "Mixed/Unknown",
    "Other"
  ],
  "cat": [
    "Abyssinian",
    "American Bobtail",
    "American Curl",
    "American Shorthair",
    "American Wirehair",
    "Balinese",
    "Bengal",
    "Birman",
    "Bombay",
    "British Longhair",
    "British Shorthair",
    "Burmese",
    "Burmilla",
    "Chartreux",
    "Chausie",
    "Cornish Rex",
    "Cymric",
    "Devon Rex",
    "Egyptian Mau",
    "Exotic Shorthair",
    "Havana Brown",
    "Himalayan",
    "Japanese Bobtail",
    "Javanese",
    "Korat",
    "LaPerm",
    "Maine Coon",
    "Manx",
    "Munchkin",
    "Nebelung",
    "Norwegian Forest",
    "Ocicat",
    "Oriental",
    "Persian",
    "Peterbald",
    "Pixiebob",
    "Ragdoll",
    "Russian Blue",
    "Savannah",
    "Scottish Fold",
    "Selkirk Rex",
    "Siamese",
    "Siberian",
    "Singapura",
    "Snowshoe",
    "Somali",
    "Sphynx",
    "Tonkinese",
    "Toyger",
    "Turkish Angora",
    "Turkish Van",
    "Mixed/Unknown",
    "Other"
  ]
};

const PetBreed = () => {
  const navigate = useNavigate();
  const [petType, setPetType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("");
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [message, setMessage] = useState("");
  const [petName, setPetName] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    console.log("Fetching profile...");
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile/pet-profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log("Profile data received:", res.data);
        setPetType(res.data.data.petType || "dog"); // Default to lowercase "dog"
        if (res.data.data.petBreed) {
          setSelectedBreed(res.data.data.petBreed);
          setSearchTerm(res.data.data.petBreed);
          console.log("Initial breed set:", res.data.data.petBreed);
        }
      } catch (err) {
        console.error("Error fetching profile:", err.response?.data?.message || err.message);
        setMessage(err.response?.data?.message || "Failed to load profile");
      }
    };
    fetchProfile();
  }, []);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile/pet-profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setPetType(res.data.data.petType || "dog");
        setPetName(res.data.data.petName || "pet");
      } catch (err) {
        setMessage(err.response?.data?.message || "Failed to load profile");
      }
    };
    fetchProfile();
  }, []);


  useEffect(() => {
    console.log("Search term or petType changed. Current values:", { searchTerm, petType });
    if (!petType) {
      console.log("No petType set, skipping filter.");
      return;
    }

    const allBreeds = breedsData[petType.toLowerCase()] || []; // Convert petType to lowercase
    console.log("All breeds for petType:", allBreeds);
    const mainBreeds = allBreeds.filter(breed => 
      !["Mixed/Unknown", "Other"].includes(breed)
    ); // Exclude Mixed/Unknown and Other from filtering
    const filtered = mainBreeds
      .filter(breed => breed.toLowerCase().startsWith(searchTerm.toLowerCase())) // Filter breeds starting with search term
      .slice(0, 10); // Limit to 10
    console.log("Filtered breeds:", filtered);

    setFilteredBreeds(filtered);
    setShowSuggestions(searchTerm.length > 0); // Show suggestions only if search term exists
    console.log("Show suggestions set to:", searchTerm.length > 0);
  }, [searchTerm, petType]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    console.log("Search input changed to:", value);
    setSearchTerm(value);
    setSelectedBreed(""); // Clear selection on search
    console.log("Selected breed cleared.");
  };

  const handleBreedSelect = async (breedName) => {
    console.log("Breed selected:", breedName);
    setSelectedBreed(breedName);
    setSearchTerm(breedName); // Update search to show selected
    try {
      await axios.post(
        "http://localhost:5000/api/profile/pet-breed",
        { petBreed: breedName },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      console.log("Breed saved successfully");
      setMessage("Breed saved successfully");
    } catch (err) {
      console.error("Error saving breed:", err.response?.data?.message || err.message);
      setMessage(err.response?.data?.message || "Failed to save breed");
    }
  };

  const handleOtherSelect = () => {
    const customBreed = prompt("Enter your pet's breed:");
    console.log("Custom breed prompt result:", customBreed);
    if (customBreed) {
      handleBreedSelect(customBreed);
    }
  };

  const handleBack = () => {
    console.log("Navigating back...");
    navigate("/profile/pet-name"); // Or previous step
  };

  const handleNext = () => {
    console.log("Navigating next...");
    if (selectedBreed) {
      navigate("/profile/pet-gender"); // Or next step, e.g., /profile/pet-age
    } else {
      console.log("No breed selected, showing message.");
      setMessage("Please select a breed");
    }
  };

  const capitalizedPet = petType.charAt(0).toUpperCase() + petType.slice(1);

  return (
    <div className={`${theme.colors.background} min-h-screen flex items-start justify-start`}>
      <div className="w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex justify-start mb-8">
          <img src={logo} alt="Hooman Logo" className="h-12" />
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-[#E95744] mb-6 rounded-full" style={{ width: "100%" }}></div>

        {/* Header */}
        <p className="text-sm text-gray-600 mb-2">Pet Basics</p>
        <h1 className="text-4xl font-extrabold mb-2">What breed is {petName||capitalizedPet}?</h1>
        <p className="text-gray-600 mb-6">
          Breed-specific insights let us tailor care advice just for your pet's unique needs.
        </p>

        {/* Search Bar */}
        <Input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 placeholder-gray-500 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        {/* Suggestions List with Animation */}
        <div 
          className="transition-opacity duration-300 ease-in-out"
          style={{ opacity: showSuggestions ? 1 : 0, maxHeight: showSuggestions ? '200px' : '0', overflow: 'hidden' }}
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {/* Filtered Breeds based on search */}
            {filteredBreeds.map((breed, index) => (
              <Button
                key={index}
                variant={selectedBreed === breed ? "default" : "outline"}
                className={`${theme.layout.button} bg-gray-200 text-black rounded-full px-4 py-2 text-sm ${
                  selectedBreed === breed ? 'bg-orange-500 text-white' : ''
                } hover:bg-gray-300 transition-colors`}
                onClick={() => handleBreedSelect(breed)}
              >
                {breed}
              </Button>
            ))}
            {/* Always show Mixed/Unknown and Other */}
            {["Mixed/Unknown", "Other"].map((option, index) => (
              <Button
                key={`fixed-${index}`}
                variant={selectedBreed === option ? "default" : "outline"}
                className={`${theme.layout.button} bg-gray-200 text-black rounded-full px-4 py-2 text-sm ${
                  selectedBreed === option ? 'bg-orange-500 text-white' : ''
                } hover:bg-gray-300 transition-colors`}
                onClick={() => option === "Other" ? handleOtherSelect() : handleBreedSelect(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <NavigationButtons 
          onBack={handleBack} 
          onNext={handleNext} 
          nextDisabled={!selectedBreed} 
        />
        {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
      </div>
    </div>
  );
};
export default PetBreed;