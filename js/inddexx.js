// wether api link :    http://api.weatherapi.com/v1/forecast.json?key=3008667188e243a78c185020242112&q=07112&days=3

//  key :      3008667188e243a78c185020242112


let rowDiv = document.getElementById("rowData")

let inputField = document.getElementById("inpfield")

let findBtn = document.getElementById("findBtn")


navigator.geolocation.getCurrentPosition( (posit) => {

    let x = posit.coords.latitude
    let y =  posit.coords.longitude

    callApi( `${x},${y}` )

} , (error) => {
    
    console.error("Geolocation error:", error.message); // Log the error for debugging

    callApi("cairo")

} )


inputField.addEventListener("input" , function(e){

    let val = e.target.value
   
    if( val.length > 2 ){

        callApi(val)

    }
    
})


async function callApi(query){

    try{

        const response = await fetch( `https://api.weatherapi.com/v1/forecast.json?key=3008667188e243a78c185020242112&q=${query}&days=3` )

        const data = await response.json();
        
        displayData( data )


    }catch(error){
        console.log( error)
    }

}



function displayData( datta ){

    let allData = datta

    let forecastArr = datta.forecast.forecastday


    let cartona = ""

    for( let i = 0 ; i < forecastArr.length ; i++ ){

        let day = getDay( forecastArr[i].date )

        let month = getMonthName( forecastArr[i].date )


        cartona += `
        
        ${ i == 0 ? 

            `
                    <div class="col-md-4  cardOne text-white mb-3">

                    <div class="headOne d-flex justify-content-between align-items-center">
                        <div>${ day.dayName }</div>
                        <div>${ day.dayNum} ${ month }</div>
                    </div>   
                    
                    <div class="booody">

                        <div class="location">${ allData.location.name }</div>

                        <div class="tempp ms-1">${ allData.current.temp_c }<sup>o</sup>C </div>

                        <div> <img src="https:${ allData.current.condition.icon }" style="width:80px" > </div>

                        <div class="status text-info">${ allData.current.condition.text }</div>
        
                        <div class="mt-3">
                            <span><img src="images/icon-umberella.png"> ${ forecastArr[i].day.maxwind_kph }%</span>
                            <span class="ms-4" ><img src="images/icon-wind.png"> ${ forecastArr[i].day.avghumidity }km/h</span>
                            <span class="ms-4" ><img src="images/icon-compass.png"> ${ allData.current.wind_dir }</span>
                        </div>

                    </div>       

                </div>
            `

            : i == 1 ?

            `
                            <div class="col-md-4  text-center cardTwo text-white mb-3">

                    <div class="headTwo  d-flex justify-content-center align-items-center">
                        <div>${ day.dayName }</div>
                    </div>   
                    
                    <div class="booody">

                        <div> <img src="https:${  forecastArr[i].day.condition.icon }" > </div>

                        <div class="fs-2 fw-bold my-2 ms-1">${ forecastArr[i].day.maxtemp_c }<sup>o</sup>C </div>

                        <div class="ms-1 my-2 minTemp">${ forecastArr[i].day.mintemp_c }<sup>o</sup>C </div>

                        <div class="status text-info">${ forecastArr[i].day.condition.text }</div>
    

                    </div>       

                </div>

            `

            : i == 2 ? 
            `
            
                <div class="col-md-4 text-center cardThree text-white mb-3">

                    <div class="headThree  d-flex justify-content-center align-items-center">
                        <div>${ day.dayName }</div>
                    </div>   
                    
                    <div class="booody">

                        <div> <img src="https:${  forecastArr[i].day.condition.icon }" > </div>

                        <div class="fs-2 fw-bold my-2 ms-1">${ forecastArr[i].day.maxtemp_c }<sup>o</sup>C </div>

                        <div class="ms-1 my-2 minTemp">${ forecastArr[i].day.mintemp_c }<sup>o</sup>C </div>

                        <div class="status text-info">${ forecastArr[i].day.condition.text }</div>

                    </div>       

                </div>

            `

            :""

         }
        
        `

    }

    rowDiv.innerHTML = cartona

}


function getDay( date ){

    let dday = new Date( date )

    let dayName = dday.toLocaleString( "en-us" , { weekday : "long" } )

    let dayNum = dday.toLocaleString( "en-us" , { day : "2-digit" } )

    return {dayName , dayNum}

}

function getMonthName(date){

    let montth = new Date( date )

    let name = montth.toLocaleString( "en-us" , { month : "long" } ) 

    return name;
}








