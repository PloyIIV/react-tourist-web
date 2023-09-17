import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [searchTitle, setSearchTitle] = useState("");
  const [title, setTitle] = useState([]);
  const [clickTitle, setClickTitle] = useState([]);
  

  const handleClick = (item) => {
    const newArray = [...clickTitle];
    setClickTitle(newArray)
    newArray.push(item);
    const joinArr = newArray.join(" ")
    setSearchTitle(joinArr)
  }

  const handlerInput = (event) => {
    setSearchTitle(event.target.value);
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4001/trips?keywords=${searchTitle}`
      );
      setTitle(response.data.data);
      // console.log(response);
      // console.log(response.data.data[1].description.length)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [searchTitle]);

  return (
    <div className="flex flex-col items-center justify-center font-['Prompt']">
      <div className="w-3/5 h-40 mt-7 text-center flex flex-col justify-center">
        <h1 className="text-5xl font-semibold text-sky-500">เที่ยวไหนดี</h1>
        <label className="text-left pl-5">ค้นหาที่เที่ยว</label>
        <input
          className="rounded-full h-10 w-full pl-5 mt-2 bg-gray-50"
          type="text"
          value={searchTitle}
          onChange={handlerInput}
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
        />
        <hr className="border-2 border-gray-300 mt-3" />
      </div>
      {/* Search result */}
      <div className="w-2/3">
        {title.map((item, index) => {
          return (
            <div key={index} className="flex flex-row my-5 items-center relative shadow-xl p-5 rounded-2xl">
              <div className="">
                <img src={item.photos[0]} className="rounded-3xl object-cover h-60 w-96" />
              </div>
              <div className="flex flex-col ml-5">
                <h1 className="text-2xl font-medium tracking-tight my-3"><a target="_blank" href={item.url}>{item.title}</a></h1>
                <p className="text-gray-500">{item.description.slice(0,100)} <span className="text-blue-400 font-bold">...</span></p>
                <a className="text-blue-500 underline" target="_blank" href={item.url}>อ่านต่อ</a>
                <div className="flex flex-row">
                  <h1>หมวด</h1>
                  <div className="ml-3">{item.tags.map((tag, index) => {
                    // onClick={() => setSearchTitle(tag)}
                    return <a key={index} className="hover:text-rose-400 mr-2 underline" onClick={() => handleClick(tag)} >{tag}</a>
                  })}</div>
                </div>
                {/* More image */}
                <div className="flex flex-row">
                  {item.photos.map((photo, index) => {
                    return index >= 1 && (<img key={index} src={photo} className="w-20 h-20 object-cover rounded-xl mr-3" />)
                  })}
                </div>
                {/* Copy to Clipboard Button */}
                <div className="absolute right-6 bottom-3 text-right hover:text-blue-500" onClick={() => {navigator.clipboard.writeText(item.url); alert("Copy completed")}}>🔍 Click to copy</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
