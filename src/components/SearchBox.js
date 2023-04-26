import React from 'react';
import { FaSearch } from "react-icons/fa";
import '../styles/SearchBox.scss';

function SearchBox() {
  return (
      <form action="" className="search_box">
        <fieldset className="search_inner">
          <legend className="blind">검색창</legend>
          <i><FaSearch /></i>
          <input type="search" name="search" id="search" placeholder="Find friends, chats, Plus Friends"/>
        </fieldset>
      </form>
  )
}

export default SearchBox
