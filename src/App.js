import './App.css';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { FormField } from 'semantic-ui-react';
import { Form, Table } from 'semantic-ui-react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
import * as yup from 'yup';
import { API } from './global';
import Signin from './Signin';
import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Navbar from './Navbar';


const API_URL = "https://6481aa5329fa1c5c5031d568.mockapi.io/library";
function App() {
  const navigate = useNavigate();
  const dk = {
    marginLeft: "auto"
  }
  return (
    <div className="App">
      <Navbar />
      {/* <h1>Library Management</h1> */}
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/create' element={
          <ProdectedRoute>
            <Create />
          </ProdectedRoute>}></Route>
        <Route path='/read' element={
          <ProdectedRoute>
            <Read />
          </ProdectedRoute>}></Route>
        <Route path='/update/:id' element={
          <ProdectedRoute>
            <Edit />
          </ProdectedRoute>
        }></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signin />}></Route>
      </Routes>
    </div>
  );
}
const movieValidationShema = yup.object({
  bookName: yup.string().required().min(3),
  bookNumber: yup.number().required().min(3),
  author: yup.string().required().min(0).max(25),
  isAvailable: yup.string().required().max(3),
  borrowMember: yup.string().required().min(1),
  borrowDate: yup.string().required().min(1),
})

function Home() {
  return (
    <div className='home__page'>

      <h1 className='login_h1'>LOGIN</h1>
    </div>
  )
}
function Create() {
  const { handleSubmit, values, handleChange, handleBlur, touched, errors } = useFormik({
    initialValues: {
      bookName: '',
      bookNumber: '',
      author: '',
      isAvailable: '',
      borrowMember: '',
      borrowDate: '',
    },
    validationSchema: movieValidationShema,
    onSubmit: (newData) => {
      openData(newData);
    },
  });

  const openData = (newData) => {
    fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(newData),
      headers: { 'Content-type': 'application/json' },
    }).then(() => navigate('/read'));
  };

  const navigate = useNavigate();

  return (
    <div className='create_books'>
      <h2 style={{ margin: '15px' }}>ADD THE NEW BOOKS</h2>
      <Form onSubmit={handleSubmit}>
        <FormField>
          <label className='labels'>BookName</label>
          <input
            className={`input_value ${touched.bookName && errors.bookName ? 'error' : ''}`}
            placeholder='enter the bookname'
            name='bookName'
            value={values.bookName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <br />
          {touched.bookName && errors.bookName ? <div className='error-text'>{errors.bookName}</div> : null}
        </FormField>

        <FormField>
          <label className='labels'>Book Number</label>
          <input
            className={`input_value ${touched.bookNumber && errors.bookNumber ? 'error' : ''}`}
            placeholder='enter the booknumber'
            name='bookNumber'
            value={values.bookNumber}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <br />
          {touched.bookNumber && errors.bookNumber ? <div className='error-text'>{errors.bookNumber}</div> : null}
        </FormField>

        <FormField>
          <label className='labels'>Author</label>
          <input
            className={`input_value ${touched.author && errors.author ? 'error' : ''}`}
            placeholder='enter the author '
            name='author'
            value={values.author}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <br />
          {touched.author && errors.author ? <div className='error-text'>{errors.author}</div> : null}
        </FormField>

        <FormField>
          <label className='labels'>IsAvailable</label>
          <input
            className={`input_value ${touched.isAvailable && errors.isAvailable ? 'error' : ''}`}
            placeholder='enter Yes or No'
            name='isAvailable'
            value={values.isAvailable}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <br />
          {touched.isAvailable && errors.isAvailable ? <div className='error-text'>{errors.isAvailable}</div> : null}
        </FormField>

        <FormField>
          <label className='labels'>BorrowMember name</label>
          <input
            className={`input_value ${touched.borrowMember && errors.borrowMember ? 'error' : ''}`}
            placeholder='enter the name'
            name='borrowMember'
            value={values.borrowMember}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <br />
          {touched.borrowMember && errors.borrowMember ? <div className='error-text'>{errors.borrowMember}</div> : null}
        </FormField>

        <FormField>
          <label className='labels'>Borrow Date</label>
          <input
            className={`input_value ${touched.borrowDate && errors.borrowDate ? 'error' : ''}`}
            placeholder='enter the date'
            name='borrowDate'
            value={values.borrowDate}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <br />
          {touched.borrowDate && errors.borrowDate ? <div className='error-text'>{errors.borrowDate}</div> : null}
        </FormField>

        <Button id='button' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
}

function Read() {
  const navigate = useNavigate();
  const [apiData, setAPIData] = useState([]);
  const updateUser = ({ bookName, bookNumber, author, borrowMember, isAvailable, borrowDate, id }) => {
    localStorage.setItem("id", id);
    localStorage.setItem("bookName", bookName);
    localStorage.setItem("bookNumber", bookNumber);
    localStorage.setItem("author", author);
    localStorage.setItem("borrowMember", borrowMember);
    localStorage.setItem("isAvailable", isAvailable);
    localStorage.setItem("borrowDate", borrowDate);
    navigate(`/update/${id}`)
  }

  const callGetAPI = async () => {
    const res = await axios.get(API_URL);
    setAPIData(res.data);
  }
  const deleteUser = async (id) => {
    await axios.delete(API_URL + "/" + id)
    callGetAPI();
  }
  useEffect(() => {
    callGetAPI();
  }, []);
  return (
    <>
      <h2 style={{ margin: "15px" }}>ALL BOOKS DETAILS</h2>
      <div className='read'>
        <Table singleLine>
          <Table.Header >
            <Table.Row >
              <Table.HeaderCell> Book Name</Table.HeaderCell>
              <Table.HeaderCell>Book Number</Table.HeaderCell>
              <Table.HeaderCell>Author</Table.HeaderCell>
              <Table.HeaderCell>Is Available</Table.HeaderCell>
              <Table.HeaderCell>BorrowMember</Table.HeaderCell>
              <Table.HeaderCell>BorrowDate</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
              <Table.HeaderCell>Update</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              apiData.map(data => (

                <Table.Row key={data.id}>
                  <Table.Cell>{data.bookName}</Table.Cell>
                  <Table.Cell>{data.bookNumber}</Table.Cell>
                  <Table.Cell>{data.author}</Table.Cell>
                  <Table.Cell>{data.isAvailable}</Table.Cell>
                  <Table.Cell>{data.borrowMember}</Table.Cell>
                  <Table.Cell>{data.borrowDate}</Table.Cell>
                  <Table.Cell><Button onClick={() =>
                    deleteUser(data.id)} style={{ color: "white" }}>Delete</Button></Table.Cell>
                  <Table.Cell><Button onClick={() =>
                    updateUser(data)} style={{ color: "white" }}>Update</Button></Table.Cell>

                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
      </div>
    </>
  )
}
export function Edit() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  useEffect(() => {
    fetch(`https://638cafbcd2fc4a058a5d556b.mockapi.io/library/${id}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((mv) => setDetails(mv));
  }, []);

  console.log(details)

  return <div>{details ? <Update details={details} /> : "Loading..."}</div>
}
function Update({ details }) {

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        bookName: details.bookName,
        bookNumber: details.bookNumber,
        author: details.author,
        isAvailable: details.isAvailable,
        borrowMember: details.borrowMember,
        borrowDate: details.borrowDate,
      },
      validationSchema: movieValidationShema,
      onSubmit: (update) => {
        console.log("Form values:", update);
        updateUser(update);
      },
    });

  const navigate = useNavigate();

  const updateUser = (update) => {
    fetch(`https://638cafbcd2fc4a058a5d556b.mockapi.io/library/${details.id}`, {
      method: "PUT",
      body: JSON.stringify(update),
      headers: { "Content-type": "application/json" },
    }).then(() => navigate("/read"));
    // navigate("/read")
  };

  return (
    <>
      <h2 style={{ margin: "15px" }}>EDIT THE BOOK DETAILS</h2>
      <Form onSubmit={handleSubmit}>
        <FormField>
          <label className='labels'>BookName</label>
          <input
            className={`input_value ${touched.bookName && errors.bookName ? 'error' : ''}`}
            placeholder='enter the booknumber'
            name='bookNumber'
            value={values.bookName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <br />
          {touched.bookName && errors.bookName ? <div className='error-text'>{errors.bookName}</div> : null}
        </FormField>

        {/* {touched.bookName && errors.bookName ? errors.bookName : null} */}
        <FormField>
          <label className='labels'>Book Number</label>
          <input className={`input_value ${touched.bookNumber && errors.bookNumber ? 'error' : ''}`} placeholder='enter the booknumber' name='bookNumber' value={values.bookNumber} onChange={handleChange} onBlur={handleBlur} /><br></br>
        </FormField>
        {touched.bookNumber && errors.bookNumber ? <div className='error-text'>{errors.bookNumber}</div> : null}
        <FormField>
          <label className='labels'>Author</label>
          <input className={`input_value ${touched.author && errors.author ? 'error' : ''}`} placeholder='enter the author ' name='author' value={values.author} onChange={handleChange} onBlur={handleBlur} /> <br />
          {touched.author && errors.author ? <div className='error-text'>{errors.author}</div> : null}
        </FormField>
        <FormField>
          <label className='labels'>IsAvailable</label>
          <input className={`input_value ${touched.isAvailable && errors.isAvailable ? 'error' : ''}`} placeholder='enter the state' name='isAvailable' value={values.isAvailable} onChange={handleChange} onBlur={handleBlur} /><br />
          {touched.isAvailable && errors.isAvailable ? <div className='error-text'>{errors.isAvailable}</div> : null}
        </FormField>

        <FormField>
          <label className='labels'>BorrowMember name</label>
          <input className={`input_value ${touched.borrowMember && errors.borrowMember ? 'error' : ''}`} placeholder='enter the name' name='borrowMember' value={values.borrowMember} onChange={handleChange} onBlur={handleBlur} /><br></br>
          {touched.borrowMember && errors.borrowMember ? <div className='error-text'>{errors.borrowMember}</div> : null}
        </FormField>
        <FormField>
          <label className='labels'>Borrow Date</label>
          <input className={`input_value ${touched.borrowDate && errors.borrowDate ? 'error' : ''}`} placeholder='enter the date' name='borrowDate' value={values.borrowDate} onChange={handleChange} onBlur={handleBlur} /><br></br>
          {touched.borrowDate && errors.borrowDate ? <div className='error-text'>{errors.borrowDate}</div> : null}<br></br>
        </FormField>

        <Button id="button" type="submit" > Submit</Button>
      </Form>
    </>
  )
}
function Login() {
  const roleId = localStorage.getItem("roleId")
  const handleToggle = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setPasswordIcon(<FaEye />)
    }
    else {
      setPasswordType("password");
      setPasswordIcon(<FaEyeSlash />)
    }
  }
  const [passwordType, setPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(<FaEyeSlash />);

  // const roleId=localStorage.getItem("roleId");
  const [formState, setFormState] = useState("success");
  const navigate = useNavigate();
  const { handleChange, values, handleBlur, handleSubmit } = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: async (values) => {
      console.log(values);
      const data = await fetch(API + "/" + "login", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(values),
      });
      if (data.status == 401) {
        console.log("error");
        setFormState("error")
      }
      else {
        const result = await data.json()
        console.log("success", result);
        localStorage.setItem("token", result.token)
        localStorage.setItem("roleId", result.roleId)
        const roleId = localStorage.getItem("roleId");
        {
          roleId == 1 ?
            navigate("/read") : navigate("/create")
        }
      }

    },
  });
  return (
    <div className="center">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="txt_field">
          <input type="text" required=""
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            name="username"
          />
          <span></span>
          <label>Username</label>
        </div>
        <div className="txt_field">
          <input type={passwordType} required=""
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            name="password"
          />
          <span></span>
          <label>Password</label>
          <span className="eye" style={{ background: "none" }} onClick={handleToggle}>{passwordIcon}</span>
        </div>
        <button
          color={formState}
          type="submit" variant="contained">
          {formState === "error" ? "Retry" : "Login"}
        </button>
        {roleId ? <Button onClick={() => logout()}>Logout</Button> : null}
        {/* <input type="submit" value="Login"/> */}
        <div className="signup_link">
          Not a member? <a href="/signup">Signup</a>
        </div>
      </form>
    </div>
  )
}
function logout() {
  localStorage.removeItem("token")
  localStorage.removeItem("roleId")
  window.location.href = "/";

}
function checkAuth(data) {
  if (data.status === 401) {
    console.log("Unauthorized")
    throw Error("Unauthorized")
  }
  else {
    return data.json();
  }
}
function ProdectedRoute({ children }) {
  const isAuth = localStorage.getItem("token");
  console.log(isAuth)
  return isAuth ? children : <Navigate replace to={"/"} />
}

export default App;
