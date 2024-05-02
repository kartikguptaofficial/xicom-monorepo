const validateForm = (payload: any) => {
    const { firstName, lastName, email, dob, street1, street2, resStreet1, resStreet2, inputFields }: any = payload;

    if (!firstName) {
        window.alert("First name is required");
        return false;
    } else if (!lastName) {
        window.alert("Last name is required");
        return false;
    } else if (!email) {
        window.alert("Email is required");
        return false;
    }
    if (email) {
        if (!email.includes("@") || !email.includes(".")) {
            window.alert("Invalid email address");
            return false;
        }
    }
    if (!dob) {
        window.alert("Date of birth is required");
        return false;
    }
    if (dob) {
        const today = new Date();
        const enteredDate = new Date(dob);
        const ageYears = today.getFullYear() - enteredDate.getFullYear();

        // Check if age is exactly 18 years or older
        const isExactAgeOrOlder =
            ageYears > 18 ||
            (ageYears === 18 &&
                today.getMonth() > enteredDate.getMonth()) ||
            (ageYears === 18 &&
                today.getMonth() === enteredDate.getMonth() &&
                today.getDate() >= enteredDate.getDate());

        if (isExactAgeOrOlder) {

        } else {
            window.alert('Age must be 18 years or older.');
            return;
        }
    }
    if (!street1) {
        window.alert("Street 1 is required");
        return false;
    } else if (!street2) {
        window.alert("Street 2 is required");
        return false;
    }
    if (!resStreet1) {
        window.alert("Residential Street 1 is required");
        return false;
    } else if (!resStreet2) {
        window.alert("Residential Street 2 is required");
        return false;
    }
    if (inputFields.length < 2) {
        console.log("Invalid documents  ")
        window.alert("At least 2 documents are required");
        return;
    } else if (inputFields.length >= 2) {
        console.log({ inputFields })
        for (let index = 0; index < inputFields.length; index++) {
            const element = inputFields[index];
            if (!element?.name) {
                window.alert(`Document ${index + 1} name is required`);
                return false;
            } else if (!element?.type) {
                window.alert(`Document ${index + 1} type is required`);
                return false;
            } else if (!element?.file) {
                window.alert(`Document ${index + 1} file is required`);
                return false;
            }
        }
    }

    return true;
}

export {
    validateForm
}