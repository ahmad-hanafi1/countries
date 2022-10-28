const allURL = 'https://restcountries.com/v3.1/all';
let countryURL = 'https://restcountries.com/v3.1/name/{name}';
let regionURL = 'https://restcountries.com/v3.1/region/{region}';
let currentURL = window.location.href;
let countryNameURL = currentURL.substring(52);
let triposoURL = 'https://www.triposo.com/api/20210317/location.json?countrycode=tr&account=BO8ZGTE0&token=nqqr5zzkgyzb6ueisi0mlqa31dkyn024&count=6';

let currentCountryCode;
let data;

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}
// first section details

let flag, countryName, Name, capital, area, callingCode, currency, nativeName, region, population, gini, tld;

flag = document.querySelector('.info-flag');
countryName = document.querySelector('.info-title-2');
Name = document.querySelector('.name');
capital = document.querySelector('.capital');
area = document.querySelector('.area');
callingCode = document.querySelector('.calling-code');
currency = document.querySelector('.currency');
nativeName = document.querySelector('.native-name');
region = document.querySelector('.region');
population = document.querySelector('.population');
gini = document.querySelector('.gini');
tld = document.querySelector('.tld');


async function fetchFunction (URL) {
    const response = await fetch(URL)
    data = await response.json();
    
}

async function setMainValues(URL) {

    // const response = await fetch(URL); 
    // data = await response.json();

    flag.src = data[0].flags.png;
    countryName.innerHTML = data[0].name.common;
    Name.innerHTML =  data[0].name.common;
    capital.innerHTML = data[0].capital[0];
    area.innerHTML = data[0].area + ' KM²';
    callingCode.innerHTML = data[0].idd.root + data[0].idd.suffixes[0];

    let currencyObject = data[0].currencies;
    currency.innerHTML = data[0].currencies[Object.keys(currencyObject)[0]].name;

    let nativeNameObject = data[0].name.nativeName;
    nativeName.innerHTML = data[0].name.nativeName[Object.keys(nativeNameObject)[0]].common;
    region.innerHTML = data[0].region;
    population.innerHTML = data[0].population;
    let giniObject = data[0].gini;

    gini.innerHTML = data[0].gini[Object.keys(giniObject)[0]];
    tld.innerHTML = data[0].tld[0];
}



window.addEventListener('load',async () => {
// Section one: 

    let oldName = countryURL.substring(36);
    countryURL = countryURL.replace(oldName, countryNameURL);
    // console.log(countryURL);

    
    await fetchFunction(countryURL);
    setMainValues(countryURL);
    currentCountryCode = data[0].cca2;
    console.log(currentCountryCode);

// Section two:

    let oldCode = triposoURL.substring(63, triposoURL.indexOf('&'));
    console.log(oldCode);
    console.log(currentCountryCode);
    triposoURL = triposoURL.replaceAt(63, currentCountryCode);
    console.log(triposoURL)


    // await fetchFunction(triposoURL);

    const response2 = await fetch(triposoURL);
    const data2 = await response2.json();
    const cityImages = document.getElementsByClassName('city-image');
    const cityNames =  document.getElementsByClassName('city-name');
    const cityScores =  document.getElementsByClassName('city-score');

    data2.results.map((value, index) => {
        cityImages[index].src = value.images[0].sizes.medium.url
        cityNames[index].innerHTML = value.name;
        cityScores[index].innerHTML = 'score: ' + value.score.toFixed(2);
    });

// Section three: 


    const borders = data[0].borders;
    // console.log('here')
    console.log(borders);



    images = document.getElementsByClassName('neighbor-image');
    // console.log(images);
    neighborNames = document.getElementsByClassName('neighbor-name');


    neighborRegions = document.getElementsByClassName('neighbor-region');
    neighborPopulation = document.getElementsByClassName('neighbor-population');
    neighborArea = document.getElementsByClassName('neighbor-area');

    // console.log(images, neighborNames,neighborRegions,neighborArea,neighborPopulation);
    let length = images.length;
    let i = 0;
    // console.log(countryURL);
    countryURL = countryURL.replace('name', 'alpha')
    // console.log(countryURL);

    let neighborDetails = borders.map(async (code, i) => { 

        // for the seconed section: 
        



        oldName = countryURL.substring(37);
        console.log(countryURL)
        console.log(oldName);
        
        countryURL = countryURL.replace(oldName, code);
        
        
       await fetchFunction(countryURL);

        images[i].src = data[0].flags.png;
        neighborNames[i].innerHTML = data[0].name.common;
        neighborRegions[i].innerHTML =  data[0].region;
        neighborArea[i].innerHTML = data[0].area + ' KM²';
        neighborPopulation[i].innerHTML = data[0].population;
        
    })



    





    // console.log(neighborDetails);

    // while (i < length) {
        
    //     oldName = countryURL.substring(37);
        
    //     countryURL = countryURL.replace(oldName, borders[i]);
        
        
    //     await fetchFunction(countryURL);
    //     images[i].src = data[0].flags.png;
    //     neighborNames[i].innerHTML = data[0].name.common;
    //     neighborRegions[i].innerHTML =  data[0].region;
    //     neighborArea[i].innerHTML = data[0].area + ' KM²';
    //     neighborPopulation[i].innerHTML = data[0].population;


    //     i++;
    // }

    
})