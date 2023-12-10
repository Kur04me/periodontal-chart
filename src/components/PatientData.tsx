type Props = {
  patientName: string;
  patientNumber: string;
};

const PatientData = ({ patientName, patientNumber }: Props): JSX.Element => {
  return (
    <div id="patient-data">
      <p>
        Name: <input className="big-input-box" />
        {patientNumber && `(${patientNumber})`}
      </p>
    </div>
  );
};

export default PatientData;
