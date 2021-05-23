// Description
// In this exercise we explore a common scenario in ecommerce and booking sites, using filters and search to modify what we render from state.

// Deliverables
// - A user can enter a US state and view a list of breweries in that state
//     - The list has a maximum of 10 breweries in it
//     - The list has three types of breweries that offer brewery tours:
//         - Micro
//         - Regional
//         - Brewpub
//     - Do not show the other types of breweries
// - From the list of breweries, a user can view the following details about each brewery:
//     - Name
//     - Type of brewery
//     - Address
//     - Phone Number
// - From the list of breweries, a user can visit the website of a brewery
// - From the 'filter by type of brewery' section, a user can filter by type of brewery
// - From the 'filter by city' section, a user can filter by city, the location of the brewery
// - From the 'filter by city' section, a user can clear all filters
// - From the 'search' section, a user can search for breweries by:
//     - Name
//     - City


// Instructions
// - Download the files from https://codesandbox.io/s/js-exercise-brewery-tour-starter-template-whq5i?file=/templates/main-section.html
// - Read the "Open Brewery DB" documentation: https://www.openbrewerydb.org/documentation/01-listbreweries
// - Think about which request type to use
// - Create a state object
// - Create a fetch function to get data
// - Create action functions that update state
// - Create render functions that read from state

// Tips
// - Start with the logic first, use console.log(state) to check your logic is working; when the logic is working as expected move onto styling
// - Use a cleanData function to modify the data in the fetch request before adding it to state
// - Use a extractCitiesData function to extract the cities from the data in the fetch request and add it to state for the 'filter by city' section
// - For filter by type use a select element to capture user input
// - For filter by city use a list of checkbox elements to capture user input


// EXAMPLE BREWERY
// {
//     "id": 9094,
//     "obdb_id": "bnaf-llc-austin",
//     "name": "Bnaf, LLC",
//     "brewery_type": "planning",
//     "street": null,
//     "address_2": null,
//     "address_3": null,
//     "city": "Austin",
//     "state": "Texas",
//     "county_province": null,
//     "postal_code": "78727-7602",
//     "country": "United States",
//     "longitude": null,
//     "latitude": null,
//     "phone": null,
//     "website_url": null,
//     "updated_at": "2018-07-24T00:00:00.000Z",
//     "created_at": "2018-07-24T00:00:00.000Z"
//   }

// STATE
const state = {
    breweries: [],
};

// fetching state from the server
function getStateBreweries(UsState) {
    return fetch(`https://api.openbrewerydb.org/breweries?by_state=${UsState}&per_page=50`).then(function (response) {
        return response.json()
    })
}

console.log(getStateBreweries("ohio"))


{/* <form id="select-state-form" autocomplete="off">
<label for="select-state">Which state are you visiting?</label>
<input id="select-state" name="select-state" type="text" />
</form> */}
function bringBrewriesByState() {
    const formEl = document.querySelector('#select-state-form')
    formEl.addEventListener("submit", function (event) {
        event.preventDefault()

        const UnitedState = formEl[`select-state`].value

        getStateBreweries(UnitedState).then(function (serverBreweries) {
            const filteredBreweries = serverBreweries.filter(function (brewery) {
                return (
                    brewery.brewery_type === "brewpub" ||
                    brewery.brewery_type === "micro" ||
                    brewery.brewery_type === "regional"
                )
            })

            const slicedFilteredBreweries = filteredBreweries.slice(0, 10)
            state.breweries = slicedFilteredBreweries;
            console.log(state)




            // HERE WE CAN RENDER THE BREWERY LIST
            renderBreweries()
        })
    })

}

function renderBreweries() {
    for (const brewery of state.breweries) {
        // RENDER A SINGLE BREWERY HERE, CREATE A FUNCTION FOR THIS BREWERY SO IT CAN BE SHOWN IN THE MAIN PAGE
        renderOneBreweryItem(brewery)
    }
}

function renderOneBreweryItem(brewery) {
    const mainEl = document.querySelector("main")

    // GO TO THE MAIN SECTION IN THE TEMPLATES
}





bringBrewriesByState()


// to make sure the brewery offers a tour: activeBreweries = state.breweries.filter( brewery => brewery.brewery_type=== "regional" || brewery.brewery_type=== "micro"|| brewery.brewery_type=== "brewpub" )
// to get the info from the form: formEl.select-state.value
// to match the state to the user query: state.breweries.filter( brewery => brewery.state === formEl.select-state.value )
// if I want to limit the amount of returns from the array we loop like: (let i = 0, i < 10, i++)


// const pageDisplayEl = document.querySelector(".list-results")

// const searchFilterEl = document.createElement("aside")
// const searchResultHeading = document.createElement("h1")
// searchResultHeading.classList.add("results-heading")
// searchResultHeading.innerText = "List of Breweries"
// const searchBarHeader = document.createElement("header")
// searchBarHeader.classList.add("search-bar")
// const listContainerEl = document.createElement("article")
// const breweryListEL = document.createElement("ul")
// breweryListEL.classList.add("breweries-list")

// // input: none
// // action: creates the child elements of the main block of the body
// // output: undefined
// function createsMainElements() {
//     pageDisplayEl.append(searchFilterEl, searchResultHeading, searchBarHeader, listContainerEl)
//     listContainerEl.append(breweryListEL)
//     const breweryEl = createBreweryItem()
//     breweryListEL.append(breweryEl)
//     const searchBarFormEl = createsForm()
//     searchBarHeader.append(searchBarFormEl)
// }

// // input: none
// // action: creates the form inside the header
// // output: the form
// function createsForm() {
//     const searchBarFormEl = document.createElement("form")
//     searchBarFormEl.setAttribute("id", "search-breweries-form")
//     searchBarFormEl.setAttribute("autocomplete", "off")

//     const formLabel = document.createElement("label")
//     formLabel.setAttribute("for", "search-breweries")

//     const labelText = document.createElement("h2")
//     labelText.innerText = "Search breweries:"

//     formLabel.append(labelText)

//     const formInput = document.createElement("input")
//     formInput.setAttribute("id", "search-breweries")
//     formInput.setAttribute("name", "search-breweries")
//     formInput.setAttribute("type", "text")

//     searchBarFormEl.append(formLabel, formInput)

//     return searchBarFormEl
// }


// // input: an item from the array state.breweries
// // action: creates a brewery description
// // return: an element that describes a brewery
// function createBreweryItem() {
//     const breweryEl = document.createElement("li")

//     const breweryName = document.createElement("h2")
//     breweryName.innerText = state.breweries[5].name

//     const breweryType = document.createElement("div")
//     breweryType.classList.add("type")
//     breweryType.innerText = state.breweries[5].brewery_type

//     breweryEl.append(breweryName, breweryType)

//     return breweryEl
// }
