import Header from "../components/Header";
import Footer from "../components/Footer";
import UpcommingMeetup from "../components/UpcomingMeetup";
import "../sass/MeetUpsPage.scss";
import { useState, useEffect, useRef } from "react";

const MeetupsPage = () => {
  const [searchString, setSearchString] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [fetchedData, setFetchedData] = useState([]);
  const [meetUpList, setMeetupList] = useState([]);
  const baseURL = "https://or5ue0zwa6.execute-api.eu-north-1.amazonaws.com";
  const searchInputRef = useRef(null);

  //searchfunktion
  const searchForMeetup = (e) => {
    e.preventDefault();
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
    setSearchString("");
    searchInputRef.current.value = "";
  };

  //sök med category
  const searchWithCategory = () => {
    console.log("Selected Category:", selectedCategory);
    //rendera ut lista
  };

  const getData = async () => {
    try {
      const res = await fetch(`${baseURL}/meetups`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log("data", data);
      setFetchedData(data.meetups);
      setMeetupList(data.meetups);
      console.log("fetchedData", fetchedData);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="meetupsPageWrapper">
      <Header />

      <div className="searchContainer">
        <form onSubmit={(e) => searchForMeetup(e)} action="submit">
          <input
            ref={searchInputRef}
            onChange={(e) => setSearchString(e.target.value)}
            type="text"
            placeholder="search meetup.."
          />
          <button>search</button>
        </form>
        <div className="categoryContainer">
          <label htmlFor="category">sort by:</label>
          <select
            onChange={(e) => {
              setSelectedCategory(e.target.value), searchWithCategory(e);
            }}
            name="category"
            id=""
          >
            <option value="all">all</option>
            <option value="category2">category2</option>
            <option value="category3">category3</option>
            <option value="category4">category4</option>
          </select>
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
