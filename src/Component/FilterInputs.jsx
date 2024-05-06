import { Autocomplete, Box, TextField } from "@mui/material";
import { memo } from 'react';

// eslint-disable-next-line react/prop-types
const FilterInputs = ({ name, handleClick, setCompanyName, companyName }) => {
  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
  ];
  const jobTitle = [
    { jobTitleID: 0, title: "All" },
    { jobTitleID: 1, title: "frontend" },
    { jobTitleID: 2, title: "backend" },
    { jobTitleID: 3, title: "tech lead" },
    { jobTitleID: 4, title: "android" },
    { jobTitleID: 5, title: "ios" },
  ];
  const jobTechStack = [
    { jobTechStackId: 0, title: "All" },
    { jobTechStackId: 1, title: "Java" },
    { jobTechStackId: 2, title: "GoLang" },
    { jobTechStackId: 3, title: "C++" },
    { jobTechStackId: 4, title: "Rubi/Rails" },
    { jobTechStackId: 5, title: "Kotlin" },
    { jobTechStackId: 6, title: "C#" },
    { jobTechStackId: 7, title: "Django" },
    { jobTechStackId: 8, title: "Javascript" },
    { jobTechStackId: 9, title: "GrapthQL" },
    { jobTechStackId: 10, title: "NodeJS" },
    { jobTechStackId: 11, title: "Typescript" },
    { jobTechStackId: 12, title: "React" },
    { jobTechStackId: 13, title: "Rust" },
    { jobTechStackId: 14, title: "Flask" },
    { jobTechStackId: 15, title: "Angular" },
  ];
  const jobType = [
    { jobTypeid: 1, title: "All" },
    { jobTypeid: 1, title: "Remote" },
    { jobTypeid: 2, title: "Hybrid" },
    { jobTypeid: 3, title: "In-office" },
  ];
  const minExperience = [
    { jobExperience: 0, title: 0 },
    { jobExperience: 1, title: 1 },
    { jobExperience: 2, title: 2 },
    { jobExperience: 3, title: 3 },
    { jobExperience: 4, title: 4 },
    { jobExperience: 5, title: 5 },
    { jobExperience: 6, title: 6 },
    { jobExperience: 7, title: 7 },
    { jobExperience: 8, title: 8 },
    { jobExperience: 9, title: 9 },
    { jobExperience: 10, title: 10 },
    { jobExperience: 11, title: 11 },
  ];
  const minBaseSal = [
    { jobMinBaseSal: 0, title: "All" },
    { jobMinBaseSal: 1, title: 10 },
    { jobMinBaseSal: 2, title: 20 },
    { jobMinBaseSal: 3, title: 30 },
    { jobMinBaseSal: 4, title: 40 },
    { jobMinBaseSal: 5, title: 50 },
    { jobMinBaseSal: 6, title: 60 },
    { jobMinBaseSal: 7, title: 70 },
    { jobMinBaseSal: 8, title: 80 },
    { jobMinBaseSal: 9, title: 90 },
    { jobMinBaseSal: 10, title: 100 },
  ];
  const location = [
    { jobLocationid: 0, title: "All" },
    { jobLocationid: 1, title: "Kolkata" },
    { jobLocationid: 2, title: "Bangalore" },
    { jobLocationid: 3, title: "Mumbai" },
    { jobLocationid: 4, title: "Delhi ncr" },
    { jobLocationid: 5, title: "Chennai" },
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
              : name === "Location"
              ? location
              : name === "Tech stack"
              ? jobTechStack
              : top100Films
          }
          getOptionLabel={(option) => option.title}
          defaultValue={[
            name === "Role"
              ? jobTitle?.[0]
              : name === "Location"
              ? location[0]
              : name === "Tech stack"
              ? jobTechStack?.[0]
              : top100Films?.[0],
          ]}
          isOptionEqualToValue={(option, value) =>
            option.title === value.title && option.year === value.year
          }
          onChange={(event, value) => handleClick(value)}
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
          onChange={(event, value) => handleClick(value)}
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

export default memo(FilterInputs);
