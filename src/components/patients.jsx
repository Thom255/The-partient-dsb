import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Patients() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetchPatients();
    }, []);

    async function fetchPatients() {
        try {
            setLoading(true);
            setError("");

            const response = await axios.get(
                "http://41.188.172.204:3033/test/patient-registration"
            );

            console.log("PATIENT API RESPONSE:", response.data);

            let data = response.data;

            // If API returns { data: [...] }
            if (data && data.data) {
                data = data.data;
            }

            // Make sure data is an array
            if (!Array.isArray(data)) {
                data = [data];
            }

            setPatients(data);

        } catch (err) {
            console.error("GET PATIENTS ERROR:", err);
            setError("Failed to load patients.");
        } finally {
            setLoading(false);
        }
    }

    function getRegistrationId(patient) {
        if (patient.Registration_ID) {
            return patient.Registration_ID;
        }

        if (patient.registration_id) {
            return patient.registration_id;
        }

        if (patient.registrationId) {
            return patient.registrationId;
        }

        if (patient.registrationID) {
            return patient.registrationID;
        }

        if (patient.id) {
            return patient.id;
        }

        return "";
    }

    function getPatientName(patient) {
        if (patient.Patient_Name) {
            return patient.Patient_Name;
        }

        if (patient.patient_name) {
            return patient.patient_name;
        }

        if (patient.patientName) {
            return patient.patientName;
        }

        if (patient.name) {
            return patient.name;
        }

        return "N/A";
    }

    function getGuarantorName(patient) {
        if (patient.Guarantor_Name) {
            return patient.Guarantor_Name;
        }

        if (patient.guarantor_name) {
            return patient.guarantor_name;
        }

        if (patient.guarantorName) {
            return patient.guarantorName;
        }

        if (patient.guarantor) {
            return patient.guarantor;
        }

        return "N/A";
    }

    function getDateOfBirth(patient) {
        if (patient.Date_of_Birth) {
            return patient.Date_of_Birth;
        }

        if (patient.date_of_birth) {
            return patient.date_of_birth;
        }

        if (patient.dateOfBirth) {
            return patient.dateOfBirth;
        }

        if (patient.dob) {
            return patient.dob;
        }

        return "N/A";
    }

    function getRegion(patient) {
        if (patient.Region) {
            return patient.Region;
        }

        if (patient.region) {
            return patient.region;
        }

        if (patient.region_name) {
            return patient.region_name;
        }

        return "N/A";
    }

    function getWard(patient) {
        if (patient.Ward) {
            return patient.Ward;
        }

        if (patient.ward) {
            return patient.ward;
        }

        if (patient.ward_name) {
            return patient.ward_name;
        }

        return "N/A";
    }

    function openPatient(patient) {
        const registrationId = getRegistrationId(patient);

        if (!registrationId) {
            alert("Registration ID not found.");
            return;
        }

        navigate("/patients/" + registrationId);
    }

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
            p > { error } < /p>

            <
            button onClick = { fetchPatients } >
            Try Again <
            /button> <
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
        tbody >

        {
            patients.length === 0 ? ( <
                tr >
                <
                td colSpan = "6" >
                No patients found. <
                /td> <
                /tr>
            ) : (
                patients.map(function(patient, index) {

                    const registrationId =
                        getRegistrationId(patient);

                    return ( <
                        tr key = {
                            registrationId ||
                            index
                        }
                        onClick = {
                            function() {
                                openPatient(patient);
                            }
                        }
                        style = {
                            {
                                cursor: "pointer"
                            }
                        } >

                        <
                        td > {
                            getPatientName(
                                patient
                            )
                        } <
                        /td>

                        <
                        td > {
                            registrationId ||
                            "N/A"
                        } <
                        /td>

                        <
                        td > {
                            getGuarantorName(
                                patient
                            )
                        } <
                        /td>

                        <
                        td > {
                            getDateOfBirth(
                                patient
                            )
                        } <
                        /td>

                        <
                        td > {
                            getRegion(
                                patient
                            )
                        } <
                        /td>

                        <
                        td > {
                            getWard(
                                patient
                            )
                        } <
                        /td>

                        <
                        /tr>
                    );
                })
            )
        }

        <
        /tbody> <
        /table>

        <
        /div>
    );
}

export default Patients;