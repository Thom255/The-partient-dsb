import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function PatientDetails() {
    const { registrationId } = useParams();
    const navigate = useNavigate();

    const [patient, setPatient] = useState(null);
    const [patientName, setPatientName] = useState("");
    const [gender, setGender] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        getPatient();
    }, [registrationId]);

    async function getPatient() {
        try {
            setLoading(true);

            const response = await axios.get(
                "http://41.188.172.204:3033/test/patient-registration?Registration_ID=" + registrationId
            );

            console.log("PATIENT DETAILS:", response.data);

            let data = response.data;

            if (Array.isArray(data)) {
                data = data[0];
            }

            if (data && data.data) {
                if (Array.isArray(data.data)) {
                    data = data.data[0];
                } else {
                    data = data.data;
                }
            }

            setPatient(data);

            if (data) {
                if (data.Patient_Name) {
                    setPatientName(data.Patient_Name);
                } else if (data.patient_name) {
                    setPatientName(data.patient_name);
                } else if (data.patientName) {
                    setPatientName(data.patientName);
                }

                if (data.Gender) {
                    setGender(data.Gender);
                } else if (data.gender) {
                    setGender(data.gender);
                }
            }

        } catch (err) {
            console.error("GET ERROR:", err);
            setError("Failed to fetch patient details.");
        } finally {
            setLoading(false);
        }
    }

    async function updatePatient(event) {
        event.preventDefault();

        try {
            setError("");
            setMessage("");

            await axios.put(
                "http://41.188.172.204:3033/test/patient-registration/" + registrationId, {
                    Patient_Name: patientName,
                    Gender: gender
                }
            );

            setMessage("Patient updated successfully.");

            if (patient) {
                const updatedPatient = {
                    ...patient,
                    Patient_Name: patientName,
                    Gender: gender
                };

                setPatient(updatedPatient);
            }

        } catch (err) {
            console.error("PUT ERROR:", err);
            setError("Failed to update patient.");
        }
    }

    if (loading) {
        return ( <
            div className = "page" >
            <
            button onClick = {
                () => navigate("/") } >
            Back to Patients <
            /button>

            <
            h1 > Patient Details < /h1> <
            p > Loading patient... < /p> <
            /div>
        );
    }

    if (error && !patient) {
        return ( <
            div className = "page" >
            <
            button onClick = {
                () => navigate("/") } >
            Back to Patients <
            /button>

            <
            h1 > Patient Details < /h1> <
            p > { error } < /p> <
            /div>
        );
    }

    if (!patient) {
        return ( <
            div className = "page" >
            <
            button onClick = {
                () => navigate("/") } >
            Back to Patients <
            /button>

            <
            h1 > Patient Details < /h1> <
            p > Patient not found. < /p> <
            /div>
        );
    }

    return ( <
        div className = "page" >

        <
        button onClick = {
            () => navigate("/") } >
        Back to Patients <
        /button>

        <
        h1 > Patient Details < /h1>

        <
        div className = "details" >

        <
        p >
        <
        strong > Patient Name: < /strong>{" "} {
            patient.Patient_Name ||
                patient.patient_name ||
                patient.patientName ||
                "N/A"
        } <
        /p>

        <
        p >
        <
        strong > Patient Number: < /strong>{" "} {
            patient.Registration_ID ||
                patient.registration_id ||
                patient.registrationId ||
                registrationId
        } <
        /p>

        <
        p >
        <
        strong > Guarantor Name: < /strong>{" "} {
            patient.Guarantor_Name ||
                patient.guarantor_name ||
                patient.guarantorName ||
                "N/A"
        } <
        /p>

        <
        p >
        <
        strong > Date of Birth: < /strong>{" "} {
            patient.Date_of_Birth ||
                patient.date_of_birth ||
                patient.dateOfBirth ||
                "N/A"
        } <
        /p>

        <
        p >
        <
        strong > Region: < /strong>{" "} {
            patient.Region ||
                patient.region ||
                "N/A"
        } <
        /p>

        <
        p >
        <
        strong > Ward: < /strong>{" "} {
            patient.Ward ||
                patient.ward ||
                "N/A"
        } <
        /p>

        <
        p >
        <
        strong > Gender: < /strong>{" "} {
            patient.Gender ||
                patient.gender ||
                "N/A"
        } <
        /p>

        <
        /div>

        <
        h2 > Edit Patient < /h2>

        <
        form onSubmit = { updatePatient } >

        <
        label > Patient Name < /label>

        <
        input type = "text"
        value = { patientName }
        onChange = {
            (event) =>
            setPatientName(event.target.value)
        }
        />

        <
        br / >
        <
        br / >

        <
        label > Gender < /label>

        <
        select value = { gender }
        onChange = {
            (event) =>
            setGender(event.target.value)
        } >
        <
        option value = "" >
        Select Gender <
        /option>

        <
        option value = "Male" >
        Male <
        /option>

        <
        option value = "Female" >
        Female <
        /option> <
        /select>

        <
        br / >
        <
        br / >

        <
        button type = "submit" >
        Update Patient <
        /button>

        <
        /form>

        {
            message && ( <
                p > { message } < /p>
            )
        }

        {
            error && ( <
                p > { error } < /p>
            )
        }

        <
        /div>
    );
}

export default PatientDetails;