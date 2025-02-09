import React from 'react'

const SearchBar = () => {
    return (
        <>
            <form>
                <input placeholder='Subject Code eg - MA101' maxLength={5} className='w-64 border-2 px-2 border-black rounded'/>
            </form>
        </>
    )
}

export default SearchBar;