import { useEffect, useState, ChangeEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getAllJournals, createJournalEntry, deleteJournalEntry, selectJournals, updateViewJournal } from './journalSlice';
import { selectUserId, getUserIdAsync } from '../login/loginSlice';
import { Form, Button, Row, Col, InputGroup, Container, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import ViewandUpdate from './VIewandUpdate';

/**
 * Component for displaying the Journal page with trade entries and an add form.
 *
 * @component
 */
const JournalPage = () => {
  const dispatch = useAppDispatch();
  const journals = useAppSelector(selectJournals);
  const userid = useAppSelector(selectUserId);

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // State to store form data for adding a new trade entry
  const [journalData, setJournalData] = useState({
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

  // Fetch all journal entries for the current user on component mount
  useEffect(() => {
    if (userid !== null) {
      dispatch(getAllJournals(userid));
    }
    dispatch(getUserIdAsync(sessionStorage.getItem('token') || ''));

  }, [dispatch, userid]);

  // Function to handle adding a new trade entry
  const handleAdd = () => {
    // Validate form fields
    if (
      !journalData.strategy ||
      !journalData.description ||
      !journalData.entryprice ||
      !journalData.exitprice ||
      !journalData.position ||
      !journalData.instrument ||
      !journalData.quantity ||
      !journalData.winorlose
    ) {
      alert('Please fill in all the required fields.');
      return;
    }
    // Validate date and time format
    if (
      !/^\d{2}-\d{2}-\d{4}$/.test(journalData.date) ||
      !/^\d{2}:\d{2}$/.test(journalData.time)
    ) {
      alert('Please enter a valid date and time format (DD-MM-YYYY HH:MM).');
      return;
    }

    // Format date and time
    const dateParts = journalData.date.split('-');
    const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    const formattedTime = journalData.time;
    // Create form data and append data
    const formData = new FormData();
    formData.append('strategy', journalData.strategy);
    formData.append('description', journalData.description);
    formData.append('entryprice', String(journalData.entryprice));
    formData.append('exitprice', String(journalData.exitprice));
    formData.append('position', journalData.position);
    formData.append('instrument', journalData.instrument);
    formData.append('date', formattedDate);
    formData.append('time', formattedTime);
    if (journalData.image !== null) {
      formData.append('image', journalData.image);
    }
    formData.append('user', String(userid));
    formData.append('quantity', String(journalData.quantity));
    formData.append('winorlose', journalData.winorlose);

    // Dispatch action to create the journal entry
    dispatch(createJournalEntry(formData));

    // Reset form data
    setJournalData({
      strategy: '',
      description: '',
      entryprice: '',
      exitprice: '',
      position: '',
      instrument: '',
      date: '',
      time: '',
      image: null,
      user: userid,
      quantity: '',
      winorlose: '',
      showAddForm: false,
    });
  };

  // Function to handle viewing a trade entry
  const handleView = (journal: {
    id: any;
    strategy: any;
    entryprice: any;
    exitprice: any;
    position: any;
    description: any;
    instrument: any,
    date: any,
    time: any,
    image: any;
    user: any;
    quantity: any;
    winorlose: any;
  }) => {
    // Set the state with data of the selected journal entry
    setJournalData({
      ...journalData,
      strategy: journal.strategy,
      entryprice: journal.entryprice,
      exitprice: journal.exitprice,
      position: journal.position,
      description: journal.description,
      instrument: journal.instrument,
      date: journal.date,
      time: journal.time,
      image: journal.image,
      user: journal.user,
      quantity: journal.quantity,
      winorlose: journal.winorlose,
      showAddForm: false,
    });

    // Scroll to the top of the page
    scrollToTop();
    // Dispatch action to update the view journal entry
    dispatch(updateViewJournal(journal));
  };

  // Function to handle deleting a trade entry
  const handleDelete = (id: number) => {
    // Dispatch action to delete the journal entry with the given id
    dispatch(deleteJournalEntry(id));
  };

  // Function to handle image change for the add form
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setJournalData({ ...journalData, image: file });
  };

  // Function to toggle the visibility of the add form
  const toggleAddForm = () => {
    setJournalData({
      ...journalData, showAddForm: true, strategy: '', description: '',
      entryprice: '', exitprice: '', position: '', instrument: '', date: '', time: '',
      image: null, quantity: '', winorlose: ''
    });
  };


  // Function to handle closing the add form
  const handleCloseForm = () => {
    setJournalData({
      strategy: '',
      description: '',
      entryprice: '',
      exitprice: '',
      position: '',
      instrument: '',
      date: '',
      time: '',
      image: null,
      user: userid,
      quantity: '',
      winorlose: '',
      showAddForm: false,
    });
  };

  return (
    <div>
      {/* Include the ViewandUpdate component */}
      <ViewandUpdate></ViewandUpdate>
      <h1 style={{ marginTop: '50px' }}>Journal</h1>
      <div>
        <h3>Add Your New Trade</h3>
        {!journalData.showAddForm ? (
          <div className="d-flex justify-content-center">
            {/* Show the add form */}
            <Button variant="success" onClick={toggleAddForm}>
              Add Trade
            </Button>
          </div>

        ) : (
          <div className="d-flex justify-content-center align-items-center vh-100 bg-green" style={{ marginTop: '150px' }}>

            {/* Form fields and controls */}
            <Form className="border border-black rounded p-4" style={{ width: '800px' }}>
              <h4>Please Fill All Fields Except Image to Add a Trade</h4>
              <Form.Group controlId="strategy">
                <Form.Label style={{ fontWeight: 'bold' }}>
                  Strategy{' '}
                  <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                    <FontAwesomeIcon icon={faQuestionCircle} title="Please enter the Strategy you used in this Trade" />
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={journalData.strategy}
                  onChange={(e) => setJournalData({ ...journalData, strategy: e.target.value })}
                  required
                  style={{ backgroundColor: '#DDF7E3', border: '1px solid black' }}
                />
              </Form.Group>

              <Form.Group controlId="instrument">
                <Form.Label style={{ fontWeight: 'bold' }}>
                  Instrument{' '}
                  <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                    <FontAwesomeIcon icon={faQuestionCircle} title="Please enter the Stock, Contract, Currency Pair, or Coin (Crypto)." />
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={journalData.instrument}
                  onChange={(e) => setJournalData({ ...journalData, instrument: e.target.value })}
                  required
                  style={{ backgroundColor: '#DDF7E3', border: '1px solid black' }}
                />
              </Form.Group>

              <Form.Group controlId="date">
                <Form.Label style={{ fontWeight: 'bold' }}>
                  Date{' '}
                  <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                    <FontAwesomeIcon icon={faQuestionCircle} title="Please enter the date when the trade was executed in the format DD-MM-YYYY." />
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={journalData.date}
                  onChange={(e) => setJournalData({ ...journalData, date: e.target.value })}
                  required
                  style={{ backgroundColor: '#DDF7E3', border: '1px solid black' }}
                />
              </Form.Group>

              <Form.Group controlId="time">
                <Form.Label style={{ fontWeight: 'bold' }}>
                  Time{' '}
                  <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                    <FontAwesomeIcon icon={faQuestionCircle} title="Please enter the time when the trade was executed in the format HH:MM." />
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={journalData.time}
                  onChange={(e) => setJournalData({ ...journalData, time: e.target.value })}
                  required
                  style={{ backgroundColor: '#DDF7E3', border: '1px solid black' }}
                />
              </Form.Group>

              <Form.Group controlId="position">
                <Form.Label style={{ fontWeight: 'bold' }}>
                  Position{' '}
                  <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                    <FontAwesomeIcon icon={faQuestionCircle} title="Please choose direction of the position - Long or Short" />
                  </span>
                </Form.Label>
                <Form.Control
                  as="select"
                  value={journalData.position}
                  onChange={(e) => setJournalData({ ...journalData, position: e.target.value })}
                  className="text-center"
                  required
                  style={{ backgroundColor: '#DDF7E3', border: '1px solid black' }}
                >
                  <option value="">Select Position</option>
                  <option value="Long">Long</option>
                  <option value="Short">Short</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="entryprice">
                <Form.Label style={{ fontWeight: 'bold' }}>
                  Entry Price{' '}
                  <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                    <FontAwesomeIcon icon={faQuestionCircle} title="Please provide your entry price for this position" />
                  </span>
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text style={{ backgroundColor: '#DDF7E3', border: '1px solid black', borderRight: "1" }}>$</InputGroup.Text>
                  <Form.Control
                    type="number"
                    value={journalData.entryprice}
                    onChange={(e) => setJournalData({ ...journalData, entryprice: e.target.value.replace(/^0+/, '') })}
                    required
                    style={{ backgroundColor: '#DDF7E3', border: '1px solid black' }}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="exitprice">
                <Form.Label style={{ fontWeight: 'bold' }}>
                  Exit Price{' '}
                  <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                    <FontAwesomeIcon icon={faQuestionCircle} title="Please provide your exit price for this position" />
                  </span>
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text style={{ backgroundColor: '#DDF7E3', border: '1px solid black', borderRight: "1" }}>$</InputGroup.Text>
                  <Form.Control
                    type="number"
                    value={journalData.exitprice}
                    onChange={(e) => setJournalData({ ...journalData, exitprice: e.target.value.replace(/^0+/, '') })}
                    required
                    style={{ backgroundColor: '#DDF7E3', border: '1px solid black' }}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="quantity">
                <Form.Label style={{ fontWeight: 'bold' }}>
                  Quantity{' '}
                  <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                    <FontAwesomeIcon icon={faQuestionCircle} title="Please provide number of stocks or contracts used in this position" />
                  </span>
                </Form.Label>
                <Form.Control
                  type="number"
                  value={journalData.quantity}
                  onChange={(e) => setJournalData({ ...journalData, quantity: e.target.value.replace(/^0+/, '') })}
                  required
                  style={{ backgroundColor: '#DDF7E3', border: '1px solid black' }}
                  onWheel={(e) => e.preventDefault()}
                />
              </Form.Group>

              <Form.Group controlId="winorlose">
                <Form.Label style={{ fontWeight: 'bold' }}>
                  Win or Lose{' '}
                  <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                    <FontAwesomeIcon icon={faQuestionCircle} title="Please choose the outcome of the position - Win or Lose" />
                  </span>
                </Form.Label>
                <Form.Control
                  as="select"
                  value={journalData.winorlose}
                  onChange={(e) => setJournalData({ ...journalData, winorlose: e.target.value })}
                  className="text-center"
                  required
                  style={{ backgroundColor: '#DDF7E3', border: '1px solid black' }}
                >
                  <option value="">Select Win or Lose</option>
                  <option value="Win">Win</option>
                  <option value="Lose">Lose</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label style={{ fontWeight: 'bold' }}>
                  Description{' '}
                  <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                    <FontAwesomeIcon icon={faQuestionCircle} title="Please add more information about your Trade, like description, 
                    thoughts or any other relevant details you'd like to include." />
                  </span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  style={{ minHeight: '6rem', backgroundColor: '#DDF7E3', border: '1px solid black' }}
                  value={journalData.description}
                  onChange={(e) => setJournalData({ ...journalData, description: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group controlId="image">
                <Form.Label style={{ fontWeight: 'bold' }}>
                  Image{' '}
                  <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                    <FontAwesomeIcon icon={faQuestionCircle} title="Please consider adding an image of this trade for reference, 
                    although it is not mandatory." />
                  </span>
                </Form.Label>
                <Form.Control type="file" onChange={handleImageChange} style={{ backgroundColor: '#DDF7E3', border: '1px solid black' }}
                />
              </Form.Group>

              <br />

              <div className="d-flex justify-content-center">
                <Button variant="success" onClick={handleAdd} disabled={!journalData.strategy || !journalData.position || !journalData.entryprice || !journalData.exitprice || !journalData.quantity || !journalData.winorlose || !journalData.description}>
                  Add Trade
                </Button>
                <Button variant="danger" onClick={handleCloseForm}>
                  Close
                </Button>
              </div>
            </Form>
          </div>
        )}
      </div>
      <hr style={{ marginTop: "120px" }} />

      {/* Display existing journal entries */}
      {journals.length > 0 ? (
        <Container>
          <Row>
            {journals.map((journal) => (
              <Col key={journal.id} md={4} className="mb-4">
                <Card>
                  <Card.Body style={{ backgroundColor: '#DDF7E3', border: '1px solid #000' }}>
                    <Card.Text><strong>Position:</strong> {journal.position}</Card.Text>
                    <Card.Text><strong>Strategy:</strong> {journal.strategy}</Card.Text>
                    <Card.Text><strong>Instrument:</strong> {journal.instrument}</Card.Text>
                    <Card.Text><strong>Date:</strong> {new Date(journal.date).toLocaleDateString('en-GB').replace(/\//g, '-')}</Card.Text>
                    <Card.Text><strong>Time:</strong> {journal.time.substring(0, 5)}</Card.Text>
                    <Card.Text><strong>Description:</strong> {journal.description}</Card.Text>
                    <Card.Text><strong>Entry Price:</strong> {journal.entryprice}$</Card.Text>
                    <Card.Text><strong>Exit Price:</strong> {journal.exitprice}$</Card.Text>
                    <Card.Text><strong>Quantity:</strong> {journal.quantity}</Card.Text>
                    <Card.Text><strong>Win or Lose:</strong> {journal.winorlose}</Card.Text>
                    <Card.Text>
                      <strong>Profit/Loss:</strong>{' '}
                      {`${(journal.position === 'Long' ?
                        (journal.winorlose === 'Win' ? 1 : -1) :
                        (journal.winorlose === 'Win' ? 1 : -1)) * journal.quantity * Math.abs(journal.exitprice - journal.entryprice)}$`}


                    </Card.Text>

                    {journal.image && <Card.Img variant="top" src={`http://127.0.0.1:8000${journal.image}`} alt="Trade" />}


                    <br /><br />
                    <Button variant="primary" style={{ backgroundColor: 'green' }} onClick={() => handleView(journal)}>
                      View
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(journal.id)}>
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <p>No journal entries yet.</p>
      )}
    </div>
  );
};

export default JournalPage;
