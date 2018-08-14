const entities = {
    answerItem: {
        id: "int",
        chosen: "boolean",
        notes: "string",
        startTime: "date",
        endTime: "date",
        text: "string",
        position: "string",
        limitForShift: "boolean"
    },
    eventLocationItem: {
        name: "string",
        address: "string",
        lat: "float",
        lng: "float",
        mapImage: "url"
    },
    photoItem: {
        id: "int",
        thumb: "url",
        photo: "url",
        caption: "string"
    },
    clockItem: {
        in: "date",
        out: "date",
        preciseIn: "date",
        preciseOut: "date"
    },
    eventItem: {
        id: "int",
        isOpen: "boolean",
        name: "string",
        answers: {"answersItem": "id"},
        parentGroupId: "int",
        didClientAnswer: "boolean",
        didReject: "boolean",
        eventLocation: "eventLocationItem",
        eventType: "string",
        uniform: "string",
        allowCar: "int",
        isCarAvailable: "boolean",
        comment: "string",
        userComment: "string",
        companyName: "string",
        companyLogo: "url",
        dateTime: "date",
        eventEnded: "boolean",
        salary: "int",
        isAnswerMutable: "boolean",
        allowMultiple: "boolean",
        disableRejection: "boolean",
        description: "string",
        clientName: "string",
        didRead: "boolean",
        isEventApprove: "int",
        isEventFind: "int",
        showClosedEvents: "boolean",
        startTime: "date",
        endTime: "date",
        needsConfirmation: "boolean",
        isCaptain: "boolean",
        managerName: "string",
        onSiteContact: "string",
        peopleThumbs: ["url"],
        myPhotos: ["photoItem"],
        onSiteContactPhone: "string",
        notes: "string",
        travelExpense: "int",
        tipEarned: "int",
        eventMeetingPoint: "eventLocationItem",
        personalNotes: "string",
        positionName: "string",
        shiftDescription: "string",
        allowBreakReport: "boolean",
        clock: "ClockItem",
        breaks: ["ClockItem"],
        shiftDuration: "int",
        shiftDurationFraction: "float"
    },
    "reportItem": {
        id: "int",
        startTime: "date",
        endTime: "date"
    },
    "officeItem": {
        id: "int",
        companyName: "Name",
        reported: {"reportItem": "id"},
        lastClockintime: "date"
    },
    "mandatoryItem": {
        id: "int",
        companyName: "string",
        text: "string",
        attachmentTitle: "string",
        attachmenturl: "url",
        formLink: "url",
        formLinkTitle: "string",
        acceptText: "string"
    },
    "badgeItem": {
        shifts: "int",
        availabilities: "int",
        feed: "int",
        notifications: "int"
    },
    "userItem": {
        reportStats: "string",
        hasGroups: "boolean",
        language: "string",
        phoneFormatted: "string",
        isWebUser: "boolean",
        chatToken: "string",
        clientId: "int",
        clientFirstName: "string",
        clientLastName: "string",
        email: "string",
        clientImage: "url",
        isAdmin: "boolean",
        emailSub: "boolean",
        signupType: "string",
        prizeMoney: "string",
        prizeFriend: "string"
    }
}

