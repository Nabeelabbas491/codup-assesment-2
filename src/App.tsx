import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

interface User {
  avatar : string,
  country : string,
  createdAt : string,
  first_name : string,
  id : string,
  last_name : string,
  vehicle : string,
}


function App() {

  const [data, setData] = useState<null | undefined | User[]>(null);
  const [tempData, setTempData] = useState<null | undefined | User[]>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://65609c5083aba11d99d12eb3.mockapi.io/api/v1/users");
      setData(response.data);
      setTempData(response.data)
      setError(null)
    } catch (error: unknown | any) {
      setError(error.message || 'Something went wrong. Please refresh the page and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = (event:any) => {
    setSearchQuery(event.target.value);
    if(event.target.value.length){
      const filteredData:User[] | undefined = tempData?.filter((item) =>
        item.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.vehicle.toLowerCase().includes(searchQuery.toLowerCase())
      );
       setData(filteredData)
    }else{
        const data = structuredClone(tempData)
        setData(data)
    }
  }

  return (
    <div className="App">
        {error && <div style={{ margin: '10px 0px',color : 'red' }}> {error} </div>}
        {loading && <div style={{ margin: '10px 0px' }}>Loading Data...</div> }
        {data && <div>
          <input
           type="text"
           placeholder="Search by first name, last name, or vehicle..."
           value={searchQuery}
           onChange={handleSearch}
           style={{ margin: '10px 0px', width : '300px' }}
            />
             {data?.map((item:User) => {
              return <div className='list-item' key={item.id}>
              <img src={item.avatar} />
              <div>
                 <div>Name : {item.first_name} {item.last_name}</div>
                 <div>Vehicle : {item.vehicle} </div>
              </div>
           </div>
             })}
        </div>}
    </div>
  );
}

export default App;
