import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectViewedData, closeViewedData, updateJournalEntry } from './journalSlice';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { selectUserId, } from '../login/loginSlice';

/**
 * Component for displaying the selected trade entry and updating its information.
 *
 * This component fetches the selected trade entry from the Redux store using the `useAppSelector` hook.
 * It allows the user to update the trade information and dispatches the `updateJournalEntry` action
 * to update the trade entry in the backend server.
 *
 * @component
 */
const ViewandUpdate = () => {
  const dispatch = useAppDispatch();
  const viewedData = useAppSelector(selectViewedData);
  const userid = useAppSelector(selectUserId);
  const [showForm, setShowForm] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    // State for form inputs
    strategy: '',
    description: '',
    entryprice: '',
    exitprice: '',
    position: '',
    instrument: '',
    date: '',
    time: '',
    image: null as File | null,
    user: userid,
    quantity: '',
    winorlose: '',
    showAddForm: false,
  });

  // Handle image change when user selects an image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUpdatedData({ ...updatedData, image: file });
    }
  };

  // Handle view in view and update
  const handleViewinviewandupdate = (viewedData: any) => {
  };

  // Handle the update button click
  const handleUpdate = () => {
    const datePattern = /^\d{2}-\d{2}-\d{4}$/; // Regex pattern for DD-MM-YYYY format
    const timePattern = /^\d{2}:\d{2}$/; // Regex pattern for HH:MM format

    // Validate date format
    if (!datePattern.test(updatedData.date)) {
      alert('Please enter the date in the format DD-MM-YYYY.');
      return;
    }

    // Validate time format
    if (!timePattern.test(updatedData.time)) {
      alert('Please enter the time in the format HH:MM.');
      return;
    }

    const dateParts = updatedData.date.split('-'); // Split the date string into parts
    const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`; // Rearrange the parts

    let updatedEntry: any = {
      id: viewedData.id,
      strategy: updatedData.strategy,
      description: updatedData.description,
      entryprice: updatedData.entryprice,
      exitprice: updatedData.exitprice,
      position: updatedData.position,
      instrument: updatedData.instrument,
      date: formattedDate,
      time: updatedData.time,
      user: userid,
      quantity: updatedData.quantity,
      winorlose: updatedData.winorlose,
    };

    if (updatedData.image instanceof File) {
      updatedEntry.image = updatedData.image;
    }

    dispatch(updateJournalEntry(updatedEntry));
  };

  // Effect to set the form data when viewedData changes
  useEffect(() => {
    handleViewinviewandupdate(viewedData);
    if (viewedData) {
      setUpdatedData((prevState) => ({
        ...prevState,
        strategy: viewedData.strategy,
        description: viewedData.description,
        entryprice: viewedData.entryprice,
        exitprice: viewedData.exitprice,
        position: viewedData.position,
        instrument: viewedData.instrument,
        date: new Date(viewedData.date).toLocaleDateString('en-GB').replace(/\//g, '-'),
        time: viewedData.time.substring(0, 5),
        image: viewedData.image,
        user: userid,
        quantity: viewedData.quantity,
        winorlose: viewedData.winorlose,
        showAddForm: false,
      }));
    }
  }, [viewedData, userid]);

  if (!viewedData) {
    return <div></div>;
  }

  return (
    <div style={{ backgroundColor: '#DDF7E3' }}>
      <div className="selected-trade" >
         {/* Show the selected Trade*/}
        <div className="container border-custom">
          <h3>
            <strong>Your Selected Trade</strong>
          </h3>
          <p>
            <strong>Position:</strong> {viewedData.position}
          </p>
          <p>
            <strong>Strategy:</strong> {viewedData.strategy}
          </p>
          <p>
            <strong>Instrument:</strong> {viewedData.instrument}
          </p>
          <p>
            <strong>Date:</strong> {new Date(viewedData.date).toLocaleDateString('en-GB').replace(/\//g, '-')}
          </p>
          <p>
            <strong>Time:</strong> {viewedData.time.substring(0, 5)}
          </p>

          <p>
            <strong>Description:</strong> {viewedData.description}
          </p>
          <p>
            <strong>Entry Price:</strong> {viewedData.entryprice}$
          </p>
          <p>
            <strong>Exit Price:</strong> {viewedData.exitprice}$
          </p>
          <p>
            <strong>Quantity:</strong> {viewedData.quantity}
          </p>
          <p>
            <strong>Win or Lose:</strong> {viewedData.winorlose}
          </p>
           {/* Calculation of the profit or loss */}
          {viewedData.position === 'Long' ? (
            viewedData.winorlose === 'Win' ? (
              <p>
                <strong>Profit/Loss:</strong> {viewedData.quantity * (viewedData.exitprice - viewedData.entryprice)}$
              </p>
            ) : (
              <p>
                <strong>Profit/Loss:</strong> {viewedData.quantity * (viewedData.entryprice - viewedData.exitprice)}$
              </p>
            )
          ) : (
            viewedData.winorlose === 'Win' ? (
              <p>
                <strong>Profit/Loss:</strong> {viewedData.quantity * Math.abs(viewedData.exitprice - viewedData.entryprice)}$
              </p>
            ) : (
              <p>
                <strong>Profit/Loss:</strong> {viewedData.quantity * (viewedData.exitprice - viewedData.entryprice)}$
              </p>
            )
          )}
        </div>
        {viewedData.image && <img className="responsive-image" src={`http://127.0.0.1:8000${viewedData.image}`} alt="Trade" />}
      </div>
      {/* Show the update form */}
      {showForm ? (
        <div className="d-flex justify-content-center align-items-center vh-100 " style={{ backgroundColor: '#DDF7E3', marginTop: '100px' }}>
          {/* Form fields and controls */}
          <Form className="border border-black rounded p-4" style={{ width: '800px', backgroundColor: '#C7E8CA' }}>
            <Form.Group controlId="formStrategy">
              <Form.Label style={{ fontSize: '16px', fontWeight: 'bold' }}>Update Form</Form.Label> <br />
              <Form.Label>
                Strategy{' '}
                <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                  <FontAwesomeIcon icon={faQuestionCircle} title="You can Update the Strategy you used in this Trade" />
                </span>
              </Form.Label>
              <Form.Control
                type="text"
                value={updatedData.strategy}
                onChange={(e) => setUpdatedData({ ...updatedData, strategy: e.target.value })}
                style={{ backgroundColor: '#DDF7E3', border: '1px solid black' }}

              />
            </Form.Group>

            <Form.Group controlId="formPosition">
              <Form.Label>Position{' '}
                <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                  <FontAwesomeIcon icon={faQuestionCircle} title="You can Update the direction of the position - Long or Short" />
                </span>
              </Form.Label>
              <Form.Control
                as="select"
                value={updatedData.position}
                onChange={(e) => setUpdatedData({ ...updatedData, position: e.target.value })}
                style={{ backgroundColor: '#DDF7E3', border: '1px solid black' }}
              >
                <option value="Long">Long</option>
                <option value="Short">Short</option>
              </Form.Control>
            </Form.Group>


            <Form.Group controlId="formInstrument">
              <Form.Label>Instrument{' '}
                <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                  <FontAwesomeIcon icon={faQuestionCircle} title="You can Update your Financial Instrument." />
                </span>
              </Form.Label>
              <Form.Control
                type="text"
                value={updatedData.instrument}
                onChange={(e) => setUpdatedData({ ...updatedData, instrument: e.target.value })}
                style={{ backgroundColor: '#DDF7E3', border: '1px solid black' }}
              />
            </Form.Group>

            <Form.Group controlId="formDate">
              <Form.Label> Date{' '}
                <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                  <FontAwesomeIcon icon={faQuestionCircle} title="You can Update the date when the trade was executed
                     in the format DD-MM-YYYY." />
                </span>
              </Form.Label>
              <Form.Control
                type="text"
                value={updatedData.date}
                onChange={(e) => setUpdatedData({ ...updatedData, date: e.target.value })}
                style={{ backgroundColor: '#DDF7E3', border: '1px solid black' }}
              />
            </Form.Group>

            <Form.Group controlId="formTime">
              <Form.Label> Time{' '}
                <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                  <FontAwesomeIcon icon={faQuestionCircle} title="You can Update the time when the trade was executed 
                    in the format HH:MM." />
                </span>
              </Form.Label>
              <Form.Control
                type="text"
                value={updatedData.time}
                onChange={(e) => setUpdatedData({ ...updatedData, time: e.target.value })}
                style={{ backgroundColor: '#DDF7E3', border: '1px solid black' }}
              />
            </Form.Group>

            <Form.Group controlId="formentryprice">
              <Form.Label>Entry Price{' '}
                <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                  <FontAwesomeIcon icon={faQuestionCircle} title="You can Update your entry price for this position" />
                </span>
              </Form.Label>
              <InputGroup>
                <InputGroup.Text style={{ backgroundColor: '#DDF7E3', border: '1px solid black', borderRight: "1" }}>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  value={updatedData.entryprice}
                  onChange={(e) => setUpdatedData({ ...updatedData, entryprice: e.target.value })}
                  style={{ backgroundColor: '#DDF7E3', border: '1px solid black' }}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formexitprice">
              <Form.Label> Exit Price{' '}
                <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                  <FontAwesomeIcon icon={faQuestionCircle} title="You can Update your exit price for this position" />
                </span>
              </Form.Label>
              <InputGroup>
                <InputGroup.Text style={{ backgroundColor: '#DDF7E3', border: '1px solid black', borderRight: "1" }}>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  value={updatedData.exitprice}
                  onChange={(e) => setUpdatedData({ ...updatedData, exitprice: e.target.value })}
                  style={{ backgroundColor: '#DDF7E3', border: '1px solid black' }}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formQuantity">
              <Form.Label>Quantity{' '}
                <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                  <FontAwesomeIcon icon={faQuestionCircle} title="You can Update the number of stocks or contracts used 
                    in this position" />
                </span>
              </Form.Label>
              <Form.Control
                type="number"
                value={updatedData.quantity}
                onChange={(e) => setUpdatedData({ ...updatedData, quantity: e.target.value })}
                style={{ backgroundColor: '#DDF7E3', border: '1px solid black' }}
                onWheel={(e) => e.preventDefault()}
              />
            </Form.Group>

            <Form.Group controlId="formWinLose">
              <Form.Label>Win or Lose{' '}
                <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                  <FontAwesomeIcon icon={faQuestionCircle} title="You can Update the outcome of the position - Win or Lose" />
                </span>
              </Form.Label>
              <Form.Control
                as="select"
                value={updatedData.winorlose}
                onChange={(e) => setUpdatedData({ ...updatedData, winorlose: e.target.value })}
                style={{ backgroundColor: '#DDF7E3', border: '1px solid black' }}
              >
                <option value="Win">Win</option>
                <option value="Lose">Lose</option>
              </Form.Control>
            </Form.Group>


            <Form.Group controlId="formDescription">
              <Form.Label>Description{' '}
                <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                  <FontAwesomeIcon icon={faQuestionCircle} title="You can Update the information about your Trade, like description, 
                    thoughts or any other relevant details you'd like to change." />
                </span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={updatedData.description}
                onChange={(e) => setUpdatedData({ ...updatedData, description: e.target.value })}
                style={{ backgroundColor: '#DDF7E3', border: '1px solid black' }}
              />
            </Form.Group>

            <Form.Group controlId="formImage">
              <Form.Label>
                Image{' '}
                <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                  <FontAwesomeIcon icon={faQuestionCircle} title="You can Update the Image of a trade." />
                </span>
              </Form.Label>
              <Form.Control
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                style={{ backgroundColor: '#DDF7E3', border: '1px solid black' }}
              />
            </Form.Group>



            <div className="d-flex justify-content-center">
              <Button variant="primary" onClick={handleUpdate}>
                Update
              </Button>
              <Button variant="danger" onClick={() => { dispatch(closeViewedData()); setShowForm(false); }}>
                Close
              </Button>
            </div>
          </Form>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <Button variant="primary" onClick={() => setShowForm(true)} style={{ marginRight: '10px' }}>
            Update Trade
          </Button>
          <Button variant="danger" onClick={() => { dispatch(closeViewedData()); setShowForm(false); }}>
            Close
          </Button>
        </div>
      )}
      <hr style={{ marginTop: '100px' }} />

    </div>
  );
};

export default ViewandUpdate;
