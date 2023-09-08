"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";
import SearchBoxStyles from "./page.module.css";

//this is the component for the search input
export default function SearchInput() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();
  //here we are handling the search process
  const handleSearch = (event: FormEvent) => {
    event.preventDefault();

    /* encode the search query to uri */
    const encodedQuery = encodeURI(searchQuery);

    router.push(`/search?q=${encodedQuery}`); //here we are redirecting the user to the search page
  };

  return (
    <div className={SearchBoxStyles.container}>
      <form onSubmit={handleSearch} className={SearchBoxStyles.box}>
        <input
          placeholder={`Search TrekDiaries`}
          value={searchQuery}
          // onchange we are setting the search query
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button title="search" type="submit">
          <FaSearch className={SearchBoxStyles.icon} />
        </button>
      </form>
    </div>
  );
}
