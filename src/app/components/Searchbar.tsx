import React, { useState, useEffect } from "react";
import { showcreator } from "@/actions/serveraction";


interface SearchResult {
    username?: string;
    id?: number;
}

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState<string>("");
    const [debouncedQuery, setDebouncedQuery] = useState<string>("");
    const [results, setResults] = useState<SearchResult[]>([]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [query]);


    useEffect(() => {
        if (debouncedQuery) {
            fetchData(debouncedQuery);
        }
    }, [debouncedQuery]);

    const fetchData = async (searchText: string): Promise<void> => {
        let data=await showcreator(searchText)
         let finaldata =JSON.parse(JSON.stringify(data));
        try {
        
        
          setResults(finaldata || []);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
    };

    return (
        <div style={{ width: "300px", margin: "50px auto" }}>
            <input
                type="text"
                placeholder="Explore Creators"
                value={query}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setQuery(e.target.value)
                }
                className="text-white placeholder-white p-2 border-2"
            />

            <ul>
                {results.map((item, index) => (
                    <li key={item.id ?? index}>{item.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBar;