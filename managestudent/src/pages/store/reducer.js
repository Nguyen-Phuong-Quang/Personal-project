import { actions } from ".";
import { SET_TABLE_INPUT, ADD_INFO, DELETE_INFO, EDIT_INFO, SET_SEARCH_INPUT, SEARCH_INFO } from "./constants";

export const headerTable = {
    id: "Student ID",
    name: "Student name",
    email: "Email",
    phoneNumber: "Phone number",
    gpa: "Gpa",
    cpa: "Cpa",
    status: "Status",
    address: "Address",
    birthday: "Birthday"
}

export const infoField1 = ["id", "name", "birthday", "address"]
export const infoField2 = ["id", "name", "gpa", "cpa", "status"]
export const infoField3 = ["id", "name", "phoneNumber", "email"]

const data = JSON.parse(localStorage.getItem("student"))

export const initState = {
    studentsInfo: data || [
        {
            id: "20205191",
            name: "Nguyen Phuong Quang",
            email: "quang.np205191@sis.hust.edu.vn",
            phoneNumber: "0329715851",
            gpa: "3.92",
            cpa: "3.54",
            status: "Second year",
            address: "Dong Anh, Ha Noi",
            birthday: "29/11/2002"
        }
    ],

    inputInfo: {
        id: "",
        name: "",
        email: "",
        phoneNumber: "",
        gpa: "",
        cpa: "",
        status: "",
        address: "",
        birthday: ""
    },

    searchResults: [],

    searchInfo: {
        id: "",
        name: "",
        email: "",
        phoneNumber: "",
        gpa: "",
        cpa: "",
        status: "",
        address: "",
        birthday: ""
    }
}

function reducer(state, action) {
    console.log(state);
    switch(action.type) {
        case SET_TABLE_INPUT:
                    const newState1 = {
                        ...state,
                        inputInfo: action.payload
                    }

                    return newState1
        case ADD_INFO:
                    const newState2 = {
                        ...state,
                        studentsInfo: [
                            ...state.studentsInfo,
                            action.payload
                        ]
                    }

                    localStorage.setItem("student", JSON.stringify(newState2.studentsInfo))

                    return newState2
                    
        case DELETE_INFO:
                    const newStudentInfo = [...state.studentsInfo];
                    newStudentInfo.splice(action.payload, 1);

                    const newState3 = {
                        ...state,
                        studentsInfo: newStudentInfo
                    }

                    localStorage.setItem("student", JSON.stringify(newState3.studentsInfo))

                    return newState3

        case EDIT_INFO:
                    const editedStudentInfo = [...state.studentsInfo];
                    editedStudentInfo[action.index] = action.payload;

                    const newState4 = {
                        ...state,
                        studentsInfo: editedStudentInfo
                    }
                    localStorage.setItem("student", JSON.stringify(newState4.studentsInfo))

                    return newState4

        case SET_SEARCH_INPUT:
                    const newState5 = {
                        ...state,
                        searchInfo: action.payload
                    }

                    return newState5
        
        case SEARCH_INFO:
                    const newState6 = {
                        ...state,
                        searchResults: action.payload
                    }
                    
                    return newState6
                    
                    
        default:
            throw new Error("Error!")
    }
}

export default reducer
