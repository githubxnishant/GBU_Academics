import React from 'react'

const SearchBar = () => {
    return (
        <>
            <form>
                <input placeholder='Subject Code' maxLength={5} className='md:w-64 w-24 border-2 px-2 border-black rounded'/>
            </form>
        </>
    )
}

export default SearchBar;