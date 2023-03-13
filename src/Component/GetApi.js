import React,{useState} from 'react'
import { Button, Container } from 'react-bootstrap';

export default function GetApi() {

    const [Health, setHealth] = useState("")
    const [validate, setvalidate] = useState("")
    const [test, settest] = useState("")
    const [pollreport, setpollreport] = useState("")
    const [dumps, setdumps] = useState("")
    const [mb, setmb] = useState("")

    const Healthcheck = () =>{
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("/healthcheck/", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            setHealth(result)
        })
        .catch(error => console.log('error', error));
        }

    const Validate = () =>{
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('access_token')}`);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("/testing/validate", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            setvalidate(result)
        })
        .catch(error => console.log('error', error));
    }
    const Testapi = () =>{
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch("/testing/", requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log(result)
            settest(result)
          })
          .catch(error => console.log('error', error));

    }
    const PollReport = () =>{
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('access_token')}`);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("/testing/pollReport", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            setpollreport(result)
        })
        .catch(error => console.log('error', error));
    }

    const Dumps = () =>{
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('access_token')}`);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("/testing/fetchConversation/yRRbnU-AhGudEntsHWLpdw", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            setdumps(result)
        })
        .catch(error => console.log('error', error));
    }
    const MB = () =>{
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

fetch("/", requestOptions)
  .then(response => response.text())
  .then(result => {
    console.log(result)
    setmb(result)
  })
  .catch(error => console.log('error', error));
    }



  return (
    <Container>
     <h1>Get Apis</h1>
     <Button onClick={Healthcheck}>Healthcheck</Button>
     <p>{Health}</p>

    
    <Button onClick={Validate}>Validate</Button>
     <p>{validate}</p>


    <Button onClick={Testapi}>Testapis</Button>
     <p>{test}</p>

    <Button onClick={PollReport}>PoolReport</Button>
     <p>{pollreport}</p>


     <Button onClick={Dumps}>Conversation dumps</Button>
     <p>{dumps}</p>

  

    </Container>
  )
}
