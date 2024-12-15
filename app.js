//stars dom
const stars = document.getElementById("stars");

//object for star image
const starObject= [
{
    id:1,
    image: '/images/Vector.svg',
},
{
    id:2,
    image: '/images/Vector.svg',
},
{
    id:3,
    image: '/images/Vector.svg',
},
{
    id:4,
    image: '/images/star-half.svg',
},
{
    id:5,
    image: '/images/empty-star.svg',
},

]
// Create an img element for each star
starObject.map(star => {
    
    const img = document.createElement('img');
    img.src = star.image; 
    img.alt = `Star ${star.id}`; 
    img.className = 'w-[18px]'; 
    
    stars.appendChild(img);
});