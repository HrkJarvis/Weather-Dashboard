import { useState } from "react";
import { TextField, Button } from "@mui/material";

const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState("");

    const handleSearch = () => {
        if (city.trim()) {
            onSearch(city);
            setCity("");
        }
    };

    return (
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <TextField
        label="Enter City"
        variant="filled"
        InputProps={{ sx: { color: "white" } }} // Make text white
        InputLabelProps={{ sx: { color: "#90caf9" } }} // Light blue label
        sx={{
          backgroundColor: "#333", // Darker field
          borderRadius: 1,
          width: "100%",
        }}
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
            <Button variant="contained" color="primary" onClick={handleSearch}>
                Search
            </Button>
        </div>
    );
};

export default SearchBar;
