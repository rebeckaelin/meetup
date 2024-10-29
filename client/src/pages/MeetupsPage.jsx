import Header from "../components/Header";
import Footer from "../components/Footer";
import UpcommingMeetup from "../components/UpcomingMeetup";
import "../sass/MeetUpsPage.scss";
import { useState, useEffect } from "react";
import { meetupData } from "../data/meetupdata";
const MeetupsPage = () => {
  const [searchString, setSearchString] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const searchForMeetup = (e) => {
    e.preventDefault();
    console.log(searchString);
    //search meetup
  };
  const searchWithCategory = () => {
    console.log("Selected Category:", selectedCategory);
    //rendera ut lista
  };

  // Kör `searchWithCategory` varje gång `selectedCategory` ändras
  useEffect(() => {
    if (selectedCategory) {
      searchWithCategory();
    }
  }, [selectedCategory]);
  return (
    <div className="meetupsPageWrapper">
      <Header />

      <div className="searchContainer">
        <form onSubmit={(e) => searchForMeetup(e)} action="submit">
          <input
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
        {meetupData.map((meetup, index) => (
          <UpcommingMeetup key={index} meetupDetails={meetup} />
        ))}
      </div>
      <footer className="meetupsFooter">
        <Footer />
      </footer>
    </div>
  );
};

export default MeetupsPage;
