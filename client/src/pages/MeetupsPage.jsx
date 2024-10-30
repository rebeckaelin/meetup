import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UpcommingMeetup from "../components/UpcomingMeetup";
import "../sass/MeetUpsPage.scss";

const MeetupsPage = () => {
  const [searchString, setSearchString] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [fetchedData, setFetchedData] = useState([]);
  const [meetUpList, setMeetupList] = useState([]);
  const baseURL = "https://or5ue0zwa6.execute-api.eu-north-1.amazonaws.com";
  const searchInputRef = useRef(null);
  const dateInputRef = useRef(null);

  //  filtrerar efter olika kriterier
  const applyFilters = () => {
    let filteredResults = fetchedData;

    // filter på sökstring
    if (searchString.length >= 3) {
      const lowerCaseSearchString = searchString.toLowerCase();
      filteredResults = filteredResults.filter((meetup) =>
        ["date", "location", "host", "desc", "name", "time", "category"].some(
          (key) => meetup[key]?.toLowerCase().includes(lowerCaseSearchString)
        )
      );
    }
    if (searchString && searchString.length < 3) {
      alert("you must have atleast charaters on your search value");
      searchInputRef.current.value = "";
    }
    // filter på category
    if (selectedCategory && selectedCategory !== "all") {
      filteredResults = filteredResults.filter(
        (meetup) => meetup.category === selectedCategory
      );
    }

    // filter på location
    if (selectedLocation && selectedLocation !== "all") {
      filteredResults = filteredResults.filter((meetup) =>
        meetup.location.includes(selectedLocation)
      );
    }

    // filter på date
    if (selectedDate) {
      filteredResults = filteredResults.filter((meetup) => {
        const meetupDate = new Date(meetup.date);
        const comparisonDate = new Date(selectedDate);
        return meetupDate >= comparisonDate;
      });
    }

    setMeetupList(filteredResults);
    searchInputRef.current.value = "";
  };

  const getData = async () => {
    try {
      const res = await fetch(`${baseURL}/meetups`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setFetchedData(data.meetups);
      setMeetupList(data.meetups);
    } catch (err) {
      console.error(err);
    }
  };

  //fetchar data från db vid inladdning på sidan
  useEffect(() => {
    getData();
  }, []);

  // trigga applyfilters när någon av states förändras
  useEffect(() => {
    applyFilters();
  }, [searchString, selectedCategory, selectedLocation, selectedDate]);

  // skapar unika alternativ för location baserat på fetchedData
  const uniqueLocations = Array.from(
    new Set(
      fetchedData
        .map((meetup) => meetup.location?.split(",")[1]?.trim())
        .filter((city) => city)
    )
  );

  return (
    <div className="meetupsPageWrapper">
      <Header />
      <div className="searchContainer">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearchString(searchInputRef.current.value);
          }}
          action="submit"
        >
          <input
            ref={searchInputRef}
            type="text"
            placeholder="search meetup.."
          />
          <button>search</button>
        </form>
        <label htmlFor="sortBy">sort by:</label>
        <div className="categoryContainer">
          <label htmlFor="category">category:</label>
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            name="category"
          >
            <option value="all">all</option>
            <option value="film">film</option>
            <option value="musik">musik</option>
            <option value="utomhus">utomhus</option>
            <option value="marknad">marknad</option>
            <option value="hälsa">hälsa</option>
            <option value="litteratur">litteratur</option>
          </select>
          <label htmlFor="location">location:</label>
          <select
            onChange={(e) => setSelectedLocation(e.target.value)}
            name="location"
          >
            <option value="all">All</option>
            {uniqueLocations.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
          <label htmlFor="start">Start date:</label>
          <input
            ref={dateInputRef}
            type="date"
            name="start"
            min={new Date().toISOString().split("T")[0]}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>
      <div className="meetupsWrapper">
        {meetUpList.map((meetup, i) => (
          <UpcommingMeetup key={i} meetupDetails={meetup} />
        ))}
      </div>
      <footer className="meetupsFooter">
        <Footer />
      </footer>
    </div>
  );
};

export default MeetupsPage;
