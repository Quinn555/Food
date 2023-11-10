import { useState, useEffect } from 'react';
import './App.css';
import video from './images/fancyOrcastraPeople.mp4'

function App() {
  const [mainMenu, setmainMenu] = useState([]);
  const [dataCat, setDataCat] = useState([]);
  const [imagesHtml, setImagesHtml] = useState([]);

  //Main screen Selection
  useEffect(() => {
    async function getLink() {
      const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
      const response = await fetch(url);
      const data = await response.json();
      const dataCat = data.categories;
      setmainMenu(dataCat);
      setDataCat(dataCat);
    }

    getLink();
  }, []);

  //Selection based off of what user pressed
  async function getLinkOnButton(imgLink) {
    const foodSelected = `${imgLink.strCategory ?? imgLink.strMeal}`;
    let url = '';
    if (foodSelected === imgLink.strCategory) {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${foodSelected}`;
      console.log('broken');
    }
    else{
      const trueFood = foodSelected.split(' ').join('_');
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${trueFood}`;
      console.log(url);
    }
    const response = await fetch(url);
    const data = await response.json();
    const dataCat = data.meals;
    setDataCat(dataCat);
  }

  //Displays the stuff
  useEffect(() => {
    console.log(dataCat);
    let imagesArray = dataCat.map((imgLink) => (
      <div key={imgLink.idCategory ?? imgLink.idMeal}>
        <button className='buttonStuff fancy' onClick={() => getLinkOnButton(imgLink)}>
          {imgLink.strCategory ?? imgLink.strMeal}
        </button>
        <div className='options'>
          <div className='smallImg' style={{ backgroundImage: `url(${imgLink.strCategoryThumb ?? imgLink.strMealThumb})` }}>
          </div>
        </div>
        
      </div>
    ));
    setImagesHtml(imagesArray);
  }, [dataCat]);

  return (
    <div className="App">
      <div className='main'>
        <video autoPlay loop muted>
          <source src={video} type="video/mp4"/>
       </video>
        <div className='stuff-in-menu'>
          <button className='title fancy' onClick={() => setDataCat(mainMenu)}>Menu</button>
          <div className='main-menu'>{imagesHtml}</div>
        </div>
      </div>
    </div>
  );
}

export default App;