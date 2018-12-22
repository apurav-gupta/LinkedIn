export const signupValidations = data => {
    let msg = "";
    const namePattern = /^[a-zA-Z\s]+$/;
    const emailPattern = /^[\w.]*@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z@]{8,}$/;

    if (
        data.firstName === "" ||
        data.lastName === "" ||
        data.email === "" ||
        data.password === ""
    ) {
        msg = "All fields are mandatory";
        return msg;
    }
    if (!namePattern.test(data.firstName)) {
        msg = "Enter valid First Name";
        return msg;
    }
    if (!namePattern.test(data.lastName)) {
        msg = "Enter valid Last Name";
        return msg;
    }
    if (!emailPattern.test(data.email)) {
        msg = "Enter valid Email Address";
        return msg;
    }
    if (data.password.length < 4 || data.password.length > 14) {
        msg = "Password must be 4 to 15 character long";
        return msg;
    }
    if (!passwordPattern.test(data.password)) {
        msg =
            "Password should contain one small letter, \n one capital letter, one digit \nand one special character @ ";
        return msg;
    }

    return msg;
};

export const loginValidations = data => {
    let msg = "";
    const emailPattern = /^[\w.]*@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    if (data.email === "" || data.password === "") {
        msg = "All fields are mandatory. Please fill all details";
        return msg;
    }
    if (!emailPattern.test(data.email)) {
        msg = "Please enter valid email";
        return msg;
    }
    return msg;
};

export const jobSearch = data => {
    let msg = "";
    if (data.jobname == "" || data.joblocation == "") {
        msg = "All fields are mandatory. Please fill all details";
        return msg;
    }
    return msg;
};

export const applyJob = data => {
    let msg = "";
    const namePattern = /^[a-zA-Z\s]+$/;
    const emailPattern = /^[\w.]*@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (
        data.firstName === "" ||
        data.lastName === "" ||
        data.email === "" ||
        data.address === "" ||
        data.hearAboutUs === "" ||
        data.sponsorship === "" ||
        data.diversity === "" ||
        data.disablility === "" ||
        data.resume === ""
    ) {
        msg = "All fields except cover letter are mandatory. Please fill those mandatory fields";
        return msg;
    }
    if (!namePattern.test(data.firstName)) {
        msg = "Enter valid First name";
        return msg;
    }
    if (!namePattern.test(data.lastName)) {
        msg = "Enter valid Last name";
        return msg;
    }
    if (!emailPattern.test(data.email)) {
        msg = "Enter valid email";
        return msg;
    }
    return msg;
}

export const postJob = data => {
    let msg = "";
    const namePattern = /^[a-zA-Z\s]+$/;
    if (
        data.jobCompany === "" ||
        data.jobTitle === "" ||
        data.jobLocation === "" ||
        data.jobFunction === "" ||
        data.jobEmploymentType === "" ||
        data.jobIndustry === "" ||
        data.jobDescription === ""
    ) {
        msg = "All fields are mandatory. Please fill all details";
        return msg;
    }
    if (!namePattern.test(data.jobCompany)) {
        msg = "Enter valid Company Name";
        return msg;
    }
    if (!namePattern.test(data.jobTitle)) {
        msg = "Enter valid Job Title";
        return msg;
    }
    if (!namePattern.test(data.jobLocation)) {
        msg = "Enter valid Job Location";
        return msg;
    }
    return msg;
}

export const editProfile = data => {
    let msg = "";
    const zipCodePattern = /^[0-9]{5}(?:-[0-9]{4})?$/;
    if (!zipCodePattern.test(data.zipcode)) {
        msg = "Enter valid zipcode";
        return msg;
    }
    return msg;
}


export const isEmpty = value => {
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0);
};
