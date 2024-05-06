import { useEffect, useState } from "react";
import { URL, myHeadersConstant } from "../utils/constant";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import SimpleCard from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { getJobs, getTotalJobs } from "../utils/Redux/appSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import FilterInputs from "./FilterInputs";

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  gridContainer: {
    padding: "0 20px",
  },
}));

const InfiniteScrollwithFilters = () => {
  const classes = useStyles();
  const jobsTotal = useSelector((store) => store?.jobinfo?.jobsTotal);
  const jobs = useSelector((store) => store?.jobinfo?.jobs);
  const [getData, setGetData] = useState(jobs);
  const [limit, setLimit] = useState(4);
  const [hasMore, setHasMore] = useState(true);
  const [companyName, setCompanyName] = useState("");
  const [minExpOfTheCandadate, setMinExpOfTheCandadate] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  const body = JSON.stringify({
    limit: 10,
    offset: 0,
  });
  const requestOptions = {
    method: "POST",
    headers: myHeadersConstant,
    body,
  };

  const fetchGetData = async () => {
    try {
      const info = await axios.post(URL, requestOptions);
      // console.log(
      //   "🚀 ~ fetchGetData ~ info?.data?.jdList?.slice(0, limit):",
      //   info?.data?.jdList?.slice(0, limit)
      // );
      dispatch(getTotalJobs(info?.data?.jdList));
      setGetData(info?.data?.jdList?.slice(0, limit));
      dispatch(getJobs(info?.data?.jdList?.slice(0, limit)));
    } catch (error) {
      console.error(error.message);
    }
  };

  const FeatchMoreData = () => {
    if (getData?.length < 10) {
      setTimeout(() => {
        setLimit(limit + 2);
      }, 1500);
    } else {
      setHasMore(false);
    }
  };

  const handleClick = (value) => {
    console.log("🚀 ~ handleClick ~ value:", value);
    const arrToObj = { ...value };
    console.log("🚀 ~ handleClick ~ arrToObj:", arrToObj);
    // if (value?.["jobExperience"] || value?.["jobTypeid"]) {

    // } else {
    //   console.log("🚀 ~ InfiniteScrollwithFilters ~ companyName:", companyName);
    //   const scroll = value?.map((info) =>
    //     jobsTotal?.filter((job) => ((job?.jobRole === info?.title && job?.minExp === minExpOfTheCandadate)))
    //   );
    //   console.log("🚀 ~ scroll ~ scroll:", scroll?.flat(Infinity));
    // }
    if (value?.jobExperience) {
      setMinExpOfTheCandadate(value?.title);
      const fiterBaseOntheExp = jobsTotal?.filter(
        (job) => job?.minExp === value?.title
      );
      console.log("🚀 ~ handleClick ~ fiterBaseOntheExp:", fiterBaseOntheExp);
    }
    if (arrToObj?.[0]?.jobLocationid) {
      const fiterBaseOntheJobLocation = value?.map((info) =>
        jobsTotal?.filter(
          (job) => job?.location.toLowerCase() === info?.title.toLowerCase()
        )
      );
      console.log(
        "🚀 ~ fiterBaseOntheJobLocation ~ fiterBaseOntheJobLocation:",
        fiterBaseOntheJobLocation?.flat(Infinity)
      );
    }
    if (arrToObj?.[0]?.jobTypeid) {
      const fiterBaseOntheJobType = jobsTotal?.filter(
        (job) => job?.location.toLowerCase() === value?.title.toLowerCase()
      );
      console.log(
        "🚀 ~ handleClick ~ fiterBaseOntheJobType:",
        fiterBaseOntheJobType
      );
    }
    // if(value?.["jobTechStackId"]){
    //   const filterBaseOnTechStackExperience = value?.map((info) =>jobsTotal?.filter((job) => job?.jobRole === info?.title));
    //   console.log("🚀 ~ filterBaseOnTechStackExperience ~ filterBaseOnTechStackExperience:", filterBaseOnTechStackExperience?.flat(Infinity));
    // }
    if (arrToObj?.[0]?.jobTitleID) {
      const filterBaseOnTechStackExperience = value?.map((info) =>
        jobsTotal?.filter((job) => job?.jobRole === info?.title)
      );
      console.log(
        "🚀 ~ filterBaseOnTechStackExperience ~ filterBaseOnTechStackExperience:",
        filterBaseOnTechStackExperience?.flat(Infinity)
      );
    }
    if (value?.jobMinBaseSal) {
      const fiterBaseOntheSalary = jobsTotal?.filter(
        (job) =>
          job?.minJdSalary?.toString()?.split("")[0] ===
          value?.title?.toString()?.split("")[0]
      );
      console.log(
        "🚀 ~ handleClick ~ fiterBaseOntheSalary:",
        fiterBaseOntheSalary
      );
    }
  };

  console.log("🚀 ~ InfiniteScrollwithFilters ~ getData:", getData);
  console.log("🚀 ~ InfiniteScrollwithFilters ~ jobsTotal:", jobsTotal);
  console.log(
    "🚀 ~ InfiniteScrollwithFilters ~ minExpOfTheCandadate:",
    minExpOfTheCandadate
  );

  return (
    <>
      <Grid
        container
        spacing={10}
        className={classes.gridContainer}
        justifyContent="center"
      >
        <Grid item xs={12} sm={3} md={3}>
          <FilterInputs name={"Min experience"} handleClick={handleClick} />
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <FilterInputs
            name={"Company name"}
            handleClick={handleClick}
            setCompanyName={setCompanyName}
            companyName={companyName}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <FilterInputs name={"Location"} handleClick={handleClick} />
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <FilterInputs name={"Remote/on-site"} handleClick={handleClick} />
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <FilterInputs name={"Tech stack"} handleClick={handleClick} />
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <FilterInputs name={"Role"} handleClick={handleClick} />
        </Grid>
        <br />
        <Grid item xs={12} sm={3} md={3}>
          <FilterInputs name={"Min base pay"} handleClick={handleClick} />
        </Grid>
      </Grid>
      <br />
      <InfiniteScroll
        dataLength={getData.length}
        next={FeatchMoreData}
        hasMore={hasMore}
        loader={<h1>loading...</h1>}
        endMessage={
          <p style={{ textAlign: "center", fontSize: "50px" }}>
            you are all set!
          </p>
        }
      >
        <Grid
          container
          spacing={4}
          className={classes.gridContainer}
          justifyContent="center"
        >
          {getData?.map((item) => (
            <Grid item xs={12} sm={2} md={6} key={item?.jdUid}>
              <SimpleCard item={item} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </>
  );
};

export default InfiniteScrollwithFilters;
