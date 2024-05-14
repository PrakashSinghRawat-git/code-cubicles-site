"use client";
import React, { useState, useEffect } from "react";
import { saveUserData, updateRole } from "@/api/actions";
import { globalStore } from "@/store/globalStore";

const doctorData = {
    degrees: ["mbbs", "md", "ms", "dm", "mch"],
    specialties: ["kidney", "heart", "lungs", "liver", "brain", "general"],
};
// const roleBasedInfo = {
//     doctor: {
//         degree: "",
//         specialties: "",
//         hospitalWorkingIn: "",
//     },
//     patient: {
//         disease: "",
//     },
// };
const RegisterationForm = () => {
    const { userInfo, setUserInfo } = globalStore();

    const [generalInfo, setGeneralInfo] = useState({
        name: "",
        email: "",
        phone: "",
        age: "",
        role: "",
    });
    const [roleBasedInfo, setRoleBasedInfo] = useState({
        degree: "",
        specialties: "",
        hospitalWorkingIn: "",
    });
    const handleSetRole = (e) => {
        setGeneralInfo({
            ...generalInfo,
            role: e.target.value,
        });
        setRoleBasedInfo({});
    };
    useEffect(() => {
        console.log("generalInfo: ", generalInfo);
    }, [generalInfo]);
    useEffect(() => {
        console.log("roleBasedInfo: ", roleBasedInfo);
    }, [roleBasedInfo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("generalInfo: ", generalInfo);
        console.log("roleBasedInfo: ", roleBasedInfo);
        await saveUserData(generalInfo, roleBasedInfo);

        // update user role
        await updateRole(userInfo?.email, generalInfo.role);
        setUserInfo({
            ...userInfo,
            role: generalInfo.role,
        });
        console.log("Data saved successfully");
        window.location.href = "/";
    };
    return (
        <section>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="floating_first_name"
                        id="floating_first_name"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none     focus:outline-none focus:ring-0   peer"
                        placeholder=" "
                        required=""
                        onChange={(e) => {
                            setGeneralInfo({
                                ...generalInfo,
                                name: e.target.value,
                            });
                        }}
                    />
                    <label
                        htmlFor="floating_first_name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Full Name
                    </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="email"
                        name="floating_email"
                        id="floating_email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none       focus:border-blue-500 focus:outline-none focus:ring-0   peer"
                        placeholder=""
                        defaultValue={userInfo?.email || ""}
                        required=""
                        onChange={(e) => {
                            setGeneralInfo({
                                ...generalInfo,
                                email: e.target.value,
                            });
                        }}
                    />
                    <label
                        htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Email address
                    </label>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="number"
                            name="floating_password"
                            id="floating_password"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none       focus:border-blue-500 focus:outline-none focus:ring-0   peer"
                            placeholder=" "
                            required=""
                            onChange={(e) => {
                                setGeneralInfo({
                                    ...generalInfo,
                                    phone: e.target.value,
                                });
                            }}
                        />
                        <label
                            htmlFor="floating_password"
                            className="peer-focus:font-medium absolute text-sm text-gray-500   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Phone
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="number"
                            name="floating_password"
                            id="floating_password"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none       focus:border-blue-500 focus:outline-none focus:ring-0   peer"
                            placeholder=" "
                            required=""
                            onChange={(e) => {
                                setGeneralInfo({
                                    ...generalInfo,
                                    age: e.target.value,
                                });
                            }}
                        />
                        <label
                            htmlFor="floating_password"
                            className="peer-focus:font-medium absolute text-sm text-gray-500   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Age
                        </label>
                    </div>
                </div>
                <div>
                    <div>
                        <p>describe yourself</p>
                        <fieldset onChange={handleSetRole}>
                            <div className="flex items-center mb-4">
                                <input
                                    id="doctor"
                                    type="radio"
                                    name="role"
                                    defaultValue="doctor"
                                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300     focus:bg-blue-600  bg-gray-700   "
                                    defaultChecked=""
                                />
                                <label
                                    htmlFor="doctor"
                                    className="block ms-2  text-sm font-medium text-gray-900 "
                                >
                                    Doctor
                                </label>
                            </div>
                            <div className="flex items-center mb-4">
                                <input
                                    id="patient"
                                    type="radio"
                                    name="role"
                                    defaultValue="patient"
                                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300     focus:bg-blue-600  bg-gray-700   "
                                    defaultChecked=""
                                />
                                <label
                                    htmlFor="doctor"
                                    className="block ms-2  text-sm font-medium text-gray-900 "
                                >
                                    Patient
                                </label>
                            </div>
                            <div className="flex items-center mb-4">
                                <input
                                    id="donor"
                                    type="radio"
                                    name="role"
                                    defaultValue="donor"
                                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300     focus:bg-blue-600  bg-gray-700   "
                                    defaultChecked=""
                                />
                                <label
                                    htmlFor="recepient"
                                    className="block ms-2  text-sm font-medium text-gray-900 "
                                >
                                    Donor
                                </label>
                            </div>
                            <div className="flex items-center mb-4">
                                <input
                                    id="recepient"
                                    type="radio"
                                    name="role"
                                    defaultValue="recepient"
                                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300     focus:bg-blue-600  bg-gray-700   "
                                    defaultChecked=""
                                />
                                <label
                                    htmlFor="recepient"
                                    className="block ms-2  text-sm font-medium text-gray-900 "
                                >
                                    Recepient
                                </label>
                            </div>
                        </fieldset>
                    </div>
                    {generalInfo.role == "doctor" && (
                        <div>
                            <div className="relative z-0 w-full mt-5 mb-5 group border-0 border-b-2">
                                <input
                                    type="text"
                                    name="floating_first_name"
                                    id="floating_first_name"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none     focus:outline-none focus:ring-0   peer"
                                    placeholder=" "
                                    required=""
                                    // onChange={(e) => {
                                    //     setRoleBasedInfo({
                                    //         ...roleBasedInfo,
                                    //         degree: e.target.value,
                                    //     });
                                    // }}
                                    disabled
                                    value={
                                        (roleBasedInfo &&
                                            roleBasedInfo?.degree &&
                                            roleBasedInfo?.degree?.join(
                                                ", "
                                            )) ||
                                        ""
                                    }
                                />
                                <label
                                    htmlFor="floating_first_name"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Degree
                                </label>
                                {doctorData.degrees.map((option) => (
                                    <div key={option}>
                                        <input
                                            type="checkbox"
                                            value={option}
                                            onChange={() => {
                                                setRoleBasedInfo((prevInfo) => {
                                                    // Check if the option is already selected
                                                    const isOptionSelected =
                                                        prevInfo.degree.includes(
                                                            option
                                                        );
                                                    if (isOptionSelected) {
                                                        // If selected, remove the option
                                                        return {
                                                            ...prevInfo,
                                                            degree: prevInfo.degree.filter(
                                                                (item) =>
                                                                    item !==
                                                                    option
                                                            ),
                                                        };
                                                    } else {
                                                        // If not selected, add the option
                                                        return {
                                                            ...prevInfo,
                                                            degree: [
                                                                ...prevInfo.degree,
                                                                option,
                                                            ],
                                                        };
                                                    }
                                                });
                                            }}
                                        />
                                        <label>{option}</label>
                                    </div>
                                ))}
                            </div>
                            <div className="relative z-0 w-full mt-5 mb-5 group border-0 border-b-2">
                                <input
                                    type="text"
                                    name="floating_first_name"
                                    id="floating_first_name"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none     focus:outline-none focus:ring-0   peer"
                                    placeholder=" "
                                    required=""
                                    disabled
                                    value={
                                        (roleBasedInfo &&
                                            roleBasedInfo?.specialties &&
                                            roleBasedInfo?.specialties?.join(
                                                ", "
                                            )) ||
                                        ""
                                    }
                                />
                                <label
                                    htmlFor="floating_first_name"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Specialties
                                </label>
                                {doctorData.specialties.map((option) => (
                                    <div key={option}>
                                        <input
                                            type="checkbox"
                                            value={option}
                                            onChange={() => {
                                                setRoleBasedInfo((prevInfo) => {
                                                    // Check if the option is already selected
                                                    const isOptionSelected =
                                                        prevInfo.specialties.includes(
                                                            option
                                                        );
                                                    if (isOptionSelected) {
                                                        // If selected, remove the option
                                                        return {
                                                            ...prevInfo,
                                                            specialties:
                                                                prevInfo.specialties.filter(
                                                                    (item) =>
                                                                        item !==
                                                                        option
                                                                ),
                                                        };
                                                    } else {
                                                        // If not selected, add the option
                                                        return {
                                                            ...prevInfo,
                                                            specialties: [
                                                                ...prevInfo.specialties,
                                                                option,
                                                            ],
                                                        };
                                                    }
                                                });
                                            }}
                                        />
                                        <label>{option}</label>
                                    </div>
                                ))}
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    name="floating_first_name"
                                    id="floating_first_name"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none     focus:outline-none focus:ring-0   peer"
                                    placeholder=" "
                                    required=""
                                    onChange={(e) => {
                                        setRoleBasedInfo({
                                            ...roleBasedInfo,
                                            hospitalWorkingIn: e.target.value,
                                        });
                                    }}
                                />
                                <label
                                    htmlFor="floating_first_name"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Hospital working in
                                </label>
                            </div>
                        </div>
                    )}
                    {generalInfo.role == "patient" && (
                        <div>
                            <div className="relative z-0 w-full mt-5 mb-5 group border-0 border-b-2">
                                <input
                                    type="text"
                                    name="floating_first_name"
                                    id="floating_first_name"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none     focus:outline-none focus:ring-0   peer"
                                    placeholder=" "
                                    required=""
                                    // value={roleBasedInfo?.disease || ""}
                                    onChange={(e) => {
                                        setRoleBasedInfo({
                                            ...roleBasedInfo,
                                            disease: e.target.value,
                                        });
                                    }}
                                />
                                <label
                                    htmlFor="floating_first_name"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Disease
                                </label>
                            </div>
                        </div>
                    )}
                    {generalInfo.role == "donor" && (
                        <div>
                            <div className="relative z-0 w-full mt-5 mb-5 group border-0 border-b-2">
                                <input
                                    type="text"
                                    name="floating_first_name"
                                    id="floating_first_name"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none     focus:outline-none focus:ring-0   peer"
                                    placeholder=" "
                                    required=""
                                    // value={roleBasedInfo?.disease || ""}
                                    onChange={(e) => {
                                        setRoleBasedInfo({
                                            ...roleBasedInfo,
                                            organ: e.target.value,
                                        });
                                    }}
                                />
                                <label
                                    htmlFor="floating_first_name"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Organ
                                </label>
                            </div>
                        </div>
                    )}
                    {generalInfo.role == "recepient" && (
                        <div>
                            <div className="relative z-0 w-full mt-5 mb-5 group border-0 border-b-2">
                                <input
                                    type="text"
                                    name="floating_first_name"
                                    id="floating_first_name"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none     focus:outline-none focus:ring-0   peer"
                                    placeholder=" "
                                    required=""
                                    // value={roleBasedInfo?.disease || ""}
                                    onChange={(e) => {
                                        setRoleBasedInfo({
                                            ...roleBasedInfo,
                                            organ: e.target.value,
                                        });
                                    }}
                                />
                                <label
                                    htmlFor="floating_first_name"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Organ
                                </label>
                            </div>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center   "
                >
                    Submit
                </button>
            </form>
        </section>
    );
};

export default RegisterationForm;
