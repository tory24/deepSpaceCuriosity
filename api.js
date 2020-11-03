//HTML Id Link
const image = document.getElementById('nasa-image');
const title = document.getElementById('title');
const author = document.getElementById('author');
const date = document.getElementById('date');
const id = document.getElementById('id');
const description = document.getElementById('photo-desc');
const strong = document.getElementById('fullRes');
const link = document.getElementById('photo-link');
//Url
const imageApiUrl = `https://images-api.nasa.gov/search?media_type=image&page=${Math.floor(Math.random()*101)}`;

async function getImage() {
    try {
        let response = await fetch(imageApiUrl);
        if(response.ok) {
            const jsonResponse = await response.json();
            
            //Find a random Image
            const randImage = jsonResponse.collection.items[ Math.floor(Math.random() * jsonResponse.collection.items.length)];
            const randImageData = randImage.data[0];

            //Json link containing image sizes/links
            const randImageJson = randImage.href;
            
            let newResponse = await fetch(randImageJson);
            if(newResponse.ok) {
                const newJson = await newResponse.json();
                
                //Global Image variable declarations
                var randImageMed;
                var randImageOrig;
                //If the href array is larger than 4, then use the medium size image
                if(newJson.length > 4) {
                    randImageMed = newJson[3]
                    randImageOrig = newJson[0];
                //Else only images of lower res are available, so make both the original size
                } else {
                    randImageMed = newJson[0];
                    randImageOrig = newJson[0];
                };
                //Update image src, link to orig
                image.src = `${randImageMed}`;
                link.href = randImageOrig;
            }
            //Title of Image
            title.innerHTML = `${randImageData.title}`;
            //Date of Image
            date.innerHTML = `${randImageData.date_created.slice(0,10).split('-').reverse().join('-')}`;
            //Description of Image
            description.innerHTML = `${randImageData.description}`;
            //Image Id
            id.innerHTML = `Photo Id: ${randImageData.nasa_id}`;

            /*
            
            Add Information of photographer if availabe
            
            */
        } else {
            throw "Problem Loading Page :(";
        }
    } catch (error) {
        title.textContent = error;
    } 
}
getImage();