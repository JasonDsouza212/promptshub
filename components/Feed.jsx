"use client";
import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const handleSearchChange = (e) => {
    // clearTimeout(searchTimeout);
    // setSearchText(e.target.value);

    // // debounce method
    // setSearchTimeout(
    //   setTimeout(() => {
    //     const searchResult = filterPrompts(e.target.value);
    //     setSearchedResults(searchResult);
    //   }, 500)
    // );
  };
  const fetchPosts = async () => {
    const [allPosts, setAllPosts] = useState([]);
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className='feed'>
    <form className='relative w-full flex-center'>
      <input
        type='text'
        placeholder='Search for a tag or a username'
        value={searchText}
        onChange={handleSearchChange}
        required
        className='search_input peer'
      />
    </form>

       {/* All Prompts */}
       {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}

  </section>
  )
}

export default Feed
