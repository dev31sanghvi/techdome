import { useState, useEffect } from 'react';
import API from '../utils/api';
import LoanDetails from "../components/LoanDetails";

const Dashboard = () => {
   const [loans,setLoans]=useState([]);
    const [error,setError]=useState('');

    useEffect(()=>{
        const fetchLoans=async()=>{
            try{
                const response=await API.get("/loans");
                setLoans(response.data);
            }catch(error){
                setError("Error while fetching loan details");
                console.log(error);
            }
        };

        fetchLoans();
    },[]);
    return (
        <>
        <div>
          <h1>Loan Dashboard</h1>
          {error && <p>{error}</p>}
          {loans.length > 0 ? (
            <ul>
              {loans.map((loan) => (
                <li key={loan._id}>
                  Amount: {loan.amount}, Term: {loan.term}, Status: {loan.status}
                </li>
              ))}
            </ul>
          ) : (
            <p>No loans found.</p>
          )}
        </div>
        <LoanDetails />
        </>
      );

}

export default Dashboard;
