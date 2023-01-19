import React, { useState } from "react";
import AddOrderStep1 from "../components/AddOrderStep1";
import AddOrderStep2 from "../components/AddOrderStep2";
import AddOrderStep3 from "../components/AddOrderStep3";
import AddOrderStep4 from "../components/AddOrderStep4";

const AddOrder = ({ navigation }) => {
  const [step, setStep] = useState(1);

  const [info1, setInfo1] = useState({});
  const [info2, setInfo2] = useState({});
  const [info3, setInfo3] = useState({});

  if (step === 1) {
    return (
      <AddOrderStep1
        setInfo1={setInfo1}
        info1={info1}
        setStep={setStep}
        goBack={() => navigation.pop()}
      />
    );
  } else if (step === 2) {
    return (
      <AddOrderStep2 setInfo2={setInfo2} info2={info2} setStep={setStep} />
    );
  } else if (step === 3) {
    return (
      <AddOrderStep3 setInfo3={setInfo3} info3={info3} setStep={setStep} />
    );
  } else if (step === 4) {
    return (
      <AddOrderStep4
        info1={info1}
        info2={info2}
        info3={info3}
        setStep={setStep}
        goBack={() => navigation.pop()}
      />
    );
  }
};

export default AddOrder;
