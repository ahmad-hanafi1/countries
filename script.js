const allURL = 'https://restcountries.com/v3.1/all';
let countryURL = 'https://restcountries.com/v3.1/name/{name}';
let regionURL = 'https://restcountries.com/v3.1/region/{region}';


let countryFlag, countryName, countryRegion, countryPopulation, countryArea;
let dataCountries = [];
let dataEntries= [];


countryFlag = document.querySelector(".country-flag");
countryName = document.querySelector(".country-name");
countryRegion = document.querySelector(".region-info");
countryPopulation = document.querySelector(".population-info");
countryArea = document.querySelector(".area-info");



// new div elements: 
let newDiv, flagAndTitle, newCountryFlag, newCountryName,infoDiv, regionDiv, newCountryRegion, populationDiv, newCountryPopulation, areaDiv, newCountryArea, regionTitle, populationTitle, areaTitle;


async function fetchURL(data = [], dataCountries = [], url) {
    const response = await fetch(url); 
    data = await response.json();
    
    for (let i = 0; i < data.length; i++) {
        dataCountries.push(data[i].name.common);
    }
    return data, dataCountries;
}


async function addCountry(url) {


    const response = await fetch(url); 
    const Cdata = await response.json();


    // for (let i = 0; i < data.length; i++) {
    //     dataCountries.push(data[i].name.common);
    // }
    // console.log(data);


    // countryName.innerHTML = data[0].name.common;
    // countryFlag.src = data[0].flags.png;
    // countryRegion.innerHTML = data[0].region;
    // countryPopulation.innerHTML = data[0].population;
    // countryArea.innerHTML = data[0].area;


    let countriesDiv = document.querySelector('.countries');

    newDiv = document.createElement("div");
    newDiv.classList.add("country");
    newDiv.classList.add(Cdata[0].name.common.replace(/ /g, '-').toLowerCase());
    newDivClasses = newDiv.className.split(" ");
    // console.log(newDivClasses);

    dataEntries.push(newDivClasses[1]);
    // newDiv.classList.add(Cdata[0].region);
    

    // console.log(newDiv.classList);
    
    
    flagAndTitle = document.createElement("div");
    flagAndTitle.className = "flag-and-title";

    infoDiv = document.createElement('div');
    infoDiv.className = 'country-info'

    
    // In the flag and title: 
    newCountryFlag = document.createElement('img');
    newCountryFlag.className = 'country-flag';
    newCountryFlag.src = Cdata[0].flags.png;
    
    newCountryName = document.createElement('a');
    newCountryName.className = 'country-name';

    if (Cdata[0].name.common.length < 11) {
        newCountryName.innerHTML = Cdata[0].name.common;   
    }else {
        newCountryName.innerHTML = Cdata[0].name.common.substr(0, 12) + '...'
    }
    newCountryName.href = 'info.html' + '?' + Cdata[0].name.common;



    // In the country-info: 
    regionDiv = document.createElement('div');
    regionDiv.className = 'region-div';

    populationDiv = document.createElement('div');
    populationDiv.className = 'population-div';

    areaDiv = document.createElement('div');
    areaDiv.className = 'area-div';

    // In every child div:

    regionTitle = document.createElement('p');
    regionTitle.className = "info-title";
    regionTitle.innerHTML = 'region';

    populationTitle = document.createElement('p');
    populationTitle.className = "info-title";
    populationTitle.innerHTML = 'population';

    areaTitle = document.createElement('p');
    areaTitle.className = "info-title";
    areaTitle.innerHTML = 'area';


    newCountryRegion = document.createElement('h4');
    newCountryRegion.className = 'region-info'
    newCountryRegion.innerHTML = Cdata[0].region;


    newCountryPopulation = document.createElement('h4');
    newCountryPopulation.className = 'population-info'
    newCountryPopulation.innerHTML = Cdata[0].population;


    newCountryArea = document.createElement('h4');
    newCountryArea.className = 'area-info'
    newCountryArea.innerHTML = Cdata[0].area + " KM²";
    

    // Forming the new Div:
    regionDiv.appendChild(regionTitle);
    regionDiv.appendChild(newCountryRegion);

    populationDiv.appendChild(populationTitle);
    populationDiv.appendChild(newCountryPopulation);

    areaDiv.appendChild(areaTitle);
    areaDiv.appendChild(newCountryArea);


    flagAndTitle.appendChild(newCountryFlag);
    flagAndTitle.appendChild(newCountryName);
    
    infoDiv.appendChild(regionDiv);
    infoDiv.appendChild(populationDiv);
    infoDiv.appendChild(areaDiv);

    
    
    countriesDiv.appendChild(newDiv);
    newDiv.appendChild(flagAndTitle);
    newDiv.appendChild(infoDiv);

}

window.addEventListener('load', async()=> {
    let data, dataCountries = await fetchURL(data=[], datacountries=[], allURL);
    let slice = countryURL.substring(36); 
    console.log(slice)
    // countryURL = countryURL.replace(slice, 'North Macedonia');
    
    // addCountry(countryURL);


    dataCountries.forEach(element => {
        let slice = countryURL.substring(36);      
        countryURL = countryURL.replace(slice, element);
    
        addCountry(countryURL);

    });
    
    

});



// Searchbar with filtering:

searchBar = document.querySelector('.searchbar');

searchBar.addEventListener('keyup', (e) => {
    const term = e.target.value.toLowerCase().replace(/ /g,"-");
    console.log(term);
    console.log(dataEntries);

    elements = document.getElementsByClassName('country');

    Array.from(elements).forEach(element => {
        let Cname = element.classList[1];
        console.log(Cname); 
        if (Cname.toLowerCase().indexOf(term) == -1) {
            console.log(element.style.display);
            element.style.display = "none";
            console.log(element.style.display);

        }else {
            element.style.display = "flex";
        }
        // console.log(Cname);
    })

});


// Buttons:

allButton = document.querySelector('.all');
asiaButton = document.querySelector(".asia");
africaButton = document.querySelector(".africa");
americaButton = document.querySelector(".america");
europeButton = document.querySelector(".europe");
oceaniaButton = document.querySelector(".oceania");
polarButton = document.querySelector(".polar");


// const regions = ['asia': 'asia' ,'africa', 'americas', 'europe', 'oceania', 'polar'];

async function buttonFilter(region) {
    let data, dataCountries =  await fetchURL(datr = [],dataCountries = [] ,allURL);
    // dataCountries.forEach(element => {
    //     let slice = countryURL.substring(36);      
    //     countryURL = countryURL.replace(slice, element);

    //     for(let i = 0;dataCountries.length; i++) {
    //         if (data[0].region === region) {
                
    //             addCountry();
    //         }
        
    //     }

    // });
    
    

}


let regions = {

    asia: 'Asia',
    africa: 'Africa',
    america: 'Americas',
    europe: 'Europe',
    oceania: 'Oceania',
    polar: 'Polar'

}


americaButton.addEventListener('click', async ()=> {
    let data, dataCountries =  await fetchURL(data = [],dataCountries = [] ,allURL);
    buttonFilter(regions.america);
    console.log('clicked ');
});


// Dark Mode: 