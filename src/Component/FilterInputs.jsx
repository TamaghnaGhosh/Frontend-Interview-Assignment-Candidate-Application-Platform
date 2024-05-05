import { Autocomplete, Box, TextField } from "@mui/material";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const FilterInputs = ({ name }) => {
  const [companyName, setCompanyName] = useState("TCS");
  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
  ];
  const jobTitle = [
    { jobid: 1, title: "frontend" },
    { jobid: 2, title: "backend" },
    { jobid: 3, title: "tech lead" },
    { jobid: 4, title: "android" },
    { jobid: 5, title: "ios" },
  ];
  const jobType = [
    { jobid: 1, title: "Remote" },
    { jobid: 2, title: "Hybrid" },
    { jobid: 3, title: "In-office" },
  ];
  const minExperience = [
    { jobid: 1, title: 1 },
    { jobid: 2, title: 2 },
    { jobid: 3, title: 3 },
    { jobid: 4, title: 4 },
    { jobid: 5, title: 5 },
    { jobid: 6, title: 6 },
    { jobid: 7, title: 7 },
    { jobid: 8, title: 8 },
    { jobid: 9, title: 9 },
    { jobid: 10, title: 10 },
    { jobid: 11, title: 11 },
  ];
  const minBaseSal = [
    { jobid: 1, title: 10 },
    { jobid: 2, title: 20 },
    { jobid: 3, title: 30 },
    { jobid: 4, title: 40 },
    { jobid: 5, title: 50 },
    { jobid: 6, title: 60 },
    { jobid: 7, title: 70 },
    { jobid: 8, title: 80 },
    { jobid: 9, title: 90 },
    { jobid: 10, title: 100 },
  ];

  return (
    <div>
      {name === "Company name" ? (
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <TextField
            style={{ width: "370px", height: "10px" }}
            id="outlined-uncontrolled"
            label="Company name"
            value={companyName}
            onChange={(event) => {
              setCompanyName(event.target.value);
            }}
            // defaultValue="TCS"
          />
        </Box>
      ) : name !== "Min experience" &&
        name !== "Remote/on-site" &&
        name !== "Min base pay" ? (
        <Autocomplete
          multiple
          id="size-small-outlined-outlined"
          size="small"
          options={
            name === "Role"
              ? jobTitle
              : name === "Min base pay"
              ? minBaseSal
              : top100Films
          }
          getOptionLabel={(option) => option.title}
          defaultValue={[name === "Role" ? jobTitle?.[0] : top100Films?.[0]]}
          isOptionEqualToValue={(option, value) =>
            option.title === value.title && option.year === value.year
          }
          renderInput={(params) => (
            <TextField {...params} label={name} placeholder={name} />
          )}
        />
      ) : (
        <Autocomplete
          id="size-small-outlined"
          size="small"
          options={
            name === "Min experience"
              ? minExperience
              : name === "Remote/on-site"
              ? jobType
              : name === "Min base pay"
              ? minBaseSal
              : top100Films
          }
          getOptionLabel={(option) => option.title.toString()}
          defaultValue={
            name === "Min experience"
              ? minExperience[0]
              : name === "Remote/on-site"
              ? jobType[0]
              : name === "Min base pay"
              ? minBaseSal?.[0]
              : top100Films[0]
          }
          renderInput={(params) => (
            <TextField {...params} label={name} placeholder={name} />
          )}
        />
      )}

      {/* {
        <Autocomplete
          id="size-small-outlined"
          size="small"
          options={name === "Min experience"? minExperience: name === "Remote/on-site"? jobType: top100Films}
          getOptionLabel={(option) => option.title}
          defaultValue={name === "Min experience"? minExperience[0]: name === "Remote/on-site"? jobType[0]:top100Films[0]}
          renderInput={(params) => (
            <TextField {...params} label={name} placeholder={name} />
          )}
        />
      } */}
    </div>
  );
};

export default FilterInputs;
