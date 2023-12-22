interface YourSearchInputProps {
    isSearch: boolean;
    cancelSearch:() => void;
    searchName: string
}

const YourSearchInput:React.FC<YourSearchInputProps> = (props) => {
    const {
        isSearch,
        cancelSearch,
        searchName
    } = props

    if (!isSearch) {
        return null
    } else {
        return (
            <div className="mt-2 mb-2">
                <div>
                    Result for : {searchName}
                    <button 
                        style={{backgroundColor:"transparent", border:"none"}}
                        onClick={cancelSearch}
                        >
                        <i className="fa-solid fa-circle-minus"></i>
                    </button>
                </div>
            </div>
        )
    } 
}

export default YourSearchInput