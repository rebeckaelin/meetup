import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UpcommingMeetup from "../components/UpcomingMeetup";
import OldMeetup from "../components/OldMeetup";
import "../sass/MeetUpsPage.scss";
import userLogo from "../assets/userLogo.png";

const MeetupsPage = () => {
  const token = sessionStorage.getItem("userToken");
  const [searchString, setSearchString] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [fetchedData, setFetchedData] = useState([]);
  const [meetUpList, setMeetupList] = useState([]);
  const [oldMeetups, setOldMeetups] = useState([]);

  const searchInputRef = useRef(null);
  const dateInputRef = useRef(null);
  const categoryRef = useRef(null);
  const locationRef = useRef(null);
  //  filtrerar efter olika kriterier

  const applyFilters = () => {
    let filteredResults = fetchedData;
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
  };

  const getData = async () => {
    try {
      const res = await fetch(
        `https://yh2yzv1g0b.execute-api.eu-north-1.amazonaws.com/meetups`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (!data.success) {
        alert("could not get meetups");
        return;
      }

      const today = new Date();
      const upcoming = data.data.filter(
        (meetup) => new Date(meetup.date) >= today
      );

      const old = data.data.filter((meetup) => new Date(meetup.date) < today);

      const sortedUpcoming = upcoming.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      const sortedOld = old.sort((a, b) => new Date(a.date) - new Date(b.date));
      setFetchedData(sortedUpcoming);
      setOldMeetups(sortedOld);
      setMeetupList(sortedUpcoming);
    } catch (err) {
      console.error(err);
    }
  };
  const searchForMeetup = (e) => {
    e.preventDefault();

    //säkerställer att string är tillräcklingt lång, annars nollar värdet
    if (searchString.length < 3) {
      alert("search with atleast 3 charactrers");
      setSearchString("");
      setMeetupList([...fetchedData]);
      searchInputRef.current.value = "";
      return;
    }

    //filtrera ut meetups som matchar searchstring
    const lowerCaseSearchString = searchString.toLowerCase();
    const searchResult = fetchedData.filter((meetup) =>
      ["date", "location", "host", "desc", "name", "time", "category"].some(
        (key) => meetup[key].toLowerCase().includes(lowerCaseSearchString)
      )
    );
    //om det inte blir något resultat på filtreringen
    if (!searchResult.length) {
      alert("could not find what you are looking for");
      setSearchString("");
      setMeetupList([...fetchedData]);
      searchInputRef.current.value = "";
      return;
    }

    setMeetupList(searchResult);
    //cleara värdet för inför nästa sökning
    setSearchString("");
    searchInputRef.current.value = "";
  };

  //fetchar data från db vid inladdning på sidan
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedCategory, selectedLocation, selectedDate]);

  // skapar unika alternativ för location baserat på fetchedData
  const uniqueLocations = Array.from(
    new Set(
      fetchedData
        .map((meetup) => meetup.location?.split(",")[1]?.trim())
        .filter((city) => city)
    )
  );

  //för att rensa filtrering på de olika kategorierna
  const clearFilter = () => {
    setSelectedLocation("");
    setSelectedDate("");
    setSelectedCategory("");
    dateInputRef.current.value = "";
    locationRef.current.value = "all";
    categoryRef.current.value = "all";
    setMeetupList(fetchedData);
  };
  return (
    <div className="meetupsPageWrapper">
      <Header userLogoSrc={userLogo} />
      <div className="searchContainer">
        <form
          onSubmit={(e) => {
            searchForMeetup(e);
          }}
          action="submit"
        >
          <input
            ref={searchInputRef}
            onChange={(e) => setSearchString(e.target.value)}
            type="text"
            placeholder="search meetup.."
          />
          <button className="searchBtn">search</button>
        </form>
        <div className="clearContainer">
          <label htmlFor="sortBy">sort by:</label>
          <button onClick={clearFilter} className="clearBtn">
            clear filter
          </button>
        </div>
        <div className="categoryContainer">
          <label htmlFor="category">category:</label>
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            name="category"
            ref={categoryRef}
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
            ref={locationRef}
          >
            <option value="all">all</option>
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
            className="dateInput"
          />
        </div>
      </div>
      <div className="meetupsWrapper">
        {meetUpList.map((meetup, i) => (
          <UpcommingMeetup key={i} meetupDetails={meetup} />
        ))}
      </div>
      <div>
        <h2 className="headline">Old meetups</h2>
        {oldMeetups.map((event) => (
          <OldMeetup
            hideContent={true}
            key={event.meetupId}
            eventDetails={event}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default MeetupsPage;