const tree = {
    "availabilities": {
        "$id": {
            "id": "int",
            "answers": {
                "$id": {
                    _type: "answerItem",
                    "id": "int",
                    "chosen": "boolean",
                    "notes": "string",
                    "startTime": "date",
                    "endTime": "date",
                    "text": "string",
                    "position": "string",
                    "limitForShift": "boolean"
                }
            },
            "isOpen": "boolean",
            "name": "string",
            "parentGroupId": "int",
            "didClientAnswer": "boolean",
            "didReject": "boolean",
            "eventLocation": {
                _type: "eventLocationItem",
                "name": "string",
                "address": "string",
                "lat": "float",
                "lng": "float",
                "mapImage": "url"
            },
            "eventType": "string",
            "uniform": "string",
            "allowCar": "int",
            "isCarAvailable": "boolean",
            "comment": "string",
            "userComment": "string",
            "companyName": "string",
            "companyLogo": "url",
            "dateTime": "date",
            "eventEnded": "boolean",
            "salary": "int",
            "isAnswerMutable": "boolean",
            "allowMultiple": "boolean",
            "disableRejection": "boolean",
            "description": "string",
            "clientName": "string",
            "didRead": "boolean",
            "isEventApprove": "boolean",
            "isEventFind": "boolean",
            "showClosedEvents": "boolean"
        },
    },
    "approvals": {
        "$id": {
            _type: "approvalItem",
            "id": "int",
            "answers": {
                "$id": {
                    _type: "answerItem",
                    "id": "int",
                    "chosen": "boolean",
                    "notes": "string",
                    "startTime": "date",
                    "endTime": "date",
                    "text": "string",
                    "position": "string",
                    "limitForShift": "boolean"
                }
            },
            "isOpen": "boolean",
            "name": "string",
            "parentGroupId": "int",
            "didClientAnswer": "boolean",
            "didReject": "boolean",
            "eventLocation": {
                _type: "eventLocation",
                "name": "string",
                "address": "string",
                "lat": "float",
                "lng": "float",
                "mapImage": "url"
            },
            "eventType": "string",
            "uniform": "string",
            "allowCar": "int",
            "isCarAvailable": "boolean",
            "comment": "string",
            "userComment": "string",
            "companyName": "string",
            "companyLogo": "url",
            "dateTime": "date",
            "eventEnded": "boolean",
            "salary": "320",
            "isAnswerMutable": "boolean",
            "allowMultiple": "boolean",
            "description": "string",
            "clientName": "",
            "didRead": "boolean",
            "isEventApprove": "boolean",
            "isEventFind": "boolean",
            "startTime": "date",
            "endTime": "date"
        },
    },
    "offices": {
        "$id": {
            "id": "int",
            "companyName": "string",
            "reported": {
                "$id": {
                    $type: "reportedItem",
                    "id": "int",
                    "startTime": "date",
                    "endTime": "date"
                },
            },
            "lastClockInTime": "date"
        }
    },
    "mandatories": {
        "$id": {
            _type: "mandatoryItem",
            "id": "int",
            "companyName": "string",
            "text": "string",
            "attachmentTitle": "string",
            "attachmentUrl": "url",
            "formLink": "url",
            "formLinkTitle": "string",
            "acceptText": "string"
        },
    },
    "events": {
        "$id": {
            _type: "eventItem",
            "id": "int",
            "parentGroupId": "int",
            "name": "string",
            "companyName": "string",
            "dateTime": "date",
            "clientName": "string",
            "eventType": "string",
            "needsConfirmation": "boolean",
            "isCaptain": "boolean",
            "eventEnded": "boolean",
            "eventLocation": {
                _type: "eventLocationItem",
                "name": "string",
                "address": "string",
                "lat": "float",
                "lng": "float",
                "mapImage": "url"
            },
            "managerName": "string",
            "onSiteContact": "string",
            "peopleThumbs": {
                "$id": {
                    _type: "peopleThumbItem",
                    id: "int", 
                    url: "string"
                },
            },
            "myPhotos": {
                "$id": {
                    _type: "myPhotosItem",
                    "id": "int",
                    "thumb": "url",
                    "photo": "url",
                    "caption": "string"
                },
            },
            "onSiteContactPhone": "string",
            "uniform": "string",
            "notes": "string",
            "travelExpense": "int",
            "tipEarned": "int",
            "eventMeetingPoint": {
                _type: "eventMeetingPointItem",
                "name": "string",
                "address": "string",
                "lat": "float",
                "lng": "float",
                "mapImage": "url"
            },
            "personalNotes": "string",
            "positionName": "string",
            "shiftDescription": "string",
            "startTime": "date",
            "endTime": "date",
            "allowBreakReport": "boolean",
            "isCarAvailable": "boolean",
            "clock": {
                _type: "clockItem",
                "in": "date",
                "out": "date",
                "preciseIn": "date",
                "preciseOut": "date"
            },
            "breaks": {
                "$id": {
                    _type: "breakItem",
                    "id": "int",
                    "in": "date",
                    "out": "date",
                    "preciseIn": "date",
                    "preciseOut": "date"
                }
            },
            "shiftDuration": "int",
            "shiftDurationFraction": "float"
        },
    },
    "badges": {
        _type: "badgeItem",
        "shifts": "int", 
        "availabilities": "int", 
        "feed": "int", 
        "notifications": "int"
    },
    "user": {
        _type:"userItem",
        "reportStats": "string",
        "hasGroups": "boolean",
        "language": "string",
        "phoneFormatted": "string",
        "isWebUser": "boolean",
        "chatToken": "string",
        "clientId": "int",
        "clientFirstName": "string",
        "clientLastName": "string",
        "email": "string",
        "clientImage": "url",
        "isAdmin": "boolean",
        "emailSub": "boolean",
        "signupType": "string",
        "prizeMoney": "string",
        "prizeFriend": "string"
    }
}

module.exports = {
    entities,
    tree,
}
