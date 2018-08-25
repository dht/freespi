
 
export const setEvents = (value) => ({type: "SET_EVENTS", value}); // prettier-ignore
export const setEvent = (eventId, value) => ({type: "SET_EVENT", eventId, value}); // prettier-ignore
export const patchEvent = (eventId, value) => ({type: "PATCH_EVENT", eventId, value}); // prettier-ignore
export const deleteEvent = (eventId, value) => ({type: "DELETE_EVENT"); // prettier-ignore
export const setEvent = (eventId, value) => ({type: "SET_EVENTS", eventId, value}); // prettier-ignore
export const patchEvent = (eventId, value) => ({type: "SET_EVENT", eventId, value}); // prettier-ignore
export const setAnswers = (answerId, value) => ({type: "SET_EVENT_ANSWERS", answerId, value}); // prettier-ignore
export const setAnswer = (eventId, answerId, value) => ({type: "SET_EVENT_ANSWER", eventId, answerId, value}); // prettier-ignore
export const patchAnswer = (eventId, answerId, value) => ({type: "PATCH_EVENT_ANSWER", eventId, answerId, value}); // prettier-ignore
export const deleteAnswer = (eventId, answerId, value) => ({type: "DELETE_EVENT_ANSWER"); // prettier-ignore
export const setAnswer = (eventId, answerId, value) => ({type: "SET_EVENT_ANSWERS", eventId, answerId, value}); // prettier-ignore
export const patchAnswer = (eventId, answerId, value) => ({type: "SET_EVENT_ANSWER", eventId, answerId, value}); // prettier-ignore
export const setEventLocation = (eventId, value) => ({type: "SET_EVENT_EVENTLOCATION", eventId, value}); // prettier-ignore
export const patchEventLocation = (eventId, value) => ({type: "PATCH_EVENT_EVENTLOCATION", eventId, value}); // prettier-ignore
export const setClock = (eventId, value) => ({type: "SET_EVENT_CLOCK", eventId, value}); // prettier-ignore
export const patchClock = (eventId, value) => ({type: "PATCH_EVENT_CLOCK", eventId, value}); // prettier-ignore
export const setCaptain = (eventId, value) => ({type: "SET_EVENT_CAPTAIN", eventId, value}); // prettier-ignore
export const patchCaptain = (eventId, value) => ({type: "PATCH_EVENT_CAPTAIN", eventId, value}); // prettier-ignore
export const setFeedback = (eventId, value) => ({type: "SET_EVENT_CAPTAIN_FEEDBACK", eventId, value}); // prettier-ignore
export const patchFeedback = (eventId, value) => ({type: "PATCH_EVENT_CAPTAIN_FEEDBACK", eventId, value}); // prettier-ignore
export const setContacts = (contactId, value) => ({type: "SET_EVENT_CAPTAIN_CONTACTS", contactId, value}); // prettier-ignore
export const setContact = (eventId, contactId, value) => ({type: "SET_EVENT_CAPTAIN_CONTACT", eventId, contactId, value}); // prettier-ignore
export const patchContact = (eventId, contactId, value) => ({type: "PATCH_EVENT_CAPTAIN_CONTACT", eventId, contactId, value}); // prettier-ignore
export const deleteContact = (eventId, contactId, value) => ({type: "DELETE_EVENT_CAPTAIN_CONTACT"); // prettier-ignore
export const setContact = (eventId, contactId, value) => ({type: "SET_EVENT_CAPTAIN_CONTACTS", eventId, contactId, value}); // prettier-ignore
export const patchContact = (eventId, contactId, value) => ({type: "SET_EVENT_CAPTAIN_CONTACT", eventId, contactId, value}); // prettier-ignore
export const setUserClock = (eventId, contactId, value) => ({type: "SET_EVENT_CAPTAIN_CONTACT_USERCLOCK", eventId, contactId, value}); // prettier-ignore
export const patchUserClock = (eventId, contactId, value) => ({type: "PATCH_EVENT_CAPTAIN_CONTACT_USERCLOCK", eventId, contactId, value}); // prettier-ignore
export const setOffices = (value) => ({type: "SET_OFFICES", value}); // prettier-ignore
export const setOffice = (officeId, value) => ({type: "SET_OFFICE", officeId, value}); // prettier-ignore
export const patchOffice = (officeId, value) => ({type: "PATCH_OFFICE", officeId, value}); // prettier-ignore
export const deleteOffice = (officeId, value) => ({type: "DELETE_OFFICE"); // prettier-ignore
export const setOffice = (officeId, value) => ({type: "SET_OFFICES", officeId, value}); // prettier-ignore
export const patchOffice = (officeId, value) => ({type: "SET_OFFICE", officeId, value}); // prettier-ignore
export const setReports = (reportId, value) => ({type: "SET_OFFICE_REPORTS", reportId, value}); // prettier-ignore
export const setReport = (officeId, reportId, value) => ({type: "SET_OFFICE_REPORT", officeId, reportId, value}); // prettier-ignore
export const patchReport = (officeId, reportId, value) => ({type: "PATCH_OFFICE_REPORT", officeId, reportId, value}); // prettier-ignore
export const deleteReport = (officeId, reportId, value) => ({type: "DELETE_OFFICE_REPORT"); // prettier-ignore
export const setReport = (officeId, reportId, value) => ({type: "SET_OFFICE_REPORTS", officeId, reportId, value}); // prettier-ignore
export const patchReport = (officeId, reportId, value) => ({type: "SET_OFFICE_REPORT", officeId, reportId, value}); // prettier-ignore
export const setMandatories = (value) => ({type: "SET_MANDATORIES", value}); // prettier-ignore
export const setMandatory = (mandatoryId, value) => ({type: "SET_MANDATORY", mandatoryId, value}); // prettier-ignore
export const patchMandatory = (mandatoryId, value) => ({type: "PATCH_MANDATORY", mandatoryId, value}); // prettier-ignore
export const deleteMandatory = (mandatoryId, value) => ({type: "DELETE_MANDATORY"); // prettier-ignore
export const setMandatory = (mandatoryId, value) => ({type: "SET_MANDATORIES", mandatoryId, value}); // prettier-ignore
export const patchMandatory = (mandatoryId, value) => ({type: "SET_MANDATORY", mandatoryId, value}); // prettier-ignore
export const setBadge = (value) => ({type: "SET_BADGES", value}); // prettier-ignore
export const patchBadge = (value) => ({type: "PATCH_BADGES", value}); // prettier-ignore
export const setUser = (value) => ({type: "SET_USER", value}); // prettier-ignore
export const patchUser = (value) => ({type: "PATCH_USER", value}); // prettier-ignore
export const setAppConfig = (value) => ({type: "SET_APPCONFIG", value}); // prettier-ignore
export const patchAppConfig = (value) => ({type: "PATCH_APPCONFIG", value}); // prettier-ignore

export const appConfig = (state, action) => {
  switch(action.type) {
    case "SET_APPCONFIG":
      return action.value;  
      
    case "PATCH_APPCONFIG":
      return {
        ...state,
        ...action.value        
      };
      
    
      
    default:
      return state;      
  }   
}

export const user = (state, action) => {
  switch(action.type) {
    case "SET_USER":
      return action.value;  
      
    case "PATCH_USER":
      return {
        ...state,
        ...action.value        
      };
      
    
      
    default:
      return state;      
  }   
}

export const badges = (state, action) => {
  switch(action.type) {
    case "SET_BADGES":
      return action.value;  
      
    case "PATCH_BADGES":
      return {
        ...state,
        ...action.value        
      };
      
    
      
    default:
      return state;      
  }   
}

export const mandatory = (state, action) => {
  switch(action.type) {
    case "SET_MANDATORIES":
      return action.value;  
      
    case "SET_MANDATORY":
      return {
        ...state,
        ...action.value        
      };
      
    
      
    default:
      return state;      
  }   
}

export const mandatories = (state, action) => {
  let newState;
  
  switch(action.type) {
    case "SET_MANDATORIES":
      return action.value;
  

    case "SET_MANDATORY":
    case "PATCH_MANDATORY":
      return {
        ...state,
        [action.mandatoryId]: mandatory(state[action.mandatoryId], action)
      };
      
    case "DELETE_MANDATORY":
      newState = { ...state };
      delete newState[action.mandatoryId];
      return newState;
    
    default:
      return state;
  }
}

export const undefined = (state, action) => {
  switch(action.type) {
    case "SET_OFFICE_REPORTS":
      return action.value;  
      
    case "SET_OFFICE_REPORT":
      return {
        ...state,
        ...action.value        
      };
      
    
      
    default:
      return state;      
  }   
}

export const reports = (state, action) => {
  let newState;
  
  switch(action.type) {
    case "SET_OFFICE_REPORTS":
      return action.value;
  

    case "SET_OFFICE_REPORT":
    case "PATCH_OFFICE_REPORT":
      return {
        ...state,
        [action.officeId]: report(state[action.officeId], action)
      };
      
    case "DELETE_OFFICE_REPORT":
      newState = { ...state };
      delete newState[action.officeId];
      return newState;
    
    default:
      return state;
  }
}

export const office = (state, action) => {
  switch(action.type) {
    case "SET_OFFICES":
      return action.value;  
      
    case "SET_OFFICE":
      return {
        ...state,
        ...action.value        
      };
      
    	case "SET_OFFICE_REPORTS":
	case "SET_OFFICE_REPORT":
	case "PATCH_OFFICE_REPORT":
	case "DELETE_OFFICE_REPORT":
     
    return {
        ...state,
        reports: reports(state.reports, action)
      };

      
    default:
      return state;      
  }   
}

export const offices = (state, action) => {
  let newState;
  
  switch(action.type) {
    case "SET_OFFICES":
      return action.value;
  
	case "SET_OFFICE_REPORTS":
	case "SET_OFFICE_REPORT":
	case "PATCH_OFFICE_REPORT":
	case "DELETE_OFFICE_REPORT":
    case "SET_OFFICE":
    case "PATCH_OFFICE":
      return {
        ...state,
        [action.officeId]: office(state[action.officeId], action)
      };
      
    case "DELETE_OFFICE":
      newState = { ...state };
      delete newState[action.officeId];
      return newState;
    
    default:
      return state;
  }
}

export const userClock = (state, action) => {
  switch(action.type) {
    case "SET_EVENT_CAPTAIN_CONTACT_USERCLOCK":
      return action.value;  
      
    case "PATCH_EVENT_CAPTAIN_CONTACT_USERCLOCK":
      return {
        ...state,
        ...action.value        
      };
      
    
      
    default:
      return state;      
  }   
}

export const undefined = (state, action) => {
  switch(action.type) {
    case "SET_EVENT_CAPTAIN_CONTACTS":
      return action.value;  
      
    case "SET_EVENT_CAPTAIN_CONTACT":
      return {
        ...state,
        ...action.value        
      };
      
    	case "SET_EVENT_CAPTAIN_CONTACT_USERCLOCK":
	case "PATCH_EVENT_CAPTAIN_CONTACT_USERCLOCK":
     
    return {
        ...state,
        userClock: userClock(state.userClock, action)
      };

      
    default:
      return state;      
  }   
}

export const contacts = (state, action) => {
  let newState;
  
  switch(action.type) {
    case "SET_EVENT_CAPTAIN_CONTACTS":
      return action.value;
  
	case "SET_EVENT_CAPTAIN_CONTACT_USERCLOCK":
	case "PATCH_EVENT_CAPTAIN_CONTACT_USERCLOCK":
    case "SET_EVENT_CAPTAIN_CONTACT":
    case "PATCH_EVENT_CAPTAIN_CONTACT":
      return {
        ...state,
        [action.eventId]: contact(state[action.eventId], action)
      };
      
    case "DELETE_EVENT_CAPTAIN_CONTACT":
      newState = { ...state };
      delete newState[action.eventId];
      return newState;
    
    default:
      return state;
  }
}

export const feedback = (state, action) => {
  switch(action.type) {
    case "SET_EVENT_CAPTAIN_FEEDBACK":
      return action.value;  
      
    case "PATCH_EVENT_CAPTAIN_FEEDBACK":
      return {
        ...state,
        ...action.value        
      };
      
    
      
    default:
      return state;      
  }   
}

export const captain = (state, action) => {
  switch(action.type) {
    case "SET_EVENT_CAPTAIN":
      return action.value;  
      
    case "PATCH_EVENT_CAPTAIN":
      return {
        ...state,
        ...action.value        
      };
      
    	case "SET_EVENT_CAPTAIN_FEEDBACK":
	case "PATCH_EVENT_CAPTAIN_FEEDBACK":
     
    return {
        ...state,
        feedback: feedback(state.feedback, action)
      };
	case "SET_EVENT_CAPTAIN_CONTACTS":
	case "SET_EVENT_CAPTAIN_CONTACT":
	case "PATCH_EVENT_CAPTAIN_CONTACT":
	case "DELETE_EVENT_CAPTAIN_CONTACT":
     
    return {
        ...state,
        contacts: contacts(state.contacts, action)
      };
	case "SET_EVENT_CAPTAIN_CONTACT_USERCLOCK":
	case "PATCH_EVENT_CAPTAIN_CONTACT_USERCLOCK":
     
    return {
        ...state,
        userClock: userClock(state.userClock, action)
      };

      
    default:
      return state;      
  }   
}

export const clock = (state, action) => {
  switch(action.type) {
    case "SET_EVENT_CLOCK":
      return action.value;  
      
    case "PATCH_EVENT_CLOCK":
      return {
        ...state,
        ...action.value        
      };
      
    
      
    default:
      return state;      
  }   
}

export const eventLocation = (state, action) => {
  switch(action.type) {
    case "SET_EVENT_EVENTLOCATION":
      return action.value;  
      
    case "PATCH_EVENT_EVENTLOCATION":
      return {
        ...state,
        ...action.value        
      };
      
    
      
    default:
      return state;      
  }   
}

export const undefined = (state, action) => {
  switch(action.type) {
    case "SET_EVENT_ANSWERS":
      return action.value;  
      
    case "SET_EVENT_ANSWER":
      return {
        ...state,
        ...action.value        
      };
      
    
      
    default:
      return state;      
  }   
}

export const answers = (state, action) => {
  let newState;
  
  switch(action.type) {
    case "SET_EVENT_ANSWERS":
      return action.value;
  

    case "SET_EVENT_ANSWER":
    case "PATCH_EVENT_ANSWER":
      return {
        ...state,
        [action.eventId]: answer(state[action.eventId], action)
      };
      
    case "DELETE_EVENT_ANSWER":
      newState = { ...state };
      delete newState[action.eventId];
      return newState;
    
    default:
      return state;
  }
}

export const event = (state, action) => {
  switch(action.type) {
    case "SET_EVENTS":
      return action.value;  
      
    case "SET_EVENT":
      return {
        ...state,
        ...action.value        
      };
      
    	case "SET_EVENT_ANSWERS":
	case "SET_EVENT_ANSWER":
	case "PATCH_EVENT_ANSWER":
	case "DELETE_EVENT_ANSWER":
     
    return {
        ...state,
        answers: answers(state.answers, action)
      };
	case "SET_EVENT_EVENTLOCATION":
	case "PATCH_EVENT_EVENTLOCATION":
     
    return {
        ...state,
        eventLocation: eventLocation(state.eventLocation, action)
      };
	case "SET_EVENT_CLOCK":
	case "PATCH_EVENT_CLOCK":
     
    return {
        ...state,
        clock: clock(state.clock, action)
      };
	case "SET_EVENT_CAPTAIN":
	case "PATCH_EVENT_CAPTAIN":
     
    return {
        ...state,
        captain: captain(state.captain, action)
      };
	case "SET_EVENT_CAPTAIN_FEEDBACK":
	case "PATCH_EVENT_CAPTAIN_FEEDBACK":
     
    return {
        ...state,
        feedback: feedback(state.feedback, action)
      };
	case "SET_EVENT_CAPTAIN_CONTACTS":
	case "SET_EVENT_CAPTAIN_CONTACT":
	case "PATCH_EVENT_CAPTAIN_CONTACT":
	case "DELETE_EVENT_CAPTAIN_CONTACT":
     
    return {
        ...state,
        contacts: contacts(state.contacts, action)
      };
	case "SET_EVENT_CAPTAIN_CONTACT_USERCLOCK":
	case "PATCH_EVENT_CAPTAIN_CONTACT_USERCLOCK":
     
    return {
        ...state,
        userClock: userClock(state.userClock, action)
      };

      
    default:
      return state;      
  }   
}

export const events = (state, action) => {
  let newState;
  
  switch(action.type) {
    case "SET_EVENTS":
      return action.value;
  
	case "SET_EVENT_ANSWERS":
	case "SET_EVENT_ANSWER":
	case "PATCH_EVENT_ANSWER":
	case "DELETE_EVENT_ANSWER":
	case "SET_EVENT_EVENTLOCATION":
	case "PATCH_EVENT_EVENTLOCATION":
	case "SET_EVENT_CLOCK":
	case "PATCH_EVENT_CLOCK":
	case "SET_EVENT_CAPTAIN":
	case "PATCH_EVENT_CAPTAIN":
	case "SET_EVENT_CAPTAIN_FEEDBACK":
	case "PATCH_EVENT_CAPTAIN_FEEDBACK":
	case "SET_EVENT_CAPTAIN_CONTACTS":
	case "SET_EVENT_CAPTAIN_CONTACT":
	case "PATCH_EVENT_CAPTAIN_CONTACT":
	case "DELETE_EVENT_CAPTAIN_CONTACT":
	case "SET_EVENT_CAPTAIN_CONTACT_USERCLOCK":
	case "PATCH_EVENT_CAPTAIN_CONTACT_USERCLOCK":
    case "SET_EVENT":
    case "PATCH_EVENT":
      return {
        ...state,
        [action.eventId]: event(state[action.eventId], action)
      };
      
    case "DELETE_EVENT":
      newState = { ...state };
      delete newState[action.eventId];
      return newState;
    
    default:
      return state;
  }
}
 
