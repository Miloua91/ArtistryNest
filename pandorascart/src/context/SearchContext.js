import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function SearchProvider ({ children }){
    const [searchQuery, setSearchQuery] = useState('');
    
    function updateSearchQuery(query){
        setSearchQuery(query);
    };

    return (
        <SearchContext.Provider value={{ searchQuery, updateSearchQuery}}>
            {children}
        </SearchContext.Provider>
    );
};

export function useSearch(){
    return useContext(SearchContext);
}