import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Patients() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(
                "http://41.188.172.204:3033/test/patient-registration"
            )
            .then((response) => {
                console.log("PATIENT DATA:", response.data);

                let data = response.data;

                // Handle different API response formats
                if (data && Array.isArray(data.data)) {
                    data = data.data;
                }

                if (!Array.isArray(data)) {
                    data = [data];
                }

                setPatients(data);
            })
            .catch((err) => {
                console.error("API ERROR:", err);
                setError("Failed to fetch patients.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return ( <
            div className = "page" >
            <
            h1 > Patients < /h1> <
            p > Loading patients... < /p> <
            /div>
        );
    }

    if (error) {
        return ( <
            div className = "page" >
            <
            h1 > Patients < /h1> <
            p > { error } < /p> <
            /div>
        );
    }

    return ( <
        div className = "page" >

        <
        h1 > Patients < /h1>

        <
        table >
        <
        thead >
        <
        tr >
        <
        th > Patient Name < /th> <
        th > Patient Number < /th> <
        th > Guarantor Name < /th> <
        th > Date of Birth < /th> <
        th > Region < /th> <
        th > Ward < /th> <
        /tr> <
        /thead>

        <
        tbody > {
            patients.map((patient, index) => {

                const registrationId =
                    patient.Registration_ID ? ?
                    patient.registration_id ? ?
                    patient.registrationId;

                return ( <
                    tr key = { registrationId ? ? index }
                    onClick = {
                        () =>
                        registrationId &&
                        navigate(
                            `/patients/${registrationId}`
                        )
                    } >
                    <
                    td > {
                        patient.Patient_Name ? ?
                        patient.patient_name ? ?
                        patient.patientName ? ?
                        "N/A"
                    } <
                    /td>

                    <
                    td > { registrationId ? ? "N/A" } <
                    /td>

                    <
                    td > {
                        patient.Guarantor_Name ? ?
                        patient.guarantor_name ? ?
                        patient.guarantorName ? ?
                        "N/A"
                    } <
                    /td>

                    <
                    td > {
                        patient.Date_of_Birth ? ?
                        patient.date_of_birth ? ?
                        patient.dateOfBirth ? ?
                        "N/A"
                    } <
                    /td>

                    <
                    td > {
                        patient.Region ? ?
                        patient.region ? ?
                        "N/A"
                    } <
                    /td>

                    <
                    td > {
                        patient.Ward ? ?
                        patient.ward ? ?
                        "N/A"
                    } <
                    /td> <
                    /tr>
                );
            })
        } <
        /tbody> <
        /table>

        <
        /div>
    );
}

export default Patients;