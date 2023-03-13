import React ,{useState,useEffect} from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import qs from 'qs';

export default function Formdata() {

  const [isLogin, setisLogin] = useState(false)
  const [Car, setCar] = useState("")
  const [Model, setModel] = useState("")
  const [Problem1, setProblem1] = useState("")
  const [Problem2, setProblem2] = useState("")
  const [data, setdata] = useState({})
  const [sucess, setsucess] = useState(false)
  const [sucess2, setsucess2] = useState(false)
  const [result, setresult] = useState({})
  const [answer, setanswer] = useState("")
  const [data2, setdata2] = useState({})
  const [question, setquestion] = useState("")
  const [questionArr,setquestionArr] = useState([])

 const Login = async() =>{
    var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
	myHeaders.append("Accept", "application/json");

	var urlencoded = new URLSearchParams();
	urlencoded.append("username", "user1");
	urlencoded.append("password", "xqEKEiLBFeSgFzCgdBGWHChDHNp-tFRjEcLa7yXq67M");

	var requestOptions = {
	  method: 'POST',
	  headers: myHeaders,
	  body: urlencoded,
	  redirect: 'follow'
	};

	fetch("/auth/user", requestOptions)
	  .then(response => response.text())
	  .then(result =>JSON.parse(result))
	  .then(res => {
		  console.log(res)
		  localStorage.setItem("access_token",res.access_token)
		  sessionStorage.setItem("access_token",res.access_token)
	  })
	  .catch(error => console.log('error', error));
	  
    
	  
  }




  const FetchData2 = async () =>{
    var myHeaders = new Headers();
	myHeaders.append("Accept", "application/json");
	myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem('access_token')}`);
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
	  "car_name": Car,
	  "make_model": Model,
	  "primary_problem": Problem1,
	  "secondary_problem": Problem2
	});

	var requestOptions = {
	  method: 'POST',
	  headers: myHeaders,
	  body: raw,
	  redirect: 'follow',
	};

	fetch("/production/inference/metaExchange", requestOptions)
	  .then(response => response.text())
	  .then(result => JSON.parse(result))
	  .then(res =>{
		setdata(res)
		setquestion(res.question)
		setresult(res.results)
		return res
	  })
	  .then(res=> console.log(res))
	  .then(setsucess(true))
	  .catch(error => console.log('error', error));
	  }
  

  const submitAnswer = async() =>{
	console.log(data)
	data.answer = answer
	setquestionArr([...questionArr,data])
    var myHeaders = new Headers();
	myHeaders.append("Accept", "application/json");
	myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem("access_token")}`);
	myHeaders.append("Content-Type", "application/json");

	var raw = "";

	var requestOptions = {
	  method: 'POST',
	  headers: myHeaders,
	  body: raw,
	  redirect: 'follow'
	};

	fetch(`/production/inference/converse?type=freeflow&question_id=${data.question_id}&answer=${answer}`, requestOptions)
	  .then(response => response.text())
	  .then(result => JSON.parse(result))
	  .then(res =>{
		setdata(res)
		return res
	  })
	  .then(res=> console.log(res))
	  .catch(error => console.log('error', error));
	  }



    
  useEffect(() => {
    
    //console.log(`access token=> ${localStorage.getItem("access_token")}`)
    
    
  }, [])
  

  return (
    <Container className='mt-5' onSubmit={(e)=>e.preventDefault()}>

    <Form>
    <Button variant="primary" type="submit" onClick={Login}>
        Login
      </Button>
      <hr></hr>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Car Make</Form.Label>
        <Form.Control type="text" placeholder="Enter Car Name" value={Car} onChange={(e) => setCar(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Car Model</Form.Label>
        <Form.Control type="text" value={Model} onChange={(e) => setModel(e.target.value)} placeholder="Enter Car Model Name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Problem</Form.Label>
        <Form.Control type="text"  value={Problem1} onChange={(e) => setProblem1(e.target.value)} placeholder="Enter Primary Problem" />
      </Form.Group>



      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Problem2</Form.Label>
        <Form.Control type="text"  value={Problem2} onChange={(e) => setProblem2(e.target.value)} placeholder="Enter Secondary Problem" />
      </Form.Group>

      

      <Button variant="primary" type="submit" onClick={FetchData2}>
        Submit
      </Button>

     
    </Form>
	<hr></hr>
    <hr></hr>
	{
		questionArr.length > 0 &&(
		<>
		{questionArr.map(ele_ =>{
			return(<>
			   <h3>Question: {ele_.question_id}-{ele_.next_question}</h3>
			   <h5>Answer: {ele_.answer}</h5>
			   <p>Possible Problems -</p>
			   {Object.keys(ele_.results).map((ele,i)=>{
				return (
				  <p>{ele} - {ele_.results[ele]}</p>
				)
			   })}
			</>)
		})}
		</>
		)
	}
	<hr></hr>
    <hr></hr>
   {sucess && data.results != undefined &&(
   <><h3>Question- ({data.question_id}) {data.next_question} </h3>
   <p>Possible Problems -</p>
   {Object.keys(data.results).map((ele,i)=>{
    return (
      <p>{ele} - {data.results[ele]}</p>
    )
   })}

   <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Answer</Form.Label>
        <Form.Control type="text"  value={answer} onChange={(e) => setanswer(e.target.value)} placeholder="Enter Answer for this question" />
      </Form.Group>
   

    <Button variant="primary" type="submit" onClick={submitAnswer}>
    Submit answer
    </Button>

    {sucess2 && (
      <p>{data2.next_question}</p>
    )}
</> 
   )}
    </Container>
  )
}
