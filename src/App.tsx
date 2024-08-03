import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [formData, setFormData] = useState({ field1: '', field2: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the formData state
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);
  };

  useEffect(() => {
    // Function to send data to the server
    const sendData = () => {
      console.log("Sending form data to server:", formData);

      fetch('http://localhost:5001/api/cacheData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Data successfully sent to server:', data);
        })
        .catch(error => {
          console.error('Error sending data to server:', error);
        });
    };

    // Set up interval to send data every 1 second
    const intervalId = setInterval(sendData, 1000);

    // Cleanup interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [formData]);

  useEffect(() => {
    // Retrieve initial data from the server
    fetch('http://localhost:5001/api/getData')
      .then(response => response.json())
      .then(data => {
        console.log('Data retrieved from server:', data);
        setFormData(data);
      })
      .catch(error => {
        console.error('Error retrieving data from server:', error);
      });
  }, []);

  return (
    <div>
      <h1>nithinHR Form Plugin VERSION 2</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>
            Field 1:
            <input
              type="text"
              name="field1"
              value={formData.field1}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Field 2:
            <input
              type="text"
              name="field2"
              value={formData.field2}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="button" onClick={() => {
          console.log("Manually saving form data:", formData);

          fetch('http://localhost:5001/api/cacheData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          })
            .then(response => response.json())
            .then(data => {
              console.log('Data successfully sent to server:', data);
            })
            .catch(error => {
              console.error('Error sending data to server:', error);
            });
        }}>Save Data</button>
      </form>
    </div>
  );
};

export default App;