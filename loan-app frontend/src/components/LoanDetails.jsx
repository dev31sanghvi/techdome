import  { useEffect, useState } from "react";
import API from "../utils/api";


const LoanDetails=()=>{
    const [loan,setLoan]=useState([]);
    const [error,setError]=useState('');
    const [repaymentAmount,setRepaymentAmount]=useState("");



    useEffect(() => {
        const fetchLoanDetails = async () => {
          try {
            const response = await API.get("/loans");
            console.log("loan api response :",response.data);
            setLoan(response.data);
          } catch (error) {
            console.log(error)
            setError("error while fetching loan details");
          }
        };
        fetchLoanDetails();
      }, [])


      const handleRepayment = async () => {
        if (repaymentAmount >= loan?.scheduledRepayment) {
          try {
            await API.post("/repayments", { amount: repaymentAmount });
            alert("Repayment Successful!");
          } catch (error) {
            console.error(error);
            alert("Repayment failed");
          }
        } else {
          alert("BRO ! Repayment amount is less than the scheduled amount.");
        }
      };

      return (
        <div>
          {error && <p>{error}</p>}
          {loan ? (
            <div>
              <h2>Loan Details</h2>
              <p>Amount: {loan.amount}</p>
              <p>Term: {loan.term} weeks</p>
              <p>Status: {loan.status}</p>
              <h3>Scheduled Repayments</h3>
              <ul>
                {loan.repayments?.map((repayment, index) => (
                  <li key={index}>
                    {repayment.date}: ${repayment.amount}
                  </li>
                ))}
              </ul>

              <div>
                <input
                  type="number"
                  value={repaymentAmount}
                  onChange={(e) => setRepaymentAmount(e.target.value)}
                  placeholder="Enter repayment amount"
                />
                <button onClick={handleRepayment}>Make Repayment</button>
              </div>
            </div>
          ) : (
            <p>Loading loan details...</p>
          )}
        </div>
      );
    };

    export default LoanDetails;
