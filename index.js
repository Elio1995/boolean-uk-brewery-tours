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
const mainEl = document.querySelector("main")
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

        const unitedState = formEl[`select-state`].value

        getStateBreweries(unitedState).then(function (serverBreweries) {
            const filteredBreweries = serverBreweries.filter(function (brewery) {
                return (
                    brewery.brewery_type === "brewpub" ||
                    brewery.brewery_type === "micro" ||
                    brewery.brewery_type === "regional"
                )
            })

            // const slicedFilteredBreweries = filteredBreweries.slice(0, 10)
            state.breweries = slicedFilteredBreweries;
            // console.log(state)




            // HERE WE CAN RENDER THE BREWERY LIST
            renderBreweries()
        })
    })

}

function renderBreweries() {

    const slicedFilteredBreweries = state.breweries.slice(0, 10)

    for (const brewery of slicedFilteredBreweries) {
        // RENDER A SINGLE BREWERY HERE, CREATE A FUNCTION FOR THIS BREWERY SO IT CAN BE SHOWN IN THE MAIN PAGE
        renderOneBreweryItem(brewery)
    }
}


function renderOneBreweryItem(brewery) {


    // GO TO THE MAIN SECTION IN THE TEMPLATES
}

function renderFilterSection() {
    const searchFilterEl = document.createElement("aside")
    searchFilterEl.classList.add("filters-section")

    const filterByTypeHeading = document.createElement("h2")
    filterByTypeHeading.innerText = "Filter By:"

    const filterByTypeForm = document.createElement("form")
    filterByTypeForm.setAttribute("id", "filter-by-type-form")
    filterByTypeForm.setAttribute("autocompete", "off")

    const filterByTypeLabel = document.createElement("label")
    filterByTypeLabel.setAttribute("for", "filter-by-type")

    const labelText = document.createElement("h3")
    labelText.innerText = "Type of Brewery"

    filterByTypeLabel.append(labelText)

    const filterDropdown = document.createElement("select")
    filterDropdown.setAttribute("name", "filter-by-type")
    filterDropdown.setAttribute("id", "filter-by-type")

    const defaultOption = document.createElement("option")
    defaultOption.setAttribute("value", "")
    defaultOption.innerText = "Select a type..."

    defaultOption.addEventListener("click", function () {
        state.breweryTypeFilter = filterDropdown.value

        if (state.breweryCityFilter.length >= 1) {
            const filteredBreweries = state.breweries.filter(brewery => state.breweryCityFilter.includes(brewery.city))
            createsMainElements(filteredBreweries)
        } else {
            createsMainElements(state.breweries)
        }
    })
    const microOption = document.createElement("option")
    microOption.setAttribute("value", "micro")
    microOption.innerText = "Micro"

    microOption.addEventListener("click", function () {
        state.breweryTypeFilter = filterDropdown.value

        typeMixedFilter()
    })

    const regionalOption = document.createElement("option")
    regionalOption.setAttribute("value", "regional")
    regionalOption.innerText = "Regional"

    regionalOption.addEventListener("click", function () {
        state.breweryTypeFilter = filterDropdown.value

        typeMixedFilter()
    })

    const brewpubOption = document.createElement("option")
    brewpubOption.setAttribute("value", "brewpub")
    brewpubOption.innerText = "Brewpub"

    brewpubOption.addEventListener("click", function () {
        state.breweryTypeFilter = filterDropdown.value

        typeMixedFilter()
    })

    filterDropdown.append(defaultOption, microOption, regionalOption, brewpubOption)

    state.breweryTypeFilter = filterDropdown.value

    filterByTypeForm.append(filterByTypeLabel, filterDropdown)

    const filterByCityHeading = document.createElement("div")
    filterByCityHeading.classList.add("filter-by-city-heading")

    const filterByCityHeadingText = document.createElement("h3")
    filterByCityHeadingText.innerText = "Cities"

    const resetButton = document.createElement("button")
    resetButton.classList.add("clear-all-btn")
    resetButton.innerText = "clear all"

    resetButton.addEventListener("click", function () {
        for (const checkbox of filterByCityForm.childNodes) {
            checkbox.checked = false
        }
        state.breweryCityFilter = []

        if (state.breweryTypeFilter.length >= 1) {
            let filteredBreweries = state.breweries.filter(brewery => brewery.brewery_type === state.breweryTypeFilter)
            createsMainElements(filteredBreweries)
        } else {
            createsMainElements(state.breweries)
        }
    })

    filterByCityHeading.append(filterByCityHeadingText, resetButton)

    const filterByCityForm = document.createElement("form")
    filterByCityForm.setAttribute("id", "filter-by-city-form")

    const currentBreweryCityArrayWithDuplicates = state.breweries.map(brewery => brewery.city)
    const currentBreweryCityArray = []

    for (const breweryCity of currentBreweryCityArrayWithDuplicates) {
        if (!currentBreweryCityArray.includes(breweryCity)) {
            currentBreweryCityArray.push(breweryCity)
        }
    }
    for (const breweryCity of currentBreweryCityArray.sort()) {
        const cityCheckbox = document.createElement("input")
        cityCheckbox.setAttribute("type", "checkbox")
        cityCheckbox.setAttribute("name", breweryCity)
        cityCheckbox.setAttribute("value", breweryCity)

        cityCheckbox.addEventListener("click", function () {
            if (state.breweryTypeFilter.length >= 1) {
                let filteredBreweries = state.breweries.filter(brewery => brewery.brewery_type === state.breweryTypeFilter)
                console.log(filteredBreweries)
                if (!state.breweryCityFilter.includes(cityCheckbox.value)) {
                    state.breweryCityFilter.push(cityCheckbox.value)
                    filteredBreweries = filteredBreweries.filter(brewery => state.breweryCityFilter.includes(brewery.city))
                    console.log(filteredBreweries)
                    createsMainElements(filteredBreweries)
                } else if (state.breweryCityFilter.includes(cityCheckbox.value)) {
                    const itemToRemoveIndex = state.breweryCityFilter.findIndex(city => city === cityCheckbox.value)
                    state.breweryCityFilter.splice(itemToRemoveIndex, 1)
                    filteredBreweries = filteredBreweries.filter(brewery => state.breweryCityFilter.includes(brewery.city))
                    if (state.breweryCityFilter.length >= 1) {
                        console.log(filteredBreweries)
                        createsMainElements(filteredBreweries)
                    } else {
                        filteredBreweries = state.breweries.filter(brewery => brewery.brewery_type === state.breweryTypeFilter)
                        createsMainElements(filteredBreweries)
                    }
                }
            } else {
                if (!state.breweryCityFilter.includes(cityCheckbox.value)) {
                    state.breweryCityFilter.push(cityCheckbox.value)
                    const filteredBreweries = state.breweries.filter(brewery => state.breweryCityFilter.includes(brewery.city))
                    console.log(filteredBreweries)
                    createsMainElements(filteredBreweries)
                } else if (state.breweryCityFilter.includes(cityCheckbox.value)) {
                    const itemToRemoveIndex = state.breweryCityFilter.findIndex(city => city === cityCheckbox.value)
                    state.breweryCityFilter.splice(itemToRemoveIndex, 1)
                    const filteredBreweries = state.breweries.filter(brewery => state.breweryCityFilter.includes(brewery.city))
                    if (state.breweryCityFilter.length >= 1) {
                        console.log(filteredBreweries)
                        createsMainElements(filteredBreweries)
                    } else {
                        console.log(filteredBreweries)
                        createsMainElements(state.breweries)
                    }
                }
            }
        })

        const cityLabel = document.createElement("label")
        cityLabel.setAttribute("for", breweryCity)
        cityLabel.innerText = breweryCity

        filterByCityForm.append(cityCheckbox, cityLabel)
    }

    searchFilterEl.append(filterByTypeHeading, filterByTypeForm, filterByCityHeading, filterByCityForm)

    pageDisplayEl.append(searchFilterEl)
}
}

function typeMixedFilter() {
    if (state.breweryCityFilter.length >= 1) {
        let filteredBreweries = state.breweries.filter(brewery => state.breweryCityFilter.includes(brewery.city))
        console.log(filteredBreweries)
        filteredBreweries = filteredBreweries.filter(brewery => brewery.brewery_type === state.breweryTypeFilter)
        console.log(filteredBreweries)
        createsMainElements(filteredBreweries)
    } else {
        const filteredBreweries = state.breweries.filter(brewery => brewery.brewery_type === state.breweryTypeFilter)
        console.log(filteredBreweries)
        createsMainElements(filteredBreweries)
    }
}







bringBrewriesByState()



